import { RichUtils, getDefaultKeyBinding, KeyBindingUtil} from 'draft-js'
const {hasCommandModifier} = KeyBindingUtil;

// background: "rgba(27,31,35,.05)",
// 				border-radius: "3px",
// 				font-size: "85%",
// 				margin: "0",
// 				padding: ".2em .4em"

export default () => {
	return {
		customStyleMap: {
			HIGHLIGHT: {
				background: "rgba(0,0,0,.05)",
				"border-radius": "3px",
				"font-size": "85%",
				margin: "0",
				padding: ".2em .4em"
			}
		},
		keyBindingFn: e => {
			if (hasCommandModifier(e) && e.key === "h") {
				return "highlight";
			}
			return getDefaultKeyBinding(e)
		},
		handleKeyCommand: (command, editorState, { setEditorState }) => {
			if (command === "highlight") {
				setEditorState(RichUtils.toggleInlineStyle(editorState, "HIGHLIGHT"));
				return true;
			}
		}
	};
};