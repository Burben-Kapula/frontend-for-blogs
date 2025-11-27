import React from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
// та інші компоненти

// Використовуєте компоненти у розмітці
const App = () => (
  <div>
    <Notification />
    <LoginForm />
    <Blog />
  </div>
)

export default App

