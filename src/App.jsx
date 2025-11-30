import React from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import SingUpForm from './components/SingUpForm'
import BlogForm from './components/BlogForm'
import Home from './components/Home'


// та інші компоненти

// Використовуєте компоненти у розмітці
const App = () => (

  <div>
    <Home/>
    <Notification />
    <LoginForm />
    <SingUpForm />
    <Blog />
    <BlogForm/>
  </div>
)

export default App

