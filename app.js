const low = require('lowdb');

const db = low('./db.json')

const STATES = {
    'STILL': 'STILL',
    'RUNNING': 'RUNNING'
};

module.exports = app = {
    run: (options) => {
        const state = db.get('_state');
        if (state.value() == STATES.RUNNING) {
            persistTrack(stopCounter())
        } else {
            if (!options.message) {
                console.log('No task description provided');
                return;
            }
            db.set('_state', STATES.RUNNING).write();
            db.set('records', []).write();
            db.set('_current', {
                timeStart: new Date().getTime(),
                message: options.message
            }).write();
        }

    }
}

const stopCounter = () => {
    const curr = db.get('_current').value();
    return Object.assign({}, curr, {
        duration: new Date().getTime() - curr.timeStart,
    });
}

const persistTrack = (trackObject) => {
    db.get('records')
        .push(trackObject)
        .write();
    db.set('_state', STATES.STILL)
        .write();
}