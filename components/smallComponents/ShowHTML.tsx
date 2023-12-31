"use client";
import React from "react";
import parse from "html-react-parser";

const ShowHTML = ({
  plainText,
  height,
  width,
  className,
  noStyle,
}: {
  plainText: string;
  height?: string;
  width?: string;
  className?: string;
  noStyle?: boolean;
}) => {
  let initialText = "";
  if (!plainText)
    initialText = `Use The Pencil Icon for Writing...

    You will see your output here`;

  if (noStyle === true) {
    return (
      <div
        className={`
              ${!plainText && "italic text-sm text-black/50"}
              ${className}
              `}
      >
        {parse(plainText || initialText)}
      </div>
    );
  }

  return (
    <div
      className={`bg-slate-100 dark:bg-slate-900 dark:text-white/50 rounded-md px-3 py-2 ${
        height ?? "min-h-fit"
      } 
      ${!plainText && "italic text-sm text-black/50"}
      ${width}
      ${className}
      `}
    >
      {parse(plainText || initialText)}
    </div>
  );
};

export default ShowHTML;
