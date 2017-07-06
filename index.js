var argv = require('minimist')(process.argv.slice(2));
/**
 * CLI tool for time tracking
 * produces readable JSON 
 */

/*
const struc = {
    "project": {
        "name": "string"
    },
    "records": [{
        "DATE - 12.13.2017": [{
                "start": "in timestamp",
                "duration": "in ms",
                "message": "optional text"
            },
            ...
        ]
    }]

}
*/

const parseOptions = () => {
    let options = {};
    options.message = argv.m ? argv.m : '';
    return options;
}

app.run(parseOptions());

const app = {
    run: (options) => {

    }
}

const spawnCounter = () => {

}

const stopCounter = () => {

}

const collectData = () => {

}

const getWritingFile = () => {

}