const { defineConfig } = require("cypress");

const fs = require("fs-extra");
const path = require("path");

function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve("cypress/config", `${file}.json`);
  return fs.readJson(pathToConfigFile);
}

module.exports = defineConfig({
  e2e: {
      reporter: 'mochawesome',
      reporterOptions: {
      reportDir: 'cypress/reports/mochawesome',
      overwrite: false,
      html: false,
      json: true,
      charts: true,
    },
    
    setupNodeEvents(on, config) {
      const file = config.env.configFile || "dev";
      let newConfig = getConfigurationByFile(file.toLowerCase());
      require('cypress-grep/src/plugin')(newConfig);
      return newConfig;
    },
  },
});
