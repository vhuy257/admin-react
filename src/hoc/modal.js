import React, { Component } from 'react';
import {connect} from 'react-redux';

import {
  closeModal,
  closeModalConfirm
} from '../redux/actions/modalActions';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.closeModal    = this.closeModal.bind(this);
    this.confirmAction = this.confirmAction.bind(this);
  }

  closeModal() {
    this.props.dispatch(closeModal());
  }

  confirmAction() {
    this.props.dispatch(closeModalConfirm());
    this.props.dispatch(this.props.modal.confirmAction);
  }

  render() {
    return (
      <>
      <div className={`md-modal ${this.props.modal.type} ${this.props.modal.toggleShow ? "md-show" : ""}`}>
        <div className="md-content">
          <h3>{`${this.props.modal.type}!!`}</h3>
          <div>
            <p>{this.props.modal.msg}</p>
            {this.props.modal.confirmDelete && (
              <>
                <p>Are you sure you want to delete this?</p>
                <button className="md-confirm" onClick={this.confirmAction}>Yes!!</button>
              </>
            )}
            <button className="md-close" onClick={this.closeModal}>Close me</button>
          </div>
         </div>
      </div>
      </>
    )
  }
}

const mapStatetoProps = state => ({
  modal: state.modal
});

export default connect(mapStatetoProps)(Modal);
