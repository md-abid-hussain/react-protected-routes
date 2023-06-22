import Layout from './components/Layout'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import LinkPage from './components/LinkPage'
import Home from './components/Home'
import Admin from './components/Admin'
import Editor from './components/Editor'
import Missing from './components/Missing'
import RequireAuth from './components/RequireAuth'
import Lounge from './components/Lounge'
import Unauthorized from './components/Unauthorized'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* Public Links */}
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />
        <Route path='linkpage' element={<LinkPage />} />
        <Route path='unauthorized' element={<Unauthorized />} />

        {/* Protected links */}
        <Route element={<RequireAuth allowedRoles={[2001]} />}>
          <Route path='/' element={<Home />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[5150]} />}>
          <Route path='admin' element={<Admin />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[1984]} />}>
          <Route path='editor' element={<Editor />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[1984, 5150]} />}>
          <Route path='lounge' element={<Lounge />} />
        </Route>

        <Route path='*' element={<Missing />} />

      </Route>
    </Routes>
  )
}

export default App
