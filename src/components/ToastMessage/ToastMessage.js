import React from "react";
import { Toast } from "react-bootstrap";

function ToastMessage({ show, delay, closeToast, message, type }) {
  return (
    <Toast
      onClose={closeToast}
      show={show}
      delay={delay}
      autohide
      style={{
        position: "absolute",
        top: 20,
        width: "400px",
        zIndex: "99999",
        right: 40,
      }}
    >
      <Toast.Header className={{ fontSize: "20px" }}>
        <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
        <strong className="mr-auto text-danger">{type}</strong>
      </Toast.Header>
      <Toast.Body style={{ fontWeight: 600, fontSize: "18px" }}>{message}</Toast.Body>
    </Toast>
  );
}

export default ToastMessage;
