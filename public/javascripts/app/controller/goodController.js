define(function (require) {
	var $ = require('jquery');
	var good = require('app/model/good');
	var objectKey = require('app/util/objectKey');
	var _g = function () {
	};

	//images
	var imageList = {};

	var insertImage = function (key) {
		imageList[key] = 0;
	};

	var deleteImage = function (key) {
		delete imageList[key];
	};

	//tags
	var goodTags = {};
	var insertTag = function () {
		var name = $('#tagInput').val();
		//TODO: bind deleteTag
		//var tag = '<span onclick="deleteTag(this);" name="' + name + '" class="label label-info">' + name + '</span>';
		var tag = $('<span class="label label-info">' + name + '</span>');
		tag.click(function () {
			deleteTag(tag, name);
		});
		$('#currentLabel').append(tag);
		$('#tagInput').val('');
		goodTags[name] = 0;
	}

	var deleteTag = function (ele, name) {
		delete goodTags[name];
		$(ele).remove();
	};

	/**
	 * good curd request api
	 */
	//get good property from input
	// return true when every input value is valid
	//otherwise return false
	var getGoodDataFromInput = function () {
		//TODO: valid data
		var isValidGoodValue = true;
		var name = $('#createGoodForm [name=name]').val();
		var buyPrice = $('#createGoodForm [name=buyPrice]').val();
		var stock = $('#createGoodForm [name=stock]').val();
		var brief = $('#createGoodForm [name=brief]').val();
		var description = $('#createGoodForm [name=description]').val();
		//TODO: if good value is invalid, tips user and keep inputed data
		$('#createGoodForm [name=name]').val('');
		$('#createGoodForm [name=buyPrice]').val('');
		$('#createGoodForm [name=stock]').val('');
		$('#createGoodForm [name=brief]').val('');
		$('#createGoodForm [name=description]').val('');
		good.name = name;
		good.basicPrice = buyPrice;
		good.stock = stock;
		good.brief = brief;
		good.description = description;
		//TODO: complete code
		good.code = new Date().getTime();
		good.images = objectKey.getObjectKeys(imageList);
		good.tags = objectKey.getObjectKeys(goodTags);
		return isValidGoodValue;
	};

	var postGoodData = function () {
		$.ajax({
			url: '/api/v1/good',
			method: "POST",
			data: JSON.stringify(good),
			contentType: 'application/json; charset=utf-8',
			dataType: 'json',
			success: function (res) {
				//TODO : handle callback
				if (res.success) {
					location.reload();
				} else {

				}
			}
		});
	};

	var postGood = function () {
		if (getGoodDataFromInput()) {
			postGoodData();
		}
	};
	var getGood = function () {

	};

	//exports api
	_g.prototype = {
		insertImage: insertImage,
		deleteImage: deleteImage,
		insertTag: insertTag,
		deleteTag: deleteTag,
		postGood: postGood,
		getGood: getGood
	};
	return new _g();
});
