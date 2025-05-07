export default function Unauthorized() {
  return (
    <div className="p-6 max-w-md mx-auto text-center">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
      <p>You don’t have permission to view this page.</p>
    </div>
  );
}
