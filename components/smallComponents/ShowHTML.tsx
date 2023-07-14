import { parseHTML } from "@/lib/utils";
import React from "react";

const ShowHTML = ({ plainText }: { plainText: string }) => {
  let initialText = "";
  if (!plainText)
    initialText = `Use The Pencil Icon for Writing...

    You will see your output here`;

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: parseHTML(plainText || initialText).innerHTML,
      }}
      className={`bg-slate-100 rounded-md px-3 py-2 min-h-[100px] ${
        !plainText && "italic text-sm text-black/50"
      }`}
    ></div>
  );
};

export default ShowHTML;
