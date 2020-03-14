//import { get } from "http";
const data = {};
/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = 'b2d688f909941a2d9ea22ed486d739b1';

//Convert from Fahrenheit to Celsius. Logic gotten from https://openweathermap.org/current
let addApi = '&units=metric&APPID=';
// Create a new date instance dynamically with JS.... Logic gotten from W3Schools
let today = new Date();
let dateTime = today.toString();
//created an event listener to grab user inputed values from the homepagee

document.getElementById('generate').addEventListener('click', performAction)


/* Function called by event listener */

function performAction(e){
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getWeather(baseURL, zip, addApi, apiKey);
    //Temperature(baseURL, zip, addApi, apiKey);
    theTemp();
    finalData();
};

//async GET fetch request
const getWeather = async (baseURL, zip, addApi, apiKey)=>{
 

    const res = await fetch(`${baseURL}${zip}${addApi}${apiKey}`);
    console.log(baseURL+zip+addApi+apiKey);
    try {

        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
  };


//to get Temperature
const theTemp = async () => {

    const zip = document.getElementById('zip').value;
    const endpoint = baseURL + zip + addApi + apiKey;
    const response = await fetch(endpoint);
    const secondresponse = await response.json();
    return secondresponse.main.temp;
  }
/* Function to POST data */
const postData = async (url = '/addWeather', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type':'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch(error) {
        console.log('error', error);
    };
};
// Data for update
const finalData = async () => {
    data.date = dateTime;
    data.feelings = feelings.value;
    data.temp = await theTemp();
    updateUI();
  }


//Dynamic UI update
const updateUI = async () => {
    const request = await fetch ('/weather');
    try{
        document.getElementById('date').innerHTML = `<p>Today is ${data.date}</p>`;
        //Celsius symbol help gotten from https://stackoverflow.com/questions/19477324/how-do-i-calculate-the-temperature-in-celsius-returned-in-openweathermap-org-jso
        document.getElementById('temp').innerHTML = `The temperature is ${data.temp} &#8451`;
        document.getElementById('content').innerHTML = `Your feelings: ${data.feelings}`;

        

    } catch (error){
        console.log("error", error);
    }
}



