/* eslint-disable */
const { defineConfig } = require('cypress');
const codeCoverage = require('@cypress/code-coverage/task');

const runEnv = process.env.RUN_ENV || 'local';
console.log(`🔧 Running Cypress in '${runEnv}' environment.`);

const sharedConfig = {
  supportFile: 'cypress/support/e2e.ts',
  specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 60000,
  responseTimeout: 60000,
};

const configByEnv = {
  local: {
    ...sharedConfig,
    baseUrl: 'http://127.0.0.1:4173',
    chromeWebSecurity: true,
    video: true,
  },
  docker: {
    ...sharedConfig,
    chromeWebSecurity: false,
    video: false,
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

  // Tâche personnalisée pour log DOM dans CI
  on('task', {
    logDom(content) {
      console.log('\n🧪 DOM Snapshot:\n');
      console.log(content);
      return null;
    },
  });


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
  // env: {
  //   CYPRESS_VERBOSE: true
  // }
});