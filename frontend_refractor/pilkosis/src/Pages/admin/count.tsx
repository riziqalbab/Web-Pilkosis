import React, { useEffect, useRef } from 'react';
import { Chart, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, BarController } from 'chart.js';
import { io } from 'socket.io-client';


Chart.register(BarElement, BarController, CategoryScale, LinearScale, Title, Tooltip, Legend);



interface PaslonData {
  id?: number;
  nomor_urut: string;
  nama: string;
  caksis: string;
  cawaksis: string;
  visi: string;
  misi: string;
  program_kerja: string;
  img: string;
  total?: number;
}

const PaslonChart: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  const fetchPaslonData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/paslon');
      const result = await response.json();

      if (response.ok) {
        const paslons: PaslonData[] = result.data;
        updateChart(paslons);
      } else {
        console.error('Failed to fetch paslon data:', result.message);
      }
    } catch (error) {
      console.error('Error fetching paslon data:', error);
    }
  };

  const updateChart = (paslons: PaslonData[]) => {
    if (chartInstance.current) {
      const labels = paslons.map(paslon => paslon.nama);
      const data = paslons.map(paslon => paslon.total || 0);

      chartInstance.current.data.labels = labels;
      chartInstance.current.data.datasets[0].data = data;
      chartInstance.current.update();
    }
  };

  useEffect(() => {
    if (chartRef.current) {
      chartInstance.current = new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: [],
          datasets: [{
            label: 'Total Votes',
            data: [],
            backgroundColor: 'blue', // Static color
            borderColor: 'red', // Static border color
            borderWidth: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

      fetchPaslonData();

      const socket = io('http://localhost:3000'); // Ensure the URL is correct

      socket.on('updatePaslonData', (paslons: PaslonData[]) => {
        console.log('Received data:', paslons); // Debug log
        updateChart(paslons);
      });

      socket.on('error', (err: any) => {
        console.error(err.message);
      });

      return () => {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
      };
    }
  }, []);

  return (
    <div className='overflow-hidden'>   
    <h1 className='text-center text-4xl font-bold'>HASIL SUARA</h1>
     <div  className='' style={{maxWidth:'1200px', width: '80%', height: '400px', margin: '10rem auto' }}>
      
      <canvas ref={chartRef} style={{ width: '100%', height: '100%' }}></canvas>
    </div>
    </div>

  );
};

export default PaslonChart;
