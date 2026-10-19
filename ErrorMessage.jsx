export default function ErrorMessage({ message, onRetry }) {
  return <div className="message-state error-state" role="alert">
    <span className="message-icon">!</span>
    <h2>Something went wrong</h2>
    <p>{message || "We couldn't load movies right now."}</p>
    {onRetry && <button className="button button-primary" onClick={onRetry}>Try again</button>}
  </div>;
}