function MatchManagement() {
  const [matches, setMatches] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [filterStatus, setFilterStatus] = React.useState('all');
  const [searchTerm, setSearchTerm] = React.useState('');

  const firestore = useFirestore();

  // Fetch matches on component mount
  React.useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        const matchesQuery = {
          orderBy: [{ field: 'dateTime', direction: 'desc' }],
        };

        const matchesData = await firestore.getCollection('challenges', matchesQuery);
        setMatches(matchesData);
        setError(null);
      } catch (err) {
        console.error('Error fetching matches:', err);
        setError('Failed to load matches. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  // Update match status
  const handleUpdateStatus = async (match, newStatus) => {
    try {
      await firestore.updateDocument('challenges', match.id, {
        status: newStatus,
        updatedAt: getTimestamp(),
      });

      // Update local state
      setMatches((prevMatches) =>
        prevMatches.map((m) => (m.id === match.id ? { ...m, status: newStatus } : m)),
      );
    } catch (err) {
      console.error('Error updating match status:', err);
      setError('Failed to update match status.');
    }
  };

  // Filter matches based on search term and status
  const filteredMatches = matches.filter((match) => {
    const matchesSearch =
      match.challengerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.opponentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'all' || match.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div
        className="flex justify-center items-center py-10"
        data-id="c5akpocjk"
        data-path="components/admin/MatchManagement.js"
      >
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div data-id="frfv9d80e" data-path="components/admin/MatchManagement.js">
      <div className="mb-6" data-id="frq54n2xv" data-path="components/admin/MatchManagement.js">
        <h2
          className="text-xl font-bold text-gray-800 mb-4"
          data-id="jgt4at7z9"
          data-path="components/admin/MatchManagement.js"
        >
          Match Management
        </h2>

        <div
          className="flex flex-col sm:flex-row gap-3"
          data-id="8w11qzxti"
          data-path="components/admin/MatchManagement.js"
        >
          <div
            className="flex-1"
            data-id="dv93qnxyb"
            data-path="components/admin/MatchManagement.js"
          >
            <Input
              id="searchMatches"
              placeholder="Search by player or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={
                <i
                  className="fas fa-search text-gray-400"
                  data-id="wrxy3i5rm"
                  data-path="components/admin/MatchManagement.js"
                ></i>
              }
            />
          </div>

          <div
            className="w-full sm:w-48"
            data-id="jn4itq4vx"
            data-path="components/admin/MatchManagement.js"
          >
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              data-id="dxpqde60v"
              data-path="components/admin/MatchManagement.js"
            >
              <option
                value="all"
                data-id="yu69hhu0u"
                data-path="components/admin/MatchManagement.js"
              >
                All Statuses
              </option>
              <option
                value="pending"
                data-id="v4vio8ifz"
                data-path="components/admin/MatchManagement.js"
              >
                Pending
              </option>
              <option
                value="accepted"
                data-id="pkvueo4lh"
                data-path="components/admin/MatchManagement.js"
              >
                Accepted
              </option>
              <option
                value="declined"
                data-id="cqf8xh0t2"
                data-path="components/admin/MatchManagement.js"
              >
                Declined
              </option>
              <option
                value="completed"
                data-id="c9bofuqvz"
                data-path="components/admin/MatchManagement.js"
              >
                Completed
              </option>
            </select>
          </div>
        </div>
      </div>

      {error && (
        <div
          className="p-4 mb-4 bg-red-50 border border-red-200 rounded-md text-red-600"
          data-id="cr9az90yk"
          data-path="components/admin/MatchManagement.js"
        >
          {error}
        </div>
      )}

      <div
        className="overflow-x-auto"
        data-id="jbio5vk1v"
        data-path="components/admin/MatchManagement.js"
      >
        <table
          className="min-w-full divide-y divide-gray-200"
          data-id="1zq00fdb7"
          data-path="components/admin/MatchManagement.js"
        >
          <thead
            className="bg-gray-50"
            data-id="6d3clrnfi"
            data-path="components/admin/MatchManagement.js"
          >
            <tr data-id="e20pppevm" data-path="components/admin/MatchManagement.js">
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                data-id="yco7tq257"
                data-path="components/admin/MatchManagement.js"
              >
                Challenger
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                data-id="l6i0ki0yc"
                data-path="components/admin/MatchManagement.js"
              >
                Opponent
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                data-id="lo7s23n86"
                data-path="components/admin/MatchManagement.js"
              >
                Date & Time
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                data-id="iglss9i8t"
                data-path="components/admin/MatchManagement.js"
              >
                Location
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                data-id="n73sn8lhb"
                data-path="components/admin/MatchManagement.js"
              >
                Status
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                data-id="stdqjxzmd"
                data-path="components/admin/MatchManagement.js"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody
            className="bg-white divide-y divide-gray-200"
            data-id="y2ffmjo8f"
            data-path="components/admin/MatchManagement.js"
          >
            {filteredMatches.length === 0 ? (
              <tr data-id="pco0do5c7" data-path="components/admin/MatchManagement.js">
                <td
                  colSpan="6"
                  className="px-6 py-4 text-center text-gray-500"
                  data-id="rqy7wagyy"
                  data-path="components/admin/MatchManagement.js"
                >
                  No matches found matching your search criteria.
                </td>
              </tr>
            ) : (
              filteredMatches.map((match) => (
                <tr
                  key={match.id}
                  data-id="6js9btdk7"
                  data-path="components/admin/MatchManagement.js"
                >
                  <td
                    className="px-6 py-4 whitespace-nowrap"
                    data-id="zqpi8h7e3"
                    data-path="components/admin/MatchManagement.js"
                  >
                    <div
                      className="flex items-center"
                      data-id="0akyfkw2i"
                      data-path="components/admin/MatchManagement.js"
                    >
                      <div
                        className="text-sm font-medium text-gray-900"
                        data-id="fjbuauf4b"
                        data-path="components/admin/MatchManagement.js"
                      >
                        {match.challengerName}
                      </div>
                    </div>
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap"
                    data-id="97245ijg8"
                    data-path="components/admin/MatchManagement.js"
                  >
                    <div
                      className="text-sm font-medium text-gray-900"
                      data-id="1sigq7qyp"
                      data-path="components/admin/MatchManagement.js"
                    >
                      {match.opponentName}
                    </div>
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap"
                    data-id="zrgcuk5xs"
                    data-path="components/admin/MatchManagement.js"
                  >
                    <div
                      className="text-sm text-gray-900"
                      data-id="fpfq8ki81"
                      data-path="components/admin/MatchManagement.js"
                    >
                      {match.dateTime?.toDate
                        ? match.dateTime.toDate().toLocaleDateString()
                        : 'Unknown'}
                    </div>
                    <div
                      className="text-sm text-gray-500"
                      data-id="rp88y04sm"
                      data-path="components/admin/MatchManagement.js"
                    >
                      {match.dateTime?.toDate
                        ? match.dateTime
                            .toDate()
                            .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        : ''}
                    </div>
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap"
                    data-id="0otwfkx8k"
                    data-path="components/admin/MatchManagement.js"
                  >
                    <div
                      className="text-sm text-gray-900"
                      data-id="r65oegrid"
                      data-path="components/admin/MatchManagement.js"
                    >
                      {match.location}
                    </div>
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap"
                    data-id="tvwsi3xew"
                    data-path="components/admin/MatchManagement.js"
                  >
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        match.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : match.status === 'accepted'
                            ? 'bg-green-100 text-green-800'
                            : match.status === 'declined'
                              ? 'bg-red-100 text-red-800'
                              : match.status === 'completed'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-800'
                      }`}
                      data-id="3wka9ywok"
                      data-path="components/admin/MatchManagement.js"
                    >
                      {match.status.charAt(0).toUpperCase() + match.status.slice(1)}
                    </span>
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    data-id="i5jj5v60a"
                    data-path="components/admin/MatchManagement.js"
                  >
                    <div
                      className="flex space-x-2"
                      data-id="8pjk1n7os"
                      data-path="components/admin/MatchManagement.js"
                    >
                      {match.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleUpdateStatus(match, 'accepted')}
                            className="px-3 py-1 text-xs border border-green-300 text-green-700 rounded hover:bg-green-50"
                            data-id="zspst05vx"
                            data-path="components/admin/MatchManagement.js"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(match, 'declined')}
                            className="px-3 py-1 text-xs border border-red-300 text-red-700 rounded hover:bg-red-50"
                            data-id="ovkxl4wu8"
                            data-path="components/admin/MatchManagement.js"
                          >
                            Decline
                          </button>
                        </>
                      )}

                      {match.status === 'accepted' && !match.winnerId && (
                        <button
                          onClick={() => handleUpdateStatus(match, 'completed')}
                          className="px-3 py-1 text-xs border border-blue-300 text-blue-700 rounded hover:bg-blue-50"
                          data-id="iyzeaja43"
                          data-path="components/admin/MatchManagement.js"
                        >
                          Mark Completed
                        </button>
                      )}

                      <button
                        onClick={() => {
                          if (confirm('Are you sure you want to delete this match?')) {
                            firestore.deleteDocument('challenges', match.id);
                            setMatches((prevMatches) =>
                              prevMatches.filter((m) => m.id !== match.id),
                            );
                          }
                        }}
                        className="px-3 py-1 text-xs border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
                        data-id="dcn8nl9uh"
                        data-path="components/admin/MatchManagement.js"
                      >
                        Delete
                      </button>
                    </div>
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
