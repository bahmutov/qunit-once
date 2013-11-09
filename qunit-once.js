(function (QUnit) {
  if (typeof QUnit !== 'object') {
    throw new Error('undefined QUnit object');
  }

  var _module = QUnit.module;
  if (typeof _module !== 'function') {
    throw new Error('QUnit.module should be a function');
  }

  QUnit.module = function (name, config) {

    (function addSetupOnce() {
      if (typeof config !== 'object') {
        return;
      }

      if (typeof config.setupOnce === 'function') {
        var _setupOnceRan = false;
        var _setup = typeof config.setup === 'function' ?
          config.setup : null;

        config.setup = function () {
          console.log('config.setup ');

          if (!_setupOnceRan) {
            config.setupOnce();
            _setupOnceRan = true;
          }

          if (_setup) {
            _setup.call(config);
          }
        };
      }
    }());

    (function addTeardownOnce() {

      function isLastTestInModule() {
        console.log('is last test in module?');
        if (QUnit.config && Array.isArray(QUnit.config.queue)) {
          return QUnit.config.queue.length === 1;
        } else {
          // we cannot determine if the test is the last one in this module
          return false;
        }
      }

      if (typeof config !== 'object') {
        return;
      }

      if (typeof config.teardownOnce === 'function') {
        var _teardown = typeof config.teardown === 'function' ?
          config.teardown : null;

        config.teardown = function () {
          console.log('config.teardown');

          if (_teardown) {
            console.log('calling teardown');
            _teardown.call(config);
          }

          if (isLastTestInModule()) {
            config.teardownOnce();
          }
        };
      }
    }());

    _module.call(QUnit, name, config);
  };
}(QUnit));

