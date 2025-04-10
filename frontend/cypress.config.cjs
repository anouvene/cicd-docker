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
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
    video: false,
    chromeWebSecurity: false,
  },
};

function setupNodeEvents(on, config) {
  const runEnvFromCypress = config.env.RUN_ENV || process.env.RUN_ENV || 'local';
  console.log(`📦 setupNodeEvents: RUN_ENV = ${runEnvFromCypress}`);

  // Override baseUrl dynamically based on RUN_ENV
  if (runEnvFromCypress === 'docker') {
    config.baseUrl = 'http://frontend';
  } else {
    config.baseUrl = config.baseUrl || 'http://127.0.0.1:4173';
  }

  try {
    codeCoverage(on, config);
  } catch (err) {
    console.warn('⚠️ Code coverage not available, skipping setup.');
  }

  return config;
}

module.exports = defineConfig({
  e2e: {
    ...(configByEnv[runEnv] || configByEnv.local),
    setupNodeEvents,
  },
});