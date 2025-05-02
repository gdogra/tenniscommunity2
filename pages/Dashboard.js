function Dashboard() {
  const { currentUser, userProfile } = useAuth();
  const { playerProfiles, challenges, matches } = useFirestore();
  const [pendingChallenges, setPendingChallenges] = React.useState([]);
  const [upcomingMatches, setUpcomingMatches] = React.useState([]);
  const [recentMatches, setRecentMatches] = React.useState([]);
  const [players, setPlayers] = React.useState([]);
  const [selectedPlayer, setSelectedPlayer] = React.useState(null);
  const [showChallengeForm, setShowChallengeForm] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [userProfileData, setUserProfileData] = React.useState(null);
  const [error, setError] = React.useState(null);

  const navigate = ReactRouterDOM.useNavigate();

  // Fetch data on component mount
  React.useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) return;

      try {
        setLoading(true);

        // Get user profile from player_profiles
        const profileData = await playerProfiles.getById(currentUser.id);
        setUserProfileData(profileData);

        // If profile doesn't exist yet, create it
        if (!profileData && userProfile) {
          await playerProfiles.create({
            displayName: userProfile.displayName || currentUser.email.split('@')[0],
            skillLevel: 3.0,
            bio: '',
            location: '',
            availability: '',
            profileImage: userProfile.photoURL || ''
          });
        }

        // Get all challenges
        const allChallenges = await challenges.getAll();

        // Filter pending challenges where user is the opponent
        const pending = allChallenges.filter((challenge) =>
        challenge.opponent_id === currentUser.id &&
        challenge.status === 'pending'
        );
        setPendingChallenges(pending);

        // Filter upcoming matches (accepted challenges)
        const now = new Date();
        const upcoming = allChallenges.filter((challenge) =>
        (challenge.challenger_id === currentUser.id || challenge.opponent_id === currentUser.id) &&
        challenge.status === 'accepted' &&
        new Date(challenge.proposed_date) > now
        );
        setUpcomingMatches(upcoming);

        // Get recent matches
        const allMatches = await matches.getAll();
        const recent = allMatches.
        filter((match) =>
        match.challenger_id === currentUser.id ||
        match.opponent_id === currentUser.id
        ).
        sort((a, b) => new Date(b.match_date) - new Date(a.match_date)).
        slice(0, 5);
        setRecentMatches(recent);

        // Get all players for challenging
        const allPlayers = await playerProfiles.getAll();
        setPlayers(allPlayers.filter((player) => player.user_id !== currentUser.id));

        setError(null);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser]);

  const handleChallengeClick = (player) => {
    setSelectedPlayer(player);
    setShowChallengeForm(true);
  };

  const handleChallengeSubmit = async () => {
    try {
      // Challenge form handles the submission directly
      setShowChallengeForm(false);
      setSelectedPlayer(null);

      // Refresh challenges
      const allChallenges = await challenges.getAll();
      const upcoming = allChallenges.filter((challenge) =>
      (challenge.challenger_id === currentUser.id || challenge.opponent_id === currentUser.id) &&
      challenge.status === 'accepted' &&
      new Date(challenge.proposed_date) > new Date()
      );
      setUpcomingMatches(upcoming);

      alert('Challenge sent successfully!');
    } catch (err) {
      console.error('Error sending challenge:', err);
      setError('Failed to send challenge. Please try again.');
    }
  };

  const handleMatchAction = async (match, action) => {
    try {
      switch (action) {
        case 'accept':
          await challenges.update({
            ID: match.ID,
            status: 'accepted',
            response_message: 'Challenge accepted!'
          });

          // Update local state
          setPendingChallenges((prev) => prev.filter((m) => m.ID !== match.ID));
          setUpcomingMatches((prev) => [...prev, { ...match, status: 'accepted' }]);
          break;

        case 'decline':
          await challenges.update({
            ID: match.ID,
            status: 'declined',
            response_message: 'Challenge declined.'
          });

          // Update local state
          setPendingChallenges((prev) => prev.filter((m) => m.ID !== match.ID));
          break;

        case 'complete':
          // Create a match entry from the challenge
          await matches.create({
            challenger_id: match.challenger_id,
            opponent_id: match.opponent_id,
            match_date: match.proposed_date,
            location: match.proposed_location,
            status: 'completed'
          });

          // Update the challenge status
          await challenges.update({
            ID: match.ID,
            status: 'completed'
          });

          // Redirect to match completion page
          navigate(`/matches/${match.ID}/result`);
          break;
      }
    } catch (err) {
      console.error(`Error performing action ${action}:`, err);
      setError(`Failed to ${action} match. Please try again.`);
    }
  };

  if (loading && !userProfile) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]" data-id="w9gfrjha4" data-path="pages/Dashboard.js">
        <LoadingSpinner size="lg" />
      </div>);
  }

  return (
    <div data-id="r2cmz5kef" data-path="pages/Dashboard.js">
      {/* User Welcome */}
      <div className="bg-white shadow-sm rounded-lg p-4 sm:p-6 mb-6" data-id="o92a3752e" data-path="pages/Dashboard.js">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between" data-id="0tdwfqmyh" data-path="pages/Dashboard.js">
          <div data-id="cykt7a5x6" data-path="pages/Dashboard.js">
            <h1 className="text-2xl font-bold text-gray-800" data-id="rdaukbb2o" data-path="pages/Dashboard.js">
              Welcome, {userProfileData?.display_name || userProfile?.displayName || currentUser?.email}!
            </h1>
            <p className="text-gray-600" data-id="j2hohe5kh" data-path="pages/Dashboard.js">
              {userProfileData ?
              `You're registered as a player with skill level ${userProfileData.skill_level}` :
              'Complete your profile to get started'}
            </p>
          </div>
          <div className="mt-4 sm:mt-0" data-id="iuq59kol8" data-path="pages/Dashboard.js">
            <Button
              onClick={() => navigate('/profile')}
              variant="outline"
              icon={<i className="fas fa-user-edit" data-id="9ztlm8bmm" data-path="pages/Dashboard.js"></i>}>
              Edit Profile
            </Button>
          </div>
        </div>
      </div>
      
      {error &&
      <div className="p-4 mb-6 bg-red-50 border border-red-200 rounded-md text-red-600" data-id="srqql2e3w" data-path="pages/Dashboard.js">
          {error}
        </div>
      }
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" data-id="l7j7auljb" data-path="pages/Dashboard.js">
        {/* Left Column - Pending Challenges */}
        <div data-id="xxntgym3y" data-path="pages/Dashboard.js">
          <div className="bg-white shadow-sm rounded-lg overflow-hidden" data-id="d17twxlol" data-path="pages/Dashboard.js">
            <div className="p-4 border-b" data-id="kp2bqblqm" data-path="pages/Dashboard.js">
              <h2 className="font-bold text-lg flex items-center" data-id="wgr3txvvc" data-path="pages/Dashboard.js">
                <i className="fas fa-bell text-yellow-500 mr-2" data-id="whcz7a7n1" data-path="pages/Dashboard.js"></i>
                Pending Challenges
              </h2>
            </div>
            
            <div className="p-4" data-id="kjwrgmayk" data-path="pages/Dashboard.js">
              {loading ?
              <div className="flex justify-center py-4" data-id="tefiv9kln" data-path="pages/Dashboard.js">
                  <LoadingSpinner />
                </div> :
              pendingChallenges.length === 0 ?
              <div className="text-center py-4" data-id="dzywhps8e" data-path="pages/Dashboard.js">
                  <div className="text-gray-400 text-4xl mb-2" data-id="m32blsrz7" data-path="pages/Dashboard.js">
                    <i className="fas fa-inbox" data-id="9dnmpiuuu" data-path="pages/Dashboard.js"></i>
                  </div>
                  <p className="text-gray-500" data-id="illr1uja1" data-path="pages/Dashboard.js">No pending challenges</p>
                </div> :

              <div className="space-y-4" data-id="ovqlti1oa" data-path="pages/Dashboard.js">
                  {pendingChallenges.map((challenge) =>
                <MatchCard
                  key={challenge.ID}
                  match={challenge}
                  currentUserId={currentUser.id}
                  onAction={handleMatchAction} />
                )}
                </div>
              }
            </div>
          </div>
        </div>
        
        {/* Middle Column - Upcoming Matches */}
        <div data-id="8fn7np0j6" data-path="pages/Dashboard.js">
          <div className="bg-white shadow-sm rounded-lg overflow-hidden" data-id="x42qn2pql" data-path="pages/Dashboard.js">
            <div className="p-4 border-b" data-id="p6fa45wk8" data-path="pages/Dashboard.js">
              <h2 className="font-bold text-lg flex items-center" data-id="erf817tvq" data-path="pages/Dashboard.js">
                <i className="fas fa-calendar-alt text-primary mr-2" data-id="yoo796n1y" data-path="pages/Dashboard.js"></i>
                Upcoming Matches
              </h2>
            </div>
            
            <div className="p-4" data-id="in8m6uxnn" data-path="pages/Dashboard.js">
              {loading ?
              <div className="flex justify-center py-4" data-id="3lbbwnq37" data-path="pages/Dashboard.js">
                  <LoadingSpinner />
                </div> :
              upcomingMatches.length === 0 ?
              <div className="text-center py-4" data-id="hxub0sytl" data-path="pages/Dashboard.js">
                  <div className="text-gray-400 text-4xl mb-2" data-id="i1ii6y7ek" data-path="pages/Dashboard.js">
                    <i className="fas fa-calendar-times" data-id="10o4lgu89" data-path="pages/Dashboard.js"></i>
                  </div>
                  <p className="text-gray-500" data-id="cs75giafh" data-path="pages/Dashboard.js">No upcoming matches</p>
                </div> :

              <div className="space-y-4" data-id="dyptvvegk" data-path="pages/Dashboard.js">
                  {upcomingMatches.map((match) =>
                <MatchCard
                  key={match.ID}
                  match={match}
                  currentUserId={currentUser.id}
                  onAction={handleMatchAction} />
                )}
                </div>
              }
            </div>
          </div>
        </div>
        
        {/* Right Column - Recent Matches */}
        <div data-id="cf8im505i" data-path="pages/Dashboard.js">
          <div className="bg-white shadow-sm rounded-lg overflow-hidden" data-id="l7wlcw3qp" data-path="pages/Dashboard.js">
            <div className="p-4 border-b" data-id="k8h938f64" data-path="pages/Dashboard.js">
              <h2 className="font-bold text-lg flex items-center" data-id="d9iafxvki" data-path="pages/Dashboard.js">
                <i className="fas fa-history text-gray-500 mr-2" data-id="7qf45ks33" data-path="pages/Dashboard.js"></i>
                Recent Matches
              </h2>
            </div>
            
            <div className="p-4" data-id="b088lxrfm" data-path="pages/Dashboard.js">
              {loading ?
              <div className="flex justify-center py-4" data-id="h3hww31zi" data-path="pages/Dashboard.js">
                  <LoadingSpinner />
                </div> :
              recentMatches.length === 0 ?
              <div className="text-center py-4" data-id="cruq2djxi" data-path="pages/Dashboard.js">
                  <div className="text-gray-400 text-4xl mb-2" data-id="5tzq5r6c1" data-path="pages/Dashboard.js">
                    <i className="fas fa-trophy" data-id="ig1l1fp75" data-path="pages/Dashboard.js"></i>
                  </div>
                  <p className="text-gray-500" data-id="a2pi60n2p" data-path="pages/Dashboard.js">No completed matches yet</p>
                </div> :

              <div className="space-y-4" data-id="vl23aqljl" data-path="pages/Dashboard.js">
                  {recentMatches.map((match) =>
                <MatchCard
                  key={match.ID}
                  match={match}
                  currentUserId={currentUser.id}
                  isCompletedMatch={true} />
                )}
                </div>
              }
            </div>
          </div>
        </div>
      </div>
      
      {/* Challenge Players Section */}
      <div className="mt-8 bg-white shadow-sm rounded-lg overflow-hidden" data-id="zltjjkzno" data-path="pages/Dashboard.js">
        <div className="p-4 border-b" data-id="0sqzfxwoh" data-path="pages/Dashboard.js">
          <h2 className="font-bold text-lg flex items-center" data-id="gog6ekpjk" data-path="pages/Dashboard.js">
            <i className="fas fa-users text-secondary mr-2" data-id="yb3rhkgmr" data-path="pages/Dashboard.js"></i>
            Challenge Players
          </h2>
        </div>
        
        <div className="p-4" data-id="pu1nppygs" data-path="pages/Dashboard.js">
          {showChallengeForm ?
          <ChallengeForm
            opponent={selectedPlayer}
            onSubmit={handleChallengeSubmit}
            onCancel={() => {
              setShowChallengeForm(false);
              setSelectedPlayer(null);
            }} /> :

          <PlayerList
            players={players}
            loading={loading}
            error={error}
            showChallengeButton={true}
            onChallengeClick={handleChallengeClick}
            activePlayerId={currentUser?.id}
            compact={true} />
          }
        </div>
      </div>
    </div>);
}