// YouTube video testimonials — copied from the original youcan.legal home page
// (the .yt-lite swiper), in the exact same order. 26 videos.
// `title` is the video's real YouTube title (fetched from the YouTube oEmbed
// endpoint) and is used for the thumbnail alt text and the accessible label.
export const TESTIMONIALS = [
  { id: '7bDIXdUFxwo', title: 'Leaving Zimbabwe for a New Life in Europe 🇿🇼➡️🇪🇺 | Chelsea\'s Story' },
  { id: 'csnipUwA_uU', title: '"It Was Easier Than I Expected": Monashi from Zimbabwe Shares His Story' },
  { id: 'IM8fi_LAZXQ', title: 'From Guinea to Poland: Mustafa\'s Job Story' },
  { id: 'w_RNighLkbA', title: 'Ibrahim from Ghana found a Legal Job in Europe — Here\'s How' },
  { id: 'KzvGC8vBvVI', title: 'From Zimbabwe to Europe: Enock’s Journey to Legal Work' },
  { id: 'hxScFTWWZLg', title: 'How Tierno Kande from Senegal Started a New Life in Europe | Real Success Story' },
  { id: 'O7q6ukmiJco', title: 'Njabulo from South Africa Shares His Experience Working in Poland' },
  { id: 'gAIDsqHpZ-Y', title: 'A Real Journey from Zimbabwe to Poland' },
  { id: 'Wk5uzsc0w_o', title: 'Jacqueline from Tanzania: My Honest Experience Working with YouCanLegal' },
  { id: 'OUja6ED5lqg', title: 'Mash Found a Legal Job in Europe — Here\'s How' },
  { id: 'J-7mzRg5BcE', title: 'From Zimbabwe to Europe: Amanda\'s Real Story' },
  { id: 'XuAWm5LE9Cw', title: 'From Zimbabwe to Europe: Mbeke’s Work Experience' },
  { id: 'c-XS9Bg_mnA', title: 'Why Alistair Chose Poland for Work Opportunities' },
  { id: '0kQ4b_Dw0kE', title: 'From Nigeria to Europe 🇳🇬➡️🇪🇺 | Real Client Success Story | You Can Legal' },
  { id: 'A3Iwb0OUxVQ', title: 'Kwena from South Africa Shares His Experience Working in Poland' },
  { id: 'CI_3I3q6Et8', title: 'Arshik from India Shares His Experience Working in Poland' },
  { id: 'wlBcaolgOyc', title: 'From South Africa to Poland: Sello Mankge’s Journey' },
  { id: 'v3itLkVkMuc', title: 'How Shamsudeen from India Started His New Career in Poland' },
  { id: 'tO45oM0QtlI', title: 'Idris from Nigeria Shares His Experience Working with YouCanLegal | Poland Work Visa Success Story' },
  { id: 'yX1KCp_7N6w', title: 'Wisdom from Nigeria Shares His Experience Working in Poland' },
  { id: '7zUTMMXxkjU', title: 'Client Testimonial: Becky from Ghana — Legal Work Permit & Successful Relocation' },
  { id: 'i5r2MTCa6tY', title: 'From Nigeria to Poland: Ferdiand’s Work Experience' },
  { id: 'ZKQ1B0YJjDs', title: 'Video Testimonial — Goodness from Nigeria' },
  { id: '9HI5SiDi05M', title: 'Prosper’s Success Story 🇳🇬 | How YouCanLegal Helped Him Get a Work Permit for Poland' },
  { id: 'tajdme1hcfg', title: 'Suraj’s Experience With YouCanLegal | From India to Europe' },
  { id: 'WhqYj-8IWXY', title: 'A New Life in Poland: Fozar\'s Relocation Experience' },
];

// Poster thumbnail exactly as the original builds it.
export const posterUrl = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

// Embed URL exactly as the original builds it.
export const embedUrl = (id) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&showinfo=0&playsinline=1`;
