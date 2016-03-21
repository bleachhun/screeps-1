module.exports = function () {

    for(var towerName in Game.structures){
        var tower = Game.structures[towerName];
        if(tower.structureType == STRUCTURE_TOWER){
            var enemy = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(enemy){
                if(tower.attack(enemy) == OK)
                    return true;
            }
            var woundedFriend = tower.pos.findClosestByRange(FIND_MY_CREEPS);
            if(woundedFriend){
                tower.heal(woundedFriend);
            }

        }
    }
}
