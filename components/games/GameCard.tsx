import React from 'react';
import { Link } from 'react-router-dom';
import { Game } from '../../types';
import { useTheme } from '../../contexts/ThemeContext';
import GlassmorphismCard from '../common/GlassmorphismCard';
import Button from '../common/Button';

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const { theme } = useTheme();

  return (
    <GlassmorphismCard className="flex flex-col">
      <img src={game.imageUrl} alt={game.title} className="w-full h-48 object-cover rounded-t-lg mb-4" />
      <div className="flex flex-col flex-grow p-1">
        <h3 className={`text-xl font-semibold mb-2 ${theme.accentColor}`}>{game.title}</h3>
        <p className={`${theme.textColor} opacity-80 text-sm mb-4 flex-grow`}>{game.description}</p>
        <Link to={game.path} className="mt-auto">
          <Button variant="primary" className="w-full" disabled={game.description.includes("(Coming Soon)")}>
            {game.description.includes("(Coming Soon)") ? "Coming Soon" : "Play Game"}
          </Button>
        </Link>
      </div>
    </GlassmorphismCard>
  );
};

export default GameCard;