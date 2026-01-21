import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

export interface TriviaQuestion {
  id: number;
  question: string;
  type: 'text' | 'image';
  imageUrl?: string;
  imageHint?: string;
  options: string[];
  correctAnswer: string;
  era: string;
}

const mcgrathImage = PlaceHolderImages.find(p => p.id === 'trivia-mcgrath');
const daytonaImage = PlaceHolderImages.find(p => p.id === 'trivia-daytona');
const bike70sImage = PlaceHolderImages.find(p => p.id === 'trivia-70s-bike');

export const triviaQuestions: TriviaQuestion[] = [
  {
    id: 1,
    question: "Who is known as 'The King' of Supercross with 72 main event wins?",
    type: 'text',
    options: ['Ricky Carmichael', 'James Stewart Jr.', 'Jeremy McGrath', 'Ryan Villopoto'],
    correctAnswer: 'Jeremy McGrath',
    era: '1990s',
  },
  {
    id: 2,
    question: "This rider, known as 'The GOAT', won 150 total AMA races in his career. Who is he?",
    type: 'text',
    options: ['Bob Hannah', 'Ricky Carmichael', 'Ryan Dungey', 'Chad Reed'],
    correctAnswer: 'Ricky Carmichael',
    era: '2000s',
  },
  {
    id: 3,
    question: "Which manufacturer dominated motocross in the 1970s, winning the 500cc world title every year of the decade?",
    type: 'text',
    options: ['Honda', 'Yamaha', 'Suzuki', 'Kawasaki'],
    correctAnswer: 'Suzuki',
    era: '1970s',
  },
  {
    id: 4,
    question: "The 'Bubba Scrub' was a revolutionary technique popularized by which rider?",
    type: 'text',
    options: ['Travis Pastrana', 'James Stewart Jr.', 'Chad Reed', 'Kevin Windham'],
    correctAnswer: 'James Stewart Jr.',
    era: '2000s',
  },
  {
    id: 5,
    question: "In what year was the first-ever stadium Supercross race held, inside the Los Angeles Coliseum?",
    type: 'text',
    options: ['1968', '1972', '1976', '1980'],
    correctAnswer: '1972',
    era: '1970s',
  },
  {
    id: 6,
    question: "Who won the inaugural AMA Supercross Championship in 1974?",
    type: 'text',
    options: ['Roger De Coster', 'Pierre Karsmakers', 'Jimmy Ellis', 'Bob Hannah'],
    correctAnswer: 'Pierre Karsmakers',
    era: '1970s',
  },
  {
    id: 7,
    question: "This iconic American rider was known as 'The Hurricane'. Who was he?",
    type: 'text',
    options: ['Rick Johnson', 'Jeff Ward', 'David Bailey', 'Bob Hannah'],
    correctAnswer: 'Bob Hannah',
    era: '1980s',
  },
  {
    id: 8,
    question: "Which rider famously won the 1997 Las Vegas 125cc East/West shootout on a Pro Circuit Kawasaki KX125 with a broken chain?",
    type: 'text',
    options: ['Mickael Pichon', 'Kevin Windham', 'Ricky Carmichael', 'Stephane Roncada'],
    correctAnswer: 'Ricky Carmichael',
    era: '1990s',
  },
  {
    id: 9,
    question: 'This rider, nicknamed "Showtime", was known for his flashy style and innovative freestyle tricks in the early 2000s. Who is he?',
    type: 'image',
    imageUrl: mcgrathImage?.imageUrl,
    imageHint: mcgrathImage?.imageHint,
    options: ['Jeremy McGrath', 'Travis Pastrana', 'Nate Adams', 'Brian Deegan'],
    correctAnswer: 'Jeremy McGrath',
    era: '1990s'
  },
  {
    id: 10,
    question: 'Which is the only event to have been on the AMA Supercross schedule every year since the championship began in 1974?',
    type: 'image',
    imageUrl: daytonaImage?.imageUrl,
    imageHint: daytonaImage?.imageHint,
    options: ['Anaheim', 'Daytona', 'Houston', 'Atlanta'],
    correctAnswer: 'Daytona',
    era: 'History'
  },
  {
    id: 11,
    question: "The radical innovation of long-travel suspension, known as the 'monoshock', was pioneered by which manufacturer in the mid-1970s?",
    type: 'image',
    imageUrl: bike70sImage?.imageUrl,
    imageHint: bike70sImage?.imageHint,
    options: ['Honda', 'Yamaha', 'Suzuki', 'CZ'],
    correctAnswer: 'Yamaha',
    era: '1970s'
  },
  {
    id: 12,
    question: "Who was the first rider to win both the 125cc and 250cc Supercross championships in the same year (1985)?",
    type: 'text',
    options: ['Jeff Ward', 'Rick Johnson', 'Johnny O\'Mara', 'David Bailey'],
    correctAnswer: 'Jeff Ward',
    era: '1980s'
  },
];
