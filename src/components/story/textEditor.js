import React, { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function TextEditor({description,setDescription}) {
  // state = {
  //   editorState: EditorState.createEmpty(),
  // };
  // const [description,setDescription] = useState(text)
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    setDescription((draftToHtml(convertToRaw(editorState.getCurrentContent()))))
    console.log((draftToHtml(convertToRaw(editorState.getCurrentContent()))))

    console.log((convertToRaw(editorState.getCurrentContent())))
  };
  const style = {
    editor: {
      paddingTop: "6px",
      paddingRight: "5px",
      paddingBottom: "0",
      paddingLeft: "5px",
      borderRadius: "2px",
      border: "1px solid #F1F1F1",
      background: "white",
      marginBottom: "5px",
      maxHeigth: "20em",
      height:"300px"
    },
  };
  // const { editorState } = this.state;
  return (
    <div>
      <Editor
        editorStyle={style.editor}
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={onEditorStateChange}
      />
      {/* <textarea
        disabled
        value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
      /> */}
    </div>
  );
}
