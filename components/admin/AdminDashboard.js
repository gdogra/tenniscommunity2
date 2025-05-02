function AdminDashboard() {
  const [activeTab, setActiveTab] = React.useState('players');

  const tabs = [
  { id: 'players', label: 'Players', icon: 'fa-users' },
  { id: 'matches', label: 'Matches', icon: 'fa-trophy' },
  { id: 'leaderboard', label: 'Leaderboard', icon: 'fa-medal' }];


  return (
    <div data-id="oprijhe7k" data-path="components/admin/AdminDashboard.js">
      <div className="bg-white shadow-sm rounded-lg p-4 mb-6" data-id="3yu225kbg" data-path="components/admin/AdminDashboard.js">
        <h1 className="text-2xl font-bold text-gray-800" data-id="1mk1qkw0k" data-path="components/admin/AdminDashboard.js">Admin Dashboard</h1>
        <p className="text-gray-600" data-id="0j6qnul8j" data-path="components/admin/AdminDashboard.js">Manage players, matches, and view statistics</p>
      </div>
      
      <div className="bg-white shadow-sm rounded-lg overflow-hidden" data-id="j04dpn01y" data-path="components/admin/AdminDashboard.js">
        <div className="border-b border-gray-200" data-id="zt4ogbnps" data-path="components/admin/AdminDashboard.js">
          <nav className="flex" data-id="cfgs3m5eo" data-path="components/admin/AdminDashboard.js">
            {tabs.map((tab) =>
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id ?
              'border-primary text-primary' :
              'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`
              } data-id="oz0sqsttw" data-path="components/admin/AdminDashboard.js">

                <i className={`fas ${tab.icon} mr-2`} data-id="04s96cdk4" data-path="components/admin/AdminDashboard.js"></i>
                {tab.label}
              </button>
            )}
          </nav>
        </div>
        
        <div className="p-4" data-id="uvoinqhuo" data-path="components/admin/AdminDashboard.js">
          {activeTab === 'players' && <PlayerManagement />}
          {activeTab === 'matches' && <MatchManagement />}
          {activeTab === 'leaderboard' && <Leaderboard />}
        </div>
      </div>
    </div>);

}