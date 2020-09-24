/* eslint-disable react/prop-types */
import React from "react";
import { compose, withHandlers, withState, withPropsOnChange } from "recompose";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import { FormFeedback, FormText } from "reactstrap";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const RenderTextEditor = ({
  input,
  meta: { touched, error, warning },
  editorState,...custom,
  onEditorStateChange
}) => (
  <div className="WysiwygEditor">
    {editorState && (
      <Editor
        {...(touched ? { valid: error } : {})}
        {...input}
        {...custom}
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        editorClassName="editor"
        toolbarClassName="toolbar"
        toolbar={{
          options: [
            "inline",
            "blockType",
            "fontSize",
            "list",
            "textAlign",
            "link",
            "history"
          ]
        }}
        validate={custom.validate}
      />
    )}
    {error && <FormFeedback>{error}</FormFeedback>}
    {!error && warning && <FormText>{warning}</FormText>}
  </div>
);

export default compose(
  withState("editorState", "setEditorState", EditorState.createEmpty()),
  withPropsOnChange(
    ["input"],
    ({ input: { value }, meta: { dirty }, setEditorState }) => {
      if (dirty) {
        return;
      }
      if (!value) {
        return;
      }
      const contentBlock = htmlToDraft(value);
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
    }
  ),
  withHandlers({
    onEditorStateChange: ({
      input: { onChange },
      setEditorState
    }) => editorState => {
      setEditorState(editorState);
      const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
      onChange(html);
    }
  })
)(RenderTextEditor);
