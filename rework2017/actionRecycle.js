module.exports = function (creep) {
  creep.say("NO MORE!!");
  var spawn = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, { structureType: STRUCTURE_SPAWN });
  var recycleMessage = spawn.recycleCreep(creep);
  if (recycleMessage == ERR_NOT_IN_RANGE)
    creep.moveTo(spawn);

  return true;
}
