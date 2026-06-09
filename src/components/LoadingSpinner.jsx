export default function LoadingSpinner() {
  return (
    <div className="flex justify-center py-20">
      <div className="w-10 h-10 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
    </div>
  );
}