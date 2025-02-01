export const vocabularyList = [
  {
    word: 'Aberration',
    definition: 'A departure from what is normal, usual, or expected',
    example: 'The sudden drop in temperature was an aberration in the usually mild climate.',
    imageHint: '🌡️',
    category: 'deviation'
  },
  {
    word: 'Benevolent',
    definition: 'Kind, generous, and caring about others',
    example: 'The benevolent donor gave millions to charity.',
    imageHint: '🤲',
    category: 'personality'
  },
  {
    word: 'Cacophony',
    definition: 'A harsh, discordant mixture of sounds',
    example: 'The cacophony of the construction site made it impossible to concentrate.',
    imageHint: '🔊',
    category: 'sound'
  },
  {
    word: 'Diligent',
    definition: 'Having or showing care and conscientiousness in one\'s work or duties',
    example: 'The diligent student spent extra hours studying for the exam.',
    imageHint: '📚',
    category: 'behavior'
  },
  {
    word: 'Ephemeral',
    definition: 'Lasting for a very short time',
    example: 'The ephemeral beauty of cherry blossoms makes them special.',
    imageHint: '🌸',
    category: 'time'
  },
  {
    word: 'Fastidious',
    definition: 'Very attentive to and concerned about accuracy and detail',
    example: 'She was fastidious about keeping her workspace organized.',
    imageHint: '🔍',
    category: 'personality'
  },
  {
    word: 'Gregarious',
    definition: 'Fond of company; sociable',
    example: 'His gregarious nature made him the life of every party.',
    imageHint: '👥',
    category: 'personality'
  },
  {
    word: 'Harbinger',
    definition: 'A person or thing that announces or signals the approach of another',
    example: 'The robin is often considered a harbinger of spring.',
    imageHint: '🐦',
    category: 'role'
  },
  {
    word: 'Impetuous',
    definition: 'Acting or done quickly and without thought or care',
    example: 'He made an impetuous decision to quit his job.',
    imageHint: '⚡',
    category: 'behavior'
  },
  {
    word: 'Juxtapose',
    definition: 'Place or deal with close together for contrasting effect',
    example: 'The artist liked to juxtapose bright colors with dark ones.',
    imageHint: '⚫⚪',
    category: 'arrangement'
  },
  {
    word: 'Kinetic',
    definition: 'Relating to or resulting from motion',
    example: 'The kinetic energy of the moving car was converted to heat.',
    imageHint: '🏃',
    category: 'physics'
  },
  {
    word: 'Labyrinth',
    definition: 'A complicated irregular network of passages or paths',
    example: 'The ancient castle was a labyrinth of corridors and chambers.',
    imageHint: '🌀',
    category: 'structure'
  },
  {
    word: 'Melancholy',
    definition: 'A feeling of pensive sadness',
    example: 'The melancholy music reflected his mood.',
    imageHint: '😢',
    category: 'emotion'
  },
  {
    word: 'Nefarious',
    definition: 'Wicked or criminal',
    example: 'The detective uncovered their nefarious plot.',
    imageHint: '😈',
    category: 'behavior'
  },
  {
    word: 'Oblivious',
    definition: 'Not aware of or concerned about what is happening around one',
    example: 'He was oblivious to the danger ahead.',
    imageHint: '🙈',
    category: 'awareness'
  },
  // Adding more words to reach 100...
  {
    word: 'Paradigm',
    definition: 'A typical example or pattern of something',
    example: 'This discovery represents a new paradigm in medical research.',
    imageHint: '🔄',
    category: 'concept'
  },
  // ... (continue with more words)
  {
    word: 'Zealous',
    definition: 'Having or showing zeal; eager',
    example: 'The zealous fan never missed a game.',
    imageHint: '🔥',
    category: 'personality'
  }
];

// Helper function to get a random subset of words
export const getRandomWords = (count = 10) => {
  const shuffled = [...vocabularyList].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Get words by category
export const getWordsByCategory = (category) => {
  return vocabularyList.filter(word => word.category === category);
};
