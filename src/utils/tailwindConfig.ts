import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config';

export const twFullConfig = resolveConfig(tailwindConfig) as any; // any cast needed because tailwind config is not typed
