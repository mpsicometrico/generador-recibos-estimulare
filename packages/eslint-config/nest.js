import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";
import pluginNest from "@darraghor/eslint-plugin-nestjs-typed";
import { config as baseConfig } from "./base.js";

/**
 * A custom ESLint configuration for libraries that use Next.js.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const nestJsConfig = [
  ...baseConfig,
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: {
      "@nest/nest": pluginNest,
    },
    rules: {
      ...pluginNest.configs.recommended.rules,
    },
  },
];
