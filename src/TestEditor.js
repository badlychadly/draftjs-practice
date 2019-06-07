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




navStyleToggle = (e) => {

      e.stopPropagation()
      const newEditorState = this.setSelection();
      // debugger;

      if (!!e.currentTarget.dataset.name) {
          return this.onChange(newEditorState)
      }
      else if (!!e.currentTarget.dataset.block) {
        this.onChange(RichUtils.toggleBlockType(newEditorState, e.currentTarget.dataset.block))
      }
      else {
        this.onChange(
          RichUtils.toggleInlineStyle(newEditorState, e.currentTarget.dataset.inline)
      );

      }
}


  

  render() {
    return (
      <div style={styles.editor} className="editor-wrapper" data-name="editor-wrapper" onClick={this.navStyleToggle}>
       <BlockStyleToolbar
    editorState={this.state.editorState}
    onToggle={this.navStyleToggle}
    />

    <div className="menu-inline-wrapper">
    <div className="menu-inline-inner">
        <button className="underline" data-inline="UNDERLINE" onClick={this.navStyleToggle}>
        U
      </button>
      <button className="bold" data-inline="BOLD" onClick={this.navStyleToggle}>
        <b>B</b>
      </button>
      <button className="italic" data-inline="ITALIC" onClick={this.navStyleToggle}>
        <em>I</em>
      </button>
      <button className="strikethrough" data-inline="STRIKETHROUGH" onClick={this.navStyleToggle}>
        abc
      </button>
      <button className="highlight" data-inline="HIGHLIGHT" onClick={this.navStyleToggle}>
        <span style={{ background: "yellow", padding: "0.3em" }}>H</span>
      </button>
              <button id="link_url" onClick={this.onAddLink} className="add-link">
        <i className="material-icons">attach_file</i>
      </button>

    </div>

    </div>
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
