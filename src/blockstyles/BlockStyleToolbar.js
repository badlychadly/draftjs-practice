import React from "react";
import { EditorState, Editor, RichUtils, AtomicBlockUtils } from "draft-js";
import BlockStyleButton from "./BlockStyleButton";
import HeaderStyleDropdown from "./HeaderStyleDropdown";
import InlineStyleToolbar from '../InlineStyleToolbar'

export const BLOCK_TYPES = [
	{ label: " “ ” ", style: "blockquote" },
	{ label: "UL", style: "unordered-list-item" },
	{ label: "OL", style: "ordered-list-item" },
	{ label: "{ }", style: "code-block" }
];

export const HEADER_TYPES = [
	{ label: "(None)", style: "unstyled" },
	{ label: "H1", style: "header-one" },
	{ label: "H2", style: "header-two" },
	{ label: "H3", style: "header-three" }
];

export function getBlockStyle(block) {
	switch (block.getType()) {
		case "blockquote":
			return "RichEditor-blockquote";
		default:
			return null;
	}
}

class BlockStyleToolbar extends React.Component {

	state = {
		hidden: true
	}

	handleMouseEnter = e => {
		// debugger;
		this.setState({hidden: false})
	}

	handleMouseLeave = e => {
		// debugger;
		this.setState({hidden: true})
	}

	render() {
		const { editorState } = this.props;
		const selection = editorState.getSelection();
		const blockType = editorState
			.getCurrentContent()
			.getBlockForKey(selection.getStartKey())
			.getType();

		return (
			<div className="RichEditor-controls menu-inline-wrapper">
				<div className="menu-inline-inner">
				{/* <HeaderStyleDropdown
					headerOptions={HEADER_TYPES}
					active={blockType}
					onToggle={this.props.onToggle}
				/> */}

				<div onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} style={{display: "inline-block"}}>
				<button className="menu-inline-btn">H</button>
				
					<div className="header-dropdown" hidden={this.state.hidden} style={{position: "absolute", left: "2px", top: "auto"}}>
					{HEADER_TYPES.map(heading => {
						// console.log(heading.value)
						return <button className="header-btn" data-block={heading.style} onClick={this.props.onToggle} key={heading.label}>{heading.label}</button>
					})}
				</div>

				
				</div>


				{BLOCK_TYPES.map(type => {
					return (
						<BlockStyleButton
							active={type.style === blockType}
							label={type.label}
							onToggle={this.props.onToggle}
							style={type.style}
							key={type.label}
							type={type}
						/>
					);
				})}

				<InlineStyleToolbar toggle={this.props.onToggle} onAddLink={this.props.onAddLink} />

				</div>
				{/* { this.state.show &&
					<div className="header-dropdown" onMouseLeave={this.handleMouseOut}>
					{HEADER_TYPES.map(heading => {
						// console.log(heading.value)
						return <button className="header-btn" data-block={heading.style} onClick={this.props.onToggle} key={heading.label}>{heading.label}</button>
					})}
				</div>

				} */}
			</div>
		);
	}
}

export default BlockStyleToolbar;
