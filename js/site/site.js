/*global ewf: false */
ewf.autoBreadcrumbs = function _ewf_autoBreadcrumbs (subdir) {
  var $previous = $('#prev'),
      $next = $('#next'),
      currentUrl, $current, $currentListItem, $test,
      $prevlink, $nextlink, $parentList, $parentListTopic;

  // Check optional sub directory path

  // Get the current page url
  currentUrl = window.location.href.split(window.location.host)[1].replace(subdir, '');
  // Strip hash
  if (currentUrl.indexOf('#') > -1) {
    currentUrl = currentUrl.substr(0, currentUrl.indexOf('#'));
  }

  // Find the current position in the navigation list
  $current = $('.global-nav').find('a[href="' + currentUrl + '"]').addClass('currentPos');

  // Get all of the previous links
  $currentListItem = $current.parent('li');

  // Determine if there is a previous and next location

  // Find Previous Link first
  $test = $currentListItem.prev();
  if ($test.length === 1 && $test.is('li')) {
    // Get the previous sibling
    $prevlink = $test.children('a');
  }
  else {
    // Move up to the unordered list
    // New list item
    $parentList = $currentListItem.parent();

    // Check to make sure it item is a ul is needed.
    $test = $parentList.parent();
    if ($test.length === 1 && $test.is('li')) {
      $parentListTopic = $test;
      // Check to see if there is a previous sibling li
      $test = $parentListTopic.prev();
      if ($test.length === 1 && $test.is('li')) {
        // Get the last item from the previous top
        $prevlink = $test.children('ul').children('li').last().children('a');
      }
      else {
        $prevlink = $();
      }
    }
    else {
      $prevlink = $();
    }
  }

  if (currentUrl !== 'carousel.html') {
    if ($prevlink.length) {
      $previous
        .attr('href', $prevlink.attr('href'))
        .html('<span class="icon-left-dir"></span>&nbsp;Previous: ' + $prevlink.text());
    }
    else {
      $previous.hide();
    }
  }
  else {
    $previous.hide();
  }

  // Find Next Link
  $test = $currentListItem.next();
  if ($test.length === 1 && $test.is('li')) {
    // There is a next link
    // Get the previous sibling
    $nextlink = $test.children('a');
  }
  else {
    // Move up to the unordered list
    $parentList = $currentListItem.parent();

    // Check to make sure it item is a ul is needed.
    $test = $parentList.parent();
    if ($test.length === 1 && $test.is('li')) {
      // New list item
      $parentListTopic = $test;

      // Check to see if there is a previous sibling li
      if ($parentListTopic.next().length === 1 && $parentListTopic.next().is('li')) {
        // Get the last item from the previous top
        $nextlink = $parentListTopic.next().children('ul').children('li').first().children('a');
      }
      else {
        $nextlink = $();
      }
    }
    else {
      $nextlink = $();
    }
  }

if (currentUrl !== 'easy-tap-links.html') {
  if ($nextlink.length) {
    $next
      .attr('href', $nextlink.attr('href'))
      .html("Next: " + $nextlink.text() + '&nbsp;<span class="icon-right-dir"></span>');
  }
  else {
    $next.hide();
  }
}

  // Reveal container
  if ($nextlink.length || $prevlink.length) {
    $('.page .breadcrumbs').addClass('full-opacity');
  }
};

// Close certain alert boxes (e.g. Media List) when phone is no longer in landscape mode
ewf.mediaListWatchFor = function () {
  if (ewf.$body.width() > ewf.$body.height()) {
    // Landscape mode
    $('.show-for-phone-portrait').slideUp().remove();
  }
};

$(document).ready(function() {
  // Create breadcrumb links
  ewf.autoBreadcrumbs('/go-responsive/');

  // Narrow phone in portrait mode (e.g. media list page)
  if (screen.width <= 384 && $('.show-for-phone-portrait').length && ewf.$body.width() <= 384 && ewf.$body.width() < ewf.$body.height()) {
    $('.show-for-phone-portrait').slideDown();
    ewf.$window.on('orientationchange resize', ewf.mediaListWatchFor);
  }

  // PNGs for IE8
  if (ewf.$html.is('.no-svg')) {
    $('[data-png]').each(function(){
      var src = this.src;
      console.log('img src is currently: ' + src);
      console.log('changing to ' + src.replace(/\.svg$/, '.png'));
      this.src = src.replace(/\.svg$/, '.png'));
    });
  }
});
