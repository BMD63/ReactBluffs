import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import QuizPage from "./pages/quiz-page/ui/QuizPage.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QuizPage />
  </StrictMode>,
)
