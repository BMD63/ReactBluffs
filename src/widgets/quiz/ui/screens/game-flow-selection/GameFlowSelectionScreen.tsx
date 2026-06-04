import { GAME_FLOW_MODE, type GameFlowMode } from '@/entities/game-flow';

import { Button } from '@/shared/ui/button';

import './game-flow-selection-screen.css';

type GameFlowSelectionScreenProps = {
  onSelectGameFlowMode: (mode: GameFlowMode) => void;
  onBack: () => void;
};

const gameFlowModes = [
  {
    mode: GAME_FLOW_MODE.TRAINING,
    icon: '🎭',
    title: 'Тренировка',
    description:
      'Обычный режим викторины: выберите тип вопросов и проходите игру в привычном формате.',
    buttonText: 'Выбрать',
    isAvailable: true,
  },
  {
    mode: GAME_FLOW_MODE.TOURNAMENT,
    icon: '🏆',
    title: 'Турнир',
    description:
      'Режим, приближенный к оффлайн-квизу: туры, таймеры, ответы по раундам и финальный результат.',
    buttonText: 'Выбрать',
    isAvailable: true,
  },
];

const GameFlowSelectionScreen = ({
  onSelectGameFlowMode,
  onBack,
}: GameFlowSelectionScreenProps) => {
  return (
    <section className="game-flow-selection">
      <div className="game-flow-selection__header">
        <p className="game-flow-selection__eyebrow">ReactBluffs</p>

        <h1 className="game-flow-selection__title">Выберите режим</h1>
      </div>

      <div className="game-flow-selection__grid">
        {gameFlowModes.map((item) => (
          <article
            key={item.mode}
            className={`game-flow-card ${
              item.isAvailable ? 'game-flow-card--active' : ''
            }`}
          >
            <div className="game-flow-card__icon">{item.icon}</div>

            <div className="game-flow-card__content">
              <h2>{item.title}</h2>

              <p>{item.description}</p>
            </div>

            <Button
              variant={item.isAvailable ? 'primary' : 'secondary'}
              disabled={!item.isAvailable}
              onClick={() => onSelectGameFlowMode(item.mode)}
            >
              {item.buttonText}
            </Button>
          </article>
        ))}
      </div>

      <div className="game-flow-selection__actions">
        <Button variant="secondary" onClick={onBack}>
          ← Назад
        </Button>
      </div>
    </section>
  );
};

export default GameFlowSelectionScreen;
