import React from 'react';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import {Parser} from 'html-to-react';

import {
  getCorp,
  getStation,
  getSystem,
  getCorpIcon,
  getCorpHistory,
  getFaction,
  getCharacter,
  getBloodline,
  getAncestry,
  getRace,
  getAlliance,
  getPortrait,
} 
from './PublicAPI';

class Corporation extends React.Component {
  constructor(props) {
    super(props);
    this.htmlToReactParser = new Parser();
    this.state = {
      corp: undefined, 
      corp_home_station: undefined,
      corp_home_station_owner: undefined,
      corp_home_station_system: undefined,
      corp_home_station_race: undefined,
      corp_icon: undefined,
      corp_history: undefined,
      corp_faction_id: undefined,
      corp_creator: undefined,
      corp_ceo: undefined,
      corp_ceo_bloodline: undefined,
      corp_ceo_bloodline_corporation: undefined,
      corp_ceo_ancestry: undefined,
      corp_ceo_race: undefined,
      corp_creator_bloodline: undefined,
      corp_creator_bloodline_corporation: undefined,
      corp_creator_ancestry: undefined,
      corp_creator_race: undefined,
    };
    // this.scoutForCorporation(this.props.id);
  }

  async scoutForCorporation(corporation_id = '98648528') {
    const intelligenceCorp = async (id = '98648528') => {
      var corp =  {}
      corp = await getCorp(corporation_id);
      // console.log(corp)
      corp.date_founded = new Date(corp.date_founded).toLocaleString();
      corp.alliance = await getAlliance(corp.alliance_id);
      corp.description = this.htmlToReactParser.parse(corp.description)
      corp.home_station = await getStation(corp.home_station_id);
      corp.home_station_owner = await getCorp(corp.home_station.owner)
      corp.home_station_system = await getSystem(corp.home_station.system_id)
      corp.home_station_race = await getRace(corp.home_station.race_id);
      corp.icon = await getCorpIcon(corp.corporation_id);
      corp.history = await getCorpHistory(corp.corporation_id);
      function compareHistory( a, b ) {
        if ( a.record_id < b.record_id ){
          return -1;
        }
        if ( a.record_id > b.record_id ){
          return 1;
        }
        return 0;
      }
      corp.history.history = corp.history.history.sort( compareHistory );
      corp.history.corp_alliances = corp.history.history.map(historyItem => {
        if (historyItem.alliance_id) {
          var alliance = getAlliance(historyItem.alliance_id);
          historyItem.start_date = new Date(historyItem.start_date).toLocaleString();
          //TODO: elaborate on alliance
          historyItem.alliance_name = alliance.name
          return historyItem;
        } else {
          historyItem.alliance_name = null;
          historyItem.start_date = new Date(historyItem.start_date).toLocaleString();
          return historyItem;
        }
      })
      if (corp.faction_id != null) {
        corp.faction = await getFaction(corp.faction_id);
      }
      corp.creator = await getCharacter(corp.creator_id);
      corp.ceo = await getCharacter(corp.ceo_id);
      corp.ceo.description = this.htmlToReactParser.parse(corp.ceo.description);
      corp.ceo.birthday = new Date(corp.ceo.birthday).toLocaleString()
      corp.ceo.bloodline = await getBloodline(corp.ceo.bloodline_id);
      corp.ceo.bloodline_corporation = await getCorp(corp.ceo.bloodline.corporation_id);
      corp.ceo.ancestry = await getAncestry(corp.ceo.ancestry_id);
      corp.ceo.race = await getRace(corp.ceo.race_id);
      corp.ceo.portrait = await getPortrait(corp.ceo.character_id);
      if (corp.ceo.character_id != corp.creator.character_id) {
        corp.creator.birthday = new Date(corp.creator.birthday).toLocaleString();
        corp.creator.description = this.htmlToReactParser.parse(corp.creator.description);
        corp.creator.bloodline = await getBloodline(corp.creator.bloodline_id);
        corp.creator.bloodline_corporation = await getCorp(corp.creator.bloodline.corporation_id);
        corp.creator.ancestry = await getAncestry(corp.creator.ancestry_id);
        corp.creator.race = await getRace(corp.creator.race_id);
        corp.creator.portrait = await getPortrait(corp.creator.character_id);
      }
      
      // console.log(corp.home_station);
      return corp
    }
    intelligenceCorp(this.props.id)
      .then(corp => {
        // console.log('here I am')
        // console.log(corp)
        this.setState({
          corp,
        })
        // console.log(this.state)
      })
  }

  componentDidMount() {
    this.scoutForCorporation(this.props.id);
  }

