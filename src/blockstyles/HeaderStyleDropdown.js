import React from "react";

class HeaderStyleDropdown extends React.Component {
	onToggle = event => {
		let value = event.target.value;
		debugger;
		this.props.onToggle(value);
	};

	render() {
		return (
			<select autoFocus value={this.props.active} onChange={this.onToggle}>
				<option value="">Header Levels</option>
				{this.props.headerOptions.map(heading => {
					return <option key={heading.label} value={heading.style}>{heading.label}</option>;
				})}
			</select>
		);
	}
}

export default HeaderStyleDropdown;
