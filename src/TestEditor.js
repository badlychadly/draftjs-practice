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

       this.textInput = React.createRef();
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

onUnderlineClick = () => {
    const editorState = this.state.editorState;
    const selection = editorState.getSelection()
    this.onChange(
        RichUtils.toggleInlineStyle(editorState, "UNDERLINE")
    );
};

onBoldClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"));
};

onItalicClick = () => {
    this.onChange(
        RichUtils.toggleInlineStyle(this.state.editorState, "ITALIC")
    );
};

onStrikeThroughClick = () => {
    this.onChange(
        RichUtils.toggleInlineStyle(this.state.editorState, "STRIKETHROUGH")
    );
};

onHighlight = (e) => {
    e.preventDefault()
    // debugger;
    const rawJson = convertToRaw(this.state.editorState.getCurrentContent())
    const { editorState } = this.state;
    const selectionState = editorState.getSelection()
      const newSelection = selectionState.merge({
        hasFocus: true
      })

      const newEditorState = EditorState.forceSelection(editorState, newSelection);
      debugger;
    this.onChange(
        RichUtils.toggleInlineStyle(newEditorState, "HIGHLIGHT")
    );
    // debugger;
};


// myClick = (e) => {
//     let {editorState} = this.state
    // debugger;
    // this.onChange(
    //     this.moveSelectionToEnd(this.state.editorState)
    // )
//     e.preventDefault()
// }


  

  render() {
    //   debugger;
    return (
      <div style={styles.editor} onClick={this.myClick}>
       <BlockStyleToolbar
    editorState={this.state.editorState}
    onToggle={this.toggleBlockType}
    />
    	        <button className="underline" onClick={this.onUnderlineClick}>
					U
				</button>
				<button className="bold" onClick={this.onBoldClick}>
					<b>B</b>
				</button>
				<button className="italic" onClick={this.onItalicClick}>
					<em>I</em>
				</button>
				<button className="strikethrough" onClick={this.onStrikeThroughClick}>
					abc
				</button>
				<button className="highlight" onClick={this.onHighlight}>
					<span style={{ background: "yellow", padding: "0.3em" }}>H</span>
				</button>
                <button id="link_url" onClick={this.onAddLink} className="add-link">
					<i className="material-icons">attach_file</i>
				</button>
        <Editor
          ref={this.textInput}
          editorState={this.state.editorState}
          blockStyleFn={getBlockStyle}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
          plugins={this.plugins}
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
