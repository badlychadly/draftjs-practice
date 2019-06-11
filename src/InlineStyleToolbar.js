import React from 'react'


export default function InlineStyleToolbar(props) {

    return (
        <div className="menu-inline-wrapper">
      <div className="menu-inline-inner">
        <div>
          <button className="menu-inline-btn underline" data-inline="UNDERLINE" onClick={props.toggle}>
          U
        </button>
        <button className="menu-inline-btn bold" data-inline="BOLD" onClick={props.toggle}>
          <b>B</b>
        </button>
        <button className="menu-inline-btn italic" data-inline="ITALIC" onClick={props.toggle}>
          <em>I</em>
        </button>
        <button className="menu-inline-btn strikethrough" data-inline="STRIKETHROUGH" onClick={props.toggle}>
          abc
        </button>
        <button className="menu-inline-btn highlight" data-inline="HIGHLIGHT" onClick={props.toggle}>
          <span style={{ background: "yellow", padding: "0.3em" }}>H</span>
        </button>
                <button id="link_url" onClick={props.onAddLink} className="add-link">
          <i className="material-icons">attach_file</i>
        </button>
          
        </div>
      </div>

    </div>
    )
} 