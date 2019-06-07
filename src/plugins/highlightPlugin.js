import { RichUtils, getDefaultKeyBinding, KeyBindingUtil} from 'draft-js'
const {hasCommandModifier} = KeyBindingUtil;

export default () => {
	return {
		customStyleMap: {
			HIGHLIGHT: {
				background: "#fffe0d"
			}
		},
		keyBindingFn: e => {
			// console.trace(KeyBindingUtil)
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