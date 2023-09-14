const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    prod : 'https://demowebshop.tricentis.com/'
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('before:run', async (details) => {
        console.log('override before:run');
        await beforeRunHook(details);
      });

      on('after:run', async () => {
        console.log('override after:run');
        await afterRunHook();
      });
    },
  },
});
