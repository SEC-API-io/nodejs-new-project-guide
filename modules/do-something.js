const config = require('../config'); // load project config

const SOME_VAR = 'something-here';

const { log } = console;

const doSomething = async () => {
  // do something...

  log(config.exampleService.apiKey);
  log(SOME_VAR);
};
