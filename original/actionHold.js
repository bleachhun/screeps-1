module.exports = function(creep){
  console.log("cosider holding");
  if (typeof(creep.memory.holdDuration) == "undefined" || (creep.memory.holdDuration<200)) {

    if (typeof(creep.memory.lastHoldTick) == "undefined"){
      creep.memory.lastHoldTick = Game.time;
      console.log("initial hold time");
    }

    if(creep.memory.lastHoldTick >= (Game.time-1)){
      creep.memory.lastHoldTick = Game.time;
      creep.memory.holdDuration ++;
      console.log("holding");
      return true;
    }
    else{
      console.log("reset holding");
      creep.memory.holdDuration = 0;
      return true;
    }
  }
  else {
    return false;
  }
}
