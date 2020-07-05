import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

import TweetEmbed from 'react-tweet-embed';

class App extends React.Component {
  constructor(props) {
    super(props);
    // this.handleChange = this.handleChange.bind(this);
    this.state = {callSign: ''};
  }

  // handleChange(e) {
  //   this.setState({temperature: e.target.value});
  // }

  async pronuncedAtCourt() {
    await axios.get('/public/')
    .then((response) => {
      // handle success
      console.log(response);
      this.setState({callSign: response.data});
    })
    .catch((error) => {
      // handle error
      console.log(error);
    })
    .finally(() => {
      console.log('prononced at court')
    });
    
  }

  componentDidMount() {
    this.pronuncedAtCourt();
  }

  render() {
    const temperature = this.state.callSign;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Welcome to <code>Scouting Inc</code> corporation.
          </p>
          <p dangerouslySetInnerHTML={{__html: temperature.description}}>
            {/* {temperature.description} */}
          </p>
          <p>
            {temperature.ceo_id}
            {/* {temperature} */}
          </p>
          <TweetEmbed id="1279402833310175232" />

          <a
            className="App-link"
            href="https://toscn.herokuapp.com"
            target="_toscn"
            rel="noopener noreferrer"
          >
            TOSCN 😇 friendly industrialists and explorers
          </a>
          <a
            href="https://neosb.herokuapp.com"
            target="_neosb"

          >
            Neosb 🎶 the aspiring electronic musician 
          </a>
          <a
            href="https://wiki.eveuniversity.org/"
            target="_uniwiki"
          >
            UNIWIKI 📗
          </a>
          <a
            href="https://support.eveonline.com/hc/en-us"
            target="_support"
          >
            EVE Online 🚑 Support 
          </a>
        </header>
        <footer>

        </footer>
      </div>
    );
  }
}

export default App;
