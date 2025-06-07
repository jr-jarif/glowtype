
import React from 'react';
import { LeaderboardEntry } from '../../types';
import { useTheme } from '../../contexts/ThemeContext';
import GlassmorphismCard from '../common/GlassmorphismCard';
import { FaTrophy, FaUserCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface LeaderboardTableProps {
  data: LeaderboardEntry[];
  title: string;
}

const tableContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const tableRowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ data, title }) => {
  const { theme } = useTheme();

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-400';
    if (rank === 2) return 'text-gray-400';
    if (rank === 3) return 'text-orange-400';
    return theme.textColor;
  };

  return (
    <GlassmorphismCard className="overflow-x-auto">
      <h3 className={`text-2xl font-semibold mb-6 text-center ${theme.accentColor}`}>{title}</h3>
      <motion.table 
        className="w-full min-w-[600px] text-left"
        variants={tableContainerVariants}
        initial="hidden"
        animate="visible"
      >
        <thead>
          <tr className={`border-b ${theme.borderColor}`}>
            <th className={`p-3 text-sm font-semibold ${theme.textColor} opacity-80 w-16`}>Rank</th>
            <th className={`p-3 text-sm font-semibold ${theme.textColor} opacity-80`}>Player</th>
            <th className={`p-3 text-sm font-semibold ${theme.textColor} opacity-80 text-center`}>WPM</th>
            <th className={`p-3 text-sm font-semibold ${theme.textColor} opacity-80 text-center`}>Accuracy</th>
            <th className={`p-3 text-sm font-semibold ${theme.textColor} opacity-80`}>Mode</th>
            <th className={`p-3 text-sm font-semibold ${theme.textColor} opacity-80 text-right`}>Date</th>
          </tr>
        </thead>
        <tbody>
          {data.sort((a,b) => a.rank - b.rank).map((entry) => (
            <motion.tr 
              key={entry.rank} 
              className={`border-b ${theme.borderColor} last:border-b-0 hover:${theme.glassBgClass.replace('10','20')} transition-colors`}
              variants={tableRowVariants}
            >
              <td className={`p-3 font-medium ${getRankColor(entry.rank)} flex items-center`}>
                {entry.rank <= 3 && <FaTrophy className={`mr-1 ${getRankColor(entry.rank)}`} />}
                {entry.rank}
              </td>
              <td className={`p-3 ${theme.textColor} flex items-center`}>
                <FaUserCircle className="mr-2 opacity-70" size={18}/> {entry.username}
              </td>
              <td className={`p-3 font-semibold ${theme.accentColor} text-center`}>{entry.wpm}</td>
              <td className={`p-3 ${theme.textColor} text-center`}>{entry.accuracy.toFixed(1)}%</td>
              <td className={`p-3 ${theme.textColor} opacity-90 text-xs`}>{entry.testMode}</td>
              <td className={`p-3 ${theme.textColor} opacity-70 text-xs text-right`}>{new Date(entry.date).toLocaleDateString()}</td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>
      {data.length === 0 && <p className={`text-center py-8 ${theme.textColor} opacity-70`}>No entries yet. Be the first!</p>}
    </GlassmorphismCard>
  );
};

export default LeaderboardTable;
