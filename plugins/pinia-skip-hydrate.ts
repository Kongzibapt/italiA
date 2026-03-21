import { definePayloadReducer, definePayloadReviver } from '#imports';
import { shouldHydrate } from 'pinia';

export default defineNuxtPlugin({
  name: 'pinia-skip-hydrate-fix',
  enforce: 'post',
  setup() {
    if (import.meta.server) {
      definePayloadReducer('skipHydrate', (data) => {
        try {
          return !shouldHydrate(data) && 1;
        } catch (error) {
          if (process.dev) {
            console.warn(
              '[pinia] skipHydrate reducer fallback applied for value',
              data,
              error
            );
          }
          return 0;
        }
      });
    }

    if (import.meta.client) {
      definePayloadReviver('skipHydrate', () => void 0);
    }
  },
});
