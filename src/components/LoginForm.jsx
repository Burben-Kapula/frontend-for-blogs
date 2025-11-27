import { useState } from 'react'
import loginService from '../services/login'

function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const result = await loginService.login({ username, password })
      setMessage(`Logged in as ${result.username}`)
      // TODO: тут можна зберегти токен, користувача в state/localStorage
    } catch (error) {
      setMessage('Login failed')
      console.error(error)
    }
  }

  return (
    <div>
      <h2>Login</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm
