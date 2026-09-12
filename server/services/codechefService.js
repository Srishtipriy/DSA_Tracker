const axios = require("axios");

const fetchCodechefStats = async (username) => {
  try {
    // Placeholder until we integrate a reliable CodeChef data source
    return {
      username,
      rating: 0,
      highestRating: 0,
      stars: 0,
      globalRank: 0,
      countryRank: 0,
      problemsSolved: 0,
    };
  } catch (error) {
    return null;
  }
};

module.exports = {
  fetchCodechefStats,
};
