ewf.autoBreadcrumbs = function _ewf_autoBreadcrumbs (subdir) {
  var $previous = $('#prev'),
      $next = $('#next'),
      $current, $currentListItem,
      currentUrl, $prevlink, $nextlink, $parentList, $parentListTopic;

  // Check optional sub directory path
  if (!subdir || typeof subdir !== 'string') { console.log('no subdir given'); subdir = ''; }

  // Get the current page url
  currentUrl = window.location.href.split(window.location.host)[1].replace(subdir, '');
  // console.log('currentUrl, with hash: ', currentUrl);
  // Strip hash
  if (currentUrl.indexOf('#') > -1) {
    currentUrl = currentUrl.substr(0, currentUrl.indexOf('#'));
  }
  // console.log('currentUrl, no hash: ', currentUrl);

  // Find the current position in the navigation list
  $current = $('.global-nav').find('a[href="' + currentUrl + '"]');
  // console.log('current link in nav: ', $current);
  // $current.addClass('currentPos');

  // Get all of the previous links
  $currentListItem = $current.parent('li');
  // console.log('all previous links: ', $currentListItem);

  // Determine if there is a previous and next location

  // Find Previous Link first
  // $prevlink = $currentListItem.prev().children('a');
  if ($currentListItem.length === 1 && $currentListItem.is('li')) {
    // Get the previous sibling
    $prevlink = $currentListItem.prev().children('a');
    // console.log('previous link [A]: ', $prevlink.get(0));
  }
  else {
    // Move up to the unordered list
    // New list item
    $parentList = $currentListItem.parent();

    // Check to make sure it item is a ul is needed.
    if ($parentList.parent().length === 1 && $parentList.parent().is('li')) {
      $parentListTopic = $parentList.parent();
      // Check to see if there is a previous sibling li
      if ($parentListTopic.prev().length === 1 && $parentListTopic.prev().is('li')) {
        // Get the last item from the previous top
        $prevlink = $parentListTopic.prev().children('ul').children('li').last().children('a');
        // console.log('previous link [B]: ', $prevlink);
      }
      else {
        // console.log('nulling prev link [A]');
        $prevlink = $();
      }
    }
    else {
      // console.log('nulling prev link [B]');
      $prevlink = $();
    }
  }

  if (currentUrl !== 'carousel.html') {
    if ($prevlink.length) {
      console.log('found previous page:', $prevlink.attr('href'));
      // $previous.attr('href', $prevlink.attr('href'));
      // $previous.addClass('button icon-left-dir');
    }
    else {
      // console.log('could not find previous button');
      // $previous.hide();
    }
  }
  else {
    // console.log('carousel page, hiding prev link');
    // $previous.hide();
  }

  // Find Next Link
  if ($currentListItem.next().length === 1 && $currentListItem.next().is('li')) {
    // There is a next link
    // Get the previous sibling
    $nextlink = $currentListItem.next().children('a');
    // console.log('next link [A]: ', $nextlink.get(0));
  }
  else {
    // Move up to the unordered list
    $parentList = $currentListItem.parent();

    // Check to make sure it item is a ul is needed.
    if ($parentList.parent().length === 1 && $parentList.parent().is('li')) {

      // New list item
      $parentListTopic = $parentList.parent();

      // Check to see if there is a previous sibling li
      if ($parentListTopic.next().length === 1 && $parentListTopic.next().is('li')) {
        // Get the last item from the previous top
        $nextlink = $parentListTopic.next().children('ul').children('li').first().children('a');
        // console.log('next link [B]: ', $nextlink.get(0));
      }
      else {
        // console.log('nulling next link [A]');
        $nextlink = $();
      }
    }
    else {
      // console.log('nulling next link [B]');
      $nextlink = $();
    }
  }

  if ($nextlink.length) {
    console.log('found next link: ', $nextlink.attr('href'));
    // $next.attr('href', $nextlink.attr('href'));
    // $next.addClass('button').html($nextlink.text() + '&nbsp;<span class="icon-right-dir"></span>');
  }
  else {
    // $next.hide();
  }

  // Reveal container
  if ($nextlink.length || $prevlink.length) {
    console.log('would have displayed breadcrumb row');
    // $('.page .breadcrumbs').animate({opacity:1});
  }
};

$(document).ready(function() {

  ewf.autoBreadcrumbs('/go-responsive/');


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

    } else {
      previous.hide();
    }

  } else {
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

  } else {
    next.hide();
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
});
