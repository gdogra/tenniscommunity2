// Supabase client configuration
const supabaseUrl = 'https://zpbdpdualydcxotypyep.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';

// Initialize Supabase client
const supabaseClient = supabase.createClient(supabaseUrl, supabaseAnonKey);

// Helper functions
function getCurrentUser() {
  return supabaseClient.auth.user();
}

function getTimestamp() {
  return new Date();
}

// Create a user profile document when a new user signs up
async function createUserProfile(user, additionalData) {
  if (!user) return;

  // Check if user already exists
  const { data: existingUser, error: fetchError } = await supabaseClient.
  from('users').
  select('*').
  eq('id', user.id).
  single();

  if (fetchError && fetchError.code !== 'PGRST116') {
    console.error("Error checking user profile", fetchError);
    throw fetchError;
  }

  if (!existingUser) {
    const { email, user_metadata } = user;
    const displayName = user_metadata?.name || additionalData?.displayName || email.split('@')[0];
    const photoURL = user_metadata?.avatar_url || null;
    const createdAt = getTimestamp();

    try {
      const { data, error } = await supabaseClient.
      from('users').
      insert([{
        id: user.id,
        email,
        display_name: displayName,
        photo_url: photoURL,
        created_at: createdAt,
        skill_level: additionalData?.skillLevel || 'beginner',
        wins: 0,
        losses: 0,
        is_admin: false,
        ...additionalData
      }]);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error creating user profile", error);
      throw error;
    }
  }

  return existingUser;
}

// Helper function to convert Supabase data to Firebase-like format
function convertUserData(userData) {
  if (!userData) return null;

  return {
    id: userData.id,
    email: userData.email,
    displayName: userData.display_name,
    photoURL: userData.photo_url,
    createdAt: userData.created_at,
    skillLevel: userData.skill_level,
    wins: userData.wins,
    losses: userData.losses,
    isAdmin: userData.is_admin
  };
}

// Make supabaseClient available globally
const supabase = supabaseClient;