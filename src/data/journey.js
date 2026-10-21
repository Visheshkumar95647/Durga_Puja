
export const IMAGE = '/images/common/placeholder.jpg';

const createPandal = (id, folder, name, area, day) => ({
  id,
  name,
  area,
  caption: 'A beautiful stop in our Pujo memories. ❤️',
  photos: Array.from(
    { length: 6 },
    (_, index) =>
      `/images/pandals/day${day}-${folder}/photo${index + 1}.png`
  ),
});

export const days = [
  {
    day: 6,
    name: 'Shashthi',
    subtitle: 'The first lights of our Pujo',
    intro: 'Abar shuru hok amader chotto Pujo adventure. ❤️',
    area: 'North Kolkata',
    pandals: [
      createPandal('bagbazar', 'bagbazar', 'Bagbazar Sarbojanin', 'Bagbazar', 6),
      createPandal('kumartuli', 'kumartuli', 'Kumartuli Park', 'Kumartuli', 6),
      createPandal('tala', 'tala-prattoy', 'Tala Prattoy', 'Tala', 6),
      createPandal('sovabazar', 'sovabazar', 'Sovabazar Rajbari', 'North Kolkata', 6),
      createPandal('ahiritola', 'ahiritola', 'Ahiritola Sarbojanin', 'North Kolkata', 6),
    ],
  },
  {
    day: 7,
    name: 'Saptami',
    subtitle: 'The city glows a little brighter',
    intro: 'Aaj aro beshi alo, aro beshi golpo, aar onek bhalobasha. ❤️',
    area: 'Central Kolkata',
    pandals: [
      createPandal('santosh', 'santosh-mitra', 'Santosh Mitra Square', 'Bowbazar', 7),
      createPandal('mohammad-ali', 'mohammad-ali-park', 'Mohammad Ali Park', 'Central Kolkata', 7),
      createPandal('college-square', 'college-square', 'College Square', 'College Street', 7),
      createPandal('chorbagan', 'chorbagan', 'Chorbagan Sarbojanin', 'Central Kolkata', 7),
      createPandal('lalbazar', 'lalbazar', 'Lalbazar Sarbojanin', 'Central Kolkata', 7),
    ],
  },
  {
    day: 8,
    name: 'Ashtami',
    subtitle: 'A day of prayers and blessings',
    intro: 'Maa Durga amader shob shomoy bhalo rakhun. 🪔',
    area: 'South Kolkata',
    devotional: true,
    pandals: [
      createPandal('singhi', 'singhi-park', 'Singhi Park', 'South Kolkata', 8),
      createPandal('ekdalia', 'ekdalia', 'Ekdalia Evergreen', 'Gariahat', 8),
      createPandal('deshapriya', 'deshapriya-park', 'Deshapriya Park', 'South Kolkata', 8),
    ],
  },
  {
    day: 9,
    name: 'Navami',
    subtitle: 'One more night of unforgettable lights',
    intro: 'Aaj shesh rater shob alo mone rekhe debo. ❤️',
    area: 'Kolkata',
    pandals: [
      createPandal('sreebhumi', 'sreebhumi', 'Sreebhumi Sporting Club', 'Lake Town', 9),
      createPandal('suruchi', 'suruchi-sangha', 'Suruchi Sangha', 'New Alipore', 9),
      createPandal('tridhara', 'tridhara', 'Tridhara Sammilani', 'South Kolkata', 9),
    ],
  },
];

export const routeOut = [
  ['Buggu’s House', 'Get ready for the day', '⌂'],
  ['Bicycle Ride', 'A little ride to the station', '🚲'],
  ['Nasibpur Station', 'Our train journey begins', '🚉'],
  ['Train to Bally', 'Watch the city pass by', '🚆'],
  ['Bally Station', 'We have arrived at Bally', '🚉'],
  ['Kolkata Journey', 'Continue towards our pandals', '🚇'],
  ['Pandal Hopping', 'Time to make memories', '🪔'],
].map(([title, detail, icon], index) => ({
  id: index,
  title,
  detail,
  icon,
}));

export const dashamiSteps = [
  {
    title: 'Get ready at home',
    detail: 'A special day with family awaits.',
    icon: '🏠',
  },
  {
    title: 'Journey to Nani’s house',
    detail: 'On our way to meet everyone.',
    icon: '🚗',
  },
  {
    title: 'Meet the family',
    detail: 'Bijoya greetings, smiles and blessings.',
    icon: '❤️',
  },
  {
    title: 'Play with the children',
    detail: 'Laugh, play and make sweet memories.',
    icon: '🌸',
  },
  {
    title: 'Bijoya celebration',
    detail: 'A warm day filled with love.',
    icon: '🪔',
  },
];
