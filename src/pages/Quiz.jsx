import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Container,
  Stack,
  LinearProgress,
  useTheme
} from '@mui/material';
import confetti from 'canvas-confetti';
import { getRandomWords } from '../data/vocabulary';

const Quiz = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [shuffledWords, setShuffledWords] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const words = getRandomWords(10); // Get 10 random words
    setShuffledWords(words);
  }, []);

  const triggerConfetti = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 9999,
      colors: [
        theme.palette.secondary.main,
        theme.palette.primary.main,
        theme.palette.secondary.light,
        theme.palette.primary.light
      ]
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    fire(0.2, {
      spread: 60,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleShowHint = () => {
    setShowHint(true);
  };

  const handleNextWord = (knewAnswer) => {
    if (knewAnswer) {
      setScore(score + 1);
    }

    if (currentWordIndex < shuffledWords.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      setShowAnswer(false);
      setShowHint(false);
    } else {
      setQuizComplete(true);
      const finalScore = knewAnswer ? score + 1 : score;
      const percentage = (finalScore / shuffledWords.length) * 100;
      
      // Save score to localStorage
      const quizScore = {
        score: finalScore,
        total: shuffledWords.length,
        timestamp: Date.now()
      };
      const savedScores = JSON.parse(localStorage.getItem('quizScores') || '[]');
      savedScores.push(quizScore);
      localStorage.setItem('quizScores', JSON.stringify(savedScores));

      // Trigger confetti for scores >= 80%
      if (percentage >= 80) {
        setTimeout(triggerConfetti, 500);
      }
    }
  };

  const handleRestartQuiz = () => {
    const words = getRandomWords(10);
    setShuffledWords(words);
    setCurrentWordIndex(0);
    setScore(0);
    setShowAnswer(false);
    setShowHint(false);
    setQuizComplete(false);
  };

  if (shuffledWords.length === 0) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ mt: 4 }}>
          <LinearProgress />
        </Box>
      </Container>
    );
  }

  if (quizComplete) {
    const percentage = (score / shuffledWords.length) * 100;
    const isHighScore = percentage >= 80;

    return (
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card sx={{ mt: 4 }}>
            <CardContent>
              <Typography 
                variant="h4" 
                component="h1" 
                gutterBottom 
                align="center"
                sx={{
                  background: theme.palette.gradient.mixed,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 600
                }}
              >
                Quiz Complete!
              </Typography>
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Typography 
                  variant="h5" 
                  align="center" 
                  sx={{ 
                    mb: 3,
                    color: isHighScore ? theme.palette.primary.main : 'text.primary',
                    fontWeight: isHighScore ? 600 : 400
                  }}
                >
                  Your Score: {score} out of {shuffledWords.length}
                  {isHighScore && ' 🎉'}
                </Typography>
              </motion.div>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="contained"
                    onClick={handleRestartQuiz}
                    size="large"
                    sx={{
                      background: theme.palette.gradient.mixed,
                      '&:hover': {
                        background: `linear-gradient(135deg, ${theme.palette.secondary.light} 0%, ${theme.palette.primary.light} 100%)`,
                      }
                    }}
                  >
                    Try Again
                  </Button>
                </motion.div>
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    );
  }

  const currentWord = shuffledWords[currentWordIndex];
  const progress = ((currentWordIndex + 1) / shuffledWords.length) * 100;

  return (
    <Container maxWidth="sm">
      <Box sx={{ mb: 2, mt: 4 }}>
        <LinearProgress 
          variant="determinate" 
          value={progress}
          sx={{
            height: 6,
            borderRadius: 3,
            '& .MuiLinearProgress-bar': {
              background: theme.palette.gradient.mixed
            }
          }}
        />
        <Typography variant="body2" align="right" sx={{ mt: 1, color: 'text.secondary' }}>
          Word {currentWordIndex + 1} of {shuffledWords.length}
        </Typography>
      </Box>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentWord.word}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardContent>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
                >
                  <Typography 
                    variant="h4" 
                    component="h1" 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 600,
                      background: theme.palette.gradient.mixed,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {currentWord.word}
                  </Typography>
                </motion.div>

                {showHint && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Typography variant="h2" sx={{ mb: 2 }}>
                      {currentWord.imageHint}
                    </Typography>
                  </motion.div>
                )}
              </Box>

              {!showAnswer ? (
                <Stack spacing={2} alignItems="center">
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Button
                      variant="contained"
                      onClick={handleShowAnswer}
                      size="large"
                      sx={{ 
                        minWidth: 200,
                        background: theme.palette.gradient.mixed,
                        '&:hover': {
                          background: `linear-gradient(135deg, ${theme.palette.secondary.light} 0%, ${theme.palette.primary.light} 100%)`,
                        }
                      }}
                    >
                      Show Definition
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Button
                      variant="outlined"
                      onClick={handleShowHint}
                      size="large"
                      sx={{ 
                        minWidth: 200,
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.primary.main,
                        '&:hover': {
                          borderColor: theme.palette.primary.light,
                          backgroundColor: `${theme.palette.primary.main}10`,
                        }
                      }}
                      disabled={showHint}
                    >
                      Show Hint
                    </Button>
                  </motion.div>
                </Stack>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Typography 
                    variant="h6" 
                    gutterBottom 
                    sx={{ 
                      mt: 3,
                      color: theme.palette.primary.main
                    }}
                  >
                    Definition:
                  </Typography>
                  <Typography paragraph>
                    {currentWord.definition}
                  </Typography>
                  
                  <Typography 
                    variant="h6" 
                    gutterBottom
                    sx={{ color: theme.palette.primary.main }}
                  >
                    Example:
                  </Typography>
                  <Typography paragraph>
                    {currentWord.example}
                  </Typography>

                  <Stack 
                    direction="row" 
                    spacing={2} 
                    justifyContent="center"
                    sx={{ mt: 4 }}
                  >
                    <motion.div whileHover={{ scale: 1.05 }}>
                      <Button
                        variant="outlined"
                        onClick={() => handleNextWord(false)}
                        size="large"
                        sx={{
                          borderColor: theme.palette.primary.main,
                          color: theme.palette.primary.main,
                          '&:hover': {
                            borderColor: theme.palette.primary.light,
                            backgroundColor: `${theme.palette.primary.main}10`,
                          }
                        }}
                      >
                        Didn't Know
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }}>
                      <Button
                        variant="contained"
                        onClick={() => handleNextWord(true)}
                        size="large"
                        sx={{
                          background: theme.palette.gradient.mixed,
                          '&:hover': {
                            background: `linear-gradient(135deg, ${theme.palette.secondary.light} 0%, ${theme.palette.primary.light} 100%)`,
                          }
                        }}
                      >
                        Knew It
                      </Button>
                    </motion.div>
                  </Stack>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </Container>
  );
};

export default Quiz;
