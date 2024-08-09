const config = {
  '*': 'prettier --write --ignore-unknown',
  '*.{js,jsx,ts,tsx}': 'eslint --max-warnings 0 --fix',
};

export default config;
