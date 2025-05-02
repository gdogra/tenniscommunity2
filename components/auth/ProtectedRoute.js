function ProtectedRoute({ children, requireAdmin = false }) {
  const { currentUser, userProfile, loading } = useAuth();
  const navigate = ReactRouterDOM.useNavigate();
  const location = ReactRouterDOM.useLocation();

  React.useEffect(() => {
    if (!loading) {
      if (!currentUser) {
        // Redirect to login if not logged in
        navigate('/login', { state: { from: location.pathname } });
      } else if (requireAdmin && !userProfile?.isAdmin) {
        // Redirect to dashboard if admin access is required but user is not admin
        navigate('/dashboard');
      }
    }
  }, [currentUser, userProfile, loading, navigate, location, requireAdmin]);

  // Show loading spinner while authentication state is being determined
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]" data-id="4g6iev2eb" data-path="components/auth/ProtectedRoute.js">
        <LoadingSpinner size="lg" />
      </div>);

  }

  // If currentUser exists (and user is admin if required), render children
  if (currentUser && (!requireAdmin || requireAdmin && userProfile?.isAdmin)) {
    return children;
  }

  // Return null to prevent flash of content while redirecting
  return null;
}