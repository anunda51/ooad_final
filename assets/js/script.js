// ---------------------------------  sidebar  ---------------------------------
function w3_open() {
    document.getElementById("main").style.marginLeft = "0";
    document.getElementById("sidebarMe").style.width = "4rem";
    document.getElementById("sidebarMe").style.display = "block";
    document.getElementById("openNav").style.display = "none";
    document.getElementById("closeNav").style.marginLeft = "4rem";
    document.getElementById("closeNav").style.display = "block";


}

function w3_close() {
    document.getElementById("main").style.marginLeft = "0%";
    document.getElementById("sidebarMe").style.display = "none";
    document.getElementById("openNav").style.display = "inline-block";
    document.getElementById("closeNav").style.display = "none";
}

function myFunction(x) {
    if (x.matches) {
        document.getElementById("main").style.marginLeft = "0";
        document.getElementById("mySidebar").style.display = "none";
        document.getElementById("closeNav").style.display = "none";
        document.getElementById("sidebarMe").style.display = "none";
        document.getElementById("openNav").style.display = "inline-block";

    } else {
        document.getElementById("openNav").style.display = "none";
        document.getElementById("mySidebar").style.width = "20%";
        document.getElementById("main").style.marginLeft = "0%";
        document.getElementById("mySidebar").style.display = "block";
        document.getElementById("sidebarMe").style.display = "none";
        document.getElementById("closeNav").style.display = "none";

    }
}
var x = window.matchMedia("(max-width: 879px)")
myFunction(x);
x.addListener(myFunction)

// ---------------------------------   end sidebar    ------------------------------


// --------------------------coloum Modal ----------------------------
function examSeat() {
    document.getElementById('id01').style.display = 'block'
}

var modalPop = document.getElementById('id01');
window.onclick = function(event) {
    if (event.target == modalPop) {
        modalPop.style.display = "none";
    }
}

// --------------------------end Modal ----------------------------

// --------------------------- login Modal --------------------------

function checkLogin() {

    var user = document.getElementById("user").value;
    var pass = document.getElementById("pass").value;
    if (user == "a" || pass == "a") {
        document.getElementById('id00').style.display = 'block'
        return false;
    }

}

// ---------------------------end login Modal --------------------------

// --------------------------- Del Modal --------------------------

function del() {
    document.getElementById('id02').style.display = 'block';
}



// ---------------------------end Del Modal --------------------------