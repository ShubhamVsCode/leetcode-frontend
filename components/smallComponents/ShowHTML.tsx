"use client";

import { parseHTML } from "@/lib/utils";
import React from "react";

const ShowHTML = ({
  plainText,
  height,
}: {
  plainText: string;
  height?: string;
}) => {
  let initialText = "";
  if (!plainText)
    initialText = `Use The Pencil Icon for Writing...

    You will see your output here`;

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: parseHTML(plainText || initialText).innerHTML,
      }}
      className={`bg-slate-100 rounded-md px-3 py-2 ${height ?? "min-h-fit"} ${
        !plainText && "italic text-sm text-black/50"
      }`}
    ></div>
  );
};

export default ShowHTML;
