import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const DeleteConfirmation = ({ show, handleClose, confirmDelete, id, title, bodyDescription, buttonName }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{bodyDescription}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
          </Button>
        <Button variant="primary" onClick={() => confirmDelete(id)}>
          {buttonName}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmation;