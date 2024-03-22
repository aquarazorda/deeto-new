/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  printWidth: 80,
  tabWidth: 2,
  trailingComma: "all",
  singleQuote: false,
  useTabs: false,
  semi: true,
  plugins: ["prettier-plugin-tailwindcss", "prettier-plugin-classnames"],
};

export default config;
