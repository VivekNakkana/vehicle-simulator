### Vehicle Simulator

#### About: 
In this we will be creating Scenarios and these scenarios will have Vehicles. These vehicles will have various properties like speed, direction etc,. Based on the position of the vehicle on the graph, the simulation starts and continuous until the scenarios time. 

#### Problem Statment:
* Build an application using React.js.
* The application should be able to create, display, update, delete Scenario and Vehicle, a
scenario can have multiple vehicles, and vehicles should be able move when user click a button
based on the scenario and vehicles parameters.
* The scenario should have following fields:
  * Scenario id
  * Scenario name
  * Time
  * The Vehicle should have following fields:
  * Vehicle id
  * Vehicle name
  * Initial Position X
  * Initial Position Y
  * Speed
  * Direction (can have only Towards, Backwards, Upwards and Downwards).
* For storing data use json-server.
* You have to create sidebar like displayed in the below images.
* Inside Home page user can be able to select the scenario whichever scenarios he has created
and start simulation, when user click start simulation vehicles should start moving based on the
direction and speed, till the scenario time, if the vehicles is going outside the container then
vehicles should hide.
* While adding the Vehicle do proper validation like user should not be able to add the positions
greater than the Home page’s graph container size.

#### To run this locally - Follow the steps below.

* clone the repo
* this is frontend of our project -- to run this use the command 
> npm run dev

this will be run at localhost:5173.


#### Thought process while creating this one.

- first created App.jsx and added the required routes
- sidebar is created and linked the routes to respective pages.
- AddScenario page is created. to sace the created scenarios and vehicles we need a database and fetch we needed a server, to make it easy we will be using json server.
- we will be adding json-server as our backend.
- AddScanario will have input field, these are saved into json-server.
- AddVehicle page is created where we will take the inputs and save them according to scenarios.
- In AllScenarios -- list of scenarios are showns with the number of vehicles and other additional functions.
- In Home pages, list of vehicles are shown with respective to senario. Based on the Position of vehicles when the simulation is started, they will move in given direction.


