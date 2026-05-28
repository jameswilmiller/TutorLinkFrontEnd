export default function LoadingState({ message = "Loading..." }) {
  return (
    <div className="flex min-h-40 items-center justify-center">
      <p className="text-sm text-slate-500">{message}</p>
    </div>
  )
}