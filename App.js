function App() {
  const { Routes, Route, Navigate } = ReactRouterDOM;
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen" data-id="isxnvhbv0" data-path="App.js">
        <LoadingSpinner size="lg" />
      </div>);

  }

  return (
    <Layout>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={
        currentUser ? <Navigate to="/dashboard" /> : <Login />
        } />
        <Route path="/register" element={
        currentUser ? <Navigate to="/dashboard" /> : <Register />
        } />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={
        <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
        <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/matches" element={
        <ProtectedRoute>
            <Matches />
          </ProtectedRoute>
        } />
        
        {/* Admin Routes */}
        <Route path="/admin" element={
        <ProtectedRoute requireAdmin={true}>
            <Admin />
          </ProtectedRoute>
        } />
        
        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>);

}