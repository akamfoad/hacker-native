// https://docs.expo.dev/guides/using-eslint/
import pluginQuery from "@tanstack/eslint-plugin-query";

module.exports = [{ extends: "expo" }, pluginQuery.configs["flat/recommended"]];
