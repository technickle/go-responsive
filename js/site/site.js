// get the current page url
var url = window.location.href.toString().split(window.location.host)[1].replace('/go-responsive/','').replace('#','');

// Find the current position in the navigation list
var current = $('.global-nav').find('a[href="' + url + '"]').addClass('currentPos');

//Get all of the previous links
var curListItem = current.parent('li');

var prevlink,
  previous = $('#prev'),
  nextlink,
  next = $('#next'),
  showBreadcrumbs = false;

// Determine if there is a previous and next location
// Find previous first

// Find Previous Link
if (curListItem.prev().length === 1 && curListItem.prev().is('li')) {
  // Get the previous sibling
  prevlink = curListItem.prev().children('a');
}
else {
  // Move up to the unorder list
  var parentUL = curListItem.parent();

  // Check to make sure it item is a ul is needed.
  if (parentUL.parent().length === 1 && parentUL.parent().is('li')) {

    // New list item
    var parentListTopic = parentUL.parent();

    // Check to see if there is a previous sibling li
    if (parentListTopic.prev().length === 1 && parentListTopic.prev().is('li')) {

      // Get the last item from the previous top
      prevlink = parentListTopic.prev().children('ul').children('li').last().children('a');

    }
    else {
      prevlink = false;
    }
  }
  else {
    prevlink = false;
  }
}

if (url !== "carousel.html") {
  if (prevlink) {
    previous.attr('href', prevlink.attr('href'));
    previous.addClass('button icon-left-dir');
    showBreadcrumbs = true;
  }
  else {
    previous.hide();
  }
}
else {
  previous.hide();
}


// Find Next Linkis another
if (curListItem.next().length === 1 && curListItem.next().is('li')) {

  // There is a next link

  // Get the previous sibling
  nextlink = curListItem.next().children('a');

}
else {


  // Move up to the unorder list
  var parentUL = curListItem.parent();

  // Check to make sure it item is a ul is needed.
  if (parentUL.parent().length === 1 && parentUL.parent().is('li')) {


    // New list item
    var parentListTopic = parentUL.parent();

    // Check to see if there is a previous sibling li
    if (parentListTopic.next().length === 1 && parentListTopic.next().is('li')) {
      // Get the last item from the previous top
      nextlink = parentListTopic.next().children('ul').children('li').first().children('a');
    }
    else {
      nextlink = false;
    }
  }
  else {
    nextlink = false;
  }

}

if (nextlink) {
  next.attr('href', nextlink.attr('href'));
  next.addClass('button').html(nextlink.text() + "&nbsp;<span class='icon-right-dir'></span>");
  showBreadcrumbs = true;
}
else {
  previous.hide();
}

if (showBreadcrumbs) {
  $('.page .breadcrumbs').animate({opacity:1});
}


// PNGs for IE8
try {
  if (/MSIE\s\d/.test(navigator.userAgent) && parseInt(/MSIE\s(\d+)/.exec(navigator.userAgent)[1], 10) < 9) {
    $('img').each(function(){
      var $img, src;
      if (this.hasAttribute('data-png')) {
        $img = $(this);
        src = $img.attr('src');
        $img.attr('src', src.replace(/\.svg/, '.png'));
      }
    });
  }
} catch (e) { }
