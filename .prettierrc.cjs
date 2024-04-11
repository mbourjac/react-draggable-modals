module.exports = {
  experimentalTernaries: true,
  singleQuote: true,
  importOrder: [
    '^react(.*)',
    '<THIRD_PARTY_MODULES>',
    '@/(.*)',
    '^../(.*)',
    '^./(.*)',
  ],
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
};
