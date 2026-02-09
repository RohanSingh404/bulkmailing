import React, { useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import "./editor.css";

function Editor({ data }) {
  const [code, setCode] = useState("");

  const handleChange = (d) => {
    data(d);
    setCode(d);
  };

  return (
    <div>
      <div className='code-editor'>
        <CodeEditor
          value={code}
          language='html'
          placeholder='Please enter html code.'
          onChange={(evn) => handleChange(evn.target.value)}
          padding={15}
          style={{
            fontSize: 16,
            backgroundColor: "#ffffff",
            fontFamily:
              "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
            color: '#000000',
          }}
        />
      </div>
    </div>
  );
}

export default Editor;
