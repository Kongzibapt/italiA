export const content = [
  './components/**/*.{js,vue,ts}',
  './layouts/**/*.vue',
  './pages/**/*.vue',
  './plugins/**/*.{js,ts}',
  './app.vue',
  './error.vue',
];
export const theme = {
  extend: {
    colors: {
      background: '#FFFAF4', // Beige
      secondaryBackground: '#FBFBFB', // Blanc
      inputs: '#FAFAF7', // Blanc cassé
      primary: '#A8D5BA', // Vert
      secondary: '#90CAF9', // Bleu
      error: '#F98258', // Orange
      primaryText: '#333333', // Noir
      secondaryText: '#9B9B9B', // Gris clair
      disabled: 'E7E7E4', // Gris très clair
      logo: '#FF7F7F', // Rose
    },
    fontSize: {
      // Extra Large
      extraLargeBold: ['32px', { lineHeight: '40px', fontWeight: '700' }],
      extraLarge: ['32px', { lineHeight: '40px', fontWeight: '600' }],
      extraLargeThin: ['32px', { lineHeight: '40px', fontWeight: '500' }],

      // Large
      largeBold: ['24px', { lineHeight: '30px', fontWeight: '700' }],
      large: ['24px', { lineHeight: '30px', fontWeight: '600' }],
      largeThin: ['24px', { lineHeight: '30px', fontWeight: '500' }],

      // Semi Large
      semiLargeBold: ['20px', { lineHeight: '25px', fontWeight: '700' }],
      semiLarge: ['20px', { lineHeight: '25px', fontWeight: '600' }],
      semiLargeThin: ['20px', { lineHeight: '25px', fontWeight: '500' }],

      // Medium
      mediumBold: ['18px', { lineHeight: '22.5px', fontWeight: '700' }],
      medium: ['18px', { lineHeight: '22.5px', fontWeight: '600' }],
      mediumThin: ['18px', { lineHeight: '22.5px', fontWeight: '500' }],

      // Body normal
      bodyBold: ['14px', { lineHeight: '17.5px', fontWeight: '700' }],
      body: ['14px', { lineHeight: '17.5px', fontWeight: '600' }],
      bodyThin: ['14px', { lineHeight: '17.5px', fontWeight: '500' }],

      // Small
      smallBold: ['12px', { lineHeight: '15px', fontWeight: '700' }],
      small: ['12px', { lineHeight: '15px', fontWeight: '600' }],
      smallThin: ['12px', { lineHeight: '15px', fontWeight: '500' }],
    },
    width: {
      scoreBig: '38rem',
    },
  },
};
export const plugins = [];
