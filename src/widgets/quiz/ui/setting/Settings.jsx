import { useDispatch, useSelector } from 'react-redux';
import { SCREEN, setScreen, setDifficulty } from '@/entities/quiz-session/model/quizUISlice';
import { selectDifficulty } from '@/entities/quiz-session/model/selectors';
import { difficultyConfig } from '@/entities/quiz-session/model/config/difficultyConfig';
import './settings.css'

const Settings = () => {
  const dispatch = useDispatch();
  const difficulty = useSelector(selectDifficulty);
  const currentDifficulty = difficultyConfig[difficulty];

  return (
    <div className="settings">
      <h2 className="settings-title">Выбор сложности</h2>
      <div className="menu-subtext">
        {currentDifficulty.title} • {currentDifficulty.questionsPerCard}×{currentDifficulty.manualCardsCount}
      </div>

      <div className="difficulty-list">
        
        {Object.entries(difficultyConfig).map(([key, value]) => (
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

      <button
        className="back-btn"
        onClick={() => dispatch(setScreen(SCREEN.MENU))}
      >
        ← Назад
      </button>
    </div>
  );
};

export default Settings;