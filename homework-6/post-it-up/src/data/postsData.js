import { v4 as uuidv4 } from "uuid";

const pool = [
  {
    id: uuidv4(),
    category: "song",
    title: "Bohemian Rhapsody by Queen",
    comments: [
      { id: uuidv4(), text: "A timeless classic!", rating: 5 },
      { id: uuidv4(), text: "One of the greatest songs ever!", rating: 3 },
      { id: uuidv4(), text: "One of the greatest songs ever!", rating: 2 },
      { id: uuidv4(), text: "One of the greatest songs ever!", rating: 5 },
      { id: uuidv4(), text: "One of the greatest songs ever!", rating: 4 },
    ],
  },
  {
    id: uuidv4(),
    category: "invention",
    title: "The Internet",
    comments: [
      {
        id: uuidv4(),
        text: "Revolutionized communication and access to information!",
        rating: 5,
      },
      {
        id: uuidv4(),
        text: "An incredible invention that changed the world!",
        rating: 2,
      },
      {
        id: uuidv4(),
        text: "Transformed how we connect and share!",
        rating: 3,
      },
      {
        id: uuidv4(),
        text: "Transformed how we connect and share!",
        rating: 1,
      },
    ],
  },
  {
    id: uuidv4(),
    category: "song",
    title: "Hotel California by Eagles",
    comments: [
      { id: uuidv4(), text: "An iconic rock song!", rating: 4 },
      { id: uuidv4(), text: "Love the guitar solo!", rating: 2 },
      { id: uuidv4(), text: "A masterpiece of the '70s!", rating: 5 },
      { id: uuidv4(), text: "A masterpiece of the '70s!", rating: 4 },
    ],
  },
  {
    id: uuidv4(),
    category: "invention",
    title: "Electricity",
    comments: [
      {
        id: uuidv4(),
        text: "The discovery of electricity revolutionized the world!",
        rating: 5,
      },
      {
        id: uuidv4(),
        text: "One of the most impactful inventions in human history.",
        rating: 1,
      },
      {
        id: uuidv4(),
        text: "Enabled countless technological advancements!",
        rating: 5,
      },
      {
        id: uuidv4(),
        text: "Enabled countless technological advancements!",
        rating: 1,
      },
    ],
  },
  {
    id: uuidv4(),
    category: "song",
    title: "Stairway to Heaven by Led Zeppelin",
    comments: [
      { id: uuidv4(), text: "A masterpiece of rock music!", rating: 5 },
      { id: uuidv4(), text: "Epic song with great lyrics!", rating: 2 },
      { id: uuidv4(), text: "Epic song with great lyrics!", rating: 2 },
    ],
  },
  {
    id: uuidv4(),
    category: "invention",
    title: "The Wheel",
    comments: [
      {
        id: uuidv4(),
        text: "One of the most significant inventions in human history!",
        rating: 5,
      },
      {
        id: uuidv4(),
        text: "The wheel transformed transportation and changed civilization.",
        rating: 1,
      },
    ],
  },
  {
    id: uuidv4(),
    category: "song",
    title: "The Dark Side of the Moon by Pink Floyd",
    comments: [
      { id: uuidv4(), text: "One of the best albums of all time!", rating: 4 },
      { id: uuidv4(), text: "Magical and mesmerizing!", rating: 4 },
      { id: uuidv4(), text: "Magical and mesmerizing!", rating: 3 },
    ],
  },
  {
    id: uuidv4(),
    category: "invention",
    title: "The Printing Press",
    comments: [
      {
        id: uuidv4(),
        text: "Revolutionized the spread of knowledge and the dissemination of ideas!",
        rating: 5,
      },
      {
        id: uuidv4(),
        text: "An invention that transformed the world of publishing.",
        rating: 3,
      },
    ],
  },
  {
    id: uuidv4(),
    category: "song",
    title: "Boogie Wonderland by Earth, Wind & Fire",
    comments: [
      {
        id: uuidv4(),
        text: "This song gets me on the dance floor!",
        rating: 4,
      },
      { id: uuidv4(), text: "Funky and groovy!", rating: 3 },
    ],
  },
  {
    id: uuidv4(),
    category: "invention",
    title: "The Telephone",
    comments: [
      {
        id: uuidv4(),
        text: "Revolutionized communication and connected people across distances!",
        rating: 4,
      },
      {
        id: uuidv4(),
        text: "Alexander Graham Bell's invention changed the way we interact.",
        rating: 2,
      },
    ],
  },
  {
    id: uuidv4(),
    category: "song",
    title: "Imagine by John Lennon",
    comments: [
      {
        id: uuidv4(),
        text: "A powerful and thought-provoking song.",
        rating: 4,
      },
      {
        id: uuidv4(),
        text: "A powerful and thought-provoking song.",
        rating: 3,
      },
      { id: uuidv4(), text: "John Lennon's message is timeless.", rating: 3 },
    ],
  },
  {
    id: uuidv4(),
    category: "invention",
    title: "The Light Bulb",
    comments: [
      {
        id: uuidv4(),
        text: "Thomas Edison's invention that brightened the world!",
        rating: 5,
      },
      {
        id: uuidv4(),
        text: "A transformative invention that brought light into darkness.",
        rating: 4,
      },
      {
        id: uuidv4(),
        text: "A transformative invention that brought light into darkness.",
        rating: 2,
      },
    ],
  },
  {
    id: uuidv4(),
    category: "song",
    title: "Thriller by Michael Jackson",
    comments: [
      { id: uuidv4(), text: "The king of pop at his best!", rating: 5 },
      {
        id: uuidv4(),
        text: "The music video is a true masterpiece.",
        rating: 4,
      },
    ],
  },
  {
    id: uuidv4(),
    category: "invention",
    title: "The Automobile",
    comments: [
      {
        id: uuidv4(),
        text: "Revolutionized transportation and changed the way we travel!",
        rating: 5,
      },
      {
        id: uuidv4(),
        text: "Henry Ford's invention that paved the way for modern transportation.",
        rating: 5,
      },
    ],
  },
  {
    id: uuidv4(),
    category: "song",
    title: "Don't Stop Believin' by Journey",
    comments: [
      { id: uuidv4(), text: "An anthem that never gets old!", rating: 4 },
      { id: uuidv4(), text: "This song always lifts my spirits.", rating: 5 },
      { id: uuidv4(), text: "This song always lifts my spirits.", rating: 1 },
    ],
  },
  {
    id: uuidv4(),
    category: "invention",
    title: "The Airplane",
    comments: [
      {
        id: uuidv4(),
        text: "Changed the way we travel across long distances!",
        rating: 5,
      },
      {
        id: uuidv4(),
        text: "The Wright brothers' invention that revolutionized aviation.",
        rating: 4,
      },
      {
        id: uuidv4(),
        text: "The Wright brothers' invention that revolutionized aviation.",
        rating: 3,
      },
    ],
  },
  {
    id: uuidv4(),
    category: "song",
    title: "Smells Like Teen Spirit by Nirvana",
    comments: [
      {
        id: uuidv4(),
        text: "A groundbreaking song that defined an era!",
        rating: 1,
      },
      {
        id: uuidv4(),
        text: "Nirvana's music resonates with a generation.",
        rating: 2,
      },
    ],
  },
  {
    id: uuidv4(),
    category: "invention",
    title: "The Personal Computer",
    comments: [
      {
        id: uuidv4(),
        text: "Transformed the way we work and communicate!",
        rating: 5,
      },
      {
        id: uuidv4(),
        text: "A technological breakthrough that brought computing to the masses.",
        rating: 2,
      },
    ],
  },
];

export default pool;
