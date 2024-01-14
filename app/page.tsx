import Image from 'next/image'
import AvatarUploadPage from './components/AvatarUploadPage'
import TestFetch from './components/TestFetch'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      TEST PAGE
      <TestFetch/>
    {/*   <AvatarUploadPage/> */}
    </main>
  )
}
