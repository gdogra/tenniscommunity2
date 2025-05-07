function Header() {
  const { currentUser, userProfile, logout } = useAuth();
  const navigate = ReactRouterDOM.useNavigate();
  const location = ReactRouterDOM.useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: '/', label: 'Home', showWhen: 'always' },
    { path: '/dashboard', label: 'Dashboard', showWhen: 'authenticated' },
    { path: '/matches', label: 'Matches', showWhen: 'authenticated' },
    { path: '/profile', label: 'Profile', showWhen: 'authenticated' },
    { path: '/admin', label: 'Admin', showWhen: 'admin' },
  ];

  const filteredNavLinks = navLinks.filter((link) => {
    if (link.showWhen === 'always') return true;
    if (link.showWhen === 'authenticated' && currentUser) return true;
    if (link.showWhen === 'admin' && userProfile?.isAdmin) return true;
    return false;
  });

  return (
    <header
      className="bg-white shadow-sm"
      data-id="5fxic5em6"
      data-path="components/layout/Header.js"
    >
      <div
        className="container mx-auto px-4 py-3"
        data-id="6yegmjehl"
        data-path="components/layout/Header.js"
      >
        <div
          className="flex items-center justify-between"
          data-id="fo0nc2oyd"
          data-path="components/layout/Header.js"
        >
          {/* Logo */}
          <div
            onClick={() => navigate('/')}
            className="flex items-center cursor-pointer"
            data-id="0l8ci7d9i"
            data-path="components/layout/Header.js"
          >
            <div
              className="text-primary mr-2"
              data-id="f1y3s30oy"
              data-path="components/layout/Header.js"
            >
              <i
                className="fas fa-tennis-ball text-2xl"
                data-id="xjmxc6k28"
                data-path="components/layout/Header.js"
              ></i>
            </div>
            <h1
              className="font-bold text-xl text-gray-800"
              data-id="ebdmio3pc"
              data-path="components/layout/Header.js"
            >
              Tennis Community
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center space-x-4"
            data-id="q4sam2jn3"
            data-path="components/layout/Header.js"
          >
            {filteredNavLinks.map((link) => (
              <ReactRouterDOM.Link
                key={link.path}
                to={link.path}
                className={`px-2 py-1 text-sm font-medium rounded transition-colors ${
                  isActive(link.path)
                    ? 'text-primary bg-primary/10'
                    : 'text-gray-700 hover:text-primary hover:bg-primary/5'
                }`}
              >
                {link.label}
              </ReactRouterDOM.Link>
            ))}

            {currentUser ? (
              <div
                className="flex items-center ml-4"
                data-id="bx8n50j38"
                data-path="components/layout/Header.js"
              >
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                  data-id="h7y94a6u1"
                  data-path="components/layout/Header.js"
                >
                  Logout
                </button>
                <div
                  onClick={() => navigate('/profile')}
                  className="ml-3 cursor-pointer flex items-center"
                  data-id="2o2a9kh5b"
                  data-path="components/layout/Header.js"
                >
                  {userProfile?.photoURL ? (
                    <img
                      src={userProfile.photoURL}
                      alt={userProfile.displayName}
                      className="h-8 w-8 rounded-full object-cover border border-gray-200"
                      data-id="7vnkaebko"
                      data-path="components/layout/Header.js"
                    />
                  ) : (
                    <div
                      className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center"
                      data-id="q3y8guphi"
                      data-path="components/layout/Header.js"
                    >
                      {userProfile?.displayName?.charAt(0) || currentUser.email?.charAt(0) || 'U'}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div
                className="flex items-center space-x-2"
                data-id="s2cuist2r"
                data-path="components/layout/Header.js"
              >
                <ReactRouterDOM.Link
                  to="/login"
                  className="px-3 py-1.5 text-sm font-medium text-primary border border-primary/30 hover:bg-primary/5 rounded transition-colors"
                >
                  Login
                </ReactRouterDOM.Link>
                <ReactRouterDOM.Link
                  to="/register"
                  className="px-3 py-1.5 text-sm font-medium bg-primary text-white hover:bg-primary/90 rounded transition-colors"
                >
                  Register
                </ReactRouterDOM.Link>
              </div>
            )}
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden" data-id="dr86pnwkc" data-path="components/layout/Header.js">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary focus:outline-none"
              data-id="epaone19q"
              data-path="components/layout/Header.js"
            >
              <i
                className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}
                data-id="zu7s503ji"
                data-path="components/layout/Header.js"
              ></i>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div
            className="md:hidden mt-3 pt-3 border-t border-gray-200"
            data-id="rbz1kfkdk"
            data-path="components/layout/Header.js"
          >
            <nav
              className="flex flex-col space-y-2"
              data-id="5nlt161yi"
              data-path="components/layout/Header.js"
            >
              {filteredNavLinks.map((link) => (
                <ReactRouterDOM.Link
                  key={link.path}
                  to={link.path}
                  className={`px-2 py-2 text-sm font-medium rounded transition-colors ${
                    isActive(link.path)
                      ? 'text-primary bg-primary/10'
                      : 'text-gray-700 hover:text-primary hover:bg-primary/5'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </ReactRouterDOM.Link>
              ))}

              {currentUser ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="px-2 py-2 text-sm font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors text-left"
                  data-id="8x8z58xkj"
                  data-path="components/layout/Header.js"
                >
                  Logout
                </button>
              ) : (
                <div
                  className="flex flex-col space-y-2"
                  data-id="dgg06lok5"
                  data-path="components/layout/Header.js"
                >
                  <ReactRouterDOM.Link
                    to="/login"
                    className="px-2 py-2 text-sm font-medium text-primary hover:bg-primary/5 rounded transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </ReactRouterDOM.Link>
                  <ReactRouterDOM.Link
                    to="/register"
                    className="px-2 py-2 text-sm font-medium text-primary hover:bg-primary/5 rounded transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </ReactRouterDOM.Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
