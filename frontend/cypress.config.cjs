/* eslint-disable */
const { defineConfig } = require('cypress');
const codeCoverage = require('@cypress/code-coverage/task');

const runEnv = process.env.RUN_ENV || 'local';
console.log(`🔧 Running Cypress in '${runEnv}' environment.`);

const configByEnv = {
  local: {
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
    baseUrl: 'http://127.0.0.1:4173',
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    responseTimeout: 60000,
    chromeWebSecurity: true,
    video: true,
  },
  docker: {
    baseUrl: 'http://frontend',
    supportFile: false, // you can remove or adjust this
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
    video: false,
    chromeWebSecurity: false,
  },
};

const selectedConfig = configByEnv[runEnv] || configByEnv.local;

function setupNodeEvents(on, config) {
  try {
    const codeCoverage = require('@cypress/code-coverage/task');
    codeCoverage(on, config);
  } catch (err) {
    console.warn('⚠️ Code coverage not available, skipping setup.');
  }
  return config;
}

module.exports = defineConfig({
  e2e: {
    ...selectedConfig,
    setupNodeEvents,
  },
});