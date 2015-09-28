/**
 * Created by cyl on 7/09/15.
 * init shard content : account area, ajax token, sidebar
 */
define(function (require) {
    "use strict";

    var ajaxAuthorizationConfiguration = require('app/util/ajaxAuthorizationConfiguration');
    var sidebarController              = require('app/controller/sidebarController');
    var accountAreaController          = require('app/controller/accountAreaController');
    require('_BS');

    var _s = function () {
    };

    _s.prototype = {
        init: function () {
            ajaxAuthorizationConfiguration.initAjaxToken();
            sidebarController.initSidebarToggle();
            accountAreaController.initAccountAreaUI();
        }
    }
    return new _s();
});
