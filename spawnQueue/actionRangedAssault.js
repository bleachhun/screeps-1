var checkAssaultTarget = require("checkAssaultTarget");

module.exports = function (creep) {
  var enemiesNearby = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3);
  var flag = Game.flags[creep.memory.flag];
  var target = null;

  var sharedTarget = Game.getObjectById(creep.room.assaultTarget);
  if (checkAssaultTarget(sharedTarget, flag)) {
    target = sharedTarget;
    console.log("shared target is " + JSON.stringify(target));
  }

  if (flag) {
    if (flag.pos.roomName != creep.pos.roomName) {
      creep.moveTo(flag);
      return true; //start by moving to the same room as the target flag
    }


    if (!target) {
      var structuresAtTarget = flag.pos.lookFor(LOOK_STRUCTURES);
      if (structuresAtTarget.length > 0 && (!structuresAtTarget[0].my)) {
        target = structuresAtTarget[0];
      }
    }
  }
  if (!target) {
    var creepTarget = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (creepTarget) {
      target = creepTarget;
    }
  }
  if (!target) {
    var towerTarget = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {
      filter: function (structure) {
        if (structure.structureType == STRUCTURE_TOWER)
          return true;
      }
    });
    if (towerTarget) {
      target = towerTarget;
    }
  }

  if (!target) {

    var spawnTarget = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {
      filter: function (structure) {
        if (structure.structureType == STRUCTURE_SPAWN)
          return true;
      }
    });
    if (spawnTarget) {
      target = spawnTarget;
    }
  }

  if (!target) {
    target = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);
  }

  if (target) {
    creep.room.assaultTarget = target.id;
    var targetRange = creep.pos.getRangeTo(target);
    if ((targetRange > 3) || target.structureType)  {
      creep.moveTo(target);
    }
    if (targetRange < 3) {
      console.log(creep.name + " might move away?");
    }
    if (creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3).length > 1) {
      creep.rangedMassAttack();
    } else {
      creep.rangedAttack(target);
    }
    return true;
  }

  return false;
}
