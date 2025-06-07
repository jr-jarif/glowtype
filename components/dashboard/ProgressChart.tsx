
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useTheme } from '../../contexts/ThemeContext';
import GlassmorphismCard from '../common/GlassmorphismCard';

// Mock data for demonstration
const mockProgressData = [
  { date: 'Mon', wpm: 70, accuracy: 95 },
  { date: 'Tue', wpm: 75, accuracy: 96 },
  { date: 'Wed', wpm: 72, accuracy: 94 },
  { date: 'Thu', wpm: 80, accuracy: 97 },
  { date: 'Fri', wpm: 85, accuracy: 98 },
  { date: 'Sat', wpm: 82, accuracy: 96 },
  { date: 'Sun', wpm: 90, accuracy: 99 },
];

const ProgressChart: React.FC = () => {
  const { theme } = useTheme();

  return (
    <GlassmorphismCard className="h-96"> {/* Ensure card has height */}
      <h3 className={`text-xl font-semibold mb-4 ${theme.accentColor}`}>Your Progress (Last 7 Days)</h3>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={mockProgressData}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.borderColor} strokeOpacity={0.3} />
          <XAxis dataKey="date" stroke={theme.textColor} opacity={0.7} tick={{ fontSize: '0.8rem' }} />
          <YAxis yAxisId="left" orientation="left" stroke={theme.accentColorHex || '#8884d8'} tick={{ fontSize: '0.8rem' }} domain={[60, 'dataMax + 10']}/>
          <YAxis yAxisId="right" orientation="right" stroke={theme.textColor} opacity={0.7} domain={[90, 100]} tickFormatter={(value) => `${value}%`} tick={{ fontSize: '0.8rem' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: theme.glassBgClass.split(' ')[0],
              backdropFilter: 'blur(5px)',
              border: `1px solid ${theme.borderColor}`,
              borderRadius: '0.5rem',
              color: theme.textColor,
            }}
             labelStyle={{ fontWeight: 'bold' }}
          />
          <Legend wrapperStyle={{ color: theme.textColor, fontSize: '0.9rem', paddingTop: '10px' }}/>
          <Line yAxisId="left" type="monotone" dataKey="wpm" name="WPM" stroke={theme.accentColorHex || '#8884d8'} strokeWidth={2} activeDot={{ r: 6 }} />
          <Line yAxisId="right" type="monotone" dataKey="accuracy" name="Accuracy (%)" stroke={theme.textColor} strokeWidth={2} strokeOpacity={0.7} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </GlassmorphismCard>
  );
};

export default ProgressChart;
