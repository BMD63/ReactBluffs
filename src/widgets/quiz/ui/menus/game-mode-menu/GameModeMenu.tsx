import {
  gameModeConfig,
} from '@/entities/game-mode';

import {
  SCREEN,
  setScreen,
} from '@/entities/quiz-session';

import { initGame } from '@/entities/quiz-session/model/thunks/initGame';
import {
  selectDifficulty,
  selectGameMode,
} from '@/entities/quiz-session/model/selectors';
import { difficultyConfig } from '@/entities/quiz-session/model/config/difficultyConfig';

import { Button } from '@/shared/ui/button';

import {
  useAppDispatch,
  useAppSelector,
} from '@/shared/lib/hooks/redux';

import './game-mode-menu.css';

const GameModeMenu = () => {
  const dispatch = useAppDispatch();
  const difficulty = useAppSelector(selectDifficulty);
  const gameMode = useAppSelector(selectGameMode);
  const gameModeDifficulty = gameModeConfig[gameMode].difficulty;
  const handleStart = () => {
    dispatch(initGame());
    dispatch(setScreen(SCREEN.GAME));
  };

  const currentDifficulty = {
    ...difficultyConfig[difficulty],
    ...gameModeDifficulty[difficulty],
  };

  return (
    <nav className="game-mode-menu">
      <h1 className="menu-title">QUIZ</h1>

      <div className="menu-actions">
        <Button variant="menu" onClick={handleStart}>
          Начать игру
        </Button>

        <Button
          variant="menu"
          onClick={() => dispatch(setScreen(SCREEN.SETTINGS))}
        >
          <span>{currentDifficulty.icon}</span>
          <div className="menu-card-content">
            Сложность
            <div className="menu-subtext">
              {currentDifficulty.title}
            </div>
          </div>
        </Button>

        <Button
          variant="menu"
          onClick={() => dispatch(setScreen(SCREEN.RULES))}
        >
          Правила
        </Button>
        <Button
          variant="menu"
          className="btn--back"
          onClick={() => dispatch(setScreen(SCREEN.MODE_SELECTION))}
        >
          ← Назад
        </Button>
      </div>
    </nav>
  );
};

export default GameModeMenu;