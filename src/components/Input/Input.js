import React, { Component } from 'react';


class Input extends Component {

  constructor(props) {
    super(props)

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddVariable = this.handleAddVariable.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleInputChange(event, keyCode = null) {
    // propagate what was updated and the new value
    let value = event.target.value;
    const name = event.target.name;

    const inputTextArea = document.getElementById("sqlInput");

    // add indentation for tabbing
    if (name === "sqlInput" && keyCode === 9) {
      const start = inputTextArea.selectionStart;
      const end = inputTextArea.selectionEnd;

      value = value.slice(0, start) + "\t" + value.slice(end);

      inputTextArea.selectionStart = inputTextArea.selectionEnd = start + 1;
    }

    // blur sqlInput on ESC
    if (keyCode === 27) {
      inputTextArea.blur();
    }

    this.props.onValueChanged(name, value);
  }

  handleAddVariable() {
    let id = "";

    // if a user selects text, add variable will consider the text selected
    const currSelection = window.getSelection().toString();

    // if selected text is a valid id, strip the first & last and use it.
    if (currSelection.startsWith("$") && currSelection.endsWith("$")) {
      id = currSelection.slice(1, -1);
    }

    this.props.onVariableAdded(id);
  }

  handleKeyDown(event) {
    // indent for tab, escape for esc
    if (event.keyCode === 9 || event.keyCode === 27) {
      event.preventDefault();
      this.handleInputChange(event, event.keyCode);
    }
  }

  render() {
    const title = this.props.title;
    const author = this.props.author;
    const description = this.props.description;
    const snippetType = this.props.snippetType;
    const sqlInput = this.props.sqlInput;

    return (
      <div className="input-container">
        <div className="input-form">
            <input 
              className="input"
              type="text"
              name="title"
              value={title}
              onChange={this.handleInputChange}
              placeholder="Title" />

            <input 
              className="input"
              type="text"
              name="author"
              value={author}
              onChange={this.handleInputChange}
              placeholder="Author" />

            <input 
              className="input"
              type="text"
              name="description"
              value={description}
              onChange={this.handleInputChange}
              placeholder="Description" />

            <select className="input" name="snippetType" value={snippetType} onChange={this.handleInputChange}>
              <option disabled value="default">Snippet Type</option>
              <option value="Expansion">Expansion</option>
              <option value="SurroundsWith">Surrounds With</option>
            </select>
        </div>
        <div className="input-main">
          <textarea 
            className="input main-field"
            id="sqlInput"
            name="sqlInput"
            value={sqlInput}
            onChange={this.handleInputChange}
            onKeyDown={this.handleKeyDown}
            />
            <button className="btn-variable" type="button" onClick={this.handleAddVariable}>Add Variable</button>
        </div>
      </div>
    );
  }

}

export default Input;
