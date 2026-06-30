import type { TournamentConfig } from '@/entities/tournament-config';

type ConfigurationCardProps = {
  config: TournamentConfig;
  isActive: boolean;
  onOpen: () => void;
};

const ConfigurationCard = ({
  config,
  isActive,
  onOpen,
}: ConfigurationCardProps) => {
  return (
    <button
      type="button"
      className={
        isActive
          ? 'admin-config-card admin-config-card--active'
          : 'admin-config-card'
      }
      onClick={onOpen}
    >
      <h3>{config.title}</h3>

      <p>{config.rounds.length} rounds</p>
    </button>
  );
};

export default ConfigurationCard;
