function countBoxes(rows) {
  return rows.reduce(function(acc, next) {
    return acc + (next.match(/0/g)||[]).length
  }, 0);
}

function numberOfBoxesToBomb(targetX, targetY, rows, bombRange) {
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

function findBestTarget(rows, bombRange) {
  let bestTarget = {
    x: 0,
    y: 0,
    numberOfBoxes: 0
  };
  for (var y = 0; y < rows.length; y++) {
    for (var x = 0; x < rows[0].length; x++) {
      const numberOfBoxes = numberOfBoxesToBomb(x, y, rows, bombRange);
      if (!rows[x] || rows[x][y] !== '.') {
        break;
      }
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
    return entity.entityType == 0 && entity.owner == myId;
  })[0];
}

function placeBomb(target) {
  print(`BOMB ${target.x} ${target.y}`);
}

function hasBombs(entities, myId) {
  return findMyself(entities, myId).param2 > 1;
}

function hasBombs(entities, myId) {
  return findMyself(entities, myId).param2 > 1;
}

function getItemList(entities) {
  return entities.filter(entity => entity.entityType === 2)
}

function distanceBetween(itemA, itemB) {
  return Math.abs(itemA.x - itemB.x) + Math.abs(itemA.y - itemB.y);
}

function closerItemFromMe(entities, myId) {
  const me = findMyself(entities, myId);
  const items = getItemList(entities);
  printErr('closerItemFromMe');
  let itemToGoAfter = null;
  items.map(item => {
    const distance = distanceBetween(me, item);
    printErr('distance', distance);
    if (distance < 9) {
      printErr(`priorizing bomb located at  ${item.x} ${item.y}`);
      itemToGoAfter = item;
    }
  });
  return itemToGoAfter;
}

try {
  var inputs = readline().split(' ');
  var width = parseInt(inputs[0]);
  var height = parseInt(inputs[1]);
  var myId = parseInt(inputs[2]);

  let timeAfterBombExploded = 0;

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
      // printErr('_______________________');
      const myChar = findMyself(entities, myId);
      const myBombsRange = myChar.param2 - 1;


      const bestTarget = findBestTarget(rows, myBombsRange);

      printErr('bestTarget', bestTarget.x, bestTarget.y, '|', bestTarget.numberOfBoxes);
      printErr('myChar', myChar.x, myChar.y);
      printErr('_______________________');

      const closerItem = closerItemFromMe(entities, myId);
      printErr(closerItem);
      if (closerItem && closerItem.x) {
        print(`MOVE ${closerItem.x} ${closerItem.y}`);
      }
      else if (hasBombs(entities, myId)) {
        myBombs = placeBomb(bestTarget);
      }
      else {
        print(`MOVE ${bestTarget.x} ${bestTarget.y}`);
      }
  }
} catch (e) {
  console.log(e);
  module.exports = {
    countBoxes,
    numberOfBoxesToBomb,
    findBestTarget,
    findMyself
  };
}
