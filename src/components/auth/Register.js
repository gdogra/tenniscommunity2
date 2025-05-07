function Register() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [displayName, setDisplayName] = React.useState('');
  const [skillLevel, setSkillLevel] = React.useState('beginner');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const navigate = ReactRouterDOM.useNavigate();
  const { register, loginWithGoogle } = useAuth();

  const validatePassword = () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword()) return;

    try {
      setError('');
      setLoading(true);
      await register(email, password, displayName, skillLevel);
      navigate('/dashboard');
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'Failed to create an account.');
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
      data-id="ukzcm6gwv"
      data-path="components/auth/Register.js"
    >
      <h2
        className="text-2xl font-bold text-center text-gray-800 mb-6"
        data-id="ku2oyct61"
        data-path="components/auth/Register.js"
      >
        Join Tennis Community
      </h2>

      {error && (
        <div
          className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-md"
          data-id="yi9qelw2s"
          data-path="components/auth/Register.js"
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} data-id="qwgw0fye5" data-path="components/auth/Register.js">
        <Input
          id="displayName"
          label="Full Name"
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
          placeholder="John Doe"
          icon={
            <i
              className="fas fa-user text-gray-400"
              data-id="nqdvgftk8"
              data-path="components/auth/Register.js"
            ></i>
          }
        />

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
              data-id="4s06v8cyv"
              data-path="components/auth/Register.js"
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
          placeholder="Minimum 6 characters"
          icon={
            <i
              className="fas fa-lock text-gray-400"
              data-id="4m02ze1w1"
              data-path="components/auth/Register.js"
            ></i>
          }
          helpText="Password must be at least 6 characters"
        />

        <Input
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          placeholder="Confirm your password"
          icon={
            <i
              className="fas fa-lock text-gray-400"
              data-id="yln1s41tw"
              data-path="components/auth/Register.js"
            ></i>
          }
        />

        <SkillSelector value={skillLevel} onChange={setSkillLevel} required />

        <Button type="submit" fullWidth disabled={loading}>
          {loading ? (
            <>
              <LoadingSpinner size="sm" color="white" className="mr-2" /> Creating account...
            </>
          ) : (
            'Create Account'
          )}
        </Button>
      </form>

      <div className="mt-4" data-id="uw9vgbl89" data-path="components/auth/Register.js">
        <div
          className="relative flex items-center justify-center my-4"
          data-id="oucj0lht7"
          data-path="components/auth/Register.js"
        >
          <div
            className="border-t border-gray-300 absolute w-full"
            data-id="alec4j4pn"
            data-path="components/auth/Register.js"
          ></div>
          <div
            className="text-sm bg-white px-3 relative text-gray-500"
            data-id="2amf5mgua"
            data-path="components/auth/Register.js"
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
              data-id="db5olpkvh"
              data-path="components/auth/Register.js"
            ></i>
          }
        >
          Sign up with Google
        </Button>
      </div>

      <div className="text-center mt-6" data-id="oq90ohsfj" data-path="components/auth/Register.js">
        <p
          className="text-sm text-gray-600"
          data-id="x8yb1jj99"
          data-path="components/auth/Register.js"
        >
          Already have an account?{' '}
          <ReactRouterDOM.Link to="/login" className="text-primary font-medium">
            Log in
          </ReactRouterDOM.Link>
        </p>
      </div>
    </div>
  );
}
