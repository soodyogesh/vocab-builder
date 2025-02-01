import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Container,
  List,
  ListItem,
  ListItemText,
  Divider,
  useTheme,
  alpha
} from '@mui/material';
import { 
  EmojiEvents as TrophyIcon,
  Timeline as TimelineIcon,
  Star as StarIcon
} from '@mui/icons-material';

const Scores = () => {
  const [scores, setScores] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    const savedScores = localStorage.getItem('quizScores');
    if (savedScores) {
      setScores(JSON.parse(savedScores));
    }
  }, []);

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getScoreColor = (score, total) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return theme.palette.secondary.main;
    if (percentage >= 60) return theme.palette.primary.main;
    return alpha(theme.palette.text.secondary, 0.5);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <Container maxWidth="md">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ mt: 4 }}>
          <Card
            sx={{
              background: 'linear-gradient(145deg, rgba(30, 30, 30, 0.8) 0%, rgba(45, 45, 45, 0.8) 100%)',
              borderRadius: 3,
              boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
              border: `1px solid ${theme.palette.primary.main}`,
              borderImage: theme.palette.gradient.mixed,
              borderImageSlice: 1,
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <motion.div
                  animate={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <TrophyIcon 
                    sx={{ 
                      fontSize: 40, 
                      background: theme.palette.gradient.mixed,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mr: 2 
                    }} 
                  />
                </motion.div>
                <Typography 
                  variant="h4" 
                  component="h1"
                  sx={{ 
                    fontWeight: 600,
                    background: theme.palette.gradient.mixed,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  High Scores
                </Typography>
              </Box>

              {scores.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Box 
                    sx={{ 
                      textAlign: 'center',
                      py: 6,
                      color: theme.palette.text.secondary
                    }}
                  >
                    <TimelineIcon sx={{ 
                      fontSize: 48, 
                      mb: 2, 
                      opacity: 0.5,
                      color: theme.palette.primary.main
                    }} />
                    <Typography variant="h6">
                      No scores yet. Take a quiz to see your results here!
                    </Typography>
                  </Box>
                </motion.div>
              ) : (
                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="show"
                >
                  <List>
                    {scores
                      .sort((a, b) => b.timestamp - a.timestamp)
                      .map((score, index) => (
                        <motion.div key={score.timestamp} variants={item}>
                          {index > 0 && <Divider sx={{ my: 1, borderColor: alpha(theme.palette.primary.main, 0.1) }} />}
                          <ListItem
                            sx={{
                              borderRadius: 2,
                              '&:hover': {
                                backgroundColor: alpha(theme.palette.primary.main, 0.05)
                              }
                            }}
                          >
                            <ListItemText
                              primary={
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <StarIcon 
                                    sx={{ 
                                      color: getScoreColor(score.score, score.total),
                                      mr: 1
                                    }} 
                                  />
                                  <Typography 
                                    variant="h6" 
                                    component="span"
                                    sx={{
                                      background: ((score.score / score.total) * 100) >= 80 
                                        ? theme.palette.gradient.mixed 
                                        : 'none',
                                      WebkitBackgroundClip: ((score.score / score.total) * 100) >= 80 ? 'text' : 'none',
                                      WebkitTextFillColor: ((score.score / score.total) * 100) >= 80 ? 'transparent' : 'inherit',
                                    }}
                                  >
                                    Score: {score.score}/{score.total}
                                  </Typography>
                                </Box>
                              }
                              secondary={
                                <Typography 
                                  variant="body2" 
                                  sx={{ 
                                    color: theme.palette.text.secondary,
                                    mt: 0.5
                                  }}
                                >
                                  {formatDate(score.timestamp)}
                                </Typography>
                              }
                            />
                          </ListItem>
                        </motion.div>
                      ))}
                  </List>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </Box>
      </motion.div>
    </Container>
  );
};

export default Scores;
