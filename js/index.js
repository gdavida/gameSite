// target elements with the "draggable" class
interact('.draggable')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    restrict: {
      restriction: "parent",
      endOnly: true,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },

    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    onend: function (event) {
      var textEl = event.target.querySelector('p');

      textEl && (textEl.textContent =
        'moved a distance of '
        + (Math.sqrt(event.dx * event.dx +
                     event.dy * event.dy)|0) + 'px');
    }
  });

  function dragMoveListener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

  // this is used later in the resizing demo
  window.dragMoveListener = dragMoveListener;







/* The dragging code for '.draggable' from the demo above
 * applies to this demo as well so it doesn't have to be repeated. */

// enable draggables to be dropped into this
interact('.dropzone').dropzone({
  // only accept elements matching this CSS selector
  accept: '.drag-drop',
  // Require a 75% element overlap for a drop to be possible
  overlap: 0.75,

  // listen for drop related events:

  ondropactivate: function (event) {
    // add active dropzone feedback
    event.target.classList.add('drop-active');
  },
  ondragenter: function (event) {
    var draggableElement = event.relatedTarget,
        dropzoneElement = event.target;

  //   // feedback the possibility of a drop
  //   dropzoneElement.classList.add('drop-target');
  //   draggableElement.classList.add('can-drop');
  //   draggableElement.textContent = 'Dragged in';
  // },
  // ondragleave: function (event) {
  //   // remove the drop feedback style
  //   event.target.classList.remove('drop-target');
  //   event.relatedTarget.classList.remove('can-drop');
  // //   event.relatedTarget.textContent = 'Dragged out';
  },
  // ondrop: function (event) {
  //   event.relatedTarget.textContent = 'Dropped';
  // },
  ondropdeactivate: function (event) {
    // remove active dropzone feedback
    event.target.classList.remove('drop-active');
    event.target.classList.remove('drop-target');
  }
});



function showBodies() {
  var imagesList = document.getElementsByClassName('parts');
  for (var i = 0; i < imagesList.length; i++) {
    imagesList[i].classList.remove("show");
    imagesList[i].classList.add("hide");
  }
  var chooseBodies = document.getElementsByClassName('bodies');
  for (var i = 0; i < chooseBodies.length; i++) {
    chooseBodies[i].classList.remove("hide");
    chooseBodies[i].classList.add("show");
  }
}

function chooseBody(el) {
  var useThisId = el.getAttribute('id');
  var monsterBox = document.getElementsByClassName('dropzone');
  monsterBox = monsterBox[0];
  monsterBox.id = '';
  monsterBox.id = useThisId;
}

function showParts() {
  var imagesList = document.getElementsByClassName('bodies');
  for (var i = 0; i < imagesList.length; i++) {
    imagesList[i].classList.remove("show");
    imagesList[i].classList.add("hide");
  }
  var imagesList = document.getElementsByClassName('parts');
  for (var i = 0; i < imagesList.length; i++) {
    imagesList[i].classList.remove("hide");
    imagesList[i].classList.add("show");
  }
}

function saveMonster() {
  var canvas = document.getElementsByClassName('dropzone');
  var dataURL = canvas[0].toDataURL('image/png');
  window.open(dataUrl, "toDataURL() image", "width=600, height=600");
}