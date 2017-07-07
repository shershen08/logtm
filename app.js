
let currentTask = '';
let currentProject = '';
let timeStart;

module.exports = app = {
    run: (options) => {
        if(options.message) {
            spawnCounter(options.message)
        } else {
            console.log(stopCounter());
        }
    }
}

const spawnCounter = (msg) => {
    currentTask = msg;
    timeStart = new Date().getTime();
}

const stopCounter = () => {
    return {
        start: timeStart,
        duration: timeStart - new Date().getTime(),
        message: currentTask
    }
}

const getWritingFile = () => {

}