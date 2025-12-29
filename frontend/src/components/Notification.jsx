export default function Notification({
  type = "info",
  message,
  onClose,
}) {
  if (!message) return null;

  return (
    <div className={`notification is-${type}`}>
      {onClose && (
        <button
          className="delete"
          onClick={onClose}
        />
      )}
      {message}
    </div>
  );
}
