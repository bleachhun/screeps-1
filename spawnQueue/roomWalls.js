var buildWall = function (room, x, y, isRampart) {
  var lookResult = room.lookForAt(LOOK_TERRAIN,x,y);
  console.log(room.name + ":" + x + "," + y + "=" + JSON.stringify(lookResult));
  return false; //keep this running like crazy, start returning true once constructions sites might be placed WHEN they are placed
};

var buildWalls = function (room, scanStart, scanDirection, wallDirection) {
  var x = scanStart[0];
  var y = scanStart[1];
  var openingFound = false;

  var openingStartX = 0;
  var openingStartY = 0;
  var openingEndX = 0;
  var openingEndY = 0;

  var anythingHasBeenBuild = false;

  for (var iterator = 0; iterator < 50; iterator++) {
    var borderTerrain = room.lookForAt(LOOK_TERRAIN, x, y)
    if (openingFound) {
      if (borderTerrain != "plain" || borderTerrain != "swamp") {
        openingEndX = x;
        openingEndY = y;
        openingFound = false;

        var innerX = openingStartX;
        var innerY = openingStartY;



        //TODO: begin cap by -2scan + wallDirection, -2scan + 2wallDirection, -scan + 2wallDirection

        console.log("beginCap start");
        anythingHasBeenBuild |= buildWall(room, innerX - 2 * scanDirection[0] + wallDirection[0], innerY - 2 * scanDirection[1] + wallDirection[1], false);
        anythingHasBeenBuild |= buildWall(room, innerX - 2 * scanDirection[0] + 2 * wallDirection[0], innerY - 2 * scanDirection[1] + 2 * wallDirection[1], false);
        anythingHasBeenBuild |= buildWall(room, innerX - scanDirection[0] + 2 * wallDirection[0], innerY - scanDirection[1] + 2 * wallDirection[1], false);
        console.log("beginCap end");

        //TODO: center of wall is rampart 

        var middleSectionCount = 0;
        var middleX = Math.floor((openingStartX + openingEndX) / 2);
        var middleY = Math.floor((openingStartY + openingEndY) / 2);
        while ( (innerX != openingEndX) && (innerY != openingEndY)) {

          if ( (innerX == middleX) && (innerY == middleY)) {
            middleSectionCount = 2;
          }

          var buildRampart = (middleSectionCount > 0);

          anythingHasBeenBuild |= buildWall(room, innerX, innerY, buildRampart);


          innerX += scanDirection[0];
          innerY += scanDirection[1];
          middleSectionCount--;
        }

        //TODO: plain wall

        //TODO: end cap mimics begin cap, just positive scan rather than negative scan
        anythingHasBeenBuild |= buildWall(room, innerX + 2 * scanDirection[0] + wallDirection[0], innerY + 2 * scanDirection[1] + wallDirection[1], false);
        anythingHasBeenBuild |= buildWall(room, innerX + 2 * scanDirection[0] + 2 * wallDirection[0], innerY + 2 * scanDirection[1] + 2 * wallDirection[1], false);
        anythingHasBeenBuild |= buildWall(room, innerX + scanDirection[0] + 2 * wallDirection[0], innerY + scanDirection[1] + 2 * wallDirection[1], false);

      }

    } else {
      if (borderTerrain == "plain" || borderTerrain == "swamp") {
        openingStartX = x;
        openingStartY = y;
        openingFound = true;
      }
    }

    x += scanDirection[0];
    y += scanDirection[1];

  }

}

var scanOrders = [
  {
    scanDirection: [1, 0],
    scanStart: [0, 0],
    wallDirection: [0, 1]
  },
  {
    scanDirection: [0, 1],
    scanStart: [50, 0],
    wallDirection: [-1, 0]
  },
  {
    scanDirection: [-1, 0],
    scanStart: [50, 50],
    wallDirection: [-1, 0]
  },
  {
    scanDirection: [0, -1],
    scanStart: [0, 50],
    wallDirection: [1, 0]
  },
];

module.exports = function (room) {
  if (!room.controller) { return; }
  if (!room.controller.my) { return; }
  if (room.controller.level < 3) { return; }
  if (_.size(Game.constructionSites) > 50) { return; }

  for (var scanOrderIndex in scanOrders) {
    var scanOrder = scanOrders[scanOrderIndex];
    if (buildWalls(room, scanOrder.scanDirection, scanOrder.scanStart, scanOrder.wallDirection)) {
      return true;
    }
  }
}  