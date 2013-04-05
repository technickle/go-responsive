// get the current page url
var url = window.location.href.toString().split(window.location.host)[1].replace('/go-responsive/','');

// Find the current position in the navigation list
var current = $('.global-nav').find('a[href="' + url + '"]').addClass('currentPos');

//Get all of the previous links
var curListItem = current.parent('li');

var prevlink,
	previous = $('#prev'),
	nextlink,
	next = $('#next');

// Determine if there is a previous and next location
// Find previous first

//console.log(curListItem.prev().get(0));

// Find Previous Link
if (curListItem.prev().length === 1 && curListItem.prev().is('li')) {

	//console.log('We have a previous sibling list item');

	// Get the previous sibling
	prevlink = curListItem.prev().children('a');

} else {

	//console.log('We are at the beginning of the list');

	// Move up to the unorder list
	var parentUL = curListItem.parent();

	// Check to make sure it item is a ul is needed.
	if (parentUL.parent().length === 1 && parentUL.parent().is('li')) {

		//console.log("We are nested");

		// New list item
		var parentListTopic = parentUL.parent();

		// Check to see if there is a previous sibling li
		if (parentListTopic.prev().length === 1 && parentListTopic.prev().is('li')) {

			// Get the last item from the previous top
			prevlink = parentListTopic.prev().children('ul').children('li').last().children('a');

		} else {

			//console.log('there is no previous menu item.');

			prevlink = false;
		}

	} else {

		//console.log("We are at the top of the nav. Remove the prev link.");

		prevlink = false;
	}
}

if (prevlink) {
	//console.log("back " + prevlink);
	previous.attr('href', prevlink.attr('href'));
	previous.text("◁ &nbsp;" + prevlink.text());
} else {
	previous.hide();
}

// Find Next Linkis another
if (curListItem.next().length === 1 && curListItem.next().is('li')) {

	// There is a next link
	//console.log('There is a next child');

	// Get the previous sibling
	nextlink = curListItem.next().children('a');

} else {

	//console.log('There are not more li in this list');

	// Move up to the unorder list
	var parentUL = curListItem.parent();

	// Check to make sure it item is a ul is needed.
	if (parentUL.parent().length === 1 && parentUL.parent().is('li')) {

		//console.log("We are nested");

		// New list item
		var parentListTopic = parentUL.parent();

		// Check to see if there is a previous sibling li
		if (parentListTopic.next().length === 1 && parentListTopic.next().is('li')) {

			// Get the last item from the previous top
			nextlink = parentListTopic.next().children('ul').children('li').first().children('a');

		} else {

			//console.log('there is no previous menu item.');

			nextlink = false;
		}

	} else {

		//console.log("We are at the top of the nav. Remove the prev link.");

		nextlink = false;
	}

}

if (nextlink) {
	//console.log("next " + nextlink);
	next.attr('href', nextlink.attr('href'));
	next.html(nextlink.text() + '&nbsp; ▷');
} else {
	previous.hide();
}
