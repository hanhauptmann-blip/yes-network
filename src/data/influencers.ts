export type DisciplineArea =
  | 'Mystery / Thriller / Conspiracy'
  | 'Science-fiction'
  | 'Astronomy / Space / Alien'
  | 'Philosophy'
  | 'Psychology'
  | 'Bookstagram';

export type ThematicMotif =
  | 'Alien as "The Other"'
  | 'Trust, Consent & "YES?"'
  | 'Conspiracy & UAP'
  | 'First Contact & Space'
  | 'Reviews, ARCs & Book Clubs';

export type VerificationStatus = 'verified' | 'profile-check' | 'unconfirmed-official';

export interface Influencer {
  id: string;
  order: number;
  handle: string;
  area: DisciplineArea;
  followersDisplay: string;
  followersCount: number | null;
  whoTheyAre: string;
  partnership: string;
  motifs: ThematicMotif[];
  verificationStatus: VerificationStatus;
  verificationNote?: string;
  locationOrAffiliation?: string;
  formatTags: string[];
  connectedIds: string[];
}

export const AREAS: { id: DisciplineArea; shortLabel: string; count: number; description: string }[] = [
  {
    id: 'Mystery / Thriller / Conspiracy',
    shortLabel: 'Mystery & Thriller',
    count: 4,
    description: 'Crime reviewers, bookstagrammers, and suspense publicists positioned for the alien conspiracy tension.'
  },
  {
    id: 'Science-fiction',
    shortLabel: 'Science-Fiction',
    count: 4,
    description: 'Speculative authors and genre reviewers aligned with indie first-contact storytelling and worldbuilding.'
  },
  {
    id: 'Astronomy / Space / Alien',
    shortLabel: 'Astronomy & Space',
    count: 5,
    description: 'Astrophotographers, STEM educators, and UAP analysts bridging real-world space inquiry with speculative fiction.'
  },
  {
    id: 'Philosophy',
    shortLabel: 'Philosophy',
    count: 5,
    description: 'Philosophers, ethicists, and public thinkers exploring alterity, consent, and what it means to say "YES?".'
  },
  {
    id: 'Psychology',
    shortLabel: 'Psychology',
    count: 4,
    description: 'Lacanian psychoanalysts and cultural theorists examining desire, fear of the stranger, and destruction.'
  },
  {
    id: 'Bookstagram',
    shortLabel: 'Bookstagram',
    count: 5,
    description: 'Engaged book-culture accounts offering ARC tours, giveaways, audiobook features, and community book clubs.'
  }
];

export const THEMATIC_MOTIFS: {
  id: ThematicMotif;
  title: string;
  summary: string;
  bridgeAreas: string;
}[] = [
  {
    id: 'Alien as "The Other"',
    title: 'The Alien as "The Other"',
    summary: 'Philosophical and Lacanian readings examining how Robert Silhol frames the alien encounter as confrontation with radical alterity.',
    bridgeAreas: 'Philosophy · Psychology · Science-Fiction'
  },
  {
    id: 'Trust, Consent & "YES?"',
    title: 'Trust, Consent & Saying "YES?"',
    summary: 'Ethical, psychoanalytic, and existential reflections on trust, fear of the unknown, and the provocation of the book\'s title.',
    bridgeAreas: 'Philosophy · Psychology'
  },
  {
    id: 'Conspiracy & UAP',
    title: 'Conspiracy & UAP Inquiry',
    summary: 'Connecting suspense-thriller communities with UAP/UFO analysts where speculative fiction meets real-world disclosure debates.',
    bridgeAreas: 'Mystery / Thriller · Astronomy & Space'
  },
  {
    id: 'First Contact & Space',
    title: 'First Contact & Space Science',
    summary: 'Science checks, astrophotography pairings, podcast slots, and author-to-author dialogues on writing plausible alien encounters.',
    bridgeAreas: 'Astronomy & Space · Science-Fiction'
  },
  {
    id: 'Reviews, ARCs & Book Clubs',
    title: 'ARC Reviews, Tours & Giveaways',
    summary: 'Direct reader mobilization through indie-author exchanges, netgalley reviewers, story reactions, and book-club picks.',
    bridgeAreas: 'Bookstagram · Mystery / Thriller · Science-Fiction'
  }
];

