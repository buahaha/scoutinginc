import axios from 'axios';

const getCorp = async (id) => {
  const result = await axios('/public/corporations/' + id);
  return result.data;
}

const getStation = async (id) => {
  const result = await axios('/public/stations/' + id);
  return result.data;
}

const getSystem = async (id) => {
  const result = await axios('/public/systems/' + id);
  return result.data;
}

const getCorpIcon = async (id) => {
  const result = await axios('/public/corporations/' + id + '/icons');
  return result.data;
}

const getCorpHistory = async (id) => {
  const result = await axios('/public/corporations/' + id + '/alliancehistory');
  return result.data;
}

const getFaction = async (id) => {
  const result = await axios('/public/factions/' + id);
  return result.data;
}

const getCharacter = async (id) => {
  const result = await axios('/public/characters/' + id);
  return result.data;
}

const getBloodline = async (id) => {
  const result = await axios('/public/bloodlines/' + id);
  return result.data;
}

const getAncestry = async (id) => {
  const result = await axios('/public/ancestries/' + id);
  return result.data;
}

const getRace = async (id) => {
  const result = await axios('/public/races/' + id);
  return result.data;
}

const getAlliance = async (id) => {
  const result = await axios('/public/alliances/' + id)
    .catch(error => {
      console.warn(error);
      return undefined;
    })
  if (!result) {
    return undefined;
  }
  return result.data;
}

const getPortrait = async (id) => {
  const result = await axios('/public/characters/' + id + '/portrait');
  return result.data;
}

export {
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