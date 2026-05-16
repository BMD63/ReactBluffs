import { Button } from '@/shared/ui/button';

import './start-screen.css';

type StartScreenProps = {
  onStart: () => void;
};

const features = [
  {
    icon: '🎭',
    title: '3 режима',
    text: 'Выбирайте свой формат игры',
  },
  {
    icon: '🧠',
    title: 'Факты и блеф',
    text: 'Проверяйте знания и интуицию',
  },
  {
    icon: '🏆',
    title: 'Очки',
    text: 'Собирайте результат по раундам',
  },
];

const StartScreen = ({ onStart }: StartScreenProps) => {
  return (
    <section className="start-screen">
      <p className="start-screen__eyebrow">Викторина</p>

      <h1 className="start-screen__title">ReactBluffs</h1>

      <div className="start-screen__hero">
        <div className="start-screen__content">
          <h2 className="start-screen__headline">
            Где знания встречаются с интуицией
          </h2>

          <p className="start-screen__description">
            Выбирайте режим, проверяйте факты и набирайте очки.
          </p>

          <div className="start-screen__features">
            {features.map((feature) => (
              <div key={feature.title} className="start-screen__feature">
                <span className="start-screen__feature-icon">
                  {feature.icon}
                </span>

                <div>
                  <strong>{feature.title}</strong>
                  <span>{feature.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="start-screen__visual" aria-hidden="true">
          <div className="start-screen__orb">
            <div className="start-screen__cube">
              <span>?</span>
            </div>
          </div>

          <div className="start-screen__floating-card start-screen__floating-card--left">
            Да / Нет
          </div>

          <div className="start-screen__floating-card start-screen__floating-card--right">
            A B C
          </div>
        </div>
      </div>

      <Button variant="primary" className="start-screen__cta" onClick={onStart}>
        Начать игру
      </Button>
    </section>
  );
};

export default StartScreen;
