import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
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

