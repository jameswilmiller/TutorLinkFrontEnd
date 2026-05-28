export default function ErrorState({
  title = "Something went wrong",
  message = "Please try again.",
  onRetry,
}) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
      <h2 className="text-lg font-semibold text-red-900">{title}</h2>
      <p className="mt-2 text-sm text-red-700">{message}</p>

      {onRetry && (
        <Button className="mt-4" variant="danger" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  )
}