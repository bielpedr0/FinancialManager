// MonthlyBarChart.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MonthlyBarChart = ({ data }) => {
  return (
    <div>
      <h3 style={{ textAlign: 'center' }}>Receitas x Despesas</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="#82ca9d" name="Receita" />
          <Bar dataKey="expense" fill="#ff8042" name="Despesa" />
          
          
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyBarChart;