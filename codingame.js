function countBoxes(rows) {
  return rows.reduce(function(acc, next) {
    return acc + (next.match(/0/g)||[]).length
  }, 0);
}

function numberOfBoxesToBomb(targetX, targetY, rows) {
  const bombRange = 3;
  let boxesToExplode = 0;
  for (var y = 0; y < rows.length; y++) {
    for (var x = 0; x < rows[0].length; x++) {
      const isBox = rows[y][x] === '0';

      const isCloseToTarget = Math.abs(targetX - x) <= bombRange - 1 && Math.abs(targetY - y) <= bombRange - 1;
      const isNotTarget = targetX !== x || targetY !== y;
      const sameRowOrColumn = targetX === x || targetY === y;

      const inRangeOfBomb = isCloseToTarget && isNotTarget && sameRowOrColumn;
      if (isBox && inRangeOfBomb) {
        boxesToExplode += 1;
      }
    }
  }
  return boxesToExplode;
}

function findBestTarget(rows) {
  let bestTarget = {
    x: 0,
    y: 0,
    numberOfBoxes: 0
  };
  for (var y = 0; y < rows.length; y++) {
    for (var x = 0; x < rows[0].length; x++) {
      const numberOfBoxes = numberOfBoxesToBomb(x, y, rows);
      // printErr('numberOfBoxes', numberOfBoxes);
      // printErr('x', x);
      // printErr('y', y);
      if (numberOfBoxes > bestTarget.numberOfBoxes) {
        bestTarget = {
          x: x,
          y: y,
          numberOfBoxes: numberOfBoxes
        };
      }
    }
  }
  return bestTarget;
}

try {
  var inputs = readline().split(' ');
  var width = parseInt(inputs[0]);
  var height = parseInt(inputs[1]);
  var myId = parseInt(inputs[2]);

  // game loop
  while (true) {
      var rows = [];
      for (var i = 0; i < height; i++) {
          rows.push(readline());
      }
      // printErr(rows)
      var entities = [];
      var entitiesNumber = parseInt(readline());
      for (var i = 0; i < entitiesNumber; i++) {
          var inputs = readline().split(' ');
          entities.push({
            entityType: parseInt(inputs[0]),
            owner: parseInt(inputs[1]),
            x: parseInt(inputs[2]),
            y: parseInt(inputs[3]),
            param1: parseInt(inputs[4]),
            param2: parseInt(inputs[5])
          });
      }
      // entities.map(printErr)

      // Write an action using print()
      // To debug: printErr('Debug messages...');
      const bestTarget = findBestTarget(rows);
      printErr('bestTarget', bestTarget);
      printErr('_______________________');

      print(`BOMB ${bestTarget.x} ${bestTarget.y}`);
  }
} catch (e) {
  module.exports = {
    countBoxes,
    numberOfBoxesToBomb,
    findBestTarget
  };
}
