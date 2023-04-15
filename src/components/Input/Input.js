import React, { Component } from 'react';


class Input extends Component {

  constructor(props) {
    super(props)

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddVariable = this.handleAddVariable.bind(this);
  }

  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.props.onValueChanged(name, value);
  }

  handleAddVariable() {
    this.props.onVariableAdded();
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
            />
            <button className="btn-variable" type="button" onClick={this.handleAddVariable}>Add Variable</button>
        </div>
      </div>
    );
  }

}

export default Input;
