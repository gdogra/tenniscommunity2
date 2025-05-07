// Custom hook for Firestore-like interactions with Supabase
function useFirestore() {
  const { currentUser } = useAuth();

  // Player profiles collection
  const playerProfiles = {
    // Get all player profiles
    getAll: async () => {
      try {
        const { data, error } = await window.ezsite.apis.tablePage(3304, {
          PageNo: 1,
          PageSize: 100,
          OrderByField: 'skill_level',
          IsAsc: false,
        });

        if (error) throw error;
        return data.List;
      } catch (error) {
        console.error('Error fetching player profiles:', error);
        throw error;
      }
    },

    // Get player profile by user ID
    getById: async (userId) => {
      try {
        const { data, error } = await window.ezsite.apis.tablePage(3304, {
          PageNo: 1,
          PageSize: 1,
          Filters: [
            {
              name: 'user_id',
              op: 'Equal',
              value: userId,
            },
          ],
        });

        if (error) throw error;
        return data.List.length > 0 ? data.List[0] : null;
      } catch (error) {
        console.error('Error fetching player profile:', error);
        throw error;
      }
    },

    // Create player profile
    create: async (profileData) => {
      try {
        const { error } = await window.ezsite.apis.tableCreate(3304, {
          user_id: currentUser?.id,
          display_name: profileData.displayName,
          skill_level: profileData.skillLevel || 3.0,
          bio: profileData.bio || '',
          location: profileData.location || '',
          availability: profileData.availability || '',
          profile_image: profileData.profileImage || '',
          points: 0,
        });

        if (error) throw error;
        return true;
      } catch (error) {
        console.error('Error creating player profile:', error);
        throw error;
      }
    },

    // Update player profile
    update: async (profileData) => {
      try {
        const { error } = await window.ezsite.apis.tableUpdate(3304, {
          ID: profileData.ID,
          display_name: profileData.display_name,
          skill_level: profileData.skill_level,
          bio: profileData.bio,
          location: profileData.location,
          availability: profileData.availability,
          profile_image: profileData.profile_image,
          points: profileData.points,
        });

        if (error) throw error;
        return true;
      } catch (error) {
        console.error('Error updating player profile:', error);
        throw error;
      }
    },
  };

  // Matches collection
  const matches = {
    // Get all matches
    getAll: async () => {
      try {
        const { data, error } = await window.ezsite.apis.tablePage(3305, {
          PageNo: 1,
          PageSize: 100,
          OrderByField: 'match_date',
          IsAsc: false,
        });

        if (error) throw error;
        return data.List;
      } catch (error) {
        console.error('Error fetching matches:', error);
        throw error;
      }
    },

    // Get matches by player ID
    getByPlayerId: async (playerId) => {
      try {
        const { data, error } = await window.ezsite.apis.tablePage(3305, {
          PageNo: 1,
          PageSize: 100,
          Filters: [
            {
              name: 'challenger_id',
              op: 'Equal',
              value: playerId,
            },
            {
              name: 'opponent_id',
              op: 'Equal',
              value: playerId,
            },
          ],
        });

        if (error) throw error;
        return data.List;
      } catch (error) {
        console.error('Error fetching player matches:', error);
        throw error;
      }
    },

    // Create match
    create: async (matchData) => {
      try {
        const { error } = await window.ezsite.apis.tableCreate(3305, {
          challenger_id: matchData.challenger_id,
          opponent_id: matchData.opponent_id,
          challenger_score: matchData.challenger_score || 0,
          opponent_score: matchData.opponent_score || 0,
          match_date: matchData.match_date || new Date().toISOString(),
          location: matchData.location || '',
          status: matchData.status || 'scheduled',
          winner_id: matchData.winner_id || '',
          match_notes: matchData.match_notes || '',
        });

        if (error) throw error;
        return true;
      } catch (error) {
        console.error('Error creating match:', error);
        throw error;
      }
    },

    // Update match
    update: async (matchData) => {
      try {
        const { error } = await window.ezsite.apis.tableUpdate(3305, {
          ID: matchData.ID,
          challenger_score: matchData.challenger_score,
          opponent_score: matchData.opponent_score,
          status: matchData.status,
          winner_id: matchData.winner_id,
          match_notes: matchData.match_notes,
        });

        if (error) throw error;
        return true;
      } catch (error) {
        console.error('Error updating match:', error);
        throw error;
      }
    },
  };

  // Challenges collection
  const challenges = {
    // Get all challenges
    getAll: async () => {
      try {
        const { data, error } = await window.ezsite.apis.tablePage(3306, {
          PageNo: 1,
          PageSize: 100,
          OrderByField: 'created_at',
          IsAsc: false,
        });

        if (error) throw error;
        return data.List;
      } catch (error) {
        console.error('Error fetching challenges:', error);
        throw error;
      }
    },

    // Get challenges by player ID (as challenger or opponent)
    getByPlayerId: async (playerId) => {
      try {
        const { data, error } = await window.ezsite.apis.tablePage(3306, {
          PageNo: 1,
          PageSize: 100,
          Filters: [
            {
              name: 'challenger_id',
              op: 'Equal',
              value: playerId,
            },
            {
              name: 'opponent_id',
              op: 'Equal',
              value: playerId,
            },
          ],
        });

        if (error) throw error;
        return data.List;
      } catch (error) {
        console.error('Error fetching player challenges:', error);
        throw error;
      }
    },

    // Create challenge
    create: async (challengeData) => {
      try {
        const { error } = await window.ezsite.apis.tableCreate(3306, {
          challenger_id: currentUser?.id,
          opponent_id: challengeData.opponent_id,
          proposed_date: challengeData.proposed_date,
          proposed_location: challengeData.proposed_location,
          message: challengeData.message || '',
          status: 'pending',
          created_at: new Date().toISOString(),
          response_message: '',
        });

        if (error) throw error;
        return true;
      } catch (error) {
        console.error('Error creating challenge:', error);
        throw error;
      }
    },

    // Update challenge
    update: async (challengeData) => {
      try {
        const { error } = await window.ezsite.apis.tableUpdate(3306, {
          ID: challengeData.ID,
          status: challengeData.status,
          response_message: challengeData.response_message || '',
        });

        if (error) throw error;
        return true;
      } catch (error) {
        console.error('Error updating challenge:', error);
        throw error;
      }
    },
  };

  // Leaderboard functions
  const leaderboard = {
    // Get all players sorted by points
    getLeaderboard: async () => {
      try {
        const { data, error } = await window.ezsite.apis.tablePage(3304, {
          PageNo: 1,
          PageSize: 100,
          OrderByField: 'points',
          IsAsc: false,
        });

        if (error) throw error;
        return data.List;
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        throw error;
      }
    },
  };

  return {
    playerProfiles,
    matches,
    challenges,
    leaderboard,
  };
}
