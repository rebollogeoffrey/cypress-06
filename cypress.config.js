const { defineConfig } = require("cypress");

module.exports = defineConfig({

  env: {
    MAILSLURP_API_KEY:
      "dd701d808a3d2247c9e20507939cb6230119a0d16799b079c371b4989a7b987d",
  },

  e2e: {
    defaultCommandTimeout: 40000,
    responseTimeout: 40000,
    requestTimeout: 40000,
  },

});
