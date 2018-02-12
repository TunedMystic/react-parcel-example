import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => (
  <div>
    <ul>
      <li><Link to="/">Dashboard</Link></li>
      <li><Link to="/home">Home</Link></li>
    </ul>
  </div>
)

export default Nav
