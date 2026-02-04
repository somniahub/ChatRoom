import { useEffect } from 'react'
import AnchorScroll from './test/test.tsx'
import './App.css'

function App() {
  // 设置视口高度
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }

    setVH()
    window.addEventListener('resize', setVH)

    return () => {
      window.removeEventListener('resize', setVH)
    }
  }, [])

  return (
    <div className="chat-app">
      {/* <ChatHeader title="刘德华" /> */}
      {/* <MessageList /> */}
      {/* <UserComponent/> */}
      <AnchorScroll/>
      {/* <MessageInput /> */}
    </div>
  )
}

export default App
