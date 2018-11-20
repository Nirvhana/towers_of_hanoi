var dragged;
var d = document;
var targetTower;

document.addEventListener("dragstart", function( event ) {
    // Speichern einer ref auf das drag-bare Element
    dragged = event.target;
    // Element halb-transparent machen
    event.target.style.opacity = 0.5;
}, false);

document.addEventListener("dragend", function( event ) {
    // Speichern einer ref auf das drag-bare Element
    // Element halb-transparent machen
    event.target.style.opacity = 1;
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

function dropIt(freeSlot) {

    dragged.parentNode.removeChild( dragged );
    freeSlot.appendChild ( dragged );
    checkIfDraggable();
    checkWin(); 
}


document.addEventListener("drop", function( event ) {

    var targetTower = event.target.parentNode.querySelectorAll(".slot");
    var freeSlot;

    if ((event.target.classList == "slots") && (dragged.getAttribute('draggable') == 'true')) {
        // find Top Slide of the tower
        for (i = 0 ; i < targetTower.length ; i++) {

            if (targetTower[i].childElementCount > 0) {
                topSlide = targetTower[i];
                freeSlot = targetTower[i+1];
            }
            
        }
        // If the tower has no slides on it
        if (freeSlot == undefined) {
            freeSlot = targetTower[0];
        }
        
        console.log(freeSlot);
        
        // checks if the top Slide of target tower is bigger than the dragged slide
        if ((freeSlot == targetTower[0]) || (dragged.offsetWidth < topSlide.children[0].offsetWidth)) {
            dropIt(freeSlot);
        }
    }

}, false);