  render() {
    var corporation = {
      home_station: {},
      creator: {
        ancestry: {},
        bloodline: {},
        bloodline_corporation: {},
        race: {},
        portrait: {},
      },
      ceo: {
        ancestry: {},
        bloodline: {},
        bloodline_corporation: {},
        race: {},
        portrait: {},
      },
      alliance: {},
      icon: {},
      history: {
        history: [{}],
      },
    };
    var ceo_match_creator = false;
    var history = undefined;
    if (this.state.corp) {
      corporation = this.state.corp;
      if (corporation.ceo.character_id == corporation.creator.character_id) {
        ceo_match_creator = true;
      }
      history = corporation.history.corp_alliances.map((historyItem) => {
        if (historyItem.alliance_name) {
          return <li key={historyItem.record_id.toString()}>Mamber of {historyItem.alliance_name} since {historyItem.start_date}.</li>
        } else {
          return <li key={historyItem.record_id.toString()}>Seeks to join any of Tha Cartel since {historyItem.start_date}.</li>
        }
      });
    }
    return (
      <Container>
        <h2>
          {corporation.name} <br />
          <small>{corporation.home_station.name}</small>
        </h2>
        <Image src={corporation.icon.px256x256}></Image>
        <p className='inGameDescription'>
          { corporation.description }
        </p>
        <p className='intelligence'>
          { corporation.member_count} capsuleers under the CEO { corporation.ceo.name } founded by { corporation.creator.name }, since { corporation.date_founded } flying under 
          ticker <code>[{ corporation.ticker }]</code> and sharing { corporation.tax_rate * 100 }% tax 
          , {corporation.shares} shares
          and available on the internet under the link <a href={corporation.url} target="corpration">here</a>.
        </p>

        { !ceo_match_creator &&
          <Container>
            <h3>Founder - { corporation.creator.name }</h3>
            <Image src={corporation.creator.portrait.px256x256}></Image>
            <p className='inGameDescription'>
              <br /><br />
              { corporation.creator.description }
            </p> 
            <p className='intelligence'>
              <b>b</b>rief overview: <br /><br />
              Born { corporation.creator.birthday } , under the star of { corporation.creator.ancestry.name }&nbsp;
              who present themselves as <i>{ corporation.creator.ancestry.description }</i><br /> <br />
              Who inherited such strong attributes as charisma { corporation.creator.bloodline.charisma },
              intelligence { corporation.creator.bloodline.intelligence }, memory {corporation.creator.bloodline.memory},
              perception { corporation.creator.bloodline.perception } and willpower { corporation.creator.bloodline.willpower }. <br /><br />
              Brave to wear the name of { corporation.creator.bloodline.name }.&nbsp; { corporation.creator.bloodline.description }<br /><br />
              Started capsuleer career in { corporation.creator.bloodline_corporation.name }.&nbsp; { corporation.creator.bloodline_corporation.description }<br /><br />
              Proudly being a part of { corporation.creator.race.name }. <i>{ corporation.creator.race.description }</i> <br /><br />Marking a point of security status <u>{ corporation.creator.security_status }</u>.   
            </p>
          </Container>
        }
          <Container>
            <h3>CEO {ceo_match_creator && <span>& founder</span>}- { corporation.ceo.name }</h3> 
            <Image src={corporation.ceo.portrait.px256x256}></Image>
            <p className='inGameDescription'>
              <b>i</b>n-game description: <br />
              { corporation.ceo.description }
            </p>
            <p className='intelligence'>
              <b>b</b>rief overview: <br /><br />
              Born to rule since day one - { corporation.ceo.birthday }, blessed by the mist of { corporation.ceo.ancestry.name }&nbsp;
              who possess traits - <i>{ corporation.ceo.ancestry.description }</i> While in vains flow
              charisma { corporation.ceo.bloodline.charisma }, intelligence { corporation.ceo.bloodline.intelligence },
              memory { corporation.ceo.bloodline.memory }, perception { corporation.ceo.bloodline.perception } and
              willpower { corporation.ceo.bloodline.willpower }. <br /><br /> Attached to the name of { corporation.ceo.bloodline.name }.&nbsp;
              { corporation.ceo.bloodline.description } <br /><br />Encapsuleted to firt ship under the hood of { corporation.ceo.bloodline_corporation.name }.&nbsp;
              { corporation.ceo.bloodline_corporation.description } <br /><br />Eagerly known as the { corporation.ceo.race.name }.&nbsp;
              <i>{ corporation.ceo.race.description }</i><br /><br /> Managing security status at will, currently on level <u>{ corporation.ceo.security_status }</u>.
            </p>
          </Container>
        <Container>
          <h3>Alliance intel</h3>
          {corporation.alliance_id && 
            <p className='intelligence'>
              <span>* Supporting <i>{corporation.alliance.name}</i> coalition.</span>
            </p>
          }
          {!corporation.alliance_id &&
            <p className='intelligence'>
              <span>- Currently not in any <s>alliance</s>.</span>
            </p>
          }
          <span>Corporation affiliation history</span>
          <ol>
            { history }
          </ol>
        </Container>


      </Container>
    );
  }
}

export default Corporation;