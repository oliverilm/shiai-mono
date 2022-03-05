// eslint-disable-next-line import/no-extraneous-dependencies
import createCache from '@emotion/cache';
import { EmotionCache } from '@emotion/react';

export default function createEmotionCache(): EmotionCache {
  return createCache({ key: 'css' });
}
