var test = require('tape');
const lib = require('./codingame');

test('countBoxes should count the number of boxes on the map', function (t) {
    const dummyRows = ['....0.0.0....','..0.......0..','0...........0'];
    t.plan(1);

    t.equal(lib.countBoxes(dummyRows), 7);
});

test('numberOfBoxesToBomb should find multiple boxes', function (t) {
    const dummyRows = ['...','0.0','...'];
    t.plan(1);

    t.equal(lib.numberOfBoxesToBomb(1, 1, dummyRows), 2);
});

test('numberOfBoxesToBomb should find one box', function (t) {
    const dummyRows = ['...','0.0','...'];
    t.plan(1);

    t.equal(lib.numberOfBoxesToBomb(0, 0, dummyRows), 1);
});

test('numberOfBoxesToBomb should find 0 box', function (t) {
    const dummyRows = ['...','0.0','...'];
    t.plan(1);

    t.equal(lib.numberOfBoxesToBomb(1, 0, dummyRows), 0);
});

test('findBestTarget should find the best target', function (t) {
    const dummyRows = [
      '...',
      '0.0',
      '...'
    ];
    t.plan(1);

    t.deepEqual(lib.findBestTarget(dummyRows), {x: 1, y: 1, numberOfBoxes: 2});
});

test('findBestTarget should find the best target 4x4', function (t) {
    const dummyRows = ['....','0.0.','.0..'];
    t.plan(1);

    t.deepEqual(lib.findBestTarget(dummyRows), {x: 1, y: 1, numberOfBoxes: 3});
});

test('findBestTarget should find the best target 4x4 with different numbers', function (t) {
    const dummyRows = ['....','0.1.','.2..'];
    t.plan(1);

    t.deepEqual(lib.findBestTarget(dummyRows), {x: 1, y: 1, numberOfBoxes: 3});
});

test('findMyself should extact my player object from entity list', function (t) {
    const dummyEntities = [{
      entityType: 0,
      owner: 1
    }, {
      entityType: 0,
      owner: 2
    }];
    t.plan(1);

    t.deepEqual(lib.findMyself(dummyEntities, 1), {
      entityType: 0,
      owner: 1
    });
});
