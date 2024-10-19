import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRoutes from "./AppRoutes";
import "./global.css";
import { BrowserRouter as Router } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import AuthProvider from './contexts/auth/AuthContext';
import { Toaster } from "@/components/ui/toaster"
const queryClient = new QueryClient(
  {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  }
)
createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <Router>
     <QueryClientProvider client={queryClient}>   
     <AuthProvider>
    <AppRoutes />
    <Toaster />
    </AuthProvider>
    </QueryClientProvider>
    </Router>
  </StrictMode>,
)
