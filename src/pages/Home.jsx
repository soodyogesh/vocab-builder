import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  Grid,
  Container,
  useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import { 
  School as SchoolIcon,
  TrendingUp as TrendingUpIcon,
  EmojiEvents as EmojiEventsIcon 
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const FeatureCard = ({ icon, title, description, delay }) => {
  const theme = useTheme();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card 
        sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          background: 'linear-gradient(145deg, rgba(30, 30, 30, 0.8) 0%, rgba(45, 45, 45, 0.8) 100%)',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${theme.palette.primary.main}`,
          borderImage: theme.palette.gradient.mixed,
          borderImageSlice: 1,
        }}
      >
        <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Box 
              sx={{ 
                mb: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 60,
                height: 60,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${theme.palette.secondary.dark}20 0%, ${theme.palette.primary.dark}20 100%)`,
                margin: '0 auto',
                marginBottom: 2
              }}
            >
              {icon}
            </Box>
          </motion.div>
          <Typography 
            variant="h6" 
            component="h3" 
            gutterBottom
            sx={{ 
              fontWeight: 600,
              background: theme.palette.gradient.mixed,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {title}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ lineHeight: 1.6 }}
          >
            {description}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const features = [
    {
      icon: <SchoolIcon sx={{ fontSize: 32, color: theme.palette.secondary.main }} />,
      title: 'SAT Vocabulary',
      description: 'Learn essential SAT vocabulary words with interactive quizzes and visual hints',
      delay: 0.2
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 32, color: theme.palette.primary.main }} />,
      title: 'Track Progress',
      description: 'Monitor your learning progress with detailed statistics and performance tracking',
      delay: 0.4
    },
    {
      icon: <EmojiEventsIcon sx={{ fontSize: 32, color: theme.palette.secondary.main }} />,
      title: 'High Scores',
      description: 'Keep track of your best performances and challenge yourself to improve',
      delay: 0.6
    }
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh',
      backgroundColor: theme.palette.background.default,
      pt: 8,
      pb: 12
    }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography 
              variant="h2" 
              component="h1" 
              gutterBottom
              sx={{ 
                fontWeight: 700,
                background: theme.palette.gradient.mixed,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 4,
                letterSpacing: '-0.02em'
              }}
            >
              Welcome to Vocab Builder
            </Typography>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Typography 
              variant="h5" 
              component="h2" 
              color="text.secondary"
              sx={{ 
                mb: 6,
                maxWidth: '800px',
                mx: 'auto',
                lineHeight: 1.6
              }}
            >
              Enhance your vocabulary with interactive quizzes, visual hints, and track your progress
            </Typography>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/quiz')}
              sx={{ 
                mb: 8,
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                background: theme.palette.gradient.mixed,
                boxShadow: `0 4px 15px ${theme.palette.primary.main}40`,
                '&:hover': {
                  background: `linear-gradient(135deg, ${theme.palette.secondary.light} 0%, ${theme.palette.primary.light} 100%)`,
                }
              }}
            >
              Start Quiz
            </Button>
          </motion.div>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <FeatureCard {...feature} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
