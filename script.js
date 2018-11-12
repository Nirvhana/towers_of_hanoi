var dragged;

var d = document;

checkIfDraggable();




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

    // check if the disc is on top
    if ((el.parentNode.nextElementSibling === null) || (el.parentNode.nextElementSibling.childElementCount < 1) ) {
        // set disc up to be draggable
        el.setAttribute('draggable', true);  
        } 
        else {
        el.setAttribute('draggable', false);  
        }
    }
}



document.addEventListener("drop", function( event ) {
    if (event.target.classList.contains('slot')) {
        if ((event.target.previousElementSibling == null) || (dragged.offsetWidth < event.target.previousElementSibling.children[0].offsetWidth)) {
            event.preventDefault();
            dragged.parentNode.removeChild( dragged );
            event.target.appendChild ( dragged );
            dragged.style.opacity = 1;
            
            checkIfDraggable();
            checkWin();
        }
    }

function checkWin() {
    if (t1s2.childElementCount === 1) {
        d.getElementById("won").style.opacity = 1;
    }
}

        
    
  
}, false);