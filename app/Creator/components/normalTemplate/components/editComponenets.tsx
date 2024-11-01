import { TemplateContext, templateType } from "@/app/providors/templateContext";
import { CSSProperties, useContext, useEffect, useRef } from "react";
import EditModeContext from "../../../contexts/editModeContext";
type coPropsLi = {
  id: string;
  style: CSSProperties;
  className?: string;
  data: string;
};
interface coProps extends coPropsLi {
  headerType: string;
}
interface HeaderContent {
  firstName: string;
  lastName: string;
  jobTitle: string;
  email: string;
  Phone: string;
  City: string;
  description: string;
}

function Edit({ id, data, headerType, style, className = "" }: coProps) {
  const [templateState, setter] = useContext(TemplateContext) as [
    templateType,
    React.Dispatch<React.SetStateAction<templateType>>
  ];
  const inputTag = useRef<HTMLInputElement>(null);
  const inputParentTag = useRef<HTMLDivElement>(null);
  const [editMode, edit_mode_setter] = useContext(EditModeContext);

  const handleDoubleClick = () => {
    if (!editMode.edit || editMode.who !== id) {
      edit_mode_setter(true, id);
    }
  };

  useEffect(() => {
    if (inputTag.current) {
      inputTag.current.addEventListener("focusout", () => {
        edit_mode_setter(false, "");
      });
    }
    if (editMode.edit && editMode.who === id && inputTag.current) {
      inputTag.current.focus();
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Enter") {
          edit_mode_setter(false, "");
        }
      };
      inputTag.current.addEventListener("keydown", handleKeyDown);

      return () => {
        inputTag.current?.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [editMode.edit, editMode.who, edit_mode_setter, id]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isNumeric = (string) => /^[+-]?\d+(\.\d+)?$/.test(string);
    if (!isNumeric(id[0])) {
      setter((prev) => ({
        ...prev,
        content: {
          ...prev.content,
          header: {
            ...prev.content.header,
            [id]: e.target.value,
          } as HeaderContent,
        },
      }));
    } else {
      setter((prev) => {
        let sections = [...prev.content.sections];
        sections[+id[0]].details[+id[2] - 1].text = e.target.value;
        return {
          ...prev,
          content: {
            ...prev.content,
            sections: sections,
          },
        };
      });
    }
  };

  return (
    <div
      className="parent_input"
      ref={inputParentTag}
      onDoubleClick={handleDoubleClick}
      onClick={() => {
        inputTag.current?.focus();
      }}
    >
      {!editMode.edit || editMode.who !== id ? (
        <div>
          {headerType == "h1" && (
            <h1 id={id} className={className} style={style}>
              {data}
            </h1>
          )}
          {headerType == "h3" && (
            <h3 id={id} className={className} style={style}>
              {data}
            </h3>
          )}
          {headerType == "p" && (
            <p id={id} className={className} style={style}>
              {data}
            </p>
          )}
        </div>
      ) : (
        <input
          id={id}
          className={`${className} input_text`}
          onDoubleClick={handleDoubleClick}
          value={
            /^[+-]?\d+(\.\d+)?$/.test(id[0])
              ? templateState.content.sections[+id[0]].details[+id[2] - 1].text
              : templateState.content.header[id as keyof HeaderContent] || ""
          }
          onChange={handleChange}
          type="text"
          name="firstName"
          style={style}
          ref={inputTag}
        />
      )}
    </div>
  );
}
function EditLi({ id, data, className, style }: coPropsLi) {
  const [templateState] = useContext(TemplateContext) as [
    templateType,
    React.Dispatch<React.SetStateAction<templateType>>
  ];
  return (
    <li id={id} className={className} style={style}>
      {data}
    </li>
  );
}

export { Edit, EditLi };
