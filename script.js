var dragged;

var d = document;



document.addEventListener("dragstart", function( event ) {
    // Speichern einer ref auf das drag-bare Element
    dragged = event.target;
    // Element halb-transparent machen
    event.target.style.opacity = 0.5;
}, false);

/* events fired on the drop targets */
document.addEventListener("dragover", function( event ) {
    event.preventDefault();
}, false);



function checkIfDraggable() {

// go over all discs loop
for ( i = 1 ; i < 7 ; i++) {
    let el = d.getElementById("s"+i);
    el.setAttribute('draggable', false);
    // check if the disc is on top
    if ((el.parentNode.nextElementSibling === null) || (el.parentNode.nextElementSibling.childElementCount < 1) ) {
        // set disc up to be draggable
        el.setAttribute('draggable', true);  
        } 
    }
}

function checkWin() {
    if (t3s6.childElementCount === 1) {
        d.getElementById("won").style.opacity = 1;
        d.getElementById("won").style.zIndex = 111;
    }
}

function dropIt() {

    event.preventDefault();
    dragged.parentNode.removeChild( dragged );
    event.target.appendChild ( dragged );
    dragged.style.opacity = 1;
    
    checkIfDraggable();
    checkWin(); 
}

document.addEventListener("drop", function( event ) {
    dragged.style.opacity = 1;
    if (dragged.getAttribute('draggable') == 'true') {
        if (event.target.classList.contains('slot')) {
            if (event.target.childElementCount < 1) {
                if (event.target.previousElementSibling === null) {
                    dropIt();
                }
                else if (event.target.previousElementSibling.childElementCount > 0) {
                    if (dragged.offsetWidth < event.target.previousElementSibling.children[0].offsetWidth) {
                        dropIt();
                    }
                }
            }
        }
    }
}, false);