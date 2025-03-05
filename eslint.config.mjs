export default [
  {
    ignores: ["node_modules/", "dist/", ".next/"], // Ignora pastas que não precisam ser verificadas
    plugins: {},
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@next/next/no-img-element": "off"
    }
  }
];
