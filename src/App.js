import React, {useState} from 'react';
import axios from "axios";

const API_URL = {
    key: '7bc7ccd10a6929cbb3b439fedf25e5f8',
    base: 'https://api.openweathermap.org/data/2.5/'
}

function App() {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const search = evl => {
        if (evl.key === 'Enter') {
            axios.get(`${API_URL.base}weather?q=${query}&units=metric&APPID=${API_URL.key}`)
                .then(result => {
                    setWeather(result.data);
                    setQuery('');
                    console.log(result);
                });
        }
    }

    const dateBuilder = (d) => {
        let months = ['January', 'February', 'March', 'April', 'May',
            'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`
    }
    return (
        <div className={(typeof weather.main != 'undefined')
            ? ((weather.main.temp > 16)
                ? 'app warm'
                : 'app')
            : 'app'}>
            <main>
                <div className={'search_box'}>
                    <input
                        type={'text'}
                        className={'search_bar'}
                        placeholder={'Search...'}
                        onChange={e => setQuery(e.target.value)}
                        value={query}
                        onKeyPress={search}
                    />
                </div>
                {(typeof weather.main != 'undefined') ? (
                    <div>
                        <div className={'location_box'}>
                            <div className={'location'}>{weather.name}, {weather.sys.country}</div>
                            <div className={'date'}>{dateBuilder(new Date())}</div>
                        </div>
                        <div className={'weather_box'}>
                            <div className={'temp'}>
                                {Math.round(weather.main.temp)}&deg;C
                            </div>
                            <div className={'weather'}>{weather.weather[0].main}</div>
                        </div>
                    </div>
                ) : ('')}
            </main>
        </div>
    )
}

export default App;