import React from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import SingUpForm from './components/SingUpForm'
// та інші компоненти

// Використовуєте компоненти у розмітці
const App = () => (
  <div>
    <Notification />
    <LoginForm />
    <SingUpForm />
    <Blog />
  </div>
)

export default App

