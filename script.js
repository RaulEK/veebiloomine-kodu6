(function () {
    "use strict";

    //clock

    document.addEventListener("DOMContentLoaded", function () {

        var c = document.getElementById("clock");

        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);

        function updateClock() {

            var date = new Date();
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();
            var txt = h >= 12 ? "PL" : "EL";

            h = h % 12;
            if (h === 0) {
                h = 12;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + ":" + m + ":" + s + " " + txt;

        };

    });

    // forms

    document.getElementById("form").addEventListener("submit", estimateDelivery);

    var e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";

    function estimateDelivery(event) {
        event.preventDefault();
        console.log(event)
        var hind = 0;

        var linn = document.getElementById("linn");

        var color = document.querySelector('input[name="color"]:checked');

        if (linn.value === "") {

            alert("Palun valige linn nimekirjast");

            linn.focus();

            return;

        } else if (color === null) {
            alert("Palun valige värv");

            return;

        } else {

            if (linn.value === "trt" || linn.value === "nrv") {
                hind += 2.5;
            } else if (linn.value === "prn") {
                hind += 3;
            }

            if (document.getElementById("v1").checked) {
                hind += 5;
            }
            if (document.getElementById("v2").checked) {
                hind += 1;
            }

            e.innerHTML = hind + " &euro;";

        }

        console.log("Tarne hind on arvutatud");
    }

})();

// map

var mapAPIKey = "ArS27kazvsojQOrICPq97-y313ZQtQWxBbafisGGy8IHs3YGweHBHJTHcVveseWU";

var map;


function GetMap() {

    "use strict";

    var centerPoint = new Microsoft.Maps.Location(
        58.38104,
        26.71992
    );

    var centerPoint2 = new Microsoft.Maps.Location(
        59.433288,
        24.751276
    );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: new Microsoft.Maps.Location(58.87, 25.7),
        zoom: 7,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });

    var pushpin = new Microsoft.Maps.Pushpin(centerPoint, {});

    pushpin.metadata = {
        title: 'Tartu Ülikool',
        description: 'Kirjeldus Tartu Ülikoolist',
    };

    Microsoft.Maps.Events.addHandler(pushpin, 'click', pushpinClicked);

    map.entities.push(pushpin);

    var pushpin2 = new Microsoft.Maps.Pushpin(centerPoint2, {})

    pushpin2.metadata = {
        title: 'Solaris',
        description: 'Solarise kirjeldus'
    };

    Microsoft.Maps.Events.addHandler(pushpin2, 'click', pushpinClicked);

    map.entities.push(pushpin2);
}

function pushpinClicked(e) {

    var infobox = new Microsoft.Maps.Infobox(e.target.getLocation(), {
        title: e.target.metadata.title,
        description: e.target.metadata.description,
        visible: true
    });

    infobox.setMap(map);
}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

