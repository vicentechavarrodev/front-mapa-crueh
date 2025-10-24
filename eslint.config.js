import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js, react: pluginReact },
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        ...globals.browser,
        "import.meta": "readonly",
      },
    },
  },
  {
    files: ["**/*.jsx"],
    languageOptions: { sourceType: "module" },
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "react/prop-types": 0,
    },
  },

  pluginReact.configs.flat.recommended,
]);
