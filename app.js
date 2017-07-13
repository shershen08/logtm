const low = require('lowdb');
const cow = require("cowsay");
const ChartjsNode = require('chartjs-node');

const db = low('./db.json');

import {STATES, texts} from './config';

module.exports = app = {
    run: (options) => {
        
        console.log(options)

        if(options.showhelp){
            displayHelp();
            return;
        }

        const state = db.get('_state');
        if (state.value() == STATES.RUNNING) {
            persistTrack(stopCounter())
        } else {
            if (!options.message) {
                console.log(.error.no_text_provided);
                return;
            }
            setState(STATES.RUNNING);
            setCurrent({
                timeStart: new Date().getTime(),
                message: options.message
            })

            console.log(cow.say({text: texts.loging_start , e : "oO",T : "U "}));
        }

    }
}

const displayHelp = () => console.log(texts.help.generic);

const setCurrent = value => db.set('_current', value).write();

const setState = value => db.set('_state', value).write();

const stopCounter = () => {
    const curr = db.get('_current').value();
    return Object.assign({}, curr, {
        duration: new Date().getTime() - curr.timeStart,
    });
}

const persistTrack = trackObject => {
    let records = db.get('records');
    if(!records.value()){
        db.set('records', []).write();
    }
    records
        .push(trackObject)
        .write();
    setState(STATES.STILL);
    setCurrent();
}

const convertDuration = lengthInMs => {
    
}