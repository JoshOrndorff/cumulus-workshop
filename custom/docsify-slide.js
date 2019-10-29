document.onkeydown = arrowChecker;
nextLink = document.location.href;
previousLink = document.location.href;

function arrowChecker(e) {
  e = e || window.event;
  if (e.keyCode == '37') {
    //left
    document.location.href = previousLink;
  } else if (e.keyCode == '39') {
    //right
    document.location.href = nextLink;
  }
}

window.$docsify.plugins.push(function(hook, vm) {
  // Add left and right side of slide
  hook.afterEach(function(html) {
    if (html.includes('<!-- slide:break')) {
      let width = 50;
      let matches = html.match(/<!-- slide:break-\d+ -->/g);
      if (matches) {
        width = matches[0].match(/(\d+)/g)[0];
        console.log(width);
      }
      html =
        "<div class='slide-container'>" +
        "<div class='slide-col slide-left' style='width: " +
        width +
        "%'>" +
        html.replace(
          /<!-- slide:break-?(\d+)? -->/g,
          "</div><div class='slide-col slide-right' style='width: " +
            (100 - width) +
            "%'>"
        ) +
        '</div></div>';
    }

    return html;
  });

  // Make arrow keys go forward and backward
  hook.doneEach(function() {
    let next = document.getElementsByClassName(
      'pagination-item pagination-item--next'
    );
    if (next[0]) {
      nextLink = next[0].getElementsByTagName('a')[0].href;
    } else {
      nextLink = document.location.href;
    }
    let previous = document.getElementsByClassName(
      'pagination-item pagination-item--previous'
    );
    if (previous[0]) {
      previousLink = previous[0].getElementsByTagName('a')[0].href;
    }
  });
});
