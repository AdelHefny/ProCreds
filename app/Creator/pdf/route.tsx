import { templateType } from "@/app/providors/templateContext";
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
export async function POST(request: Request) {
  try {
    // Parse the JSON body
    const templateState: templateType = await request.json();

    // Generate the PDF stream
    const stream = await ReactPDF.renderToStream(
      <NormalTemplate
        templateData={{
          content: {
            header: templateState.content.header,
            sections: templateState.content.sections,
            photo: templateState.content.photo,
          },
          style: convertStyles(templateState.style),
        }}
      />
    );

    // Return the response with the PDF stream
    return new NextResponse(stream as unknown as ReadableStream, {
      headers: {
        "Content-Type": "application/pdf",
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return new NextResponse("Error generating PDF", { status: 500 });
  }
}
