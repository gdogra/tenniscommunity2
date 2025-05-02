// Custom hook for authentication with Supabase
function useAuth() {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [userProfile, setUserProfile] = React.useState(null);

  // Listen for auth state changes
  React.useEffect(() => {
    // Get current session
    const getCurrentSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error("Error getting session:", error);
          setError(error.message);
          setLoading(false);
          return;
        }

        handleUserChange(data.session?.user || null);
      } catch (err) {
        console.error("Error in getCurrentSession:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    // Initial session check
    getCurrentSession();

    // Subscribe to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      handleUserChange(session?.user || null);
    });

    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  // Handle user change
  const handleUserChange = async (user) => {
    setCurrentUser(user);

    if (user) {
      try {
        // Get user profile data
        const { data: userData, error } = await supabase.
        from('users').
        select('*').
        eq('id', user.id).
        single();

        if (error) throw error;

        // Convert data to match the expected format
        setUserProfile(convertUserData(userData));
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    } else {
      setUserProfile(null);
    }

    setLoading(false);
  };

  // Register with email and password
  const register = async (email, password, displayName, skillLevel) => {
    try {
      setError(null);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name: displayName }
        }
      });

      if (error) throw error;

      if (data.user) {
        // Create user profile
        await createUserProfile(data.user, { displayName, skillLevel });
      }

      return data.user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Login with email and password
  const login = async (email, password) => {
    try {
      setError(null);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Login with Google
  const loginWithGoogle = async () => {
    try {
      setError(null);

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google'
      });

      if (error) throw error;

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Logout
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Update user profile
  const updateProfile = async (data) => {
    try {
      setError(null);
      if (!currentUser) throw new Error("No user logged in");

      // Convert data keys to snake_case for Supabase
      const supabaseData = {};
      if (data.displayName) supabaseData.display_name = data.displayName;
      if (data.photoURL) supabaseData.photo_url = data.photoURL;
      if (data.skillLevel) supabaseData.skill_level = data.skillLevel;
      if (data.wins !== undefined) supabaseData.wins = data.wins;
      if (data.losses !== undefined) supabaseData.losses = data.losses;

      // Add any other fields
      Object.entries(data).forEach(([key, value]) => {
        if (!['displayName', 'photoURL', 'skillLevel', 'wins', 'losses'].includes(key)) {
          supabaseData[key] = value;
        }
      });

      // Update profile in Supabase
      const { error: updateError } = await supabase.
      from('users').
      update({
        ...supabaseData,
        updated_at: new Date()
      }).
      eq('id', currentUser.id);

      if (updateError) throw updateError;

      // Update user metadata if needed
      if (data.displayName) {
        const { error: userUpdateError } = await supabase.auth.updateUser({
          data: { name: data.displayName }
        });

        if (userUpdateError) throw userUpdateError;
      }

      // Refresh the user profile
      const { data: updatedUser, error: fetchError } = await supabase.
      from('users').
      select('*').
      eq('id', currentUser.id).
      single();

      if (fetchError) throw fetchError;

      setUserProfile(convertUserData(updatedUser));
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Check if user is admin
  const isAdmin = () => {
    return userProfile?.isAdmin === true;
  };

  return {
    currentUser,
    userProfile,
    loading,
    error,
    register,
    login,
    loginWithGoogle,
    logout,
    updateProfile,
    isAdmin
  };
}