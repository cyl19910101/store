/**
 * Created by cyl on 10/09/15.
 */
define(function (require) {
    var $  = require('jquery');
    var _b = function () {
    };

    /**
     *
     * @param ele should be a jquery object
     *
     * return true if this ele's validationMessage is empty
     *
     * otherwise return false
     */
    var checkInputValidation = function (ele) {
        try {
            if (ele.is('input')) {
                if (ele[0].validationMessage === '') return true;
                return false;
            }
            return false;
        }
        catch (e) {
            return false;
        }
    };

    var clearInputUIMessage = function (ele) {
        try {
            if (ele.is('input') && ele.parent().is('div')) {
                ele.parent().removeClass('has-error has-success has-warning');
                try {
                    ele.next().html('');
                }
                catch (e) {
                }
            }
        } catch (e) {
            console.log('task set input ui as error fail')
        }
    };

    var setInputUIError = function (ele) {
        try {
            if (ele.is('input') && ele.parent().is('div')) {
                ele.parent().addClass('has-error');
                try {
                    ele.next().html(ele[0].validationMessage);
                }
                catch (e) {
                }
            }
        } catch (e) {
            console.log('task set input ui as error fail')
        }
    };

    var setInputUISuccess = function (ele) {
        if (ele.is('input') && ele.parent().is('div'))
            ele.parent().addClass('has-success')
    };

    _b.prototype = {
        getInputValidation : checkInputValidation,
        clearInputUIMessage: clearInputUIMessage,
        setInputUIError    : setInputUIError,
        setInputUISuccess  : setInputUISuccess
    };

    return new _b();
});

