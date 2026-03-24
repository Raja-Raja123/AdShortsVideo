import Sidebar from './components/layout/Sidebar'
import MainFeed from './components/layout/mainContent/MainFeed'
import TopBar from './components/layout/mobile/Topbar'
import BottomBar from './components/layout/mobile/Bottombar'

const Layout = () => {
  return (
    <div className="flex">

      {/* ✅ Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* ✅ Main Content */}
      <div className="flex-1">

        {/* ✅ Mobile TopBar */}
        <div className="md:hidden">
          <TopBar />
        </div>

        {/* ✅ Feed */}
        <div className="pt-14 md:pt-0 pb-14 md:pb-0 h-screen overflow-hidden">
          <MainFeed />
        </div>

        {/* ✅ Mobile BottomBar */}
        <div className="md:hidden z-50">
          <BottomBar />
        </div>

      </div>

    </div>
  )
}

export default Layout