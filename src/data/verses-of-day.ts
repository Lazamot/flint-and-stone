// Pool of 30 daily verses for teenage boys / young men
// Rotates based on day-of-year so every user sees the same verse each day

export interface DailyVerse {
  text: string;
  reference: string;
}

export const DAILY_VERSES: DailyVerse[] = [
  { text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.", reference: "Joshua 1:9" },
  { text: "I can do all this through him who gives me strength.", reference: "Philippians 4:13" },
  { text: "As iron sharpens iron, so one person sharpens another.", reference: "Proverbs 27:17" },
  { text: "Do not conform to the pattern of this world, but be transformed by the renewing of your mind.", reference: "Romans 12:2" },
  { text: "Flee the evil desires of youth and pursue righteousness, faith, love and peace.", reference: "2 Timothy 2:22" },
  { text: "Don't let anyone look down on you because you are young, but set an example in speech, in conduct, in love, in faith and in purity.", reference: "1 Timothy 4:12" },
  { text: "The Lord is my strength and my shield; my heart trusts in him, and he helps me.", reference: "Psalm 28:7" },
  { text: "How can a young person stay on the path of purity? By living according to your word.", reference: "Psalm 119:9" },
  { text: "Trust in the Lord with all your heart and lean not on your own understanding.", reference: "Proverbs 3:5" },
  { text: "For God has not given us a spirit of fear, but of power and of love and of a sound mind.", reference: "2 Timothy 1:7" },
  { text: "Walk with the wise and become wise, for a companion of fools suffers harm.", reference: "Proverbs 13:20" },
  { text: "Above all else, guard your heart, for everything you do flows from it.", reference: "Proverbs 4:23" },
  { text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles.", reference: "Isaiah 40:31" },
  { text: "The integrity of the upright guides them, but the unfaithful are destroyed by their duplicity.", reference: "Proverbs 11:3" },
  { text: "Be on your guard; stand firm in the faith; be courageous; be strong.", reference: "1 Corinthians 16:13" },
  { text: "No discipline seems pleasant at the time, but painful. Later on, however, it produces a harvest of righteousness.", reference: "Hebrews 12:11" },
  { text: "Whoever can be trusted with very little can also be trusted with much.", reference: "Luke 16:10" },
  { text: "The Lord does not look at the things people look at. People look at the outward appearance, but the Lord looks at the heart.", reference: "1 Samuel 16:7" },
  { text: "A good name is more desirable than great riches; to be esteemed is better than silver or gold.", reference: "Proverbs 22:1" },
  { text: "Do nothing out of selfish ambition or vain conceit. Rather, in humility value others above yourselves.", reference: "Philippians 2:3" },
  { text: "Blessed is the one who perseveres under trial because, having stood the test, that person will receive the crown of life.", reference: "James 1:12" },
  { text: "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.", reference: "Colossians 3:23" },
  { text: "The righteous man walks in his integrity; his children are blessed after him.", reference: "Proverbs 20:7" },
  { text: "Greater love has no one than this: to lay down one's life for one's friends.", reference: "John 15:13" },
  { text: "Create in me a pure heart, O God, and renew a steadfast spirit within me.", reference: "Psalm 51:10" },
  { text: "Commit to the Lord whatever you do, and he will establish your plans.", reference: "Proverbs 16:3" },
  { text: "Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you.", reference: "Ephesians 4:32" },
  { text: "The fear of the Lord is the beginning of wisdom, and knowledge of the Holy One is understanding.", reference: "Proverbs 9:10" },
  { text: "Blessed are the pure in heart, for they will see God.", reference: "Matthew 5:8" },
  { text: "Finally, be strong in the Lord and in his mighty power.", reference: "Ephesians 6:10" },
];

/**
 * Returns today's verse based on the day of the year.
 * All users see the same verse on the same calendar day.
 */
export function getVerseOfTheDay(): DailyVerse {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  return DAILY_VERSES[dayOfYear % DAILY_VERSES.length];
}
