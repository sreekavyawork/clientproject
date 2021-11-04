import React, { Component } from 'react';
import { Input, Image } from 'semantic-ui-react';
import _ from 'lodash';
import './App.css';

class App extends Component {
  state = {
    users: [],
    weather: {},
    err: {},
    reviews: {},
  }

  componentDidMount() {
    fetch(`/review`)
      .then(res => res.json())
      .then(response => this.setState({
        reviews: response,
      })
      )
      .catch((err) => {
        this.setState({ err: _.get(err, 'name', '') })
      })

    fetch(`/weather?city=London`)
      .then(res => res.json())
      .then(weather => this.setState({
        weather: {
          city: weather.name,
          wind: weather.wind,
          visibility: weather.visibility,
          temperature: weather.main,
          weatherInfo: weather.weather,
        }
      })
      )
      .catch((err) => {
        this.setState({ err: _.get(err, 'name', '') })
      })

  }

  fetchWeather = (city) => {
    fetch(`/weather?city=London`)
      .then(res => res.json())
      .then(weather => this.setState({
        weather: {
          city: weather.name,
          wind: weather.wind,
          visibility: weather.visibility,
          temperature: weather.main,
          weatherInfo: weather.weather,
        }
      })
      )
      .catch((err) => {
        this.setState({ err: _.get(err, 'name', '') })
      })

  }

  fetchReviews = (businessId) => {
    //four-barrel-coffee-san-francisco
    fetch(`/review`)
      .then(res => res.json())
      .then(response => this.setState({
        reviews: response,
      })
      )
      .catch((err) => {
        this.setState({ err: _.get(err, 'name', '') })
      })

  }

  onChange = (category, list) => {
    switch (category) {
      case 'Weather':
        // if (list.length) {
        //   this.fetchWeather(list);
        // }

        break;
    }
  }

  render() {
    console.log('this.statee', this.state);
    const weather = _.get(this.state, 'weather', {});
    const error = _.get(this.state, 'error.name', '');
    const reviews = _.get(this.state, 'reviews', {});

    return (
      <div className="App">

        <div className="weather">

          <h1>Weather</h1>
          <table style={{ width: '100%' }}>
            <tbody>
              <tr>
                <td> City Name</td>
                <td>{_.get(weather, 'city', 'Not Available')}</td>
              </tr>
              <tr>
                <td> Temperature </td>
                <td>{_.get(weather, 'temperature.feels_like', 'Not Available')}</td>
                <td>{_.get(weather, 'temperature.humidity', 'Not Available')}</td>
                <td>{_.get(weather, 'temperature.pressure', 'Not Available')}</td>
                <td>{_.get(weather, 'temperature.temp', 'Not Available')}</td>


              </tr>
              <tr>
                <td>  Description </td>
                <td>{_.get(weather, 'temperature.weatherInfo[0].description', 'Not Available')}</td>

              </tr>
              <tr>
                <td> Wind Speed </td>
                <td> {_.get(weather, 'temperature.wind.speed', 'Not Available')}</td>
              </tr>
            </tbody>

          </table>


        </div>
        <div className="reviews">
          <h1> Review Details for Gary Danko's Restaurant at San Fransisco </h1>
          <table style={{ width: '100%' }}>
            <thead>
              <th> Name </th>
              <th> Image </th>

              <th>Review</th>
              <th>Rating</th>
            </thead>
            <tbody>
              {


                _.map(reviews, (review) => {
                  return (
                    <tr>
                      <td>{_.get(review, 'user.name')}</td>
                      <td>
                        <Image src={_.get(review, 'user.image_url')} size="mini" />
                      </td>
                      <td>{_.get(review, 'text', '')}</td>
                      <td>{_.get(review, 'rating', '')}</td>
                    </tr>
                  )
                })

              }

            </tbody>


          </table>


        </div>

      </div>
    );
  }
}

export default App;