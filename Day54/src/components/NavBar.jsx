import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function NavBar() {
  const { user, signOut } = useAuth()

  return (
    <nav className="p-4 bg-gray-900 text-white flex items-center justify-between text-sm">
      <div className="flex gap-4">
        <Link to="/">Landing</Link>
        {!user && <Link to="/auth">Auth</Link>}
        {user && <Link to="/dashboard">Dashboard</Link>}
      </div>
      {user && (
        <div className="flex items-center gap-4">
          <span className="text-gray-300">{user.email}</span>
          <button
            onClick={signOut}
            className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  )
}