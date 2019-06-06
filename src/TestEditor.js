import React from 'react';
import {
	// Editor,
    EditorState,
    SelectionState,
    RichUtils,
    convertToRaw
} from "draft-js";
import Editor from "draft-js-plugins-editor";
import createHighlightPlugin from "./plugins/highlightPlugin";
import addLinkPlugin from './plugins/addLinkPlugin'
import BlockStyleToolbar, { getBlockStyle } from './blockstyles/BlockStyleToolbar'

const highlightPlugin = createHighlightPlugin();



export default class TestEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => {
        // debugger
        this.setState({editorState});
    }
    // this.setEditor = (editor) => {
    //   this.editor = editor;
    // };
    // this.focusEditor = () => {
    //   if (this.editor) {
    //     this.editor.focus();
    //   }
    // };
    this.plugins = [
        highlightPlugin,
        addLinkPlugin
       ];

    //    this.textInput = React.createRef();
  }


  moveSelectionToEnd = (editorState) => {
    const content = editorState.getCurrentContent();
    const blockMap = content.getBlockMap();
  
    const key = blockMap.last().getKey();
    const length = blockMap.last().getLength();

  
    const selection = new SelectionState({
      anchorKey: key,
      anchorOffset: length,
      focusKey: key,
      focusOffset: length,
    });
  
    return EditorState.acceptSelection(editorState, selection);
  };


  toggleBlockType = (blockType) => {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
    };


  onChange = editorState => {
    //   debugger;
    this.setState({
        editorState
    });
};

handleKeyCommand = command => {
    // debugger;
    const newState = RichUtils.handleKeyCommand(
        this.state.editorState,
        command
    );
    if (newState) {
        this.onChange(newState);
        return "handled";
    }
    return "not-handled";
};

onAddLink = () => {
    const editorState = this.state.editorState;
    const selection = editorState.getSelection();
    const link = window.prompt("Paste the link -");
    if (!link) {
        this.onChange(RichUtils.toggleLink(editorState, selection, null));
        return "handled";
    }
    const content = editorState.getCurrentContent();
    const contentWithEntity = content.createEntity("LINK", "MUTABLE", {
        url: link
    });
    const newEditorState = EditorState.push(
        editorState,
        contentWithEntity,
        "create-entity"
    );
    const entityKey = contentWithEntity.getLastCreatedEntityKey();
    this.onChange(RichUtils.toggleLink(newEditorState, selection, entityKey));
    return "handled";
};


setSelection = () => {
  const rawJson = convertToRaw(this.state.editorState.getCurrentContent())
  const { editorState } = this.state;
  const selectionState = editorState.getSelection()
    const newSelection = selectionState.merge({
      hasFocus: true
    })
    // debugger;
    return EditorState.forceSelection(editorState, newSelection);
}




toggleBtnInlineStyle = (e) => {
    // const rawJson = convertToRaw(this.state.editorState.getCurrentContent())
    // const { editorState } = this.state;
    // const selectionState = editorState.getSelection()
    //   const newSelection = selectionState.merge({
    //     hasFocus: true
    //   })
      e.stopPropagation()
      debugger;
      const newEditorState = this.setSelection();

      if (!!e.currentTarget.dataset.name) {
          return this.onChange(newEditorState)
      }
      this.onChange(
        RichUtils.toggleInlineStyle(newEditorState, e.currentTarget.dataset.inline)
    );
}


  

  render() {
    //   debugger;
    return (
      <div style={styles.editor} className="editor-wrapper" data-name="editor-wrapper" onClick={this.toggleBtnInlineStyle}>
       <BlockStyleToolbar
    editorState={this.state.editorState}
    onToggle={this.toggleBlockType}
    />
    	        <button className="underline" data-inline="UNDERLINE" onClick={this.toggleBtnInlineStyle}>
					U
				</button>
				<button className="bold" data-inline="BOLD" onClick={this.toggleBtnInlineStyle}>
					<b>B</b>
				</button>
				<button className="italic" data-inline="ITALIC" onClick={this.toggleBtnInlineStyle}>
					<em>I</em>
				</button>
				<button className="strikethrough" data-inline="STRIKETHROUGH" onClick={this.toggleBtnInlineStyle}>
					abc
				</button>
				<button className="highlight" data-inline="HIGHLIGHT" onClick={this.toggleBtnInlineStyle}>
					<span style={{ background: "yellow", padding: "0.3em" }}>H</span>
				</button>
                <button id="link_url" onClick={this.onAddLink} className="add-link">
					<i className="material-icons">attach_file</i>
				</button>
        <Editor
          ref="editor"
          editorState={this.state.editorState}
          blockStyleFn={getBlockStyle}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
          plugins={this.plugins}
          placeholder="Hello"
        />
      </div>
    );
  }
}

const styles = {
  editor: {
    border: '1px solid gray',
   minHeight: 'calc(100vh - 65px)',
   overflow: 'hidden'
  }
};
