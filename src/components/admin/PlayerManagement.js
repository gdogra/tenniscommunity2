function PlayerManagement() {
  const [players, setPlayers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState('');
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

  // Handle making a player admin
  const handleToggleAdmin = async (player) => {
    try {
      await firestore.updateDocument('users', player.id, {
        isAdmin: !player.isAdmin,
      });

      // Update local state
      setPlayers((prevPlayers) =>
        prevPlayers.map((p) => (p.id === player.id ? { ...p, isAdmin: !p.isAdmin } : p)),
      );
    } catch (err) {
      console.error('Error updating admin status:', err);
      setError('Failed to update admin status.');
    }
  };

  // Filter players based on search term and skill level
  const filteredPlayers = players.filter((player) => {
    const matchesSearch =
      player.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkill = filterSkill === 'all' || player.skillLevel === filterSkill;

    return matchesSearch && matchesSkill;
  });

  // Sort players by name
  const sortedPlayers = [...filteredPlayers].sort((a, b) =>
    a.displayName.localeCompare(b.displayName),
  );

  if (loading) {
    return (
      <div
        className="flex justify-center items-center py-10"
        data-id="mlev32or6"
        data-path="components/admin/PlayerManagement.js"
      >
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div data-id="zwzxprfy6" data-path="components/admin/PlayerManagement.js">
      <div className="mb-6" data-id="8t2p5j0x4" data-path="components/admin/PlayerManagement.js">
        <h2
          className="text-xl font-bold text-gray-800 mb-4"
          data-id="9b0y7xyl7"
          data-path="components/admin/PlayerManagement.js"
        >
          Player Management
        </h2>

        <div
          className="flex flex-col sm:flex-row gap-3"
          data-id="xvxjio2s7"
          data-path="components/admin/PlayerManagement.js"
        >
          <div
            className="flex-1"
            data-id="cez3xtvxz"
            data-path="components/admin/PlayerManagement.js"
          >
            <Input
              id="searchPlayers"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={
                <i
                  className="fas fa-search text-gray-400"
                  data-id="8l0ietpjr"
                  data-path="components/admin/PlayerManagement.js"
                ></i>
              }
            />
          </div>

          <div
            className="w-full sm:w-48"
            data-id="syala6h1l"
            data-path="components/admin/PlayerManagement.js"
          >
            <select
              value={filterSkill}
              onChange={(e) => setFilterSkill(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              data-id="17a322zmc"
              data-path="components/admin/PlayerManagement.js"
            >
              <option
                value="all"
                data-id="edxretrrl"
                data-path="components/admin/PlayerManagement.js"
              >
                All Skill Levels
              </option>
              <option
                value="beginner"
                data-id="f2s5ek5ix"
                data-path="components/admin/PlayerManagement.js"
              >
                Beginner
              </option>
              <option
                value="intermediate"
                data-id="cs16ievxt"
                data-path="components/admin/PlayerManagement.js"
              >
                Intermediate
              </option>
              <option
                value="advanced"
                data-id="r41iwat1o"
                data-path="components/admin/PlayerManagement.js"
              >
                Advanced
              </option>
              <option
                value="expert"
                data-id="roq5tg0b9"
                data-path="components/admin/PlayerManagement.js"
              >
                Expert
              </option>
            </select>
          </div>
        </div>
      </div>

      {error && (
        <div
          className="p-4 mb-4 bg-red-50 border border-red-200 rounded-md text-red-600"
          data-id="7s8oh5nnm"
          data-path="components/admin/PlayerManagement.js"
        >
          {error}
        </div>
      )}

      <div
        className="overflow-x-auto"
        data-id="ko1ank9mz"
        data-path="components/admin/PlayerManagement.js"
      >
        <table
          className="min-w-full divide-y divide-gray-200"
          data-id="mxu6k18w4"
          data-path="components/admin/PlayerManagement.js"
        >
          <thead
            className="bg-gray-50"
            data-id="8lm5l0ju3"
            data-path="components/admin/PlayerManagement.js"
          >
            <tr data-id="dosxy0qtv" data-path="components/admin/PlayerManagement.js">
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                data-id="tclrdmtnu"
                data-path="components/admin/PlayerManagement.js"
              >
                Player
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                data-id="fagke9gxb"
                data-path="components/admin/PlayerManagement.js"
              >
                Email
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                data-id="98593sdls"
                data-path="components/admin/PlayerManagement.js"
              >
                Skill Level
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                data-id="nc4abzbu9"
                data-path="components/admin/PlayerManagement.js"
              >
                Record
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                data-id="tsdccw6i8"
                data-path="components/admin/PlayerManagement.js"
              >
                Joined
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                data-id="7q5d88vmc"
                data-path="components/admin/PlayerManagement.js"
              >
                Admin
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                data-id="2h7k6wvd2"
                data-path="components/admin/PlayerManagement.js"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody
            className="bg-white divide-y divide-gray-200"
            data-id="0xh7rgap1"
            data-path="components/admin/PlayerManagement.js"
          >
            {sortedPlayers.length === 0 ? (
              <tr data-id="3xsoh5xzx" data-path="components/admin/PlayerManagement.js">
                <td
                  colSpan="7"
                  className="px-6 py-4 text-center text-gray-500"
                  data-id="othfkbyaj"
                  data-path="components/admin/PlayerManagement.js"
                >
                  No players found matching your search criteria.
                </td>
              </tr>
            ) : (
              sortedPlayers.map((player) => (
                <tr
                  key={player.id}
                  data-id="sbrtb563y"
                  data-path="components/admin/PlayerManagement.js"
                >
                  <td
                    className="px-6 py-4 whitespace-nowrap"
                    data-id="qwujy5jzj"
                    data-path="components/admin/PlayerManagement.js"
                  >
                    <div
                      className="flex items-center"
                      data-id="c7k2jf12o"
                      data-path="components/admin/PlayerManagement.js"
                    >
                      <div
                        className="h-10 w-10 flex-shrink-0"
                        data-id="0xxg6js0b"
                        data-path="components/admin/PlayerManagement.js"
                      >
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={
                            player.photoURL ||
                            `https://ui-avatars.com/api/?name=${player.displayName}&background=16a34a&color=fff`
                          }
                          alt={player.displayName}
                          data-id="mnq9d2xpx"
                          data-path="components/admin/PlayerManagement.js"
                        />
                      </div>
                      <div
                        className="ml-4"
                        data-id="4w0fzidfw"
                        data-path="components/admin/PlayerManagement.js"
                      >
                        <div
                          className="text-sm font-medium text-gray-900"
                          data-id="7657h4jrg"
                          data-path="components/admin/PlayerManagement.js"
                        >
                          {player.displayName}
                        </div>
                        <div
                          className="text-sm text-gray-500"
                          data-id="82jobyvc1"
                          data-path="components/admin/PlayerManagement.js"
                        >
                          ID: {player.id.slice(0, 8)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap"
                    data-id="2qf6c45g8"
                    data-path="components/admin/PlayerManagement.js"
                  >
                    <div
                      className="text-sm text-gray-900"
                      data-id="lt7xbgh8t"
                      data-path="components/admin/PlayerManagement.js"
                    >
                      {player.email}
                    </div>
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap"
                    data-id="jybh6vzaw"
                    data-path="components/admin/PlayerManagement.js"
                  >
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        player.skillLevel === 'beginner'
                          ? 'bg-green-100 text-green-800'
                          : player.skillLevel === 'intermediate'
                            ? 'bg-blue-100 text-blue-800'
                            : player.skillLevel === 'advanced'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-red-100 text-red-800'
                      }`}
                      data-id="tlpairh0a"
                      data-path="components/admin/PlayerManagement.js"
                    >
                      {player.skillLevel.charAt(0).toUpperCase() + player.skillLevel.slice(1)}
                    </span>
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap"
                    data-id="xf1fnnpbz"
                    data-path="components/admin/PlayerManagement.js"
                  >
                    <div
                      className="text-sm text-gray-900"
                      data-id="2pbnhttzw"
                      data-path="components/admin/PlayerManagement.js"
                    >
                      {player.wins || 0} W / {player.losses || 0} L
                    </div>
                    <div
                      className="text-sm text-gray-500"
                      data-id="78rfiuck2"
                      data-path="components/admin/PlayerManagement.js"
                    >
                      {player.wins !== undefined &&
                      player.losses !== undefined &&
                      player.wins + player.losses > 0
                        ? `${Math.round((player.wins / (player.wins + player.losses)) * 100)}% win rate`
                        : 'No matches'}
                    </div>
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    data-id="02awe3l85"
                    data-path="components/admin/PlayerManagement.js"
                  >
                    {player.createdAt?.toDate
                      ? player.createdAt.toDate().toLocaleDateString()
                      : 'Unknown'}
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap"
                    data-id="1npe47j7g"
                    data-path="components/admin/PlayerManagement.js"
                  >
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        player.isAdmin ? 'bg-primary/20 text-primary' : 'bg-gray-100 text-gray-800'
                      }`}
                      data-id="f9ki79xoe"
                      data-path="components/admin/PlayerManagement.js"
                    >
                      {player.isAdmin ? 'Admin' : 'Member'}
                    </span>
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap"
                    data-id="xk7t6xvne"
                    data-path="components/admin/PlayerManagement.js"
                  >
                    <button
                      onClick={() => handleToggleAdmin(player)}
                      className={`px-3 py-1 text-xs rounded border ${
                        player.isAdmin
                          ? 'border-red-300 text-red-700 hover:bg-red-50'
                          : 'border-green-300 text-green-700 hover:bg-green-50'
                      }`}
                      data-id="71rf9nqpy"
                      data-path="components/admin/PlayerManagement.js"
                    >
                      {player.isAdmin ? 'Remove Admin' : 'Make Admin'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
