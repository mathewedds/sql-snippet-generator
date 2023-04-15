import React, { Component } from 'react';
import EditVariables from '../EditVariables/EditVariables';


class Output extends Component {

  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this);
    this.handleCopy = this.handleCopy.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleVariableChanged = this.handleVariableChanged.bind(this);
    this.handleVariableDeleted = this.handleVariableDeleted.bind(this);
  }

  handleClick() {
    const textarea = document.getElementById("sqlOutput");
    textarea.select();
  }

  handleCopy() {
    let textarea = document.getElementById("sqlOutput");
    textarea.select();
    navigator.clipboard.writeText(textarea.value);

    this.props.onSendToastMessage('Snippet copied');
  }

  handleSave() {
    const fileData = this.props.sqlOutput;

    const blob = new Blob([fileData], {type: "text/plain"});
    const url = URL.createObjectURL(blob);

    const title = this.props.title !== '' ? this.props.title : "generated-sql-snippet";

    const link = document.createElement("a");
    link.download = `${title}.snippet`;
    link.href = url;
    link.click();
  }

  handleVariableChanged(id, propChanged, value) {
    this.props.onVariableEdited(id, propChanged, value);
  }

  handleVariableDeleted(id) {
    this.props.onVariableDeleted(id);
  }

  render() {
    return (
      <div className="output-container">
      <div className="output-form">
        <EditVariables
          variables={this.props.variables}
          onVariableChanged={this.handleVariableChanged}
          onVariableDeleted={this.handleVariableDeleted} />
        <button className="button" type="button" onClick={this.handleCopy}>Copy Snippet</button>
        <button className="button" type="button" onClick={this.handleSave}>Save Snippet</button>
      </div>
      <div className="output-main">
        <textarea 
          className="input main-field"
          id="sqlOutput"
          readOnly
          value={this.props.sqlOutput}
          onClick={this.handleClick}
        />
      </div>
    </div>
    );
  }

}

export default Output;
