

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, ChartTooltip, Legend);

const data = [
  { name: 'Sep', Received: 10, Due: 15 },
  { name: 'Oct', Received: 20, Due: 25 },
  { name: 'Nov', Received: 40, Due: 30 },
  { name: 'Dec', Received: 50, Due: 40 },
  { name: 'Jan', Received: 70, Due: 60 },
  { name: 'Feb', Received: 80, Due: 65 },
  { name: 'Mar', Received: 90, Due: 80 },
  { name: 'Apr', Received: 85, Due: 75 },
  { name: 'May', Received: 95, Due: 85 },
  { name: 'Jun', Received: 100, Due: 90 },
  { name: 'Jul', Received: 95, Due: 85 },
  { name: 'Aug', Received: 100, Due: 90 },
];

const deviceData = {
  labels: ['Mobile', 'Tablet', 'Desktop'],
  datasets: [
    {
      data: [10, 20, 70],
      backgroundColor: ['#4F46E5', '#60A5FA', '#0EA5E9'],
      borderWidth: 0,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    tooltip: {
      callbacks: {
        label: (tooltipItem) => {
          const value = tooltipItem.raw;
          return `${tooltipItem.label}: ${value}%`;
        },
      },
    },
  },
  cutout: '70%',
};

const Crmsection = () => {
  return (
    <div className="flex flex-col items-center gap-4 xl:flex-row mt-7 md:gap-6 2xl:gap-7">
      <div className="w-full xl:w-7/12">
        <div className="w-full px-5 py-5 bg-white border rounded-sm shadow-sm sm:px-7 border-stroke md:py-8">
          <div className="flex flex-col gap-2 mb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h4 className="font-bold text-black text-[22px]">Payments Overview</h4>
            </div>
            <div className="flex items-center">
              <p className="font-medium text-black uppercase">Short by:</p>
              <div className="relative z-20 inline-block">
                <select
                  name=""
                  className="relative z-20 inline-flex py-1 pl-3 pr-8 font-medium bg-transparent outline-none appearance-none"
                  id=""
                >
                  <option value="">Monthly</option>
                  <option value="">Weekly</option>
                </select>
              </div>
            </div>
          </div>
          <div>
            <div className="w-full h-64">
              <ResponsiveContainer>
                <AreaChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="Received"
                    stroke="#4F46E5"
                    fill="rgba(79, 70, 229, 0.3)"
                  />
                  <Area
                    type="monotone"
                    dataKey="Due"
                    stroke="#A5B4FC"
                    fill="rgba(165, 180, 252, 0.3)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="flex flex-col w-full text-center md:flex-row">
            <div className="py-2 w-full md:w-6/12 border-[var(--border-color)] border-r">
              <p className="font-medium text-[#64748b] text-[16px]">Received Amount</p>
              <h4 className="mt-1 font-bold text-black text-[20px]">$45,070.00</h4>
            </div>
            <div className="py-2 font-bold text-black text-[20px] w-full md:w-6/12">
              <p className="font-medium text-[#64748b] text-[16px]">Due Amount</p>
              <h4 className="mt-1 font-bold text-black text-[20px]">$32,400.00</h4>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full xl:w-5/12">
        <div className="w-full px-5 pb-5 bg-white border rounded-sm shadow-sm sm:px-7 border-stroke pt-7">
          <div className="flex flex-col gap-2 mb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h4 className="font-bold text-black text-[22px]">Used Devices</h4>
            </div>
            <div className="flex items-center">
              <p className="font-medium text-black uppercase">Short by:</p>
              <div className="relative z-20 inline-block">
                <select
                  name=""
                  className="relative z-20 inline-flex py-1 pl-3 pr-8 font-medium bg-transparent outline-none appearance-none"
                  id=""
                >
                  <option value="">Monthly</option>
                  <option value="">Weekly</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center w-full">
            {/* Donut Chart */}
            <div className="w-64 h-64">
              <Doughnut data={deviceData} options={options} />
            </div>

            {/* Legend */}
            <div className="flex flex-col items-start mt-4">
              {deviceData.labels.map((label, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span
                    className="block w-4 h-4 rounded-full"
                    style={{ backgroundColor: deviceData.datasets[0].backgroundColor[index] }}
                  ></span>
                  <span className="font-medium text-gray-700">{label}</span>
                  <span className="ml-auto text-gray-500">{deviceData.datasets[0].data[index]}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Crmsection;

