import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="h-full flex flex-col justify-center items-center gap-5">
      <h1 className="text-4xl text-green-900 font-medium">Welcome, {user?.Name}</h1>
      <button onClick={logout} className="px-3 py-2 border-2 bg-green-800 text-white rounded-lg hover:bg-green-900">Logout</button>
    </div>
  );
}

export default Dashboard;
