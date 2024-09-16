import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRoutes from "./AppRoutes";
import "./global.css";
import { BrowserRouter as Router } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <Router>
     <QueryClientProvider client={queryClient}>   
     
    <AppRoutes />

    </QueryClientProvider>
    </Router>
  </StrictMode>,
)
