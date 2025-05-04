import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import CompetitionBookListContext from './Contexts/CompetitionBookListContext.tsx'
import AuthContext from './Contexts/AuthContext.tsx'
import { CompetitionProvider } from './Contexts/CompetitionContext.tsx'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthContext>
      <CompetitionProvider>
        <CompetitionBookListContext>
          <App />
        </CompetitionBookListContext>
      </CompetitionProvider>
    </AuthContext>
  </StrictMode>
)
