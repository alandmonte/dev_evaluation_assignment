import React, {Component} from 'react';
import './App.css';
import CountryDetails from './Components/CountryDetails/';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: "",
      countryInfo: null,
      error: null
    }
  }

  handleChange = (e) => {
    this.setState({country: e.target.value})
  }
  
  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({error: null})
    this.fetchCountries()
  }
  
  async fetchCountries(){
    const response = await fetch("https://restcountries.eu/rest/v2/name/"+this.state.country)
    const responseData = await(response.json())
    if(response.status === 200) {
      this.setState({countryInfo: responseData})
    } else {
      this.setState({error: responseData.message})
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Country Weather</p>
        </header>
        {this.state.countryInfo && this.state.countryInfo.length > 0 ? 
          this.state.countryInfo.map((item, index) => {
            return (
              <CountryDetails countryInfo={item} />
            )
          })
            : <form onSubmit={this.handleSubmit}>
          <label>
            Country:
            <input type="text" placeholder="Enter Country" value={this.state.country} onChange={this.handleChange} />
          </label>
          <input type="submit" disabled={this.state.country.length < 3} value="Submit" />
          {this.state.error ? <div>{this.state.error}</div> : null}
        </form>}
      </div>
    );
  }
}

export default App;
