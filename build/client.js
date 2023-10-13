var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var components;
(function (components) {
    var GameObject = /** @class */ (function () {
        function GameObject() {
            this._components = new Array();
            this._newComponents = new Array();
            this._children = new Array();
            this._parent = null;
            this._enabled = true;
        }
        Object.defineProperty(GameObject.prototype, "enabled", {
            get: function () {
                return this._enabled;
            },
            set: function (value) {
                this._enabled = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "parent", {
            get: function () {
                return this._parent;
            },
            enumerable: false,
            configurable: true
        });
        GameObject.prototype.addChild = function (gameObject) {
            if (this.hasChild(gameObject)) {
                throw new Error("Object already attached as child");
            }
            if (this == gameObject) {
                throw new Error("You cannot attach object to itself");
            }
            this._children.push(gameObject);
            gameObject._parent = this;
        };
        GameObject.prototype.removeChild = function (gameObject) {
            if (!this.hasChild(gameObject)) {
                throw new Error("Object bust be a child");
            }
            this._children.splice(this._children.indexOf(gameObject), 1);
            gameObject._parent = null;
        };
        GameObject.prototype.hasChild = function (gameObject) {
            return this._children.indexOf(gameObject) != -1;
        };
        GameObject.prototype.addComponent = function (type) {
            if (this.hasComponent(type)) {
                throw new Error("Component has been already added");
            }
            var component = new type();
            this._components.push(component);
            this._newComponents.push(component);
            return component;
        };
        GameObject.prototype.hasComponent = function (type) {
            for (var _i = 0, _a = this._components; _i < _a.length; _i++) {
                var component = _a[_i];
                if (component instanceof type)
                    return true;
            }
            return false;
        };
        GameObject.prototype.getComponent = function (type) {
            for (var _i = 0, _a = this._components; _i < _a.length; _i++) {
                var component = _a[_i];
                if (component instanceof type)
                    return component;
            }
            return null;
        };
        GameObject.prototype.getComponentInChildren = function (type) {
            for (var _i = 0, _a = this._children; _i < _a.length; _i++) {
                var child = _a[_i];
                if (child.hasComponent(type)) {
                    return child.getComponent(type);
                }
            }
            return null;
        };
        GameObject.prototype.getComponentsInChildren = function (type) {
            var result = [];
            for (var _i = 0, _a = this._children; _i < _a.length; _i++) {
                var child = _a[_i];
                if (child.hasComponent(type)) {
                    result.push(child.getComponent(type));
                }
            }
            return result;
        };
        GameObject.prototype.getComponentInParent = function (type) {
            if (this._parent == null) {
                return null;
            }
            if (this._parent.hasComponent(type)) {
                return this._parent.getComponent(type);
            }
            return this._parent.getComponentInParent(type);
        };
        GameObject.prototype.sceneUpdate = function (deltaMs) {
            while (this._newComponents.length > 0) {
                this._newComponents.shift().init(this);
            }
            for (var _i = 0, _a = this._components; _i < _a.length; _i++) {
                var component = _a[_i];
                component.update(deltaMs);
            }
        };
        return GameObject;
    }());
    components.GameObject = GameObject;
})(components || (components = {}));
var components;
(function (components) {
    var Component = /** @class */ (function () {
        function Component() {
        }
        /**
         * Calls before first frame update. Does not do anything. Override if need
         *
         * @param {IGameObject} gameObject The object that the component is attached
         * */
        Component.prototype.init = function (gameObject) {
        };
        /**
         * Calls every frame update. Does not do anything. Override if need
         *
         * @param {number} deltaMs Number of milliseconds that have passed since the last update
         * */
        Component.prototype.update = function (deltaMs) {
        };
        return Component;
    }());
    components.Component = Component;
})(components || (components = {}));
var utils;
(function (utils) {
    var Dictionary = /** @class */ (function () {
        function Dictionary() {
            this._keys = new Array();
            this._values = new Array();
        }
        Dictionary.prototype.add = function (key, value) {
            if (key == null) {
                this.throwNullKey();
            }
            if (this.containsKey(key)) {
                throw new Error("Key has been already added");
            }
            for (var i = 0; i < this._keys.length; i++) {
                if (this._keys[i] == null) {
                    this._keys[i] = key;
                    this._values[i] = value;
                    return;
                }
            }
            this._keys.push(key);
            this._values.push(value);
        };
        Dictionary.prototype.get = function (key) {
            if (key == null) {
                this.throwNullKey();
            }
            var index = this._keys.indexOf(key);
            if (index == -1) {
                return null;
            }
            return this._values[index];
        };
        Dictionary.prototype.remove = function (key) {
            if (key == null) {
                this.throwNullKey();
            }
            var index = this._keys.indexOf(key);
            if (index != -1) {
                this._keys[index] = null;
                this._values[index] = null;
            }
        };
        Dictionary.prototype.throwNullKey = function () {
            throw new Error("Key cannot be null");
        };
        Dictionary.prototype.containsKey = function (key) {
            if (key == null) {
                this.throwNullKey();
            }
            return this._keys.indexOf(key) != -1;
        };
        Dictionary.prototype.containsValue = function (value) {
            return this._values.indexOf(value) != -1;
        };
        return Dictionary;
    }());
    utils.Dictionary = Dictionary;
})(utils || (utils = {}));
var components;
(function (components) {
    var RootObject = /** @class */ (function (_super) {
        __extends(RootObject, _super);
        function RootObject() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            //scene updating is running
            _this._running = false;
            //enterFrame() function bind to 'this'
            _this._enterFrameBind = _this.enterFrame.bind(_this);
            //last enterFrame() call time
            _this._lastUpdateTime = 0;
            return _this;
        }
        /**
         * Start frame updating. Will be ignored if already running
         */
        RootObject.prototype.start = function () {
            if (!this._running) {
                this._running = true;
                this._lastUpdateTime = 0;
                requestAnimationFrame(this._enterFrameBind);
            }
        };
        /**
         * Stop frame updating. Will be ignored if not running
         */
        RootObject.prototype.stop = function () {
            this._running = false;
        };
        RootObject.prototype.enterFrame = function () {
            if (!this._running) {
                return;
            }
            var deltaMs;
            var currTime = Date.now();
            if (this._lastUpdateTime == 0) {
                deltaMs = 0;
            }
            else {
                deltaMs = currTime - this._lastUpdateTime;
            }
            this._lastUpdateTime = currTime;
            for (var _i = 0, _a = this._children; _i < _a.length; _i++) {
                var child = _a[_i];
                child.sceneUpdate(deltaMs);
            }
            requestAnimationFrame(this._enterFrameBind);
        };
        return RootObject;
    }(components.GameObject));
    components.RootObject = RootObject;
})(components || (components = {}));
///<reference path="components/RootObject.ts"/>
var test;
(function (test_1) {
    var GameObject = components.GameObject;
    var Component = components.Component;
    var RootObject = components.RootObject;
    var TestComponent = /** @class */ (function (_super) {
        __extends(TestComponent, _super);
        function TestComponent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TestComponent.prototype.init = function (gameObject) {
            console.log("TestComponent: init()", gameObject);
        };
        TestComponent.prototype.update = function (deltaMs) {
            console.log("TestComponent: update()", deltaMs);
        };
        return TestComponent;
    }(Component));
    test_1.TestComponent = TestComponent;
    var test = /** @class */ (function () {
        function test() {
            var scene = new RootObject();
            var testObject1 = new GameObject();
            testObject1.addComponent(TestComponent);
            scene.addChild(testObject1);
            //scene.start();
            var testComponent = scene.getComponentInChildren(TestComponent);
            console.log(testComponent);
        }
        return test;
    }());
    test_1.test = test;
})(test || (test = {}));
new test.test();
//# sourceMappingURL=client.js.map