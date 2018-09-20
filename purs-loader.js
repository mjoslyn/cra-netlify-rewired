const path = require("path");
const ruleChildren = loader =>
  loader.use ||
  loader.oneOf ||
  (Array.isArray(loader.loader) && loader.loader) ||
  [];

const findIndexAndRules = (rulesSource, ruleMatcher) => {
  let result = undefined;
  const rules = Array.isArray(rulesSource)
    ? rulesSource
    : ruleChildren(rulesSource);
  rules.some(
    (rule, index) =>
      (result = ruleMatcher(rule)
        ? { index, rules }
        : findIndexAndRules(ruleChildren(rule), ruleMatcher))
  );
  return result;
};

const createLoaderMatcher = loader => rule =>
  rule.loader && rule.loader.indexOf(`${path.sep}${loader}${path.sep}`) !== -1;
const fileLoaderMatcher = createLoaderMatcher("file-loader");

const addBeforeRule = (rulesSource, ruleMatcher, value) => {
  const { index, rules } = findIndexAndRules(rulesSource, ruleMatcher);
  rules.splice(index, 0, value);
};

module.exports = function(config, env) {
  const pursLoader = {
    test: /\.purs$/,
    use: [
      {
        loader: "purs-loader",
        options: {
          src: ["bower_components/purescript-*/src/**/*.purs", "src/**/*.purs"],
          bundle: false,
          psc: "psa",
          watch: env === "development",
          pscIde: true
        }
      }
    ]
  };
  delete config.resolve.plugins[0];
  addBeforeRule(config.module.rules, fileLoaderMatcher, pursLoader);
  return config;
};
