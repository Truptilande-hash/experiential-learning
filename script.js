function showSection(id){
    let sec = document.getElementsByClassName("section");
    for(let i=0;i<sec.length;i++){
        sec[i].style.display = "none";
    }
    document.getElementById(id).style.display = "block";
}

function loginUser(){
    alert("Login Successful!");
    showSection('home');
}

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation not supported");
    }
}

function showPosition(position){
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    document.getElementById("location").innerHTML =
        "Latitude: " + lat + "<br>Longitude: " + lon + "<br>Loading address...";

    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`)
    .then(response => response.json())
    .then(data => {
        document.getElementById("location").innerHTML =
        " Address: " + data.display_name +
        "<br><br>Latitude: " + lat +
        "<br>Longitude: " + lon;
    });

    openMap(lat, lon);
}

function openMap(lat, lon){
    let url = "https://www.google.com/maps?q=" + lat + "," + lon;
    window.open(url, "_blank");
}

function showError(){
    alert("Location access denied or failed");
}

window.onload = function(){
    showSection('home');
}
