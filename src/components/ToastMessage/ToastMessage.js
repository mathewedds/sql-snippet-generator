import React, { Component } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

class ToastMessage extends Component {

  constructor(props) {
    super(props)

    this.handleToastClose = this.handleToastClose.bind(this);
  }

  handleToastClose(id) {
    this.props.onToastClosed(id);
  }

  render() {
    return (
      <>
        <ToastContainer className="toast-container" position={'top-end'}>
          {this.props.toasts.map(toast => (
            <Toast key={toast.id} onClose={() => this.handleToastClose(toast.id)} bg={'success'} autohide>
              <Toast.Body>{toast.message}</Toast.Body>
            </Toast>
          ))}
        </ToastContainer>
      </>
    )
  }

}

export default ToastMessage;
