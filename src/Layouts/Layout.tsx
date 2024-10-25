import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <main className='w-full min-h-screen'>
      <Outlet/>
    </main>
  )
}

export default Layout
