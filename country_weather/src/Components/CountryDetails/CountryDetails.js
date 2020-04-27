import React, {Component} from 'react';
import "./CountryDetails.css"

class CountryDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherInfo: null,
      error: null
    }
  }

  async getWeather(capital) {
    const response = await fetch("http://api.weatherstack.com/current?access_key=af7f4aa894abeeccaf72e1c7654e4de9&query="+capital)
    const responseData = await(response.json())
    console.log(responseData)
    if(response.status === 200) {
      this.setState({
        weatherInfo: responseData,
        error: null
      })
    } else {
      this.setState({error: responseData.message})
    }
  }

  render() {
      const {name, capital, population, latlng, flag} = this.props.countryInfo
    return (
      <div className="country-details">
        <div>Name: <span>{name}</span></div>
        <div>Capital: <span>{capital}</span></div>
        <div>Population: <span>{population}</span></div>
        <div>Coordinates: <span>{latlng[0] + "," + latlng[1]}</span></div>
        <div>Flag: <img src={flag} className="Counry-Flag" alt="Flag" /></div>
        <button onClick={() => this.getWeather(capital)}>Capital Weather</button>
        { this.state.weatherInfo ? <div>
          <div>Temperature: <span>{this.state.weatherInfo.current.temperature}</span></div>
          <div>Weather Icons: <img src={this.state.weatherInfo.current.weather_icons[0]} className="Counry-Flag" alt="Icon" /></div>
          <div>Wind Speed: <span>{this.state.weatherInfo.current.wind_speed}</span></div>
          <div>Precip: <span>{this.state.weatherInfo.current.precip}</span></div>
        </div>: <div>{this.state.error}</div>}
      </div>
    )
  }
}

export default CountryDetails;