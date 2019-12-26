
let lat, lon;
const button = document.getElementById("submit");

// button.addEventListener("click", async event => {
//     const data = { lat, lon };
//     const options = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(data)
//     };
//     const response = await fetch("/api", options);
//     const json = await response.json();
//     console.log(json);
// });

if ("geolocation" in navigator) {
    console.log("geolocation is available");

    navigator.geolocation.getCurrentPosition(async position => {
        let lat, lon, weather, air;
        try {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            document.getElementById("latitude").textContent = lat;
            document.getElementById("longitude").textContent = lon;

            const api_url = `weather/${lat},${lon}`;
            const response = await fetch(api_url)
            const json = await response.json();
            document.getElementById('summary').textContent = json.weather.currently.summary;
            document.getElementById('temperature').textContent = json.weather.currently.temperature;

            weather = json.weather.currently;
            air = json.air_quality.results[0].measurements[0];

            // window.console.log(json.air_quality.results[0].measurements[0]);

            document.getElementById('aq_parameter').textContent = json.air_quality.results[0].measurements[0].parameter;
            document.getElementById('aq_value').textContent = json.air_quality.results[0].measurements[0].value;
            document.getElementById('aq_units').textContent = json.air_quality.results[0].measurements[0].unit;
            document.getElementById('aq_date').textContent = json.air_quality.results[0].measurements[0].lastUpdated;






        } catch (error) {
            console.error(error);
            console.log('something went wrong');
            air = {
                value: -1
            };
            document.getElementById('aq_value').textContent = '*** NO READING ***';
        }

        const data = { lat, lon, weather, air };
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };
        const response5 = await fetch("/api", options);
        const json5 = await response5.json();


        // console.log(json);





        // const someURL = 'solar/'
        // const rezponse = await fetch(someURL);
        // const jason = await rezponse.text();

        // const rezponse2 = await fetch(someURL);
        // const jason2 = await rezponse2.json();


        // const redirection = await fetch('cityList/');
        // const redirectionResult = await redirection.json();

    });
} else {
    console.log("geolocation is not available");
}
