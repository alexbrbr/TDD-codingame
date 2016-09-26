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
      const isBox = ['0','1','2'].includes(rows[y][x]);

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
      if (rows[y][x] !== '.') {
        break;
      }
      const numberOfBoxes = numberOfBoxesToBomb(x, y, rows);
      if (numberOfBoxes > bestTarget.numberOfBoxes ) {
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

function findMyself(entities, myId) {
  return entities.filter(entity => {
    // printErr('entity.entityType', entity.entityType);
    // printErr('entity.owner', entity.owner);
    // printErr('entity.x', entity.x);
    // printErr('entity.y', entity.y);
    return entity.entityType == 0 && entity.owner == myId;
  })[0];
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
      // printErr(JSON.stringify(rows));
      const bestTarget = findBestTarget(rows);
      // printErr('_______________________');

      const myChar = findMyself(entities, myId);
      printErr('bestTarget', bestTarget.x, bestTarget.y, '|', bestTarget.numberOfBoxes);
      printErr('myChar', myChar.x, myChar.y);
      printErr('_______________________');

      if (myChar.x === bestTarget.x && myChar.y === bestTarget.y) {
        print(`BOMB ${bestTarget.x} ${bestTarget.y}`);
      }
      else {
        print(`MOVE ${bestTarget.x} ${bestTarget.y}`);

      }
  }
} catch (e) {
  module.exports = {
    countBoxes,
    numberOfBoxesToBomb,
    findBestTarget
  };
}
