import styles from "./LoadingSpinner.module.scss";
import Modal from "./Modal";

const LoadingSpinner = () => {
  return (
    <Modal>
      <div className={styles["spinner-outer"]}>
        <div className={styles["spinner-inner"]}></div>
      </div>
    </Modal>
  );
};

export default LoadingSpinner;
