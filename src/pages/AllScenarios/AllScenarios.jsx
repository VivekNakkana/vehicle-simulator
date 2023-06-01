import React, { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaPlus, FaTrashAlt } from 'react-icons/fa';
import {FiEdit2} from 'react-icons/fi'
import './allScenarios.css'
import '../../shared/globalStyles.css'

const AllScenarios = () => {
  const [scenarios, setScenarios] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    // Fetch scenario data from JSON server
    const fetchScenarios = async () => {
      try {
        const response = await axios.get('http://localhost:3001/scenario');
        setScenarios(response.data);
      } catch (error) {
        console.log('Error fetching scenarios:', error);
      }
    };

    // Fetch vehicle data from JSON server
    const fetchVehicles = async () => {
      try {
        const response = await axios.get('http://localhost:3001/vehicle');
        setVehicles(response.data);
      } catch (error) {
        console.log('Error fetching vehicles:', error);
      }
    };

    fetchScenarios();
    fetchVehicles();
  }, []);

  // Function to get the count of vehicles associated with a scenario
  const getVehicleCount = (scenarioId) => {
    return vehicles.filter((vehicle) => vehicle.scenarioId === scenarioId).length;
  };

  // Function to delete a scenario
  const deleteScenario = async (scenarioId) => {
    try {
      await axios.delete(`http://localhost:3001/scenario/${scenarioId}`);
      // Update the scenarios state after deletion
      setScenarios(scenarios.filter((scenario) => scenario.id !== scenarioId));
    } catch (error) {
      console.log('Error deleting scenario:', error);
    }
  };

  // Function to delete all scenarios
  const deleteAllScenarios = async () => {
    try {
      await axios.delete('http://localhost:3001/scenario');
      setScenarios([]);
    } catch (error) {
      console.log('Error deleting all scenarios:', error);
    }
  };

  const navigate = useNavigate();
  const handleAddVehicleClick = (scenario) => {
    navigate('/addvehicle', { state: { scenario } });
  };

  return (
    <div className='allscenarios-container' >
      <section className='top-section' >
        <h2>All Scenarios</h2>
        <div>
          <button className='btn green'><Link className='link' to="/AddScenario">New Scenario</Link></button>
          <button className='btn blue '><Link className='link' to="/AddVehicle">Add Vehicle</Link></button>
          <button className='btn orange' onClick={deleteAllScenarios}>Delete All</button>
        </div>
      </section>
      
      <table className='scenario-table' >
        <thead>
          <tr>
            <th>Scenario No</th>
            <th>Scenario Name</th>
            <th>Scenario Time</th>
            <th>Vehicle Count</th>
            <th>Add Vehicle</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {scenarios.map((scenario,index) => (
            <tr key={scenario.id}>
              <td>{index+1}</td>
              <td>{scenario.name}</td>
              <td>{scenario.time +'s'}</td>
              <td>{getVehicleCount(scenario.id)}</td>
              <td>
                <button onClick={() => handleAddVehicleClick(scenario)}><FaPlus className='icon' />
                </button>
              </td>
              <td>
                <button>
                  <FiEdit2 className='icon' />
                </button>
              </td>
              <td>
                <button onClick={() => deleteScenario(scenario.id)}>
                  <FaTrashAlt className='icon' />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllScenarios;
