import './LoadingSpinner.css';

export default function LoadingSpinner() {
  return (
    <div className="spinner-container" data-testid="loading-spinner">
      <div className="loading-spinner"></div>
    </div>
  );
}
