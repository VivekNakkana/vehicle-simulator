import React from 'react'
import "./sidebar.css"
import { NavLink, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className='sidebar-container' >
      <nav className='list-items' >
          <NavLink to="/" className= "nav-link"  activeClassName="active">
            Home
          </NavLink>
  
          <NavLink to="/addscenario" className= "nav-link" activeClassName="active">
            Add Scenario
          </NavLink>

          <NavLink to="/allscenarios" className= "nav-link" activeClassName="active">
            All Scenarios
          </NavLink>
          
          <NavLink to="/addvehicle" className= "nav-link" activeClassName="active">
            Add Vehicle
          </NavLink>
      </nav>
    </div>
  )
}

export default Sidebar