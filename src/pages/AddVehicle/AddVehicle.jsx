import { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import {useNavigate,useLocation} from 'react-router-dom'
import './addVehicle.css'
import '../../shared/globalStyles.css'

const AddVehicle = () => {
  const location = useLocation();
  const scenario  = location.state?.scenario || null;
  const [selectedScenarioId, setSelectedScenarioId] = useState(scenario?.id || '');
  const [scenarios, setScenarios] = useState([]);
  const [vehicleName, setVehicleName] = useState('');
  const [speed, setSpeed] = useState('');
  const [positionX, setPositionX] = useState('');
  const [positionY, setPositionY] = useState('');
  const [direction, setDirection] = useState('');
  
  
  useEffect(() => {
    fetchScenarios();
  }, []);

  const fetchScenarios = async () => {
    try {
      const response = await axios.get('http://localhost:3001/scenario');
      setScenarios(response.data);
    } catch (error) {
      console.error('Error fetching scenarios:', error);
    }
  };
  const handleScenarioChange = (event) => {
    setSelectedScenarioId(event.target.value);
  };

  const generateVehicleId = () => {
    return uuidv4();
  };

  const handleAddVehicle = async (e) => {
    e.preventDefault();

    const vehicleId = generateVehicleId();

    // Create a new vehicle object with the form data
    const newVehicle = {
      id: vehicleId,
      name: vehicleName,
      speed: speed,
      positionX: positionX,
      positionY: positionY,
      direction: direction,
      scenarioId: selectedScenarioId
    };

    try {
      // Send a POST request to add the vehicle to the JSON server
      await axios.post('http://localhost:3001/vehicle', newVehicle);

      // Reset the form fields after successful submission
      setVehicleName('');
      setSpeed('');
      setPositionX('');
      setPositionY('');
      setDirection('');
      setSelectedScenario('');

      // Display a success message or perform any additional actions
      console.log('Vehicle added successfully!');
    } catch (error) {
      console.error('Error adding vehicle:', error);
    }
  };

    const handleReset = () => {
      setVehicleName('');
      setSpeed('');
      setPositionX('');
      setPositionY('');
      setDirection('');
      setSelectedScenario('');
  };

  const navigate = useNavigate()
  const handleGoBack = () => {
    navigate('/')
  };

  return (
    <div className='vehicle-container' >
      
      <form onSubmit={handleAddVehicle}>
        <h2>Add Vehicle</h2>
        <div className='vehicle-inputs'>
          {/* Top three */}
          <div className='sub-container' >
            <div className='input-field' >
              <label htmlFor="scenario">Scenario:</label>
              <select
                id="scenario"
                value={selectedScenarioId} onChange={handleScenarioChange}
                required
                className='drop-down'
              >
                {scenario ? (
                  <option value={scenario.id}>{scenario.name}</option>
                ) : (
                  <option value="">Select a scenario</option>
                )}
                {scenarios.map((scenario) => (
                  <option key={scenario.id} value={scenario.id}>
                    {scenario.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className='input-field'>
              <label htmlFor="vehicleName">Vehicle Name:</label>
              <input
                id="vehicleName"
                type="text"
                placeholder='Bus'
                value={vehicleName}
                onChange={(e) => setVehicleName(e.target.value)}
                required
              />
            </div>
            
            <div className='input-field'>
              <label htmlFor="speed">Speed:</label>
              <input
                id="speed"
                type="number"
                placeholder='30'
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                required
              />
            </div>
          </div>
          
          {/* Bottom Three */}
          <div className='sub-container' >
            <div className='input-field'>
              <label htmlFor="positionX">Position X:</label>
              <input
                id="positionX"
                type="number"
                placeholder='3'
                value={positionX}
                onChange={(e) => setPositionX(Number(e.target.value))}
                required
              />
            </div>

            <div className='input-field'>
              <label htmlFor="positionY">Position Y:</label>
              <input
                id="positionY"
                type="number"
                placeholder='0'
                value={positionY}
                onChange={(e) => setPositionY(Number(e.target.value))}
                required
              />
            </div>

            <div className='input-field' >
              <label htmlFor="direction">Direction:</label>
              <select
                id="direction"
                value={direction}
                onChange={(e) => setDirection(e.target.value)}
                required
                className='drop-down'
              >
                <option value="">Select a direction</option>
                <option value="Upward">Upward</option>
                <option value="Downward">Downward</option>
                <option value="Towards">Towards</option>
                <option value="Backwards">Backwards</option>
              </select>
            </div>
          </div>
        </div>
        <div>
          <button className='green btn' type="submit">Add</button>
          <button className='btn orange' type="button" onClick={handleReset}>
            Reset
          </button>
          <button className='btn blue' type="button" onClick={handleGoBack}>
            Go Back
          </button>
        </div>
        
      </form>
    </div>
  );
};

export default AddVehicle;
