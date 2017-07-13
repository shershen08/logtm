let argv = require('minimist')(process.argv.slice(2), {
  string: 'lang',
  boolean: 'pager',
  alias: { h: 'help', s: 'message' },
  default: { lang: 'en' },
  '--': true,
  stopEarly: true
});

const app = require('./app');
/**
 * CLI tool for time tracking
 * produces readable JSON 
 */

const parseOptions = () => {
    console.log(argv)
    let options = {};
    options.message = argv.m ? argv.m : '';
    if(argv._.indexOf('start') > -1 && argv._.length > 1) {
        options.message = argv._[1];
    }
    options.showhelp = argv.h;
    return options;
}

app.run(parseOptions());