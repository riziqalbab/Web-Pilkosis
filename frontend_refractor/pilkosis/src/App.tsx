import { Outlet } from 'react-router-dom'
// import Auth from './Middleware/Auth'
import { domAnimation, LazyMotion } from 'framer-motion'

function App() {
  // Auth("/user")
  return (
    <LazyMotion features={domAnimation} strict>
      <Outlet />
    </LazyMotion>
  )
}

export default App
