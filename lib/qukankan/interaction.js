function interaction(elements) {
    sac = {util:require('../../util.js/index.js')};
    let task = id(elements.taskCenterButton.id).text(elements.taskCenterButton.text).findOne(800);
    if(task){
        sac.util.forcePress(task)
        /*
        let checkinICON = id(elements.checkinICON.id).findOne(500);
        if(checkinICON){
            sac.util.forcePress(checkinICON);
            sleep(1000);
            let double = id(elements.double.id).findOne(1000);
            if(double)sac.util.forcePress(double,18)
        };
        */
        let index = id(elements.homeButton.id).text(elements.homeButton.text).findOne(30000);
        if(index)sac.util.forcePress(index);
        sleep(1000);
    };
};
module.exports = interaction;