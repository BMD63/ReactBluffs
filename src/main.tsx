import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/app/styles/global.css';
import '@/shared/ui/input/input.css';
import { Provider } from 'react-redux';
import { store } from '@/app/providers/store/store';
import QuizPage from './pages/quiz-page/ui/QuizPage';
import AdminPage from './pages/admin-page/ui/AdminPage';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

const pathname = window.location.pathname;

const isAdminPage = pathname.endsWith('/admin');

const App = isAdminPage ? AdminPage : QuizPage;
createRoot(rootElement).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
