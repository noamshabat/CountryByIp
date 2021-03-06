require('./_env') // Load environment vars before anything.
import { log } from './logger'
import { initServer, stopServer } from './webserver'
import Graceful from 'node-graceful';

// Shutdown gracefully on any unhandled exception, rejection or signal.
Graceful.captureExceptions = true;
Graceful.captureRejections = true;
Graceful.on('exit', async () => {
  // stops the webserver
  await stopServer()
});

// Makes sure the required environment variables are defined.
function verifyEnv() {
  ['IP_GEOLOCATION_KEY', 'PORT'].forEach((envVar) => {
    if (!process.env[envVar]) {
      log(`Fatal Error! Missing environment variable ${envVar}`)
      process.exit(1)
    } 
  })
}

// starts the service.
async function run() {
  log('Starting service')
  // verify environment before anything.
  verifyEnv()
  // start the web server.
  await initServer()
}

run()