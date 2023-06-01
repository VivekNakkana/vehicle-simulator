import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import {useNavigate} from 'react-router-dom'
import './addScenario.css'
import '../../shared/globalStyles.css'

const AddScenario = () => {
  const [scenarioData, setScenarioData] = useState({
    name: '',
    time: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setScenarioData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const newScenario = {
      id: uuidv4(),
      ...scenarioData
    };

    try {
      await axios.post('http://localhost:3001/scenario', newScenario);
      setScenarioData({
        name: '',
        time: ''
      });
      // Show success message or perform other actions upon successful scenario creation
    } catch (error) {
      console.error('Error adding scenario:', error);
      // Handle error scenario, if needed
    }
  };

  const handleReset = () => {
    setScenarioData({
      name: '',
      time: ''
    });
  };

  
  const navigate = useNavigate()
  
  const handleGoBack = () => {
    navigate('/')
  };

  return (
    <div className='scenario-container' >
      
      <form onSubmit={handleFormSubmit}>
      <h2>Add Scenario</h2>
        <div className='scenario-inputs' >
          <div>
            <label htmlFor="name">Scenario Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={scenarioData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="time">Scenario Time(seconds) </label>
            <input
              type="number"
              id="time"
              name="time"
              value={scenarioData.time}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div>
          <button className='btn green' type="submit">Add</button>
          <button className='btn orange' type="button" onClick={handleReset}>Reset</button>
          <button className='btn blue' type="button" onClick={handleGoBack}>Go Back</button>
        </div>
        
      </form>
    </div>
  );
};

export default AddScenario;