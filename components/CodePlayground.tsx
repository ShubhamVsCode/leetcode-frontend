"use client";

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import {
  githubLight,
  githubLightInit,
  githubDark,
  githubDarkInit,
} from "@uiw/codemirror-theme-github";

import { useCallback } from "react";

const CodePlayground = () => {
  const onChange = useCallback((value: any, viewUpdate: any) => {
    console.log("value:", value);
  }, []);

  return (
    <div>
      <CodeMirror
        value="console.log('hello world!');"
        height="200px"
        extensions={[javascript({ jsx: true })]}
        onChange={onChange}
        theme={githubDark}
        maxHeight="80vh"
        minHeight="80vh"
        style={{
          fontSize: 20,
        }}
      />
    </div>
  );
};

export default CodePlayground;
