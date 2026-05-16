import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/app/styles/global.css';
import { Provider } from 'react-redux';
import { store } from '@/app/providers/store/store';
import QuizPage from './pages/quiz-page/ui/QuizPage';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <Provider store={store}>
      <QuizPage />
    </Provider>
  </StrictMode>
);
