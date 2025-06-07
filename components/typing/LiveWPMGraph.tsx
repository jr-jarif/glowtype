
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { WpmDataPoint } from '../../types';
import { useTheme } from '../../contexts/ThemeContext';

interface LiveWPMGraphProps {
  data: WpmDataPoint[];
}

const LiveWPMGraph: React.FC<LiveWPMGraphProps> = ({ data }) => {
  const { theme } = useTheme();

  if (!data || data.length < 2) {
    return (
      <div className={`flex items-center justify-center h-full ${theme.textColor} opacity-50`}>
        Waiting for more data to plot graph...
      </div>
    );
  }
  
  // Ensure y-axis starts near the minimum WPM or 0 and goes a bit above max WPM.
  const wpmValues = data.map(d => d.wpm);
  const minWpm = Math.max(0, Math.min(...wpmValues) - 10);
  const maxWpm = Math.max(...wpmValues) + 10;


  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 20,
          left: -20, // Adjust to make Y-axis labels visible
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={theme.borderColor} strokeOpacity={0.3} />
        <XAxis 
          dataKey="time" 
          tickFormatter={(tick) => `${tick}s`} 
          stroke={theme.textColor} 
          opacity={0.7}
          tick={{ fontSize: '0.75rem' }} 
        />
        <YAxis 
          domain={[minWpm, maxWpm]} 
          allowDecimals={false} 
          stroke={theme.textColor} 
          opacity={0.7}
          tick={{ fontSize: '0.75rem' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: theme.glassBgClass.split(' ')[0], // 'bg-color/opacity' -> 'bg-color'
            backdropFilter: 'blur(5px)',
            border: `1px solid ${theme.borderColor}`,
            borderRadius: '0.5rem',
            color: theme.textColor,
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          }}
          labelStyle={{ color: theme.accentColor, fontWeight: 'bold' }}
          itemStyle={{ color: theme.textColor }}
          formatter={(value: number) => [`${value.toFixed(0)} WPM`, "Speed"]}
          labelFormatter={(label) => `Time: ${label}s`}
        />
        {/* <Legend wrapperStyle={{ color: theme.textColor, fontSize: '0.8rem' }} /> */}
        <Line 
            type="monotone" 
            dataKey="wpm" 
            stroke={theme.accentColorHex || '#8884d8'} // Use hex for Recharts stroke
            strokeWidth={2} 
            dot={{ r: 3, fill: theme.accentColorHex || '#8884d8' }}
            activeDot={{ r: 6 }} 
            name="WPM"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LiveWPMGraph;
