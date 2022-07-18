let weather = {
  apiKey: "5843d0ee763a70fbde5b1396e4542340",
  fetchWeather: function (city) {          //taking input as city
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +       //used to fetch in open weather map
        city +
        "&units=metric&appid=" +
        this.apiKey                                                //uses our unique key
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");                            //if location is not covered
          throw new Error("No weather found.");
        }
        return response.json();                                 //returning all parameter in json format
      })
      .then((data) => this.displayWeather(data));                 //store in data
  },
  displayWeather: function (data) {                             //to display data on UI
    const { name } = data;                                      // use parameters
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Weather in " + name;        //taking input and shown result
    document.querySelector(".icon").src =                                    //related icon from openweathermap 
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;           //description about weather
    document.querySelector(".temp").innerText = temp + "°C";                  //temparature
    document.querySelector(".humidity").innerText =                           //humidity
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =                               //wind speed
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =                                     //setting up backgroup image from that location
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);           
  },
};

document.querySelector(".search button").addEventListener("click", function () {         //had add event listener  on click moment
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {            
    if (event.key == "Enter") {                                                        //or enter key press
      weather.search();
    }
  });

weather.fetchWeather("Denver");
