"use strict";
exports.__esModule = true;
exports.NotificationViewModel = void 0;
var NotificationViewModel = /** @class */ (function () {
    function NotificationViewModel() {
    }
    NotificationViewModel.toHTTP = function (notification) {
        return {
            id: notification.id,
            content: notification.content,
            category: notification.category,
            recipientId: notification.recipientId
        };
    };
    return NotificationViewModel;
}());
exports.NotificationViewModel = NotificationViewModel;
