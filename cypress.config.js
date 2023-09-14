const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    prod : 'https://demowebshop.tricentis.com/'
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
    },
  },
});
