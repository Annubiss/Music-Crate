import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter  } from 'react-router'
import { CollectionProvider } from './context/CollectionContext.tsx'
import { PlaylistsProvider } from './context/PlaylistsContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CollectionProvider>
        <PlaylistsProvider>
          <App />
        </PlaylistsProvider>
      </CollectionProvider>
    </BrowserRouter>
  </StrictMode>,
)

