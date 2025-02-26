const MatchData = require('./matchData2024');
const MatchData2025 = require('./matchData2025');

const getMatchDataModelByYear = (year) => {
  switch (year) {
    case '2024':
      return MatchData;
    case '2025':
      return MatchData2025;
    default:
      throw new Error('Invalid year');
  }
};

module.exports = { getMatchDataModelByYear };