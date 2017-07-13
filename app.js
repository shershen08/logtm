const low = require('lowdb');
const cow = require("cowsay");

const db = low('./db.json');

const STATES = {
    'STILL': 'STILL',
    'RUNNING': 'RUNNING'
};

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
                console.log('No task description provided');
                return;
            }
            setState(STATES.RUNNING);
            setCurrent({
                timeStart: new Date().getTime(),
                message: options.message
            })

            console.log(cow.say({text: 'Started logging', e : "oO",T : "U "}));
        }

    }
}

const displayHelp = () => {
    console.log('Usage detils go here .... -m ');
}

const stopCounter = () => {
    const curr = db.get('_current').value();
    return Object.assign({}, curr, {
        duration: new Date().getTime() - curr.timeStart,
    });
}

const setCurrent = value => {
    db.set('_current', value).write();
}

const setState = value => {
  db.set('_state', value).write();
}

const persistTrack = (trackObject) => {
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