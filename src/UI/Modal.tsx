import React from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.scss";

// It is used to seperate the modal content with the rest of the page.
const Backdrop: React.FC<{ onHideModal?: () => void }> = (props) => (
  <div className={styles.backdrop} onClick={props.onHideModal}></div>
);

// The actual modal content will be placed here.
const ModalOverlay: React.FC<{ children: JSX.Element }> = (props) => (
  <div className={styles.modal}>{props.children}</div>
);

const Modal: React.FC<{ onHideModal?: () => void; children: JSX.Element }> = (
  props
) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onHideModal={props.onHideModal} />,
        document.getElementById("backdrop")!
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        document.getElementById("backdrop")!
      )}
    </React.Fragment>
  );
};

export default Modal;