export const INFLUENCERS: Influencer[] = [
  {
    id: 'author_noelleholten',
    order: 1,
    handle: '@author_noelleholten',
    area: 'Mystery / Thriller / Conspiracy',
    followersDisplay: '4,488',
    followersCount: 4488,
    whoTheyAre: 'UK crime writer, publicist and reviewer, known for championing thrillers and dark fiction to a loyal reader community.',
    partnership: 'PR and crime-fiction insider, so a review plus a "thriller readers who like sci-fi" feature, and advice on reaching publishers.',
    motifs: ['Conspiracy & UAP', 'Reviews, ARCs & Book Clubs'],
    verificationStatus: 'verified',
    locationOrAffiliation: 'United Kingdom',
    formatTags: ['Review', 'Feature', 'PR Advice'],
    connectedIds: ['whatlexysaid', 'thriller_booklover', 'jsdewes']
  },
  {
    id: 'twist_and_doubt',
    order: 2,
    handle: '@twist.and.doubt',
    area: 'Mystery / Thriller / Conspiracy',
    followersDisplay: 'Count not visible',
    followersCount: null,
    whoTheyAre: 'Tasmania-based bookstagrammer focused on thriller, crime and horror, known for honest reviews and book hauls.',
    partnership: 'Honest review and a "conspiracy meets sci-fi" reel for her thriller fans.',
    motifs: ['Conspiracy & UAP', 'Reviews, ARCs & Book Clubs'],
    verificationStatus: 'verified',
    locationOrAffiliation: 'Tasmania, Australia',
    formatTags: ['Reel', 'Honest Review'],
    connectedIds: ['hallucinationhippies', 'sukijreads', 'whatlexysaid']
  },
  {
    id: 'whatlexysaid',
    order: 3,
    handle: '@whatlexysaid',
    area: 'Mystery / Thriller / Conspiracy',
    followersDisplay: '3,644',
    followersCount: 3644,
    whoTheyAre: 'Lex Brookman, London/Kent crime and thriller reader, known for reading 100+ crime books a year and covering crime-fiction festivals and authors.',
    partnership: 'Review for her crime-reading community; the alien conspiracy angle fits her thriller audience.',
    motifs: ['Conspiracy & UAP', 'Reviews, ARCs & Book Clubs'],
    verificationStatus: 'verified',
    locationOrAffiliation: 'London / Kent, UK',
    formatTags: ['Community Review', 'Conspiracy Angle'],
    connectedIds: ['author_noelleholten', 'thriller_booklover', 'hallucinationhippies']
  },
  {
    id: 'thriller_booklover',
    order: 4,
    handle: '@thriller.booklover',
    area: 'Mystery / Thriller / Conspiracy',
    followersDisplay: '8,478',
    followersCount: 8478,
    whoTheyAre: 'Pamela, bookstagrammer and NetGalley ARC reviewer, known for thrillers, cozy mysteries and romantic suspense.',
    partnership: 'ARC review and a thriller recommendation post to her suspense-reading audience.',
    motifs: ['Reviews, ARCs & Book Clubs', 'Conspiracy & UAP'],
    verificationStatus: 'verified',
    locationOrAffiliation: 'NetGalley / Bookstagram',
    formatTags: ['ARC Review', 'Recommendation Post'],
    connectedIds: ['author_noelleholten', 'whatlexysaid', 'sukijreads']
  },
  {
    id: 'jsdewes',
    order: 5,
    handle: '@jsdewes',
    area: 'Science-fiction',
    followersDisplay: '2.8K',
    followersCount: 2800,
    whoTheyAre: 'Sci-fi author published by Tor Books and video game writer, known for the Divide series and for sharing her writing life.',
    partnership: 'Author-to-author shout-out or a Q&A on writing aliens and first contact.',
    motifs: ['First Contact & Space', 'Alien as "The Other"'],
    verificationStatus: 'verified',
    locationOrAffiliation: 'Tor Books Author',
    formatTags: ['Author Q&A', 'Shout-out'],
    connectedIds: ['mikelwisler', 'mandi_lavoie', 'cosmossafari']
  },
  {
    id: 'mikelwisler',
    order: 6,
    handle: '@mikelwisler',
    area: 'Science-fiction',
    followersDisplay: '1.3K',
    followersCount: 1300,
    whoTheyAre: 'Speculative fiction author, known for writing "for people who think too much" and for his novel STOP.',
    partnership: 'Indie-author exchange, mutual recommendation and a "books for people who think too much" post.',
    motifs: ['Alien as "The Other"', 'Trust, Consent & "YES?"'],
    verificationStatus: 'verified',
    locationOrAffiliation: 'Indie Speculative Fiction',
    formatTags: ['Author Exchange', 'Mutual Feature'],
    connectedIds: ['jsdewes', 'underground_philosophy', 'thestoicteacher']
  },
  {
    id: 'teaand_tomes',
    order: 7,
    handle: '@teaand_tomes',
    area: 'Science-fiction',
    followersDisplay: '5.2K',
    followersCount: 5200,
    whoTheyAre: 'Reviewer known for cozy, clear recommendations across sci-fi, fantasy, romantasy and romcom.',
    partnership: 'Review plus giveaway of the book to her sci-fi and fantasy readers.',
    motifs: ['Reviews, ARCs & Book Clubs', 'First Contact & Space'],
    verificationStatus: 'verified',
    formatTags: ['Review', 'Book Giveaway'],
    connectedIds: ['bookivia', 'thebookishmusician', 'shadowbooker']
  },
  {
    id: 'mandi_lavoie',
    order: 8,
    handle: '@mandi_lavoie',
    area: 'Science-fiction',
    followersDisplay: '1.2K',
    followersCount: 1200,
    whoTheyAre: 'Sci-fi and fantasy writer, known for worldbuilding and behind-the-scenes posts on her writing process.',
    partnership: 'Guest post on worldbuilding an alien perspective, with a book feature.',
    motifs: ['First Contact & Space', 'Alien as "The Other"'],
    verificationStatus: 'verified',
    locationOrAffiliation: 'Sci-Fi & Fantasy Writer',
    formatTags: ['Guest Post', 'Worldbuilding Feature'],
    connectedIds: ['jsdewes', 'krisztinamair', 'postmarkedfromthestars']
  },
  {
    id: 'cosmossafari',
    order: 9,
    handle: '@cosmossafari',
    area: 'Astronomy / Space / Alien',
    followersDisplay: '1,326',
    followersCount: 1326,
    whoTheyAre: 'Astrophotographer and educator behind the Cosmos Safari podcast, known as a NASA/JPL Solar System Ambassador.',
    partnership: 'Podcast guest slot on "how fiction imagines alien contact", linked to the book.',
    motifs: ['First Contact & Space'],
    verificationStatus: 'verified',
    locationOrAffiliation: 'NASA/JPL Ambassador',
    formatTags: ['Podcast Guest', 'Audio Dialogue'],
    connectedIds: ['space_thomalice', 'dr_niamh_shaw', 'jsdewes']
  },
  {
    id: 'space_thomalice',
    order: 10,
    handle: '@space_thomalice',
    area: 'Astronomy / Space / Alien',
    followersDisplay: '3,721',
    followersCount: 3721,
    whoTheyAre: 'French space communicator and author, known for making the universe accessible through streaming, video and her book.',
    partnership: 'Live stream or video reading of an excerpt, with a science check of the alien premise.',
    motifs: ['First Contact & Space'],
    verificationStatus: 'verified',
    locationOrAffiliation: 'France',
    formatTags: ['Live Stream', 'Excerpt Reading', 'Science Check'],
    connectedIds: ['cosmossafari', 'dr_niamh_shaw', 'astronayyar']
  },
  {
    id: 'dr_niamh_shaw',
    order: 11,
    handle: '@dr_niamh_shaw',
    area: 'Astronomy / Space / Alien',
    followersDisplay: '7,810',
    followersCount: 7810,
    whoTheyAre: 'Irish scientist, engineer and performer, known for STEM communication and public speaking about space.',
    partnership: 'Expert commentary "could this alien encounter happen?" and a book mention on stage or online.',
    motifs: ['First Contact & Space', 'Trust, Consent & "YES?"'],
    verificationStatus: 'verified',
    locationOrAffiliation: 'Ireland',
    formatTags: ['Expert Commentary', 'Stage / Online Mention'],
    connectedIds: ['cosmossafari', 'space_thomalice', 'astronayyar']
  },
  {
    id: 'astronayyar',
    order: 12,
    handle: '@astronayyar',
    area: 'Astronomy / Space / Alien',
    followersDisplay: '6,760',
    followersCount: 6760,
    whoTheyAre: 'Young physics and astrophysics student in Sheffield, known for astrophotography featured by NASA.',
    partnership: 'Night-sky visual post matched with a book quote, giveaway for her space students.',
    motifs: ['First Contact & Space', 'Reviews, ARCs & Book Clubs'],
    verificationStatus: 'verified',
    locationOrAffiliation: 'Sheffield, UK',
    formatTags: ['Visual Quote Post', 'Student Giveaway'],
    connectedIds: ['cosmossafari', 'space_thomalice', 'postmarkedfromthestars']
  },
  {
    id: 'hallucinationhippies',
    order: 13,
    handle: '@hallucinationhippies',
    area: 'Astronomy / Space / Alien',
    followersDisplay: '13.7K',
    followersCount: 13700,
    whoTheyAre: 'Creator focused on UFOs, UAPs and consciousness, known for an "analysis over hype" approach.',
    partnership: 'UFO/UAP audience is the closest match to the conspiracy angle: a discussion post "fiction vs. the real UAP debate" with the book as the example.',
    motifs: ['Conspiracy & UAP', 'First Contact & Space'],
    verificationStatus: 'verified',
    formatTags: ['Discussion Post', 'UAP Analysis'],
    connectedIds: ['twist_and_doubt', 'whatlexysaid', 'postmarkedfromthestars']
  },
  {
    id: 'thestoicteacher',
    order: 14,
    handle: '@thestoicteacher',
    area: 'Philosophy',
    followersDisplay: '4.9K',
    followersCount: 4900,
    whoTheyAre: 'Cambridge-trained philosophy teacher, known for making Stoicism practical for modern life and for a masterclass with Ali Abdaal.',
    partnership: 'Reflection post on trust and fear of the unknown in the book, with a quote card.',
    motifs: ['Trust, Consent & "YES?"'],
    verificationStatus: 'verified',
    locationOrAffiliation: 'Cambridge-trained / UK',
    formatTags: ['Reflection Post', 'Quote Card'],
    connectedIds: ['tara_murney', 'underground_philosophy', 'drjasonchilds']
  },
  {
    id: 'underground_philosophy',
    order: 15,
    handle: '@underground_philosophy',
    area: 'Philosophy',
    followersDisplay: '3.1K',
    followersCount: 3100,
    whoTheyAre: 'Professor, philosopher and poet based in Bonn, known for bringing academic philosophy to a public audience.',
    partnership: 'Discussion post on "what does it mean to say yes to the other?" using the title YES?',
    motifs: ['Alien as "The Other"', 'Trust, Consent & "YES?"'],
    verificationStatus: 'verified',
    locationOrAffiliation: 'Bonn, Germany',
    formatTags: ['Discussion Post', 'Close Reading'],
    connectedIds: ['krisztinamair', 'derekhookonlacan', 'tara_murney']
  },
  {
    id: 'krisztinamair',
    order: 16,
    handle: '@krisztinamair',
    area: 'Philosophy',
    followersDisplay: '1.1K',
    followersCount: 1100,
    whoTheyAre: 'Philosophy and theology tutor with a PhD, based between the UK and Hungary.',
    partnership: 'Philosophical reading of the alien as "the Other", with the book as a case study.',
    motifs: ['Alien as "The Other"'],
    verificationStatus: 'verified',
    locationOrAffiliation: 'UK / Hungary',
    formatTags: ['Case Study', 'Philosophical Reading'],
    connectedIds: ['underground_philosophy', 'derekhookonlacan', 'jamiesonwebster']
  },
  {
    id: 'tara_murney',
    order: 17,
    handle: '@tara_murney',
    area: 'Philosophy',
    followersDisplay: '5.1K',
    followersCount: 5100,
    whoTheyAre: 'Doctor of philosophy, known for blending philosophy, spirituality and intuition for entrepreneurs.',
    partnership: 'Post on trust, intuition and consent, linking the title to the theme of saying yes.',
    motifs: ['Trust, Consent & "YES?"'],
    verificationStatus: 'verified',
    formatTags: ['Theme Post', 'Trust & Consent'],
    connectedIds: ['thestoicteacher', 'underground_philosophy', 'jamiesonwebster']
  },
  {
    id: 'hiphopandphilosophy',
    order: 18,
    handle: '@hiphopandphilosophy',
    area: 'Philosophy',
    followersDisplay: '857',
    followersCount: 857,
    whoTheyAre: 'Community led by Derrick Darby, known for bringing hip hop and philosophy into one conversation.',
    partnership: 'Community discussion "who is the alien in our society?" with the book as a starting point.',
    motifs: ['Alien as "The Other"'],
    verificationStatus: 'verified',
    locationOrAffiliation: 'Led by Derrick Darby',
    formatTags: ['Community Discussion'],
    connectedIds: ['underground_philosophy', 'krisztinamair', 'slavojzizeks']
  },
  {
    id: 'drjasonchilds',
    order: 19,
    handle: '@drjasonchilds',
    area: 'Psychology',
    followersDisplay: '4,703',
    followersCount: 4703,
    whoTheyAre: 'Counsellor and Lacanian psychoanalytic practitioner (profile match still to be checked on Instagram).',
    partnership: 'Psychoanalytic reading of trust and destruction in the story.',
    motifs: ['Trust, Consent & "YES?"', 'Alien as "The Other"'],
    verificationStatus: 'profile-check',
    verificationNote: 'Profile match still to be checked on Instagram.',
    formatTags: ['Psychoanalytic Reading'],
    connectedIds: ['jamiesonwebster', 'derekhookonlacan', 'thestoicteacher']
  },
  {
    id: 'jamiesonwebster',
    order: 20,
    handle: '@jamiesonwebster',
    area: 'Psychology',
    followersDisplay: '12,700',
    followersCount: 12700,
    whoTheyAre: 'New York psychoanalyst, author and teacher at The New School, known for accessible writing on psychoanalysis.',
    partnership: 'Commentary on desire, trust and the stranger in the book, as a short essay-style post.',
    motifs: ['Trust, Consent & "YES?"', 'Alien as "The Other"'],
    verificationStatus: 'verified',
    locationOrAffiliation: 'New York / The New School',
    formatTags: ['Essay-Style Post', 'Commentary'],
    connectedIds: ['drjasonchilds', 'derekhookonlacan', 'krisztinamair']
  },
  {
    id: 'derekhookonlacan',
    order: 21,
    handle: '@derekhookonlacan',
    area: 'Psychology',
    followersDisplay: '2,546',
    followersCount: 2546,
    whoTheyAre: 'University professor known for Lacanian psychoanalysis and critical social psychology (profile match still to be checked).',
    partnership: 'Lacanian reading of the title "YES?" and the alien as the Other, for his academic audience.',
    motifs: ['Alien as "The Other"', 'Trust, Consent & "YES?"'],
    verificationStatus: 'profile-check',
    verificationNote: 'Profile match still to be checked.',
    formatTags: ['Lacanian Reading', 'Academic Audience'],
    connectedIds: ['drjasonchilds', 'jamiesonwebster', 'underground_philosophy']
  },
  {
    id: 'slavojzizeks',
    order: 22,
    handle: '@slavojzizeks',
    area: 'Psychology',
    followersDisplay: '255,000',
    followersCount: 255000,
    whoTheyAre: 'Slovenian philosopher and public intellectual, known for cultural theory. Listed as his account by a third party, not confirmed as official.',
    partnership: 'Large reach, so a long shot. Realistic goal is a tag or mention, not a paid deal.',
    motifs: ['Alien as "The Other"'],
    verificationStatus: 'unconfirmed-official',
    verificationNote: 'Listed as his account by a third party, not confirmed as official.',
    locationOrAffiliation: 'Slovenia',
    formatTags: ['Tag / Mention (Long Shot)'],
    connectedIds: ['derekhookonlacan', 'jamiesonwebster', 'hiphopandphilosophy']
  },
  {
    id: 'sukijreads',
    order: 23,
    handle: '@sukijreads',
    area: 'Bookstagram',
    followersDisplay: '1,443',
    followersCount: 1443,
    whoTheyAre: 'UK bookstagrammer known for sci-fi, dystopian and horror reviews, ARCs and book tours.',
    partnership: 'ARC review and book tour stop, since she covers sci-fi and horror.',
    motifs: ['Reviews, ARCs & Book Clubs'],
    verificationStatus: 'verified',
    locationOrAffiliation: 'United Kingdom',
    formatTags: ['ARC Review', 'Book Tour Stop'],
    connectedIds: ['bookivia', 'thriller_booklover', 'twist_and_doubt']
  },
  {
    id: 'bookivia',
    order: 24,
    handle: '@bookivia',
    area: 'Bookstagram',
    followersDisplay: '2,901',
    followersCount: 2901,
    whoTheyAre: 'Melbourne reviewer known for sci-fi, fantasy and romantasy reviews, a rising small account.',
    partnership: 'Review plus story-style reaction posts, a good small, engaged first partner.',
    motifs: ['Reviews, ARCs & Book Clubs'],
    verificationStatus: 'verified',
    locationOrAffiliation: 'Melbourne, Australia',
    formatTags: ['Review', 'Story Reactions'],
    connectedIds: ['sukijreads', 'teaand_tomes', 'thebookishmusician']
  },
  {
    id: 'shadowbooker',
    order: 25,
    handle: '@shadowbooker',
    area: 'Bookstagram',
    followersDisplay: '34,500',
    followersCount: 34500,
    whoTheyAre: 'Romance, fantasy and sci-fi reader known for audiobooks and hosting a book club.',
    partnership: 'Audiobook-style or book-club pick for her sci-fi readers.',
    motifs: ['Reviews, ARCs & Book Clubs'],
    verificationStatus: 'verified',
    formatTags: ['Book-Club Pick', 'Audiobook Feature'],
    connectedIds: ['thebookishmusician', 'teaand_tomes', 'postmarkedfromthestars']
  },
  {
    id: 'postmarkedfromthestars',
    order: 26,
    handle: '@postmarkedfromthestars',
    area: 'Bookstagram',
    followersDisplay: '11,300',
    followersCount: 11300,
    whoTheyAre: 'Bryan Stewart, known for sharing sci-fi books, movies and culture.',
    partnership: 'Feature in his sci-fi books-and-culture posts.',
    motifs: ['Reviews, ARCs & Book Clubs', 'First Contact & Space'],
    verificationStatus: 'verified',
    formatTags: ['Culture Feature'],
    connectedIds: ['shadowbooker', 'mandi_lavoie', 'hallucinationhippies']
  },
  {
    id: 'thebookishmusician',
    order: 27,
    handle: '@thebookishmusician',
    area: 'Bookstagram',
    followersDisplay: '20,400',
    followersCount: 20400,
    whoTheyAre: 'Texas-based reviewer known for fantasy, sci-fi and romance reviews.',
    partnership: 'Review and giveaway, also open to author collaborations.',
    motifs: ['Reviews, ARCs & Book Clubs'],
    verificationStatus: 'verified',
    locationOrAffiliation: 'Texas, USA',
    formatTags: ['Review', 'Giveaway', 'Author Collab'],
    connectedIds: ['shadowbooker', 'teaand_tomes', 'bookivia']
  }
];

export function formatFollowerTotal(total: number): string {
  if (total >= 1000000) return `${(total / 1000000).toFixed(1)}M`;
  if (total >= 1000) return `${(total / 1000).toFixed(1)}K`;
  return total.toLocaleString();
}

export function getInstagramUrl(handle: string): string {
  const clean = handle.replace(/^@/, '');
  return `https://www.instagram.com/${clean}/`;
}
