import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        "import.meta": "readonly",
      },
    },
  },
  {
    files: ["**/*.js"],
    languageOptions: { sourceType: "script" },
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "no-console": "warn",
      camelcase: "error",
    },
  },

  pluginReact.configs.flat.recommended,
]);
