import { defineConfig } from 'cypress';
import codeCoverage from '@cypress/code-coverage/task.js';

export default defineConfig({
  e2e: {
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
    baseUrl: 'http://127.0.0.1:4173',
    setupNodeEvents(on, config) {
      codeCoverage(on, config);
      return config;
    },

    // testIsolation: false,
    // experimentalStudio: true,

    defaultCommandTimeout: 10000, // par défaut 4000ms
    pageLoadTimeout: 60000, // augmenter le temps de chargement de la page
    responseTimeout: 60000, // augmenter le temps d'attente de réponse réseau
  }
});
