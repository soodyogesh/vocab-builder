import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Box, 
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
  ListItemButton,
  alpha
} from '@mui/material';
import {
  Home as HomeIcon,
  Quiz as QuizIcon,
  EmojiEvents as EmojiEventsIcon
} from '@mui/icons-material';

const DRAWER_WIDTH = 240;

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const location = useLocation();

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Quiz', icon: <QuizIcon />, path: '/quiz' },
    { text: 'Scores', icon: <EmojiEventsIcon />, path: '/scores' }
  ];

  const drawer = (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ px: 3, mb: 3 }}>
        <Typography 
          variant="h6" 
          component="div"
          sx={{ 
            background: theme.palette.gradient.mixed,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 600,
            letterSpacing: '-0.01em'
          }}
        >
          Vocab Builder
        </Typography>
      </Box>
      <List>
        {menuItems.map((item) => {
          const isSelected = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                onClick={() => navigate(item.path)}
                selected={isSelected}
                sx={{
                  mx: 1,
                  borderRadius: 1,
                  '&.Mui-selected': {
                    background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.15)} 0%, ${alpha(theme.palette.primary.main, 0.15)} 100%)`,
                    '&:hover': {
                      background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.25)} 0%, ${alpha(theme.palette.primary.main, 0.25)} 100%)`,
                    }
                  },
                  '&:hover': {
                    background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.1)} 100%)`,
                  }
                }}
              >
                <ListItemIcon 
                  sx={{ 
                    color: isSelected 
                      ? theme.palette.primary.main 
                      : theme.palette.text.secondary,
                    minWidth: 40 
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{
                    sx: { 
                      fontWeight: isSelected ? 600 : 400,
                      color: isSelected 
                        ? theme.palette.primary.main 
                        : theme.palette.text.primary
                    }
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: theme.palette.background.default }}>
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            borderRight: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            backgroundColor: alpha(theme.palette.background.paper, 0.8),
            backdropFilter: 'blur(10px)',
          },
        }}
      >
        {drawer}
      </Drawer>
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          bgcolor: theme.palette.background.default,
          minHeight: '100vh'
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
