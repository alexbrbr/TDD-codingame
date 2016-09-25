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
    const dummyRows = ['...','0.0','...'];
    t.plan(1);

    t.deepEqual(lib.findBestTarget(dummyRows), {x: 1, y: 1, numberOfBoxes: 2});
});

test('findBestTarget should find the best target 4x4', function (t) {
    const dummyRows = ['....','0.0.','.0..'];
    t.plan(1);

    t.deepEqual(lib.findBestTarget(dummyRows), {x: 1, y: 1, numberOfBoxes: 3});
});
