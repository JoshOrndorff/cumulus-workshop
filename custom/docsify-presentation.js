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
