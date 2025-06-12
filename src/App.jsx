import { useEffect } from 'react'
import ChatHeader from './components/ChatHeader'
import MessageList from './components/MessageList'
import MessageInput from './components/MessageInput'
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
      <ChatHeader title="刘德华" />
      <MessageList />
      <MessageInput />
    </div>
  )
}

export default App
