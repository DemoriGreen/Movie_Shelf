export default function LoadingSpinner({ label = "Loading movies..." }) {
  return <div className="loading-state" role="status" aria-live="polite">
    <span className="spinner" aria-hidden="true" /><p>{label}</p>
  </div>;
}