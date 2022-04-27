const submitBtn = document.getElementById("submitBtn");
const city = document.getElementById("cityName");
const cityDisplay = document.getElementById("city_name");
const tempStat = document.getElementById("temp_status");
const temp = document.getElementById("tempDisplay");
const dataHide = document.querySelector(".middle_layer");
const day = document.getElementById("day");
const date = document.getElementById("today_data");

const getCurrentDay = () => {
    var weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    let currentTime = new Date();
    let day = weekdays[currentTime.getDay() - 1];
    return day;
};

const getCurrentTime = () => {
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    var currentTime = new Date();
    var month = months[currentTime.getMonth()];
    var day = currentTime.getDate();
    var year = currentTime.getFullYear();

    let hours = currentTime.getHours();
    let mins = currentTime.getMinutes();
    let time = "AM";
    if (hours > 11) {
        time = "PM";
        if (hours > 12) {
            hours -= 12;
        }
    }
    if (mins < 10) {
        mins = "0" + mins;
    }
    return `${day} ${month}`;
};

day.innerHTML = getCurrentDay();
date.innerHTML = getCurrentTime();


const getInfo = async(event) => {
    dataHide.classList.add("data_hide");
    event.preventDefault();
    let cityName = city.value;
    if (cityName === "") {
        cityDisplay.innerHTML = "Please enter a city";
        dataHide.classList.add("data_hide");
    } else {
        try {
            let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=fbf57a8ce702d71eaf5db8e6e8a9a9c7`;
            const res = await fetch(apiUrl);
            const objData = await res.json();
            const arrData = [objData];

            cityDisplay.innerHTML = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp.innerText = arrData[0].main.temp;
            const tempStatus = arrData[0].weather[0].main;
            
            if(tempStatus == "Clear"){
                tempStat.innerHTML = "<i class='fas fa-sun' style='color:#eccc68'></i>";
            }
            else if(tempStatus == "Clouds"){
                tempStat.innerHTML = "<i class='fas fa-cloud' style='color:#f1f2f6'></i>";
            }
            else if(tempStatus == "Rainy"){
                tempStat.innerHTML = "<i class='fas fa-cloud-rain' style='color:#a4b0be'></i>";
            }
            else{
                tempStat.innerHTML = "<i class='fas fa-cloud' style='color:#44c3de'></i>";
            }

            dataHide.classList.remove("data_hide");

        } catch {
            cityDisplay.innerHTML = "Please enter valid city name";
            dataHide.classList.add("data_hide");
        }

    }
}
submitBtn.addEventListener("click", getInfo);