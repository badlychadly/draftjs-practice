import React from 'react';
import {
	// Editor,
    EditorState,
    SelectionState,
    ContentState,
    RichUtils,
    convertToRaw,
    convertFromRaw,
    convertFromHTML,
    Modifier
} from "draft-js";
import Editor from "draft-js-plugins-editor";
import createHighlightPlugin from "./plugins/highlightPlugin";
import addLinkPlugin from './plugins/addLinkPlugin'
import BlockStyleToolbar, { getBlockStyle } from './blockstyles/BlockStyleToolbar'
import InlineStyleToolbar from './InlineStyleToolbar'

const highlightPlugin = createHighlightPlugin();

const myMap = {
  "entityMap": {},
  "blocks": [
      {
          "key": "5h45l",
          "text": "",
          "type": "header-one",
          "depth": 0,
          "entityRanges": [],
          "data": {}
      }
  ]
}



export default class TestEditor extends React.Component {
  constructor(props) {
    super(props);
    const title = `<h1 class="public-DraftEditorPlaceholder-root">Hello</h1>`
    const cState = convertFromRaw(myMap)
    const blocks = convertFromHTML(title)
    // debugger;
    this.state = {editorState: EditorState.createEmpty()}
    // this.state = {editorState: EditorState.createWithContent(cState)};
    this.onChange = (editorState) => {
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

componentDidMount() {
  const contentState = this.state.editorState.getCurrentContent();
  const selectionState = this.state.editorState.getSelection();
  const cState = convertFromRaw(myMap)
  this.setState({
    editorState: EditorState.push(
      this.state.editorState,
      cState
    )
  })
  debugger;
  const firstBlock = this.state.editorState.getCurrentContent().getFirstBlock()
  if (firstBlock.getLength()) {
    
  }
}




navStyleToggle = (e) => {

      e.stopPropagation()
      const newEditorState = this.setSelection();
      const m = Modifier
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
    onAddLink={this.onAddLink}
    />

    
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
