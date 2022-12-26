"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.Notification = void 0;
var node_crypto_1 = require("node:crypto");
var Notification = /** @class */ (function () {
    function Notification(props, id) {
        var _a;
        this._id = id !== null && id !== void 0 ? id : (0, node_crypto_1.randomUUID)();
        this.props = __assign(__assign({}, props), { createdAt: (_a = props.createdAt) !== null && _a !== void 0 ? _a : new Date() });
    }
    Object.defineProperty(Notification.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Notification.prototype, "recipientId", {
        get: function () {
            return this.props.recipientId;
        },
        set: function (recipientId) {
            this.props.recipientId = recipientId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Notification.prototype, "content", {
        get: function () {
            return this.props.content;
        },
        set: function (content) {
            this.props.content = content;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Notification.prototype, "category", {
        get: function () {
            return this.props.category;
        },
        set: function (category) {
            this.props.category = category;
        },
        enumerable: false,
        configurable: true
    });
    Notification.prototype.read = function () {
        this.props.readAt = new Date();
    };
    Notification.prototype.unread = function () {
        this.props.readAt = null;
    };
    Object.defineProperty(Notification.prototype, "readAt", {
        get: function () {
            return this.props.readAt;
        },
        enumerable: false,
        configurable: true
    });
    Notification.prototype.cancel = function () {
        this.props.canceledAt = new Date();
    };
    Object.defineProperty(Notification.prototype, "canceledAt", {
        get: function () {
            return this.props.canceledAt;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Notification.prototype, "createdAt", {
        get: function () {
            return this.props.createdAt;
        },
        enumerable: false,
        configurable: true
    });
    return Notification;
}());
exports.Notification = Notification;
