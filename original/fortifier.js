module.exports = function (creep) {
    var actionFlee = require("actionFlee");
    var actionRenew =  require("actionRenew");
    var actionCollectEnergy = require("actionCollectEnergy");
    var actionBuild = require("actionBuild");
    var actionFortify = require("actionFortify");


    if(actionFlee(creep))
        return;
    if(actionRenew(creep))
        return;
    if(actionCollectEnergy(creep))
        return;
    if(actionFortify(creep))
        return;
    if(actionBuild(creep))
        return;
}
