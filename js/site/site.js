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
        .addClass('button')
        .html('<span class="icon-left-dir"></span>&nbsp;' + $prevlink.text());
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

  if ($nextlink.length) {
    $next
      .attr('href', $nextlink.attr('href'))
      .addClass('button')
      .html($nextlink.text() + '&nbsp;<span class="icon-right-dir"></span>');
  }
  else {
    $next.hide();
  }

  // Reveal container
  if ($nextlink.length || $prevlink.length) {
    $('.page .breadcrumbs').addClass('full-opacity');
  }
};

$(document).ready(function() {
  // Create breadcrumb links
  ewf.autoBreadcrumbs('/go-responsive/');

  // PNGs for IE8
  if (ewf.$html.is('.lt-ie9')) {
    $('img').each(function(){
      var $img, src;
      if (this.hasAttribute('data-png')) {
        $img = $(this);
        src = $img.attr('src');
        $img.attr('src', src.replace(/\.svg$/, '.png'));
      }
    });
  }
});
