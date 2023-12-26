import { Outlet } from 'react-router-dom'
import { Header, Footer } from '@/components/layouts'
import { FloatingButton, ScrollToTop } from '@/components/common'
import { useEffect } from 'react'
import { fetchLoginUser } from '@/api/user'
import useAuthStore from '@/store/userStore'

export default function Layout() {
  const { setLoginUser, user } = useAuthStore((state) => state)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchLoginUser()
        if (data) {
          setLoginUser(data)
        }
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [setLoginUser])
  return (
    <div className='flex flex-col items-center'>
      <Header />
      <div className='flex-1 w-8/12 max-w-common-screen-width justify-self-center'>
        <Outlet />
      </div>
      <FloatingButton />
      <ScrollToTop />
      <Footer />
    </div>
  )
}
