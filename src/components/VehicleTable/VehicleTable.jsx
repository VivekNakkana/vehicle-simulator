import React from 'react';

const VehicleTable = ({ vehicles, onDelete, onEdit }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Vehicle ID</th>
            <th>Vehicle Name</th>
            <th>Position X</th>
            <th>Position Y</th>
            <th>Speed</th>
            <th>Direction</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle,index) => (
            <tr key={vehicle.id}>
              <td>{index+1}</td>
              <td>{vehicle.name}</td>
              <td>{vehicle.positionX}</td>
              <td>{vehicle.positionY}</td>
              <td>{vehicle.speed}</td>
              <td>{vehicle.direction}</td>
              <td>
                <button onClick={() => onEdit(vehicle.id)}>Edit</button>
              </td>
              <td>
                <button onClick={() => onDelete(vehicle.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VehicleTable;
