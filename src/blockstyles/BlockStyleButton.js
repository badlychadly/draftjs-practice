import React from "react";

class BlockStyleButton extends React.Component {
	

	render() {
		// debugger;
		let className = "RichEditor-styleButton";
		if (this.props.active) {
			className += " RichEditor-activeButton";
		}

		return (
			<button data-block={this.props.style} className={`${className} menu-inline-btn`} onClick={this.props.onToggle}>
				{this.props.label}
			</button>
		);
	}
}

export default BlockStyleButton;
