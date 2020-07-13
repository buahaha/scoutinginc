import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

import {Parser} from 'html-to-react';

import TweetEmbed from 'react-tweet-embed';

import Corporation from './Corporation';

class App extends React.Component {
  constructor(props) {
    super(props);
    // this.handleChange = this.handleChange.bind(this);
    this.htmlToReactParser = new Parser();
    this.state = {

    };
  }

  // handleChange(e) {
  //   this.setState({temperature: e.target.value});
  // }

  // async scoutForAlliance(alliance_id = '498125261') {
  //   const alliance = await this.getAlliance(alliance_id);
  //   const alliance_icon = await this.getAllianceIcon(alliance.alliance_id);
  //   const alliance_members_list = await this.getAllianceCorps(alliance.alliance_id);
  //   // const alliance_members = await alliance_members_list.forEach(async corp => {
  //   //   return await this.scoutForCorporation(corp);
  //   // });  chack if OK?
  //   const alliance_creator = await this.getCharacter(alliance.creator_id);
  //   const alliance_creator_corporation = await this.getCorp(alliance.creator_corporation_id);
  //   const alliance_executor_corporation = await this.getCorp(alliance.executor_corporation_id);
  // }

  componentDidMount() {
    // this.scoutForCorporation();
  }
   
  render() {
    // console.log(this.state.corp);
    // const temperature = this.state.callSign;
    // // console.log(temperature)
    // const corp_desc = this.state.corp_description;
    // const ceo_desc = this.state.ceo_description;
    // // const ceo_desc = 
    // const ceo = this.state.ceo;
    // const date_founded = new Date(temperature.date_founded).toLocaleString();
    return (
      <Container className="App" bg='light'>
        <Container>
          <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Welcome to <code>Scouting Inc</code> corporation.
              </p>
              <h1 className='headerWhite'> 
                Where the journey begins...
              </h1>
              <h1 className='headerRed'>
                Where mistakes are forgiven...
              </h1>
          </header>  
        </Container>
        <Container id="content">

          <article>
            <Container>
              <Container>
                <Row>
                  <Col md="auto">
                    <Container id="tweet">
                      <TweetEmbed id="1279402833310175232" />
                    </Container>
                  </Col>
                  <Col md="auto">
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
                        Scouting (test, please ignore)
                      </Button>
                    </Form>
                  </Col>
                </Row>
              </Container>
              <Container>
                <Row>
                  <Col>
                  
                    <Corporation id='98648528' />
                    
                  </Col>
                </Row>
              </Container>
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
                      TOSCN <span>😇</span> &nbsp;friendly industrialists and explorers
                    </a>
                    <br />
                    <a
                      className="App-link"
                      href="https://neosb.herokuapp.com"
                      target="_neosb"
                      
                      >
                      Neosb 🎶 &nbsp;the aspiring electronic musician 
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
                      EVE Online 🚑 &nbsp;Support 
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
