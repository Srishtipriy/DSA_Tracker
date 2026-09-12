const axios = require("axios");

const fetchLeetcodeStats = async (username) => {
  try {
    const query = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          username

          profile {
            ranking
          }

          submitStats {
            acSubmissionNum {
              difficulty
              count
            }
          }

          tagProblemCounts {
            fundamental {
              tagName
              problemsSolved
            }

            intermediate {
              tagName
              problemsSolved
            }

            advanced {
              tagName
              problemsSolved
            }
          }
        }
      }
    `;

    const response = await axios.post(
      "https://leetcode.com/graphql",
      {
        query,
        variables: {
          username,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const user = response.data.data.matchedUser;

    if (!user) {
      return null;
    }

    const stats = user.submitStats.acSubmissionNum;

    const topics = [
      ...(user.tagProblemCounts?.fundamental || []),
      ...(user.tagProblemCounts?.intermediate || []),
      ...(user.tagProblemCounts?.advanced || []),
    ].map((topic) => ({
      name: topic.tagName,
      solved: topic.problemsSolved,
      lastPracticed: new Date(),
    }));

    return {
      username: user.username,

      ranking: user.profile.ranking,

      totalSolved: stats[0].count,
      easySolved: stats[1].count,
      mediumSolved: stats[2].count,
      hardSolved: stats[3].count,

      topics,
    };
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

module.exports = {
  fetchLeetcodeStats,
};