function Matches() {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = React.useState('upcoming');
  const [pendingChallenges, setPendingChallenges] = React.useState([]);
  const [upcomingMatches, setUpcomingMatches] = React.useState([]);
  const [pastMatches, setPastMatches] = React.useState([]);
  const [sentChallenges, setSentChallenges] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const navigate = ReactRouterDOM.useNavigate();
  const firestore = useFirestore();

  React.useEffect(() => {
    const fetchMatches = async () => {
      if (!currentUser) return;

      try {
        setLoading(true);

        // Fetch pending challenges received (where user is the opponent)
        const pendingReceivedQuery = {
          where: [
          { field: 'opponentId', operator: '==', value: currentUser.uid },
          { field: 'status', operator: '==', value: 'pending' }],

          orderBy: [{ field: 'createdAt', direction: 'desc' }]
        };
        const pendingReceived = await firestore.getCollection('challenges', pendingReceivedQuery);
        setPendingChallenges(pendingReceived);

        // Fetch pending challenges sent (where user is the challenger)
        const pendingSentQuery = {
          where: [
          { field: 'challengerId', operator: '==', value: currentUser.uid },
          { field: 'status', operator: '==', value: 'pending' }],

          orderBy: [{ field: 'createdAt', direction: 'desc' }]
        };
        const pendingSent = await firestore.getCollection('challenges', pendingSentQuery);
        setSentChallenges(pendingSent);

        // Fetch upcoming matches (accepted challenges that haven't happened yet)
        const now = new Date();
        const upcomingQuery = {
          where: [
          { field: 'status', operator: '==', value: 'accepted' },
          { field: 'dateTime', operator: '>', value: firebase.firestore.Timestamp.fromDate(now) }],

          orderBy: [{ field: 'dateTime', direction: 'asc' }]
        };

        // Get both matches where user is challenger or opponent
        const upcomingChallengerMatches = await firestore.getCollection('challenges', {
          ...upcomingQuery,
          where: [
          ...upcomingQuery.where,
          { field: 'challengerId', operator: '==', value: currentUser.uid }]

        });

        const upcomingOpponentMatches = await firestore.getCollection('challenges', {
          ...upcomingQuery,
          where: [
          ...upcomingQuery.where,
          { field: 'opponentId', operator: '==', value: currentUser.uid }]

        });

        setUpcomingMatches([...upcomingChallengerMatches, ...upcomingOpponentMatches].
        sort((a, b) => a.dateTime.toDate() - b.dateTime.toDate()));

        // Fetch past matches (completed or accepted challenges that have already happened)
        const pastQuery = {
          where: [
          {
            field: 'status',
            operator: 'in',
            value: ['completed', 'accepted']
          },
          {
            field: 'dateTime',
            operator: '<=',
            value: firebase.firestore.Timestamp.fromDate(now)
          }],

          orderBy: [{ field: 'dateTime', direction: 'desc' }]
        };

        // Get both matches where user is challenger or opponent
        const pastChallengerMatches = await firestore.getCollection('challenges', {
          ...pastQuery,
          where: [
          ...pastQuery.where,
          { field: 'challengerId', operator: '==', value: currentUser.uid }]

        });

        const pastOpponentMatches = await firestore.getCollection('challenges', {
          ...pastQuery,
          where: [
          ...pastQuery.where,
          { field: 'opponentId', operator: '==', value: currentUser.uid }]

        });

        setPastMatches([...pastChallengerMatches, ...pastOpponentMatches].
        sort((a, b) => b.dateTime.toDate() - a.dateTime.toDate()));

        setError(null);
      } catch (err) {
        console.error('Error fetching matches:', err);
        setError('Failed to load matches. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [currentUser]);

  const handleMatchAction = async (match, action) => {
    try {
      switch (action) {
        case 'accept':
          await firestore.updateDocument('challenges', match.id, {
            status: 'accepted',
            updatedAt: getTimestamp()
          });

          // Update local state
          setPendingChallenges((prev) => prev.filter((m) => m.id !== match.id));
          setUpcomingMatches((prev) => [...prev, { ...match, status: 'accepted' }]);
          break;

        case 'decline':
          await firestore.updateDocument('challenges', match.id, {
            status: 'declined',
            updatedAt: getTimestamp()
          });

          // Update local state
          setPendingChallenges((prev) => prev.filter((m) => m.id !== match.id));
          break;

        case 'cancel':
          await firestore.deleteDocument('challenges', match.id);

          // Update local state
          setSentChallenges((prev) => prev.filter((m) => m.id !== match.id));
          break;

        case 'complete':
          // Redirect to match completion page
          navigate(`/matches/${match.id}/result`);
          break;
      }
    } catch (err) {
      console.error(`Error performing action ${action}:`, err);
      setError(`Failed to ${action} match. Please try again.`);
    }
  };

  // Create tabs configuration
  const tabs = [
  {
    id: 'pending',
    label: 'Pending Challenges',
    icon: 'fa-bell',
    count: pendingChallenges.length,
    content:
    <MatchList
      matches={pendingChallenges}
      loading={loading}
      error={error}
      currentUserId={currentUser?.uid}
      onMatchAction={handleMatchAction}
      emptyMessage="No pending challenges"
      emptyIcon="fa-inbox" />


  },
  {
    id: 'sent',
    label: 'Sent Challenges',
    icon: 'fa-paper-plane',
    count: sentChallenges.length,
    content:
    <MatchList
      matches={sentChallenges}
      loading={loading}
      error={error}
      currentUserId={currentUser?.uid}
      onMatchAction={handleMatchAction}
      emptyMessage="No sent challenges"
      emptyIcon="fa-paper-plane" />


  },
  {
    id: 'upcoming',
    label: 'Upcoming Matches',
    icon: 'fa-calendar-alt',
    count: upcomingMatches.length,
    content:
    <MatchList
      matches={upcomingMatches}
      loading={loading}
      error={error}
      currentUserId={currentUser?.uid}
      onMatchAction={handleMatchAction}
      emptyMessage="No upcoming matches"
      emptyIcon="fa-calendar-times" />


  },
  {
    id: 'past',
    label: 'Past Matches',
    icon: 'fa-history',
    count: pastMatches.length,
    content:
    <MatchList
      matches={pastMatches}
      loading={loading}
      error={error}
      currentUserId={currentUser?.uid}
      onMatchAction={handleMatchAction}
      emptyMessage="No past matches"
      emptyIcon="fa-trophy" />


  }];


  return (
    <div data-id="sexsi87xq" data-path="pages/Matches.js">
      <div className="bg-white shadow-sm rounded-lg p-4 sm:p-6 mb-6" data-id="sju2vwo5e" data-path="pages/Matches.js">
        <h1 className="text-2xl font-bold text-gray-800" data-id="m0o26swqi" data-path="pages/Matches.js">Matches</h1>
        <p className="text-gray-600" data-id="e0afdi6fd" data-path="pages/Matches.js">View and manage your tennis matches and challenges</p>
      </div>
      
      <div className="bg-white shadow-sm rounded-lg overflow-hidden" data-id="b90urrtlv" data-path="pages/Matches.js">
        <div className="border-b border-gray-200" data-id="4qalxsrh2" data-path="pages/Matches.js">
          <nav className="flex flex-wrap" data-id="ad7xl9gl5" data-path="pages/Matches.js">
            {tabs.map((tab) =>
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors flex items-center ${
              activeTab === tab.id ?
              'border-primary text-primary' :
              'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`
              } data-id="7vkgk8ya7" data-path="pages/Matches.js">

                <i className={`fas ${tab.icon} mr-2`} data-id="v7rmrzpa3" data-path="pages/Matches.js"></i>
                {tab.label}
                {tab.count > 0 &&
              <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
              activeTab === tab.id ?
              'bg-primary text-white' :
              'bg-gray-200 text-gray-700'}`
              } data-id="tg22yh8nr" data-path="pages/Matches.js">
                    {tab.count}
                  </span>
              }
              </button>
            )}
          </nav>
        </div>
        
        <div className="p-4" data-id="ky5hvvklx" data-path="pages/Matches.js">
          {tabs.find((tab) => tab.id === activeTab)?.content}
        </div>
      </div>
    </div>);

}