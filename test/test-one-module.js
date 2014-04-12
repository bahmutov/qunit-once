(function (QUnit) {
  'use strict';
  var logged = [];
  function log(msg) {
    console.log(msg);
    logged.push(msg);
  }
  function isEqual(a, b, msg) {
    if (a !== b) {
      throw new Error('Expected ' + JSON.stringify(a, null, 2) +
        ' to be equal to ' + JSON.stringify(b, null, 2) + ', ' + msg);
    }
  }

  QUnit.module('Module one');

  QUnit.test('Module one Test 1', 1, function () {
    QUnit.ok(true);
  });

  QUnit.module('Module two', {
    setupOnce: function onSetupOnce() {
      log('two setupOnce');
    },
    teardownOnce: function onTeardownOnce() {
      log('two teardownOnce');
    }
  });

  QUnit.test('Module two Test 1', function () {
    log('two test 1');
    QUnit.ok(true, 'Assertion for Test 1');
  });

  QUnit.test('Module two Test 2', function () {
    log('two test 2');
    QUnit.ok(true, 'Assertion for Test 2');
  });

  if (typeof QUnit.done === 'function') {
    QUnit.done(function (details) {
      console.log('one module done, details', details);

      // check if everything has beem called correctly
      // check the logs. We are outside any unit test,
      // so just throw an exception if this fails
      isEqual(logged.length, 4, 'number of logged messages');

      isEqual(logged[0], 'two setupOnce', '0 message');
      isEqual(logged[1], 'two test 1', '1 message');
      isEqual(logged[2], 'two test 2', '2 message');
      isEqual(logged[3], 'two teardownOnce', '3 message');
    });
  }
}(QUnit));
