import { GAME_MODE, gameModeConfig, type GameMode } from '@/entities/game-mode';

import { Button } from '@/shared/ui/button';

import './mode-selection-screen.css';

type ModeSelectionScreenProps = {
  onSelectMode: (mode: GameMode) => void;

  onBack: () => void;
};

const ModeSelectionScreen = ({
  onSelectMode,
  onBack,
}: ModeSelectionScreenProps) => {
  const gameModes = [
    GAME_MODE.BLUFF,
    GAME_MODE.MULTIPLE_CHOICE,
    GAME_MODE.OPEN_ANSWER,
  ];
  return (
    <section className="mode-selection">
      <div className="mode-selection__header">
        <p className="mode-selection__eyebrow">ReactBluffs</p>

        <h1 className="mode-selection__title">Выберите режим игры</h1>

        <p className="mode-selection__description">
          Каждый режим предлагает свой стиль вопросов и правила.
        </p>
      </div>

      <div className="mode-selection__grid">
        {gameModes.map((mode) => {
          const config = gameModeConfig[mode];

          return (
            <article
              key={mode}
              className={`mode-card ${
                config.isAvailable ? 'mode-card--active' : ''
              }`}
            >
              <div className="mode-card__icon">{config.icon}</div>

              <h2>{config.title}</h2>

              <p>{config.description}</p>

              <Button
                variant={config.isAvailable ? 'primary' : 'secondary'}
                disabled={!config.isAvailable}
                onClick={() => onSelectMode(mode)}
              >
                {config.isAvailable ? 'Играть' : 'Скоро'}
              </Button>
            </article>
          );
        })}
      </div>
      <div className="mode-selection__actions">
        <Button variant="secondary" onClick={onBack}>
          ← Назад
        </Button>
      </div>
    </section>
  );
};

export default ModeSelectionScreen;
