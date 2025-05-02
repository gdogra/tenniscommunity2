function Profile() {
  const { currentUser, userProfile } = useAuth();
  const { playerProfiles, matches, challenges } = useFirestore();
  const [isEditing, setIsEditing] = React.useState(false);
  const [playerData, setPlayerData] = React.useState(null);
  const [matchHistory, setMatchHistory] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  // Fetch user's profile and match history on component mount
  React.useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) return;

      try {
        setLoading(true);

        // Get player profile
        const profile = await playerProfiles.getById(currentUser.id);
        setPlayerData(profile);

        // Create profile if it doesn't exist
        if (!profile && userProfile) {
          await playerProfiles.create({
            displayName: userProfile.displayName || currentUser.email.split('@')[0],
            skillLevel: 3.0,
            bio: '',
            location: '',
            availability: '',
            profileImage: userProfile.photoURL || ''
          });

          // Fetch the newly created profile
          const newProfile = await playerProfiles.getById(currentUser.id);
          setPlayerData(newProfile);
        }

        // Get completed matches
        const userMatches = await matches.getByPlayerId(currentUser.id);
        const completeMatches = userMatches.filter((match) => match.status === 'completed');

        // Get accepted challenges that are now past
        const userChallenges = await challenges.getByPlayerId(currentUser.id);
        const completedChallenges = userChallenges.filter((challenge) =>
        challenge.status === 'completed' ||
        challenge.status === 'accepted' && new Date(challenge.proposed_date) < new Date()
        );

        // Combine and sort by date
        const allMatches = [...completeMatches, ...completedChallenges].
        sort((a, b) => {
          const dateA = a.match_date ? new Date(a.match_date) : new Date(a.proposed_date);
          const dateB = b.match_date ? new Date(b.match_date) : new Date(b.proposed_date);
          return dateB - dateA;
        });

        setMatchHistory(allMatches);
        setError(null);
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setError('Failed to load profile data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser]);

  const handleSaveProfile = async (data) => {
    try {
      await playerProfiles.update({
        ID: playerData.ID,
        display_name: data.displayName,
        skill_level: data.skillLevel,
        bio: data.bio,
        location: data.location,
        availability: data.availability,
        profile_image: data.photoURL || playerData.profile_image
      });

      // Refresh player data
      const updatedProfile = await playerProfiles.getById(currentUser.id);
      setPlayerData(updatedProfile);

      setIsEditing(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile. Please try again.');
    }
  };

  if (loading && !playerData) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]" data-id="6lhb0k9f1" data-path="pages/Profile.js">
        <LoadingSpinner size="lg" />
      </div>);
  }

  // Calculate win rate
  const calculateWinRate = () => {
    const wins = parseInt(playerData?.wins || 0);
    const losses = parseInt(playerData?.losses || 0);
    const total = wins + losses;
    return total > 0 ? Math.round(wins / total * 100) : 0;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" data-id="vh9a64nyx" data-path="pages/Profile.js">
      {/* Left Column - Profile */}
      <div className="lg:col-span-1" data-id="aollbqyrv" data-path="pages/Profile.js">
        {isEditing ?
        <ProfileEdit
          userProfile={{
            displayName: playerData?.display_name,
            photoURL: playerData?.profile_image,
            skillLevel: playerData?.skill_level,
            bio: playerData?.bio,
            location: playerData?.location,
            availability: playerData?.availability
          }}
          onSave={handleSaveProfile}
          onCancel={() => setIsEditing(false)} /> :

        <div className="bg-white rounded-lg shadow-md overflow-hidden" data-id="zamnlnn9p" data-path="pages/Profile.js">
            <div className="h-32 bg-gradient-to-r from-primary to-secondary" data-id="0rz1mpbyt" data-path="pages/Profile.js"></div>
            
            <div className="relative px-6 pb-6" data-id="n6wbnyh1y" data-path="pages/Profile.js">
              <div className="absolute -top-16 w-full left-0 flex justify-center" data-id="tyvo4bn7k" data-path="pages/Profile.js">
                <img
                src={playerData?.profile_image || `https://ui-avatars.com/api/?name=${playerData?.display_name || userProfile?.displayName}&background=16a34a&color=fff`}
                alt={playerData?.display_name || userProfile?.displayName || currentUser?.email}
                className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-md" data-id="gjzxl9mxc" data-path="pages/Profile.js" />
              </div>
              
              <div className="mt-20 text-center" data-id="n4no4fayy" data-path="pages/Profile.js">
                <h2 className="text-2xl font-bold text-gray-800" data-id="gonmiz4r0" data-path="pages/Profile.js">
                  {playerData?.display_name || userProfile?.displayName || currentUser?.email}
                </h2>
                
                <div className="flex justify-center my-3" data-id="2xrgcmzwr" data-path="pages/Profile.js">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                parseFloat(playerData?.skill_level) <= 2.5 ? 'bg-green-100 text-green-800' :
                parseFloat(playerData?.skill_level) <= 4.0 ? 'bg-blue-100 text-blue-800' :
                parseFloat(playerData?.skill_level) <= 5.5 ? 'bg-purple-100 text-purple-800' :
                parseFloat(playerData?.skill_level) > 5.5 ? 'bg-red-100 text-red-800' :
                'bg-gray-100 text-gray-800'}`
                } data-id="gyjgnyk9c" data-path="pages/Profile.js">
                    {playerData?.skill_level ?
                  `Skill Level ${playerData.skill_level}` :
                  'Unrated Player'}
                  </span>
                </div>
                
                {playerData?.bio &&
              <div className="mb-6 text-gray-600" data-id="l3e7mhh5i" data-path="pages/Profile.js">
                    <p data-id="lbfq2u0vz" data-path="pages/Profile.js">{playerData.bio}</p>
                  </div>
              }
                
                <div className="flex justify-center space-x-12 mb-6" data-id="bu88p4ewk" data-path="pages/Profile.js">
                  <div className="text-center" data-id="e95kmfxcb" data-path="pages/Profile.js">
                    <div className="text-2xl font-bold text-green-600" data-id="zwgckt1jc" data-path="pages/Profile.js">{playerData?.wins || 0}</div>
                    <div className="text-sm text-gray-500" data-id="mw6byrljd" data-path="pages/Profile.js">Wins</div>
                  </div>
                  
                  <div className="text-center" data-id="btsmejwee" data-path="pages/Profile.js">
                    <div className="text-2xl font-bold text-red-600" data-id="qaqscd7t6" data-path="pages/Profile.js">{playerData?.losses || 0}</div>
                    <div className="text-sm text-gray-500" data-id="mxq78yxm0" data-path="pages/Profile.js">Losses</div>
                  </div>
                  
                  <div className="text-center" data-id="sygay7dw2" data-path="pages/Profile.js">
                    <div className="text-2xl font-bold text-gray-800" data-id="7vydxlicv" data-path="pages/Profile.js">
                      {calculateWinRate()}%
                    </div>
                    <div className="text-sm text-gray-500" data-id="6vhjb9le0" data-path="pages/Profile.js">Win Rate</div>
                  </div>
                </div>
                
                {playerData?.location &&
              <div className="mb-4 text-gray-600 flex justify-center items-center" data-id="o3y5fl2k8" data-path="pages/Profile.js">
                    <i className="fas fa-map-marker-alt mr-2 text-primary" data-id="qvvvtbsrf" data-path="pages/Profile.js"></i>
                    <span data-id="vvmmwx6zj" data-path="pages/Profile.js">{playerData.location}</span>
                  </div>
              }
                
                {playerData?.availability &&
              <div className="mb-6 text-gray-600 flex justify-center items-center" data-id="ixpunoq7m" data-path="pages/Profile.js">
                    <i className="fas fa-clock mr-2 text-primary" data-id="9pn1i5yfp" data-path="pages/Profile.js"></i>
                    <span data-id="jlvbnav7h" data-path="pages/Profile.js">{playerData.availability}</span>
                  </div>
              }
                
                <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                icon={<i className="fas fa-edit" data-id="a6nwv9b4m" data-path="pages/Profile.js"></i>}>
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
        }
      </div>
      
      {/* Right Column - Match History */}
      <div className="lg:col-span-2" data-id="5jnk0oh9e" data-path="pages/Profile.js">
        <div className="bg-white rounded-lg shadow-md overflow-hidden" data-id="nevx88k8a" data-path="pages/Profile.js">
          <div className="p-4 border-b" data-id="sodbwiww4" data-path="pages/Profile.js">
            <h2 className="font-bold text-lg" data-id="iakefkuv7" data-path="pages/Profile.js">Match History</h2>
          </div>
          
          <div className="p-4" data-id="3xx5x103v" data-path="pages/Profile.js">
            {error &&
            <div className="p-4 mb-4 bg-red-50 border border-red-200 rounded-md text-red-600" data-id="cg0pnuva1" data-path="pages/Profile.js">
                {error}
              </div>
            }
            
            <MatchList
              matches={matchHistory}
              loading={loading}
              currentUserId={currentUser?.id}
              emptyMessage="No match history yet"
              emptyIcon="fa-trophy" />
          </div>
        </div>
      </div>
    </div>);
}