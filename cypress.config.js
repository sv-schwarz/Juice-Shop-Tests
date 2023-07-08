const { defineConfig } = require("cypress");

module.exports = defineConfig({
  watchForFileChanges: true,
  e2e: {
    screenshotOnRunFailure: false,
    video: false,
    baseUrl: "https://juice-shop-sanitarskyi.herokuapp.com/#/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
