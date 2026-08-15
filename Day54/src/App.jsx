import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './routes/Landing'
import Auth from './routes/Auth'
import Dashboard from './routes/Dashboard'
import ProjectIntake from './routes/ProjectIntake'
import Generating from './routes/Generating'
import NavBar from './components/NavBar'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/intake" element={<ProtectedRoute><ProjectIntake /></ProtectedRoute>} />
        <Route path="/generating" element={<ProtectedRoute><Generating /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}
export default App  