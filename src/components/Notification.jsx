import React from 'react'
import { Link } from "react-router-dom";

const Notification = ({ message }) => {
  if (!message) return null

  return (
    <div className="notification">
      {message}
    </div>
  )
}

export default Notification
