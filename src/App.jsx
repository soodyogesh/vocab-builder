import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import Layout from './components/Layout';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Scores from './pages/Scores';

// Create a theme with orange and pink colors
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff4d8c', // Vibrant pink
      light: '#ff79b0',
      dark: '#d6246b',
    },
    secondary: {
      main: '#ff7043', // Vibrant orange
      light: '#ff9a76',
      dark: '#c63f17',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
    gradient: {
      orange: 'linear-gradient(135deg, #ff7043 0%, #ff9a76 100%)',
      pink: 'linear-gradient(135deg, #ff4d8c 0%, #ff79b0 100%)',
      mixed: 'linear-gradient(135deg, #ff7043 0%, #ff4d8c 100%)',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      letterSpacing: '-0.02em',
      background: 'linear-gradient(135deg, #ff7043 0%, #ff4d8c 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      letterSpacing: '-0.01em',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #ff7043 0%, #ff4d8c 100%)',
          color: '#ffffff',
          boxShadow: 'none',
          '&:hover': {
            background: 'linear-gradient(135deg, #ff9a76 0%, #ff79b0 100%)',
            boxShadow: '0 4px 8px rgba(255, 77, 140, 0.3)',
          },
        },
        outlined: {
          borderColor: '#ff4d8c',
          color: '#ff4d8c',
          '&:hover': {
            borderColor: '#ff79b0',
            backgroundColor: 'rgba(255, 77, 140, 0.08)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
          transition: 'all 0.2s ease-in-out',
          background: 'linear-gradient(145deg, #1e1e1e 0%, #2d2d2d 100%)',
          border: '1px solid rgba(255, 77, 140, 0.1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 12px rgba(255, 77, 140, 0.2)',
            border: '1px solid rgba(255, 77, 140, 0.2)',
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1e1e1e',
          borderRight: '1px solid rgba(255, 77, 140, 0.1)',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          backgroundColor: 'rgba(255, 77, 140, 0.12)',
        },
        bar: {
          background: 'linear-gradient(135deg, #ff7043 0%, #ff4d8c 100%)',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/scores" element={<Scores />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
