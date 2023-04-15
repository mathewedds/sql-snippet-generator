import React, { Component }  from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class EditVariables extends Component {

  constructor(props) {
    super(props)
    
    this.state = {
      show: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({
      show: false
    });
  };

  handleShow() {
    this.setState({
      show: true
    });
  };

  handleKeyDown(event) {
    if (event.key === "Enter" || event.key === "Escape")
      event.target.blur();
  }

  handleChange(event, id) {
    const propChanged = event.target.name;
    const value = event.target.value;

    this.props.onVariableChanged(id, propChanged, value);
  }

  handleDelete(id) {
    this.props.onVariableDeleted(id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.variables.length > 0 && this.props.variables.length <= 0) {
      this.handleClose();
    }
  }

  render() {
    const getVariableRows = this.props.variables.map(variable => (
      <tr key={variable.order}>
        <td>
          <input 
          type="text"
          name="id"
          className="inline-input"
          value={variable.id} 
          onKeyDown={this.handleKeyDown}
          onChange={event => this.handleChange(event, variable.id)}
          />
        </td>
        <td>
          <input 
            type="text"
            name="default"
            className="inline-input"
            value={variable.default}
            onKeyDown={this.handleKeyDown}
            onChange={event => this.handleChange(event, variable.id)} />
        </td>
        <td>
          <Button variant="danger btn-delete" onClick={() => this.handleDelete(variable.id)}>
            <FontAwesomeIcon icon="trash" />
          </Button>
        </td>
      </tr>
    ));

    return (
      <>
        <button 
        className="button full-width" 
        type="button" 
        disabled={this.props.variables.length === 0} 
        onClick={this.handleShow}>
          Edit Variables
        </button>
  
        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          backdrop="static"
          keyboard={false}
          size="lg"
          className="main-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Variables</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Default Value</th>
              </tr>
            </thead>
            <tbody>
              {getVariableRows}
            </tbody>
          </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default EditVariables;
