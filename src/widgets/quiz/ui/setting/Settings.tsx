import {
  SCREEN,
  setScreen,
  setDifficulty,
} from '@/entities/quiz-session';
import {
  gameModeConfig,
} from '@/entities/game-mode';

import {
  selectGameMode,
} from '@/entities/quiz-session/model/selectors';
import { selectDifficulty } from '@/entities/quiz-session/model/selectors';
import { difficultyConfig } from '@/entities/quiz-session/model/config/difficultyConfig';
import { Button } from '@/shared/ui/button';
import './settings.css'
import { typedEntries } from '@/shared/lib/object/typedEntries';

import {
  useAppDispatch,
  useAppSelector,
} from '@/shared/lib/hooks/redux';

const Settings = () => {
  const dispatch = useAppDispatch();
  const difficulty = useAppSelector(selectDifficulty);
  const gameMode = useAppSelector(selectGameMode);
  const gameModeDifficulty = gameModeConfig[gameMode].difficulty;
  const currentDifficulty = {
    ...difficultyConfig[difficulty],
    ...gameModeDifficulty[difficulty],
  };
  const difficultyEntries = typedEntries(difficultyConfig).map(
    ([key, value]) => [
      key,
      {
        ...value,
        ...gameModeDifficulty[key],
      },
    ] as const
  );

  return (
    <div className="settings">
      <h2 className="settings-title">Выбор сложности</h2>
      <div className="menu-subtext">
        {currentDifficulty.title} • {currentDifficulty.questionsPerCard}×{currentDifficulty.manualCardsCount}
      </div>

      <div className="difficulty-list">
        
        {difficultyEntries.map(([key, value]) => (
          <div
            key={key}
            className={`difficulty-card ${difficulty === key ? 'active' : ''}`}
            onClick={() => dispatch(setDifficulty(key))}
            style={{ borderColor: value.color }}
          >
            <div className="difficulty-header">
              <span className="difficulty-icon">{value.icon}</span>
              <h3>{value.title}</h3>
            </div>

            <p className="difficulty-description">
              {value.description}
            </p>

            <div className="difficulty-meta">
              {value.questionsPerCard} вопросов × {value.manualCardsCount} раундов
            </div>

            {difficulty === key && (
              <div className="selected-badge">Выбрано</div>
            )}
          </div>
        ))}
      </div>

      <Button
        variant="primary"
        className="back-btn"
        onClick={() => dispatch(setScreen(SCREEN.BLUFF_MENU))}
      >
        ← Назад
      </Button>
    </div>
  );
};

export default Settings;