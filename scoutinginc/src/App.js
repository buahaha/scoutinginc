import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
// var HtmlToReactParser = require('html-to-react').Parser;
import {Parser} from 'html-to-react';
// import HtmlToReact from 'html-to-react';

import TweetEmbed from 'react-tweet-embed';

class App extends React.Component {
  constructor(props) {
    super(props);
    // this.handleChange = this.handleChange.bind(this);
    this.htmlToReactParser = new Parser();
    this.state = {
      callSign: '',
      ceo: '',
      corp_description: '',
      ceo_description: '',
    };
  }

  // handleChange(e) {
  //   this.setState({temperature: e.target.value});
  // }

  async pronuncedAtCourt() {
    await axios.get('/public')
      .then((response) => {

        var corp_desc = response.data.description;
        var corporation_description = this.htmlToReactParser.parse(corp_desc);
        var ceo_desc = response.data.ceo.description;
        var ceo_description = this.htmlToReactParser.parse(ceo_desc);
        this.setState({
          callSign: response.data, 
          ceo: response.data.ceo,
          corp_description: corporation_description,
          ceo_description: ceo_description,
        });
      })
        .catch((error) => {
          // handle error
          console.log(error);
        })
          .finally(() => {
            console.log('pronounced at court')
          });
    
  }

  componentDidMount() {
    this.pronuncedAtCourt();
  }
   
  render() {
    const temperature = this.state.callSign;
    const corp_desc = this.state.corp_description;
    const ceo_desc = this.state.ceo_description;
    // const ceo_desc = 
    const ceo = this.state.ceo;
    const date_founded = new Date(temperature.date_founded).toLocaleString();
    return (
      <Container className="App" bg='light'>
        <Container>
          <header className="App-header">
            {/* <Jumbotron> */}
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Welcome to <code>Scouting Inc</code> corporation.
              </p>
              <h1 className='corpDescription'> 
                { corp_desc}
              </h1>
            {/* </Jumbotron> */}
          </header>  
        </Container>
        <Container id="content">

          <article>
            <Container fluid>
              <Row>
                <Row>
                  <Col>
                  
                    <Container id="tweet">
                      <TweetEmbed id="1279402833310175232" />
                    </Container>
                  </Col>
                  <Col>
                    <p >
                      { temperature.member_count} players under the rule of { ceo.name } commonly 
                      pronounced as the CEO, since { date_founded } flying under 
                      ticker [{ temperature.ticker }] and sharing { temperature.tax_rate * 100 }% tax.
                    </p>
                    <p className='inGameDescription'>
                      { ceo_desc }
                    </p>
                  </Col>
                </Row>
                <Row>
                
                </Row>
              </Row>
            </Container>
          </article>
            <Container fluid>
              <Row>
                <Col>
                
                  <p>

                    <a
                      className="App-link"
                      href="https://toscn.herokuapp.com"
                      target="_toscn"
                      rel="noopener noreferrer"
                      >
                      TOSCN 😇 friendly industrialists and explorers
                    </a>
                    <br />
                    <a
                      className="App-link"
                      href="https://neosb.herokuapp.com"
                      target="_neosb"
                      
                      >
                      Neosb 🎶 the aspiring electronic musician 
                    </a>
                    <br />
                    <a
                      className="App-link"
                      href="https://wiki.eveuniversity.org/"
                      target="_uniwiki"
                      >
                      UNIWIKI 📗
                    </a>
                    <br />
                    <a
                      className="App-link"
                      href="https://support.eveonline.com/hc/en-us"
                      target="_support"
                      >
                      EVE Online 🚑 Support 
                    </a>
                  </p>
                </Col>
              </Row>
            </Container>
        </Container>
        <footer>

        </footer>
      </Container>
    );
  }
}

export default App;
