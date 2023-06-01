import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./pages/Home/Home"
import AddScenario from "./pages/AddScenario/AddScenario"
import AddVehicle from "./pages/AddVehicle/AddVehicle"
import AllScenarios from "./pages/AllScenarios/AllScenarios"
import "./app.css"
import Sidebar from "./components/Sidebar/Sidebar"

function App() {
  return (
    <Router>
      <div className="main-body" >
        <Sidebar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/addvehicle" element={<AddVehicle/>} />
          <Route path="/addscenario" element={<AddScenario/>} />
          <Route path="/allscenarios" element={<AllScenarios/>} />
          <Route path="/addvehicle/:scenarioId" element={<AddVehicle />} />
        </Routes>
      </div>
      
    </Router>
  )
}

export default App
