import { Button } from '@/shared/ui/button';
import startImage from '@/shared/assets/images/startImage.webp';
import './start-screen.css';

type StartScreenProps = {
  onStart: () => void;
};

const features = [
  {
    icon: '🎭',
    title: '3 режима',
  },
  {
    icon: '🧠',
    title: 'Факты и блеф',
  },
  {
    icon: '🏆',
    title: 'Очки',
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
            Где знания встречаются с <span>интуицией</span>
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
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="start-screen__visual" aria-hidden="true">
          <div className="start-screen__visual-image-wrapper">
            <img
              src={startImage}
              alt=""
              className="start-screen__visual-image"
            />
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
