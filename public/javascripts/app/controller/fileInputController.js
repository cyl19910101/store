define(function (require) {
	var _f_i = function () {
	};
	var $ = require('jquery');
	require('_BS');
	require('_BS_OFF');
	require('_BS_FI_INPUT');
	require('_BS_FI_INPUT_LAN');
	var good = require('app/model/good');
	var goodController = require('app/controller/goodController');
	var initFileInput = function () {
		$("#input-id").fileinput({
			language: "zh",
			uploadUrl: "/api/v1/picture",
			allowedFileExtensions: ["jpg", "jpeg", "png", "gif"],
			maxFileSize: 5000,
			previewSettings: {
				image: {width: "auto", height: "160px"}
			},
			ajaxSettings: {
				beforeSend: function (xhr) {
					if (localStorage.getItem('token')) {
						xhr.setRequestHeader('Authorization',
							'Bearer ' + localStorage.getItem('token'));
					}
				}
			}
		});

		$('#input-id').on('filedeleted', function (event, key) {
			goodController.deleteImage(key);
		});

		$('#input-id').on('filepredelete', function (event, key) {
			arguments[2].setRequestHeader('Authorization',
				'Bearer ' + localStorage.getItem('token'));
		});

		$('#input-id').on('fileuploaded', function (event, data, previewId, index) {
			var response = data.response;
			response.initialPreviewConfig.forEach(function (config) {
				var key = config.key;
				goodController.insertImage(key);
			})
		});
	};

	_f_i.prototype = {initFileInput: initFileInput};
	return new _f_i();
});
