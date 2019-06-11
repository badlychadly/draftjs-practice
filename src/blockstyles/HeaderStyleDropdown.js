import React from "react";

class HeaderStyleDropdown extends React.Component {
	// onToggle = event => {
	// 	let value = event.target.value;
	// 	debugger;
	// 	this.props.onToggle(value);
	// };

	state = {show: false}

	render() {
		// debugger;
		return (
			<>
			<button className="menu-inline-btn">H</button>
			{/* <div >
				{this.props.headerOptions.map(heading => {
					// console.log(heading.value)
					return <button key={heading.label}>{heading.label}</button>
				})}
			</div> */}
			{/* <select autoFocus value={this.props.active} onChange={this.onToggle}>
				<option value="">Header Levels</option>
				{this.props.headerOptions.map(heading => {
					return <option key={heading.label} value={heading.style}>{heading.label}</option>;
				})}
			</select> */}
			</>
		);
	}
}

export default HeaderStyleDropdown;
