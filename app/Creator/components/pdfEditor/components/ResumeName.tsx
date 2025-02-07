import { TemplateContext } from "@/app/providors/templateContext";
import React, { useContext, useState } from "react";

const ResumeName: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [templateState, setter] = useContext(TemplateContext);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setter((prev) => {
      return {
        ...prev,
        name: e.target.value,
      };
    });
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  return (
    <div className="absolute top-0 left-0 bg-transparent z-30">
      {isEditing ? (
        <input
          type="text"
          id="resumeName"
          name="resumeName"
          value={templateState.name}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <span onDoubleClick={handleDoubleClick}>{templateState.name}</span>
      )}
    </div>
  );
};

export default ResumeName;
