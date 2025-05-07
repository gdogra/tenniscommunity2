function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const navigate = ReactRouterDOM.useNavigate();
  const { login, loginWithGoogle } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError('Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError('');
      setLoading(true);
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (err) {
      console.error('Google login error:', err);
      setError('Failed to sign in with Google.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md"
      data-id="h4y506vlq"
      data-path="components/auth/Login.js"
    >
      <h2
        className="text-2xl font-bold text-center text-gray-800 mb-6"
        data-id="ofldo672p"
        data-path="components/auth/Login.js"
      >
        Login to Tennis Community
      </h2>

      {error && (
        <div
          className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-md"
          data-id="9ztxagsja"
          data-path="components/auth/Login.js"
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} data-id="z3llraz3l" data-path="components/auth/Login.js">
        <Input
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="your@email.com"
          icon={
            <i
              className="fas fa-envelope text-gray-400"
              data-id="0b6q3y8k4"
              data-path="components/auth/Login.js"
            ></i>
          }
        />

        <Input
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Your password"
          icon={
            <i
              className="fas fa-lock text-gray-400"
              data-id="hapdq53ov"
              data-path="components/auth/Login.js"
            ></i>
          }
        />

        <div
          className="flex justify-between items-center mb-6"
          data-id="nfczxtmuv"
          data-path="components/auth/Login.js"
        >
          <div className="text-sm" data-id="h4vpn2bik" data-path="components/auth/Login.js">
            <a
              href="#"
              className="text-primary hover:text-primary/80"
              data-id="61qh26vks"
              data-path="components/auth/Login.js"
            >
              Forgot password?
            </a>
          </div>
        </div>

        <Button type="submit" fullWidth disabled={loading}>
          {loading ? (
            <>
              <LoadingSpinner size="sm" color="white" className="mr-2" /> Signing in...
            </>
          ) : (
            'Sign in'
          )}
        </Button>
      </form>

      <div className="mt-4" data-id="28yieudr3" data-path="components/auth/Login.js">
        <div
          className="relative flex items-center justify-center my-4"
          data-id="1e821r7qb"
          data-path="components/auth/Login.js"
        >
          <div
            className="border-t border-gray-300 absolute w-full"
            data-id="plau8ddl6"
            data-path="components/auth/Login.js"
          ></div>
          <div
            className="text-sm bg-white px-3 relative text-gray-500"
            data-id="k96hhx6jq"
            data-path="components/auth/Login.js"
          >
            Or continue with
          </div>
        </div>

        <Button
          variant="outline"
          fullWidth
          onClick={handleGoogleLogin}
          disabled={loading}
          icon={
            <i
              className="fab fa-google text-red-500"
              data-id="vga2a3unp"
              data-path="components/auth/Login.js"
            ></i>
          }
        >
          Sign in with Google
        </Button>
      </div>

      <div className="text-center mt-6" data-id="b74xodbcy" data-path="components/auth/Login.js">
        <p
          className="text-sm text-gray-600"
          data-id="y6r1i1pvs"
          data-path="components/auth/Login.js"
        >
          Don't have an account?{' '}
          <ReactRouterDOM.Link to="/register" className="text-primary font-medium">
            Register now
          </ReactRouterDOM.Link>
        </p>
      </div>
    </div>
  );
}
