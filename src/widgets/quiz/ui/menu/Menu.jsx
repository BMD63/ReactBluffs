import { useDispatch, useSelector } from 'react-redux';
import { SCREEN, setScreen } from '@/entities/quiz-session/model/quizUISlice';
import { initGame } from '@/entities/quiz-session/model/thunks/initGame';
import { selectDifficulty } from '@/entities/quiz-session/model/selectors';
import { difficultyConfig } from '@/entities/quiz-session/model/config/difficultyConfig';
import Button from '@/shared/ui/button/Button';
import './menu.css';


const Menu = () => {
  const dispatch = useDispatch();
  const difficulty = useSelector(selectDifficulty);

  const handleStart = () => {
    dispatch(initGame());
    dispatch(setScreen(SCREEN.GAME));
  };

  const currentDifficulty = difficultyConfig[difficulty];

  return (
    <nav className="menu">
      <h1 className="menu-title">QUIZ</h1>

      <div className="menu-actions">
        <Button variant="primary" onClick={handleStart}>
          Начать игру
        </Button>

        <Button
          variant="card"
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
          variant="card"
          onClick={() => dispatch(setScreen(SCREEN.RULES))}
        >
          Правила
        </Button>
      </div>
    </nav>
  );
};

export default Menu;