import Code from '@uiw/react-textarea-code-editor';
import React, { FC } from 'react';

import rehypePrism from 'rehype-prism-plus';

import { ICodeEditorProps } from './types';

import './styles.scss';

const CodeEditor: FC<ICodeEditorProps> = ({
  code,
  fontSize = 18,
  backgroundColor = '#011627',
}) => {
  return (
    <Code
      className="contact__code-editor"
      value={code}
      language="js"
      disabled={true}
      padding={0}
      rehypePlugins={[
        [rehypePrism, { ignoreMissing: true, showLineNumbers: true }],
      ]}
      style={{
        fontSize,
        backgroundColor,
      }}
    />
  );
};

export default CodeEditor;
