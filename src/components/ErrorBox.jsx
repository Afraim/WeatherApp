export default function ErrorBox({ message }) {
  return (
    <div className="bg-red-600/30 border border-red-500/40 p-4 rounded-md text-sm">
      <strong className="block">Error</strong>
      <div>{message}</div>
    </div>
  );
}
