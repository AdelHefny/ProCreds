import { templateType } from "@/app/templateContext";
import ReactPDF, { Styles } from "@react-pdf/renderer";
import { NextResponse } from "next/server";
import NormalTemplate from "./templateComponentPdf";
import { CSSProperties } from "react";
const convertToPixels = (value: string): string => {
  if (value.endsWith("rem")) {
    // Assuming 1rem = 16px (common base unit)
    return parseFloat(value) * 16 + "pt";
  } else if (value.endsWith("em")) {
    // Assuming 1em = 16px (common base unit, can be adjusted)
    return parseFloat(value) * 16 + "pt";
  } else if (value.endsWith("px")) {
    return parseFloat(value) + "pt";
  } else {
    return value;
  }
};
// Convert CSS styles to react-pdf styles
const convertStyles = (cssStyles: {
  [key: string]: CSSProperties;
}): { [key: string]: Styles } => {
  const styles: { [key: string]: Styles } = {};

  for (const key in cssStyles) {
    if (cssStyles.hasOwnProperty(key)) {
      const cssValue = cssStyles[key];
      const style: Styles = {};

      for (const property in cssValue) {
        if (cssValue.hasOwnProperty(property)) {
          let value = cssValue[property];
          if (typeof value === "string") {
            value = convertToPixels(value);
          }
          style[property] = value;
        }
      }
      styles[key] = style;
    }
  }

  return styles;
};
export async function GET(request: Request, { params }: { params: string }) {
  const url = new URL(request.url);
  const queryString = url.search.slice(1); // Remove the "?" at the start

  // Decode the query string to retrieve the JSON string
  const decodedString = decodeURIComponent(queryString);

  // Parse the JSON string to get the templateState object
  const templateState: templateType = JSON.parse(
    decodedString.slice(0, decodedString.length - 1)
  );

  const stream = await ReactPDF.renderToStream(
    <NormalTemplate
      templateData={{
        content: {
          header: templateState.content.header,
          sections: templateState.content.sections,
        },
        style: convertStyles(templateState.style),
      }}
    />
  );
  return new NextResponse(stream as unknown as ReadableStream, {
    headers: {
      "Content-Type": "application/pdf",
    },
  });
}
