import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const BalanceLineChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Sem dados de saldo para exibir o gráfico.</p>;
  }

  return (
    <div>
      <h3 style={{ textAlign: 'center' }}>Evolução do Saldo</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="balance" stroke="#8884d8" name="Saldo" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BalanceLineChart;