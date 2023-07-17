"use client";

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import {
  githubLight,
  githubLightInit,
  githubDark,
  githubDarkInit,
} from "@uiw/codemirror-theme-github";

import { useCallback, useState } from "react";
import { Button } from "./ui/button";

const CodePlayground = () => {
  const [code, setCode] = useState<string>("");
  const onChange = useCallback((value: any, viewUpdate: any) => {
    // console.log("value:", value);
    // console.log("viewUpdate:", viewUpdate);
    setCode(value);
  }, []);

  const onRun = (): void => {
    console.log("Ran", eval(code));
  };

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

      <Button onClick={() => onRun()}>Run</Button>
    </div>
  );
};

export default CodePlayground;
