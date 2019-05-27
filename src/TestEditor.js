import React from 'react';
import {
	// Editor,
	EditorState,
	RichUtils
} from "draft-js";
import Editor from "draft-js-plugins-editor";
import createHighlightPlugin from "./plugins/highlightPlugin";

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
       ];

       this.textInput = React.createRef();
  }

  onChange = editorState => {
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

onUnderlineClick = () => {
    this.onChange(
        RichUtils.toggleInlineStyle(this.state.editorState, "UNDERLINE")
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

onHighlight = () => {
    this.onChange(
        RichUtils.toggleInlineStyle(this.state.editorState, "HIGHLIGHT")
    );
};

  

  render() {
      debugger;
    return (
      <div style={styles.editor} onClick={this.focusEditor}>
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
        <Editor
          ref={this.textInput}
          editorState={this.state.editorState}
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
    minHeight: '6em'
  }
};

// ReactDOM.render(
//   <TestEditor />,
//   document.getElementById('container')
// );