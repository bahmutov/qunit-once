# qunit-once

QUnit plugin that adds **setupOne** and **teardownOnce** to modules

[Test page](http://glebbahmutov.com/qunit-once/)

[![NPM][qunit-once-icon]][qunit-once-url]

[![Build status][qunit-once-ci-image]][qunit-once-ci-url]
[![dependencies][qunit-once-dependencies-image]][qunit-once-dependencies-url]
[![devdependencies][qunit-once-devdependencies-image]][qunit-once-devdependencies-url]

[![endorse][endorse-image]][endorse-url]

Available through [bower](http://sindresorhus.com/bower-components/) and
[npm](https://npmjs.org/package/qunit-once) as **qunit-once**.

Tested in the browser by [QUnit](http://qunitjs.com/) and
under nodejs by [qunit-node](https://github.com/kof/node-qunit).
Safe to use with [gt](https://github.com/bahmutov/gt),
which includes *setupOnce* and *teardownOnce* already.

## API

```javascript
QUnit.module('Example', {
  setupOnce: function () {
    // runs once before anything else in the module
  },
  setup: function () {
    // runs before each unit test
  },
  teardown: function () {
    // runs after EACH unit test in this module
  },
  teardownOnce: function () {
    // runs once after all unit tests finished (including teardown)
  }
});
```

## Use

### install

Include *qunit-once.js* after *qunit.js* in HTML

```html
<script src="http://code.jquery.com/qunit/qunit-1.12.0.js"></script>
<script src="qunit-once.js"></script>
<script src="tests.js"></script>
```

Or install *qunit-once* via `npm install qunit-once --save-dev` under node.

### Write unit tests

```javascript
  // tests.js
  var counter = 0;

  QUnit.module('Example', {
    setupOnce: function () {
      counter = 1;
    },
    setup: function () {
      counter += 1;
    }
  });

  QUnit.test('first', function () {
    QUnit.equal(counter, 2, 'setupOnce followed by setup');
    counter = 0;
  });

  QUnit.test('second', function () {
    QUnit.equal(counter, 1, 'first test followed by setup');
  });
```

### Run under node using node-qunit or gt

```sh
npm install -g qunit
qunit -d qunit-once.js -c tests.js -t tests.js
```

You don't need to include this module when running with
[gt](https://github.com/bahmutov/gt),
it already supports setupOnce and teardownOnce methods.

## Related

[Run QUnit module setup once](http://bahmutov.calepin.co/run-qunit-module-setup-once.html),
[Testing code with async setup](http://bahmutov.calepin.co/testing-module-with-async-setup-code.html),
[qunit-promises](https://github.com/bahmutov/qunit-promises)

## Small print

Author: Gleb Bahmutov &copy; 2013 @bahmutov

License: MIT - do anything with the code, but don't blame me if it does not work.

Support: if you find any problems with this module, email / tweet / open issue on Github

[qunit-once-icon]: https://nodei.co/npm/qunit-once.png?downloads=true
[qunit-once-url]: https://npmjs.org/package/qunit-once
[qunit-once-ci-image]: https://travis-ci.org/bahmutov/qunit-once.png?branch=master
[qunit-once-ci-url]: https://travis-ci.org/bahmutov/qunit-once
[qunit-once-dependencies-image]: https://david-dm.org/bahmutov/qunit-once.png
[qunit-once-dependencies-url]: https://david-dm.org/bahmutov/qunit-once
[qunit-once-devdependencies-image]: https://david-dm.org/bahmutov/qunit-once/dev-status.png
[qunit-once-devdependencies-url]: https://david-dm.org/bahmutov/qunit-once#info=devDependencies
[endorse-image]: https://api.coderwall.com/bahmutov/endorsecount.png
[endorse-url]: https://coderwall.com/bahmutov
