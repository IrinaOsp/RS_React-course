import styles from './LoadingSpinner.module.css';

export default function LoadingSpinner() {
  return (
    <div className={styles.spinnerContainer} data-testid="loading-spinner">
      <div className={styles.loadingSpinner}></div>
    </div>
  );
}
