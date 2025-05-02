function Leaderboard() {
  const [players, setPlayers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [filterSkill, setFilterSkill] = React.useState('all');

  const firestore = useFirestore();

  // Fetch players on component mount
  React.useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setLoading(true);
        const playersData = await firestore.getCollection('users');
        setPlayers(playersData);
        setError(null);
      } catch (err) {
        console.error('Error fetching players:', err);
        setError('Failed to load players. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  // Filter players by skill level
  const filteredPlayers = players.filter((player) => {
    return filterSkill === 'all' || player.skillLevel === filterSkill;
  });

  // Calculate win percentage and sort by wins
  const rankedPlayers = [...filteredPlayers].
  map((player) => ({
    ...player,
    winPercentage: player.wins + player.losses > 0 ?
    Math.round(player.wins / (player.wins + player.losses) * 100) :
    0,
    totalMatches: (player.wins || 0) + (player.losses || 0)
  })).
  sort((a, b) => {
    // Sort by wins first
    if (b.wins !== a.wins) {
      return (b.wins || 0) - (a.wins || 0);
    }
    // If wins are equal, sort by win percentage
    if (b.winPercentage !== a.winPercentage) {
      return b.winPercentage - a.winPercentage;
    }
    // If win percentage is equal, sort by total matches
    return b.totalMatches - a.totalMatches;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10" data-id="vi4omtpvl" data-path="components/admin/Leaderboard.js">
        <LoadingSpinner size="lg" />
      </div>);

  }

  return (
    <div data-id="lrs8b2yqj" data-path="components/admin/Leaderboard.js">
      <div className="mb-6" data-id="7846vkrrw" data-path="components/admin/Leaderboard.js">
        <h2 className="text-xl font-bold text-gray-800 mb-4" data-id="wfuwycfs8" data-path="components/admin/Leaderboard.js">Leaderboard</h2>
        
        <div className="w-full sm:w-48" data-id="6dbo04ury" data-path="components/admin/Leaderboard.js">
          <select
            value={filterSkill}
            onChange={(e) => setFilterSkill(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary" data-id="5wwaq1w8z" data-path="components/admin/Leaderboard.js">

            <option value="all" data-id="9hasjvltz" data-path="components/admin/Leaderboard.js">All Skill Levels</option>
            <option value="beginner" data-id="u9vygv146" data-path="components/admin/Leaderboard.js">Beginner</option>
            <option value="intermediate" data-id="25dmfe8dz" data-path="components/admin/Leaderboard.js">Intermediate</option>
            <option value="advanced" data-id="dy3ponc4c" data-path="components/admin/Leaderboard.js">Advanced</option>
            <option value="expert" data-id="36392ce32" data-path="components/admin/Leaderboard.js">Expert</option>
          </select>
        </div>
      </div>
      
      {error &&
      <div className="p-4 mb-4 bg-red-50 border border-red-200 rounded-md text-red-600" data-id="casnoah7b" data-path="components/admin/Leaderboard.js">
          {error}
        </div>
      }
      
      <div className="overflow-x-auto" data-id="q2q15hjms" data-path="components/admin/Leaderboard.js">
        <table className="min-w-full divide-y divide-gray-200" data-id="3wdzsvit6" data-path="components/admin/Leaderboard.js">
          <thead className="bg-gray-50" data-id="4cn140u83" data-path="components/admin/Leaderboard.js">
            <tr data-id="le3ytc1zk" data-path="components/admin/Leaderboard.js">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-id="9l5193qja" data-path="components/admin/Leaderboard.js">
                Rank
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-id="beehenghf" data-path="components/admin/Leaderboard.js">
                Player
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-id="vcois8qvr" data-path="components/admin/Leaderboard.js">
                Skill Level
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-id="sz20bd8yr" data-path="components/admin/Leaderboard.js">
                Wins
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-id="joag8yzic" data-path="components/admin/Leaderboard.js">
                Losses
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-id="seyplwbt7" data-path="components/admin/Leaderboard.js">
                Win Rate
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-id="qoti1y6re" data-path="components/admin/Leaderboard.js">
                Total Matches
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200" data-id="279md08sv" data-path="components/admin/Leaderboard.js">
            {rankedPlayers.length === 0 ?
            <tr data-id="icgeueqwi" data-path="components/admin/Leaderboard.js">
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500" data-id="c5cwvd6r4" data-path="components/admin/Leaderboard.js">
                  No players found matching your filter criteria.
                </td>
              </tr> :

            rankedPlayers.map((player, index) =>
            <tr key={player.id} className={index < 3 ? 'bg-yellow-50' : ''} data-id="bwremsf9p" data-path="components/admin/Leaderboard.js">
                  <td className="px-6 py-4 whitespace-nowrap" data-id="pybt2uu1h" data-path="components/admin/Leaderboard.js">
                    <div className="text-sm font-medium" data-id="gshyj8ql5" data-path="components/admin/Leaderboard.js">
                      {index === 0 ?
                  <span className="text-yellow-600" data-id="mmkeynicn" data-path="components/admin/Leaderboard.js"><i className="fas fa-trophy" data-id="05h9ks9ng" data-path="components/admin/Leaderboard.js"></i> 1st</span> :
                  index === 1 ?
                  <span className="text-gray-500" data-id="5iyiq8ypp" data-path="components/admin/Leaderboard.js"><i className="fas fa-medal" data-id="6nicaz6s0" data-path="components/admin/Leaderboard.js"></i> 2nd</span> :
                  index === 2 ?
                  <span className="text-amber-700" data-id="9d3yf63i0" data-path="components/admin/Leaderboard.js"><i className="fas fa-medal" data-id="8mw0wdbo9" data-path="components/admin/Leaderboard.js"></i> 3rd</span> :

                  <span className="text-gray-900" data-id="56yfy8ogq" data-path="components/admin/Leaderboard.js">{index + 1}</span>
                  }
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap" data-id="7rp5a2ku8" data-path="components/admin/Leaderboard.js">
                    <div className="flex items-center" data-id="wj7se31lv" data-path="components/admin/Leaderboard.js">
                      <div className="h-10 w-10 flex-shrink-0" data-id="tfc4gor62" data-path="components/admin/Leaderboard.js">
                        <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={player.photoURL || `https://ui-avatars.com/api/?name=${player.displayName}&background=16a34a&color=fff`}
                      alt={player.displayName} data-id="jesbzeyiz" data-path="components/admin/Leaderboard.js" />

                      </div>
                      <div className="ml-4" data-id="mts00dnsg" data-path="components/admin/Leaderboard.js">
                        <div className="text-sm font-medium text-gray-900" data-id="wskvfrtpo" data-path="components/admin/Leaderboard.js">{player.displayName}</div>
                        <div className="text-sm text-gray-500" data-id="yov3uji2i" data-path="components/admin/Leaderboard.js">{player.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap" data-id="0whgi5qm5" data-path="components/admin/Leaderboard.js">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                player.skillLevel === 'beginner' ? 'bg-green-100 text-green-800' :
                player.skillLevel === 'intermediate' ? 'bg-blue-100 text-blue-800' :
                player.skillLevel === 'advanced' ? 'bg-purple-100 text-purple-800' :
                'bg-red-100 text-red-800'}`
                } data-id="1tz319ly9" data-path="components/admin/Leaderboard.js">
                      {player.skillLevel.charAt(0).toUpperCase() + player.skillLevel.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap" data-id="ks2r7cd72" data-path="components/admin/Leaderboard.js">
                    <div className="text-sm font-medium text-green-600" data-id="1wczfu0at" data-path="components/admin/Leaderboard.js">{player.wins || 0}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap" data-id="kd2hyjtf9" data-path="components/admin/Leaderboard.js">
                    <div className="text-sm font-medium text-red-600" data-id="4kbsjsyq6" data-path="components/admin/Leaderboard.js">{player.losses || 0}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap" data-id="j0205alx6" data-path="components/admin/Leaderboard.js">
                    <div className="text-sm font-medium text-gray-900" data-id="8eyzduqdj" data-path="components/admin/Leaderboard.js">{player.winPercentage}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap" data-id="dlbm88xgd" data-path="components/admin/Leaderboard.js">
                    <div className="text-sm text-gray-900" data-id="7seejx0fg" data-path="components/admin/Leaderboard.js">{player.totalMatches}</div>
                  </td>
                </tr>
            )
            }
          </tbody>
        </table>
      </div>
    </div>);

}