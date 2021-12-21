const APP_ID = '1ca0d9d78aba57e9924e797a3af33e39';
const searchInput = document.querySelector('#search-input');
const DEFAUT_VALUE = '--';
const cityName = document.querySelector('.city-name')
const weatherState = document.querySelector('.weather-state');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const feel_like = document.querySelector('.feel-like');
const sunrise = document.querySelector('.sunrise');
const sunset = document.querySelector('.sunset');
const humidity = document.querySelector('.humidity');
const windSpeed = document.querySelector('.wind-speed');
const timeupdate = document.querySelector('.timeupdate');
const temp_min = document.querySelector('.temp-min');
const temp_max = document.querySelector('.temp-max');
//Lay tinh mac dinh la Vinh Long
window.onload = fetch(`https://api.openweathermap.org/data/2.5/weather?q=Vĩnh Long&appid=1ca0d9d78aba57e9924e797a3af33e39&units=metric&lang=vi`)
    .then(async res => {
        const data = await res.json();
        console.log('[Search Input]', data);
        cityName.innerHTML = data.name || DEFAUT_VALUE;
        weatherState.innerHTML = data.weather[0].description || DEFAUT_VALUE;
        weatherIcon.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
        temperature.innerHTML = Math.round(data.main.temp) || DEFAUT_VALUE;
        feel_like.innerHTML = Math.round(data.main.feels_like) || DEFAUT_VALUE;
        sunrise.innerHTML = dayjs.unix(data.sys.sunrise).format('H:mm') || DEFAUT_VALUE;
        sunset.innerHTML = dayjs.unix(data.sys.sunset).format('H:mm') || DEFAUT_VALUE;
        humidity.innerHTML = data.main.humidity || DEFAUT_VALUE;
        windSpeed.innerHTML = (data.wind.speed * 3.6).toFixed(2) || DEFAUT_VALUE;
        timeupdate.innerHTML = dayjs.unix(data.dt).format('H:mm') || DEFAUT_VALUE;
        temp_min.innerHTML = Math.round(data.main.temp_min) || DEFAUT_VALUE;
        temp_max.innerHTML = Math.round(data.main.temp_max) || DEFAUT_VALUE;
    });
//Tim kiem tinh 
searchInput.addEventListener('change', (e) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&appid=${APP_ID}&units=metric&lang=vi`)
        .then(async res => {
            const data = await res.json();
            console.log('[Search Input]', data);
            cityName.innerHTML = data.name || DEFAUT_VALUE;
            weatherState.innerHTML = data.weather[0].description || DEFAUT_VALUE;
            weatherIcon.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
            temperature.innerHTML = Math.round(data.main.temp) || DEFAUT_VALUE;
            feel_like.innerHTML = Math.round(data.main.feels_like) || DEFAUT_VALUE;
            sunrise.innerHTML = dayjs.unix(data.sys.sunrise).format('H:mm') || DEFAUT_VALUE;
            sunset.innerHTML = dayjs.unix(data.sys.sunset).format('H:mm') || DEFAUT_VALUE;
            humidity.innerHTML = data.main.humidity || DEFAUT_VALUE;
            windSpeed.innerHTML = (data.wind.speed * 3.6).toFixed(2) || DEFAUT_VALUE;
            timeupdate.innerHTML = dayjs.unix(data.dt).format('H:mm') || DEFAUT_VALUE;
            temp_min.innerHTML = Math.round(data.main.temp_min) || DEFAUT_VALUE;
            temp_max.innerHTML = Math.round(data.main.temp_max) || DEFAUT_VALUE;
        });
});
//Lay ngay hien tai
var today = new Date();
var date = 'Ngày' + ' ' + today.getDate() + ' ' + 'tháng' + ' ' + (today.getMonth() + 1) + ' ' + 'năm' + ' ' + today.getFullYear();
document.getElementById("date").innerHTML = date;
//Tro ly ao
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

const recognition = new SpeechRecognition();
const synth = window.speechSynthesis;
recognition.lang = 'vi-VI';
recognition.continuous = false;
const microphone = document.querySelector('.microphone');
const handleVoice = (text) => {
    console.log('text', text);

    // "thời tiết tại Đà Nẵng" => ["thời tiết tại", "Đà Nẵng"]
    const handledText = text.toLowerCase();
    if (handledText.includes('thời tiết tại')) {
        const location = handledText.split('tại')[1].trim();

        console.log('location', location);
        searchInput.value = location;
        const changeEvent = new Event('change');
        searchInput.dispatchEvent(changeEvent);
        return;
    }
    if (handledText.includes('thời tiết ở')) {
        const location = handledText.split('ở')[1].trim();

        console.log('location', location);
        searchInput.value = location;
        const changeEvent = new Event('change');
        searchInput.dispatchEvent(changeEvent);
        return;
    }
    const container = document.querySelector('.container');
    if (handledText.includes('đổi màu nền')) {
        const color = handledText.split('màu nền')[1].trim();
        container.style.background = color;
        return;
    }

    if (handledText.includes('màu nền mặc định')) {
        container.style.background = '';
        return;
    }

    speak('Try again');
}

microphone.addEventListener('click', (e) => {
    e.preventDefault();

    recognition.start();
    microphone.classList.add('recording');
});

recognition.onspeechend = () => {
    recognition.stop();
    microphone.classList.remove('recording');
}

recognition.onerror = (err) => {
    console.error(err);
    microphone.classList.remove('recording');
}

recognition.onresult = (e) => {
    console.log('onresult', e);
    const text = e.results[0][0].transcript;
    handleVoice(text);
}