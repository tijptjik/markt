# animatedModal.js
<p>animatedModal.js is a javascript plugin to create a fullscreen modal with CSS3 transitions. You can use the transitions from animate.css or create your own transitions.</p>


## Usage

    // First create an instance of a modal.
    var modal = new AnimatedModal({
        color:'#39BEB9'
    });
    // then use a click event to open the modal.
    document.getElementById('demo01').addEventListener('click', function(ev) {
        ev.preventDefault();
        modal01.open();
    });

