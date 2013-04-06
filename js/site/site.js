/*global ewf: false */
ewf.autoBreadcrumbs = function _ewf_autoBreadcrumbs (subdir) {
  var $previous = $('#prev'),
      $next = $('#next'),
      $current, $currentListItem,
      currentUrl, $prevlink, $nextlink, $parentList, $parentListTopic;

  // Check optional sub directory path
  if (!subdir || typeof subdir !== 'string') { subdir = ''; }

  // Get the current page url
  currentUrl = window.location.href.split(window.location.host)[1].replace(subdir, '');
  // Clear hash
  currentUrl = currentUrl.substr(0, currentUrl.indexOf('#'));

  // Find the current position in the navigation list
  $current = $('.global-nav').find('a[href="' + currentUrl + '"]');
  $current.addClass('currentPos');

  // Get all of the previous links
  $currentListItem = $current.parent('li');

  // Determine if there is a previous and next location

  // Find Previous Link first
  $prevlink = $currentListItem.prev().children('a');
  if ($prevlink.length === 1 && $prevlink.is('li')) {
    // Get the previous sibling
    $prevlink = $prevlink.children('a');
  }
  else {
    // Move up to the unordered list
    $parentList = $currentListItem.parent();
    // New list item
    $parentListTopic = $parentList.parent();

    // Check to make sure it item is a ul is needed.
    if ($parentListTopic.length === 1 && $parentListTopic.is('li')) {
      // Check to see if there is a previous sibling li
      if ($parentListTopic.prev().length === 1 && $parentListTopic.prev().is('li')) {
        // Get the last item from the previous top
        $prevlink = $parentListTopic.prev().children('ul').children('li').last().children('a');
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
      $previous.attr('href', $prevlink.attr('href'));
      $previous.addClass('button icon-left-dir');
    }
    else {
      $previous.hide();
    }
  }
  else {
    $previous.hide();
  }

  // Find Next Link
  if ($currentListItem.next().length === 1 && $currentListItem.next().is('li')) {
    // There is a next link
    // Get the previous sibling
    $nextlink = $currentListItem.next().children('a');
  }
  else {
    // Move up to the unordered list
    $parentList = $currentListItem.parent();
    // New list item
    $parentListTopic = $parentListTopic;

    // Check to make sure it item is a ul is needed.
    if ($parentListTopic.length === 1 && $parentListTopic.is('li')) {
      // Check to see if there is a previous sibling li
      $nextlink = $parentListTopic.next();
      if ($nextlink.length === 1 && $nextlink.is('li')) {
        // Get the last item from the previous top
        $nextlink = $nextlink.children('ul').children('li').first().children('a');
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
    $next.attr('href', $nextlink.attr('href'));
    $next.addClass('button').html($nextlink.text() + '&nbsp;<span class="icon-right-dir"></span>');
  }
  else {
    $next.hide();
  }

  // Reveal container
  if ($nextlink.length || $prevlink.length) {
    $('.page .breadcrumbs').animate({opacity:1});
  }
};

$(document).ready(function() {
  // Generate prev/next links
  ewf.autoBreadcrumbs('/go-responsive/');

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
});
