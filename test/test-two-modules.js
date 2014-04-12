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

  QUnit.module('Module A', {
    setupOnce: function onSetupOnce() {
      log('A setupOnce');
    },
    teardownOnce: function onTeardownOnce() {
      log('A teardownOnce');
    }
  });

  QUnit.test('Module A Test 1', function () {
    log('A1');
    QUnit.ok(true, 'Assertion for Test 1');
  });

  QUnit.test('Module A Test 2', function () {
    log('A2');
    QUnit.ok(true, 'Assertion for Test 2');
  });

  QUnit.module('Module B', {
    setupOnce: function onSetupOnce() {
      log('B setupOnce');
    },
    teardownOnce: function onTeardownOnce() {
      log('B teardownOnce');

      // check the logs. We are outside any unit test,
      // so just throw an exception if this fails
      isEqual(logged.length, 8, 'number of logged messages');

      isEqual(logged[0], 'A setupOnce', '0 message');
      isEqual(logged[1], 'A1', '1 message');
      isEqual(logged[2], 'A2', '2 message');
      isEqual(logged[3], 'A teardownOnce', '3 message');
    }
  });

  QUnit.test('Module B Test 1', function () {
    log('B1');
    QUnit.ok(true, 'Assertion for Test 1');
  });

  QUnit.test('Module B Test 2', function () {
    log('B2');
    QUnit.ok(true, 'Assertion for Test 2');
  });

  if (typeof QUnit.done === 'function') {
    QUnit.done(function (details) {
      console.log('two modules done, details', details);

      // check if everything has beem called correctly
      // check the logs. We are outside any unit test,
      // so just throw an exception if this fails
      isEqual(logged.length, 8, 'number of logged messages');

      isEqual(logged[0], 'A setupOnce', '0 message');
      isEqual(logged[1], 'A1', '1 message');
      isEqual(logged[2], 'A2', '2 message');
      isEqual(logged[3], 'A teardownOnce', '3 message');
    });
  }
}(QUnit));
