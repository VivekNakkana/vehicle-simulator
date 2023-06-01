import React, { useEffect, useRef, useState } from 'react';
import { Chart, LinearScale, PointElement, registerables } from 'chart.js';
import { ScatterController } from 'chart.js';
Chart.register(...registerables)

const Graph = ({ scenario, vehicles }) => {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [datasets, setDatasets] = useState([]);

  useEffect(() => {
    createDataset(vehicles);
  }, [vehicles]);

  useEffect(() => {
    if (chartInstance) {
      chartInstance.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    Chart.register(LinearScale, PointElement,ScatterController);
    

    const newChartInstance = new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
          },
          y: {
            type: 'linear',
            position: 'left',
          },
        },
        plugins: {
          title: {
            display: true,
            text: '',
          },
        },
        animation: {
          onProgress: (animation) => {
            updateDataset(animation.currentStep / animation.numSteps);
          },
        },
      },
    });

    setChartInstance(newChartInstance);

    return () => {
      if (newChartInstance) {
        newChartInstance.destroy();
      }
    };
  }, [datasets]);

  const createDataset = (vehicles) => {
    const newDatasets = vehicles.map((vehicle) => {
      const startPosition = { x: vehicle.positionX, y: vehicle.positionY };
      const endPosition = calculateEndPosition(startPosition, vehicle.speed, vehicle.direction, scenario.time);

      return {
        label: vehicle.name,
        data: [startPosition, endPosition],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        pointRadius: 8,
        pointHoverRadius: 10,
      };
    });

    setDatasets(newDatasets);
  };

  const calculateEndPosition = (startPosition, speed, direction, time) => {
    const distance = speed * time;
    const deltaX = distance * Math.cos(direction);
    const deltaY = distance * Math.sin(direction);
    const endPosition = {
      x: startPosition.x + deltaX,
      y: startPosition.y + deltaY,
    };

    return endPosition;
  };

  const updateDataset = (progress) => {
    const updatedDatasets = datasets.map((dataset) => {
      const startPosition = dataset.data[0];
      const endPosition = dataset.data[1];

      const interpolatedPosition = {
        x: startPosition.x + (endPosition.x - startPosition.x) * progress,
        y: startPosition.y + (endPosition.y - startPosition.y) * progress,
      };

      return {
        ...dataset,
        data: [startPosition, interpolatedPosition],
      };
    });

    setDatasets(updatedDatasets);
  };

  return (
    <div className="graph-container">
      <canvas ref={chartRef} />
    </div>
  );
};

export default Graph;
