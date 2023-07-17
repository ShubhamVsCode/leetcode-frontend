"use client";

import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const TextEditor = ({
  hideToolbar,
  state,
  setState,
}: {
  hideToolbar: boolean;
  state: string;
  setState: (state: string) => void;
}) => {
  return (
    <SunEditor
      hideToolbar={hideToolbar}
      height="500"
      setOptions={{
        buttonList: [
          ["undo", "redo"],
          ["font", "fontSize", "formatBlock"],
          ["paragraphStyle", "blockquote"],
          ["bold", "underline", "italic", "strike", "subscript", "superscript"],
          ["textStyle"],
          ["fontColor", "hiliteColor"],
          ["removeFormat"],
          ["outdent", "indent"],
          ["align", "horizontalRule", "list", "lineHeight"],
          ["table", "link", "image", "video", "audio" /** ,'math' */], // You must add the 'katex' library at options to use the 'math' plugin.
          /** ['imageGallery'] */ // You must add the "imageGalleryUrl".
          ["fullScreen", "showBlocks", "codeView"],
          ["preview", "print"],
          ["save", "template"],
          /** ['dir', 'dir_ltr', 'dir_rtl'] */ // "dir": Toggle text direction, "dir_ltr": Right to Left, "dir_rtl": Left to Right
        ],
      }}
      defaultValue={state}
      onChange={(content) => setState(content)}
    />
  );
};
export default TextEditor;
