define(function (require) {
    "use strict";

    var _f_i = function () {
    };
    var $    = require('jquery');
    require('_BS');
    require('_BS_OFF');
    require('_BS_FI_INPUT');
    require('_BS_FI_INPUT_LAN');
    var good = require('app/model/good');

    //images
    var imageList = {};

    var insertImage = function (key) {
        imageList[key] = 1;
    };

    var deleteImage   = function (key) {
        delete imageList[key];
    };
    var initFileInput = function () {
        $("#input-id").fileinput({
            language             : "zh",
            uploadUrl            : "/api/v1/picture",
            allowedFileExtensions: ["jpg", "jpeg", "png", "gif"],
            maxFileSize          : 5000,
            previewSettings      : {
                image: {width: "auto", height: "160px"}
            },
            ajaxSettings         : {
                beforeSend: function (xhr) {
                    if (localStorage.getItem('token')) {
                        xhr.setRequestHeader('Authorization',
                            'Bearer ' + localStorage.getItem('token'));
                    }
                }
            },
            ajaxDeleteSettings   : {
                beforeSend: function (xhr) {
                    if (localStorage.getItem('token')) {
                        xhr.setRequestHeader('Authorization',
                            'Bearer ' + localStorage.getItem('token'));
                    }
                },
                method    : 'DELETE'
            }
        });

        $('#input-id').on('filedeleted', function (event, key) {
            deleteImage(key);
        });

        $('#input-id').on('fileuploaded', function (event, data, previewId, index) {
            var response = data.response;
            response.initialPreviewConfig.forEach(function (config) {
                var key = config.key;
                insertImage(key);
            })
        });
    };

    _f_i.prototype = {
        initFileInput: initFileInput,
        imageList    : imageList
    };
    return new _f_i();
});
