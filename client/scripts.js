$(document).ready(function() {
$("#btn").click(function() {
    newLocation();
    
})

    $.get("http://localhost:3000/api/locations", function(data) {
        for(var i = 0; i < data.length; i++) {
            createDiv(data[i]);
        }
    })

function createDiv(locations) {
    var cont = $("<div class='singleRestaurant'></div>");
    cont.append(
        $("<h1>" + locations.name + "</h2>"),
        $("<h2>Phone: " + locations.phone + "</h3>"),
        $("<h3>Address: " + locations.address.line1 + "</h3>"),
        $("<h3>" + locations.address.line2 + "</h3>"),
        $("<h3>" + locations.address.city + " " + locations.address.state + " " + locations.address.zip + "</h3>"),
        $("<h3>Delivers? " + locations.delivers.toString() + "</h3>"));
    $("#todo-container").append(cont);
}

function newLocation(location) {
    var newPizza = {
        name: $('#name').val(),
        delivers: $('#delivers').prop("checked"),
        phone: $('#phone').val(),
        address: {
            line1: $("#line1").val(),
            line2: $("#line2").val(),
            city: $("#city").val(),
            state: $("#state").val(),
            zip: $("#zip").val()
        }
    }
     $.ajax({
        method: "POST",
        url: "http://localhost:3000/api/locations",
        contentType: "application/json",
        data: JSON.stringify(newPizza)
    }).then(function(data) {
        console.log("Did it!");
        createDiv(location);
        $('input:not([type=button])').val('');
    }, function (err) {
        console.log(err);
    })
}

});