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
  {
    id: 13,
    question: "Who was the first American to win a 500cc Motocross World Championship title in 1982?",
    type: 'text',
    options: ['Danny LaPorte', 'Broc Glover', 'Brad Lackey', 'Jim Pomeroy'],
    correctAnswer: 'Brad Lackey',
    era: '1980s'
  },
  {
    id: 14,
    question: "The 1981 250cc Supercross championship was decided by a controversial last-lap pass. Who were the two Honda riders involved?",
    type: 'text',
    options: ['Donnie Hansen & Darrell Shultz', 'Chuck Sun & Johnny O\'Mara', 'Mark Barnett & Kent Howerton', 'Bob Hannah & Broc Glover'],
    correctAnswer: 'Mark Barnett & Kent Howerton',
    era: '1980s'
  },
  {
    id: 15,
    question: "Which now-defunct Canadian motorcycle brand did Jimmy Ellis win the 1975 250cc Supercross championship on?",
    type: 'text',
    options: ['Bultaco', 'Can-Am', 'Maico', 'ATK'],
    correctAnswer: 'Can-Am',
    era: '1970s'
  },
  {
    id: 16,
    question: "Jean-Michel Bayle famously won the 250cc SX, 250cc MX, and 500cc MX titles all in what single, dominant year?",
    type: 'text',
    options: ['1990', '1991', '1992', '1989'],
    correctAnswer: '1991',
    era: '1990s'
  },
  {
    id: 17,
    question: "Before his AMA career, South African rider Greg Albertyn was a multi-time World Champion in which classes?",
    type: 'text',
    options: ['250cc & 500cc', '125cc & 500cc', '85cc & 125cc', '125cc & 250cc'],
    correctAnswer: '125cc & 250cc',
    era: '1990s'
  },
  {
    id: 18,
    question: "What was historically significant about Doug Henry's 1997 Las Vegas Supercross win aboard a Yamaha YZM400F?",
    type: 'text',
    options: ['It was his first win', 'First win for a European rider', 'First win for a 4-stroke in a modern SX main event', 'It was the final race at the Silver Bowl'],
    correctAnswer: 'First win for a 4-stroke in a modern SX main event',
    era: '1990s'
  },
  {
    id: 19,
    question: "Which aggressive, hard-charging rider from the early 90s earned the nickname 'The Beast from the East'?",
    type: 'text',
    options: ['Jeff Stanton', 'Mike LaRocco', 'Damon Bradshaw', 'Larry Ward'],
    correctAnswer: 'Damon Bradshaw',
    era: '1990s'
  },
  {
    id: 20,
    question: "In the early 2000s, what was the name of James Stewart's signature freestyle-inspired motocross home video series?",
    type: 'text',
    options: ['Steel Roots', 'Terrafirma', 'Bubba\'s World', 'The Great Outdoors'],
    correctAnswer: 'Bubba\'s World',
    era: '2000s'
  },
  {
    id: 21,
    question: "Who won the final AMA 500cc National Championship in 1993 before the class was discontinued as the premier series?",
    type: 'text',
    options: ['Mike LaRocco', 'Jeff Stanton', 'Mike Kiedrowski', 'Jean-Michel Bayle'],
    correctAnswer: 'Mike Kiedrowski',
    era: '1990s'
  },
  {
    id: 22,
    question: "The 'King of Bercy' title was for the winner of the annual Paris Supercross. Which American rider dominated this event in the late 80s?",
    type: 'text',
    options: ['Broc Glover', 'Johnny O\'Mara', 'Jeff Ward', 'Rick Johnson'],
    correctAnswer: 'Rick Johnson',
    era: '1980s'
  },
  {
    id: 23,
    question: "What was the common criticism of the innovative first-generation aluminum frame Honda introduced on its 1997 CR250R?",
    type: 'text',
    options: ['It was too heavy', 'It was extremely rigid and harsh', 'It cracked frequently', 'It was too flexible'],
    correctAnswer: 'It was extremely rigid and harsh',
    era: '1990s'
  },
  {
    id: 24,
    question: "Before moving to the U.S., Chad Reed won his first major title in which country's national Supercross championship?",
    type: 'text',
    options: ['New Zealand', 'Australia', 'England', 'Canada'],
    correctAnswer: 'Australia',
    era: '2000s'
  },
  {
    id: 25,
    question: "Which rider was known for pioneering the 'heel-clicker' in freestyle motocross competitions?",
    type: 'text',
    options: ['Travis Pastrana', 'Mike Metzger', 'Brian Deegan', 'Carey Hart'],
    correctAnswer: 'Mike Metzger',
    era: '1990s'
  },
  {
    id: 26,
    question: "The 1986 USGP at Carlsbad saw a legendary battle in the mud between which two American Honda teammates?",
    type: 'text',
    options: ['Johnny O\'Mara & Ron Lechien', 'David Bailey & Rick Johnson', 'Jeff Ward & Broc Glover', 'Bob Hannah & Donnie Hansen'],
    correctAnswer: 'David Bailey & Rick Johnson',
    era: '1980s'
  },
  {
    id: 27,
    question: "In what year did the AMA implement the 'production rule', effectively banning full factory 'works' bikes from competition?",
    type: 'text',
    options: ['1982', '1986', '1990', '1994'],
    correctAnswer: '1986',
    era: '1980s'
  },
  {
    id: 28,
    question: "This privateer famously led most of the 1997 Los Angeles Coliseum Supercross on a Kawasaki before a late-race crash. Who was it?",
    type: 'text',
    options: ['Damon Huffman', 'Larry Ward', 'Mike Craig', 'Ezra Lusk'],
    correctAnswer: 'Damon Huffman',
    era: '1990s'
  },
  {
    id: 29,
    question: "Which now-famous gear company, known for its custom helmet paint, was founded by Troy Lee in the early 1980s?",
    type: 'text',
    options: ['Fox Racing', 'Shift MX', 'Troy Lee Designs', 'No Fear'],
    correctAnswer: 'Troy Lee Designs',
    era: '1980s'
  },
  {
    id: 30,
    question: "Who was the first rider to win a 125cc Supercross Main Event on a four-stroke motorcycle, doing so in 2003 on a KTM 250SX-F?",
    type: 'text',
    options: ['Grant Langston', 'Ryan Hughes', 'Ben Townley', 'Nathan Ramsey'],
    correctAnswer: 'Ryan Hughes',
    era: '2000s'
  },
  {
    id: 31,
    question: "What is the nationality of Joël Robert, the dominant 250cc World Champion of the late 60s and early 70s?",
    type: 'text',
    options: ['Swedish', 'German', 'Belgian', 'Dutch'],
    correctAnswer: 'Belgian',
    era: '1970s'
  },
  {
    id: 32,
    question: "The 1975 'Battle of New Orleans' was a famous Supercross race held in the Superdome. Who won?",
    type: 'text',
    options: ['Jimmy Weinert', 'Tony DiStefano', 'Jimmy Ellis', 'Marty Smith'],
    correctAnswer: 'Jimmy Ellis',
    era: '1970s'
  },
  {
    id: 33,
    question: "Before energy drinks took over, which soda brand was a major sponsor in motocross during the late 90s, notably with the FMF Honda team?",
    type: 'text',
    options: ['Coca-Cola', 'Pepsi', 'Mountain Dew', '7 Up'],
    correctAnswer: 'Mountain Dew',
    era: '1990s'
  },
  {
    id: 34,
    question: "Who was known as 'The Professor' for his exceptionally smooth, precise, and calculated riding style?",
    type: 'text',
    options: ['Jeff Ward', 'Johnny O\'Mara', 'David Bailey', 'Ron Lechien'],
    correctAnswer: 'David Bailey',
    era: '1980s'
  },
  {
    id: 35,
    question: "In what year did the 125cc class officially get renamed to 'Motocross Lites' / 'Supercross Lites'?",
    type: 'text',
    options: ['2004', '2005', '2006', '2007'],
    correctAnswer: '2006',
    era: '2000s'
  },
  {
    id: 36,
    question: "Which French rider won the 1995 and 1996 250cc World Championships before moving to America to battle Carmichael?",
    type: 'text',
    options: ['Mickael Pichon', 'David Vuillemin', 'Sebastien Tortelli', 'Frederic Bolley'],
    correctAnswer: 'Sebastien Tortelli',
    era: '1990s'
  },
  {
    id: 37,
    question: "The insane 'Magoo' double jump at the 1982 Motocross des Nations was named after which fearless American rider?",
    type: 'text',
    options: ['Donnie Hansen', 'Danny \'Magoo\' Chandler', 'Chuck Sun', 'Jim Gibson'],
    correctAnswer: 'Danny \'Magoo\' Chandler',
    era: '1980s'
  },
  {
    id: 38,
    question: "What was the title of the first video game dedicated solely to Supercross, released on the original PlayStation?",
    type: 'text',
    options: ['Excitebike 64', 'Jeremy McGrath Supercross \'98', 'Championship Motocross', 'Supercross 2000'],
    correctAnswer: 'Jeremy McGrath Supercross \'98',
    era: '1990s'
  },
  {
    id: 39,
    question: "Before a brief stint in the US, Belgian legend Stefan Everts won how many FIM Motocross World Championships in total?",
    type: 'text',
    options: ['5', '7', '10', '12'],
    correctAnswer: '10',
    era: '2000s'
  },
  {
    id: 40,
    question: "What innovative chassis feature did the 1990 Kawasaki KX models introduce that became an industry standard for rigidity?",
    type: 'text',
    options: ['Single-sided swingarm', 'Perimeter Frame', 'Upside-down forks', 'Delta-box frame'],
    correctAnswer: 'Perimeter Frame',
    era: '1990s'
  },
  {
    id: 41,
    question: "Who was the first European rider to win an AMA 125cc National Motocross Championship?",
    type: 'text',
    options: ['Sebastien Tortelli', 'Mickael Pichon', 'Grant Langston', 'Jean-Michel Bayle'],
    correctAnswer: 'Jean-Michel Bayle',
    era: '1990s'
  },
  {
    id: 42,
    question: "The US Open of Supercross in Las Vegas often featured a unique split-start and a 'joker' lane. Who was a frequent winner of this event in the early 2000s?",
    type: 'text',
    options: ['Ricky Carmichael', 'Chad Reed', 'James Stewart Jr.', 'Kevin Windham'],
    correctAnswer: 'Chad Reed',
    era: '2000s'
  },
  {
    id: 43,
    question: "The film 'On Any Sunday' (1971) was instrumental in popularizing motocross in America and featured which motorcycle legend?",
    type: 'text',
    options: ['Steve McQueen', 'Malcolm Smith', 'Mert Lawwill', 'All of the above'],
    correctAnswer: 'All of the above',
    era: '1970s'
  },
  {
    id: 44,
    question: "Which factory team did Mike 'The Rock' LaRocco ride for when he won his 500cc National title in 1993?",
    type: 'text',
    options: ['Honda', 'Suzuki', 'Kawasaki', 'Yamaha'],
    correctAnswer: 'Kawasaki',
    era: '1990s'
  },
  {
    id: 45,
    question: "What was the nickname of Jeff Stanton, the multi-time champion known for his incredible work ethic in the late 80s/early 90s?",
    type: 'text',
    options: ['The Ironman', 'The Lumberjack', 'Six Time', 'The Captain'],
    correctAnswer: 'Six Time',
    era: '1990s'
  },
  {
    id: 46,
    question: "In 1977, what brand did Bob 'Hurricane' Hannah win his first Supercross title with?",
    type: 'text',
    options: ['Honda', 'Suzuki', 'Can-Am', 'Yamaha'],
    correctAnswer: 'Yamaha',
    era: '1970s'
  },
  {
    id: 47,
    question: "Who was the last rider to win a 125cc AMA Supercross title on a Suzuki?",
    type: 'text',
    options: ['Davi Millsaps', 'Branden Jesseman', 'Travis Pastrana', 'Danny Smith'],
    correctAnswer: 'Travis Pastrana',
    era: '2000s'
  },
  {
    id: 48,
    question: "The 'Great Western Bank' team was a prominent privateer effort in the early 1990s. Which future champion got his start there before moving to Factory Honda?",
    type: 'text',
    options: ['Damon Bradshaw', 'Jeff Emig', 'Jeremy McGrath', 'Mike LaRocco'],
    correctAnswer: 'Jeremy McGrath',
    era: '1990s'
  },
  {
    id: 49,
    question: "Which rider was famous for being a pioneer of Freestyle Motocross and leader of the 'Metal Mulisha'?",
    type: 'text',
    options: ['Travis Pastrana', 'Mike Metzger', 'Brian Deegan', 'Seth Enslow'],
    correctAnswer: 'Brian Deegan',
    era: '1990s'
  },
  {
    id: 50,
    question: "In what year did James Stewart complete his second 'perfect season' in AMA Motocross, winning all 24 motos in the 450 class?",
    type: 'text',
    options: ['2006', '2007', '2008', '2009'],
    correctAnswer: '2008',
    era: '2000s'
  },
  {
    id: 51,
    question: "Before becoming a factory Honda rider, who did Steve Lamson win his 1995 & 1996 125cc MX titles with?",
    type: 'text',
    options: ['Noleen Sizzler', 'Pro Circuit Honda', 'FMF Honda', 'Splitfire Kawasaki'],
    correctAnswer: 'Pro Circuit Honda',
    era: '1990s'
  },
  {
    id: 52,
    question: "Who won the 2002 125cc AMA Motocross championship in a season-long battle with James Stewart?",
    type: 'text',
    options: ['Grant Langston', 'Mike Brown', 'Chad Reed', 'Travis Pastrana'],
    correctAnswer: 'Chad Reed',
    era: '2000s'
  },
  {
    id: 53,
    question: "The Carlsbad 500 USGP was a legendary race. Who was its first American winner in 1980, on a privateer Yamaha?",
    type: 'text',
    options: ['Rex Staten', 'Marty Moates', 'Chuck Sun', 'Goat Breker'],
    correctAnswer: 'Marty Moates',
    era: '1980s'
  },
  {
    id: 54,
    question: "What was the primary color of Jeff Ward's factory Kawasaki race bikes throughout the 1980s?",
    type: 'text',
    options: ['Blue', 'Red', 'Green', 'Yellow'],
    correctAnswer: 'Green',
    era: '1980s'
  },
  {
    id: 55,
    question: "Who is the legendary owner and team manager for the dominant Pro Circuit race team?",
    type: 'text',
    options: ['Dave Arnold', 'Mitch Payton', 'Roger De Coster', 'Jim Hale'],
    correctAnswer: 'Mitch Payton',
    era: '1990s'
  },
  {
    id: 56,
    question: "In what year was the first 'East/West Shootout' held, pitting the best from both 125cc Supercross coasts against each other?",
    type: 'text',
    options: ['1985', '1988', '1992', '1997'],
    correctAnswer: '1985',
    era: '1980s'
  },
  {
    id: 57,
    question: "Before his factory Suzuki and KTM success, Ryan Dungey was a member of which highly successful satellite team?",
    type: 'text',
    options: ['Moto XXX', 'Motoworld Racing', 'Geico Honda', 'Star Racing Yamaha'],
    correctAnswer: 'Geico Honda',
    era: '2000s'
  },
  {
    id: 58,
    question: "Which Finnish rider was a multi-time 500cc World Champion in the 1970s and known as the 'Flying Finn'?",
    type: 'text',
    options: ['Harry Everts', 'Gaston Rahier', 'Heikki Mikkola', 'Torsten Hallman'],
    correctAnswer: 'Heikki Mikkola',
    era: '1970s'
  },
  {
    id: 59,
    question: "What was the name of the privateer team founded by freestyle pioneer and 'General of the Metal Mulisha' Carey Hart?",
    type: 'text',
    options: ['Moto XXX', 'Hart & Huntington', 'L&M Racing', 'Wonder Warthog Racing'],
    correctAnswer: 'Hart & Huntington',
    era: '2000s'
  },
  {
    id: 60,
    question: "The 'Unadilla' national track is famous for what natural, incredibly steep downhill/uphill obstacle?",
    type: 'text',
    options: ['The Leap', 'The Screw-U', 'Gravity Cavity', 'The Holy Schmit'],
    correctAnswer: 'Gravity Cavity',
    era: 'History'
  },
  {
    id: 61,
    question: "Who won the 2000 AMA 250cc Supercross championship, ending Jeremy McGrath's dominant reign?",
    type: 'text',
    options: ['David Vuillemin', 'Ricky Carmichael', 'Ezra Lusk', 'Kevin Windham'],
    correctAnswer: 'Ricky Carmichael',
    era: '2000s'
  },
  {
    id: 62,
    question: "What was the title of the popular Disney Channel Original Movie from 2001 centered around a girl secretly taking her brother's place in a motocross race?",
    type: 'text',
    options: ['Supercross The Movie', 'Winners Take All', 'Motocrossed', 'FMX'],
    correctAnswer: 'Motocrossed',
    era: '2000s'
  }
];
