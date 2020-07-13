import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
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
    // console.log(temperature)
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
                <Col>
                
                  <Container id="tweet">
                    <TweetEmbed id="1279402833310175232" />
                  </Container>
                </Col>
                <Col>
                  <Form>
                    <Form.Group controlId="formBasicText">
                      <Form.Label>Search</Form.Label>
                      <Form.Control type="text" placeholder="Enter string" />
                      <Form.Text className="text-muted">
                        Search for entiety in New Eden
                      </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formCategory">
                      <Form.Control size="sm" as="select">
                        <option>corporation</option>
                      </Form.Control>
                      <Form.Text className="text-muted">
                        Choose category
                      </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Sucouting (test, please ignore)
                    </Button>
                  </Form>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h2>{ temperature.name }</h2>
                  <p className='intelligence'>
                    { temperature.member_count} capsuleers under the CEO { ceo.name } founded by { temperature.creator_id }, since { date_founded } flying under 
                    ticker <code>[{ temperature.ticker }]</code> and sharing { temperature.tax_rate * 100 }% tax 
                    with home station at {temperature.home_station_id}, {temperature.shares} shares
                    and available on the internet under the link <a href={temperature.url} target="corpration">here</a>.
                  </p>
                  <p className='inGameDescription'>
                    In-game description: <br />
                    { corp_desc }
                  </p>
                  <p className='inGameDescription'>
                    CEO's in-game description: <br />
                    { ceo_desc }
                  </p>
                </Col>
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
