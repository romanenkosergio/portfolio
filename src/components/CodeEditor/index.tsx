import React, { FC } from "react";
import Code from "@uiw/react-textarea-code-editor";
import rehypePrism from "rehype-prism-plus";
import rehypeRewrite from "rehype-rewrite";

import { ICodeEditorProps } from "./types";

import "./styles.scss";

const CodeEditor: FC<ICodeEditorProps> = ({code}) => {
  return (
    <Code
      className="contact__code-editor"
      value={code}
      language="js"
      disabled={true}
      padding={0}
      rehypePlugins={[
        [rehypePrism, {ignoreMissing: true, showLineNumbers: true}]
      ]}
      style={{
        fontSize: 18,
        backgroundColor: "#011627", // $primary-2
      }}
    />
  );
};

export default CodeEditor;
