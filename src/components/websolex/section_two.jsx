import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend as lad } from 'chart.js';

ChartJS.register(ArcElement, ChartTooltip, lad);



const ChartComponent = () => {
    const datas = {
        ThisWeek: [
            { name: 'M', Sales: 50, Revenue: 20 },
            { name: 'T', Sales: 80, Revenue: 30 },
            { name: 'W', Sales: 70, Revenue: 25 },
            { name: 'T', Sales: 60, Revenue: 40 },
            { name: 'F', Sales: 30, Revenue: 15 },
            { name: 'S', Sales: 90, Revenue: 50 },
            { name: 'S', Sales: 80, Revenue: 45 },
        ],
        LastWeek: [
            { name: 'M', Sales: 40, Revenue: 15 },
            { name: 'T', Sales: 70, Revenue: 20 },
            { name: 'W', Sales: 60, Revenue: 30 },
            { name: 'T', Sales: 50, Revenue: 25 },
            { name: 'F', Sales: 20, Revenue: 10 },
            { name: 'S', Sales: 80, Revenue: 35 },
            { name: 'S', Sales: 70, Revenue: 40 },
        ],
    };

    const data = {
        Day: [
            { name: '00:00', TotalRevenue: 10, TotalSales: 5 },
            { name: '06:00', TotalRevenue: 20, TotalSales: 10 },
            { name: '12:00', TotalRevenue: 30, TotalSales: 15 },
            { name: '18:00', TotalRevenue: 25, TotalSales: 20 },
        ],
        Week: [
            { name: 'Mon', TotalRevenue: 50, TotalSales: 30 },
            { name: 'Tue', TotalRevenue: 70, TotalSales: 40 },
            { name: 'Wed', TotalRevenue: 60, TotalSales: 35 },
            { name: 'Thu', TotalRevenue: 90, TotalSales: 50 },
            { name: 'Fri', TotalRevenue: 80, TotalSales: 45 },
        ],
        Month: [
            { name: 'Week 1', TotalRevenue: 200, TotalSales: 150 },
            { name: 'Week 2', TotalRevenue: 300, TotalSales: 200 },
            { name: 'Week 3', TotalRevenue: 400, TotalSales: 250 },
            { name: 'Week 4', TotalRevenue: 350, TotalSales: 220 },
        ],
    };

    const [currentView, setCurrentView] = useState('Month');
    const [currentsView, setCurrentsView] = useState('ThisWeek');

    return (
        <div className="flex flex-wrap items-center w-full gap-7 mb-7 ">
            <div className="w-full 2xl:w-[62.33%] ">
                <div className="w-full px-6 bg-white shadow-md py-7 border border-[var(--border-color)]">
                    <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                        {['Day', 'Week', 'Month'].map((view) => (
                            <button
                                key={view}
                                onClick={() => setCurrentView(view)}
                                style={{
                                    margin: '0 5px',
                                    padding: '10px 15px',
                                    backgroundColor: currentView === view ? 'var(--primary-color)' : '#f0f0f0',
                                    color: currentView === view ? '#fff' : '#000',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                }}
                            >
                                {view}
                            </button>
                        ))}
                    </div>

                    <ResponsiveContainer className={`width_class`} >
                        <LineChart
                            data={data[currentView]}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="TotalRevenue" stroke="#8884d8" strokeWidth={2} />
                            <Line type="monotone" dataKey="TotalSales" stroke="#82ca9d" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="w-full 2xl:w-4/12">
                <div className="w-full">
                    <div className="w-full px-5 pb-5 bg-white border rounded-sm shadow-sm sm:px-7 border-stroke pt-7">
                        <div className="flex flex-col gap-2 mb-6 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h4 className="font-bold text-black text-[22px]">Used Devices</h4>
                            </div>
                        </div>

                        <div style={{ width: '100%' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                                <h3>Profit this week</h3>
                                <select
                                    onChange={(e) => setCurrentsView(e.target.value)}
                                    style={{
                                        padding: '8px',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                        backgroundColor: '#fff',
                                        fontSize: '16px',
                                    }}
                                >
                                    <option value="ThisWeek">This Week</option>
                                    <option value="LastWeek">Last Week</option>
                                </select>
                            </div>

                            <ResponsiveContainer className={`width_classs`}  >
                                <BarChart
                                    data={datas[currentsView]} // Fixed prop
                                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="Sales" fill="var(--primary-color)" barSize={25} />
                                    <Bar dataKey="Revenue" fill="#93c5fd" barSize={25} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChartComponent;

