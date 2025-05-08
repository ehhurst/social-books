import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import CompetitionBookListContext from './Contexts/CompetitionBookListContext.tsx'
import AuthContext from './Contexts/AuthContext.tsx'
import { BrowserRouter } from 'react-router-dom'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthContext>
        <CompetitionBookListContext>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CompetitionBookListContext>
    </AuthContext>
  </StrictMode>
)
