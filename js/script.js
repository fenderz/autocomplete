var dataArray  = ["ночь", "улица", "фонарь", "аптека"],
	searchInput = $(".search-form__input"),
	dataList  = $(".data-list"),
	searchHolder = $(".search-holder");

function escapeRegExp(str) {
	return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

function updateResults(term) {
	var re = new RegExp("^" + escapeRegExp(term), "i"),
		searchResult = dataArray.filter(function (item) {
		return re.test(item);
	});

	buildDataList(searchResult);
}

function buildDataList(searchResult) {
    var nodes = [];

	if (searchResult.length) {
		nodes = searchResult.map(function (word) {
			return "<li class='data-list__item'>" + word + "</li>";
		});
	} else {
		nodes.push("<li class='data-list__item data-list__item_no_result'>Ничего не найдено.</li>");
	}

	dataList.empty();
	dataList.append(nodes.join(""));
}

searchInput.keyup(function (e) {
	updateResults(e.target.value);
});


searchInput.click(function () {
	searchHolder.addClass('search-holder_active');
});

$(document).click( function(event){
	if(!$(event.target).closest(searchInput).length)  {
		searchHolder.removeClass('search-holder_active');
		searchInput.val('');
	}
	buildDataList(dataArray).hide();
});

buildDataList(dataArray);
