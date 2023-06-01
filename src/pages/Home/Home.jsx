import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VehicleTable from '../../components/VehicleTable/VehicleTable';
import Graph from '../../components/Graph/Graph';
import './home.css'

const Home = () => {
  const [scenarios, setScenarios] = useState([]);
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetchScenarios();
  }, []);

  const fetchScenarios = async () => {
    try {
      const response = await axios.get('http://localhost:3001/scenario');
      setScenarios(response.data);
      setSelectedScenario(response.data[0]); // Set the first scenario as the default
      fetchVehicles(response.data[0].id); // Fetch vehicles for the default scenario
    } catch (error) {
      console.error('Error fetching scenarios:', error);
    }
  };

  const fetchVehicles = async (scenarioId) => {
    try {
      const response = await axios.get(`http://localhost:3001/vehicle?scenarioId=${scenarioId}`);
      setVehicles(response.data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

  const handleScenarioChange = (event) => {
    const scenarioId = event.target.value;
    const selectedScenario = scenarios.find((scenario) => scenario.id === scenarioId);
    setSelectedScenario(selectedScenario);
    fetchVehicles(scenarioId);
  };

  const handleDeleteVehicle = async (vehicleId) => {
    try {
      await axios.delete(`http://localhost:3001/vehicle/${vehicleId}`);
      setVehicles((prevVehicles) => prevVehicles.filter((vehicle) => vehicle.id !== vehicleId));
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };

  const handleEditVehicle = (vehicleId) => {
    // Redirect to the edit vehicle page with the vehicle ID
    // Implement the navigation logic as per your routing library
    console.log(`Editing vehicle with ID: ${vehicleId}`);
  };

  return (
    <div className='home-container' >
      <div>
        <label htmlFor="scenario">Select Scenario:</label>
        <select id="scenario" value={selectedScenario?.id} onChange={handleScenarioChange}>
          {scenarios.map((scenario) => (
            <option key={scenario.id} value={scenario.id}>
              {scenario.name}
            </option>
          ))}
        </select>
      </div>
      {selectedScenario && (
        <div>
          <VehicleTable vehicles={vehicles} onDelete={handleDeleteVehicle} onEdit={handleEditVehicle} />
          <Graph scenario={selectedScenario} vehicles={vehicles} />
        </div>
      )}
    </div>
  );
};

export default Home;
