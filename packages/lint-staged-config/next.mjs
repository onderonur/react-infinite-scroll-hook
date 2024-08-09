// https://nextjs.org/docs/app/building-your-application/configuring/eslint#lint-staged
import path from 'node:path';

const buildEslintCommand = (filenames) =>
  `next lint --max-warnings 0 --fix --file ${filenames
    .map((f) =>
      path
        .relative(process.cwd(), f)
        // Removing `apps/<app-name>` part to make `next lint` command work with `lint-staged`.
        .replace(/apps\/[a-z-]+\//, ''),
    )
    .join(' --file ')}`;

const config = {
  '*': 'prettier --write --ignore-unknown',
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
};

export default config;
