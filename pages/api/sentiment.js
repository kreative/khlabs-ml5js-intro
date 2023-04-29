import natural from "natural";
import NewsAPI from "newsapi";

const newsapi = new NewsAPI(process.env.NEWS_API_KEY);
const Analyzer = natural.SentimentAnalyzer;
const analyzer = new Analyzer("English", natural.PorterStemmer, "afinn");

const getArticles = async (topic) => {
  const response = await newsapi.v2.everything({
    q: topic,
    language: "en",
    sortBy: "relevancy",
  });
  return response.articles;
};

const getScoreMessage = (score) => {
  if (score <= 0.1) {
    return "Very Negative";
  } else if (score > 0.1 && score < 0.4) {
    return "Negative";
  } else if (score >= 0.4 && score < 0.6) {
    return "Neutral";
  } else if (score >= 0.6 && score < 0.9) {
    return "Positive";
  } else {
    return "Very Positive";
  }
};

export default async function handler(req, res) {
  console.log("Sentiment analysis API started");

  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
  }

  const { topic } = req.query;
  const url = `https://newsapi.com/v2/everything?q=${topic}&apiKey=${process.env.NEWS_API_KEY}`;

  let totalScore = 0;
  let length = 0;
  let titles = [];

  const articles = await getArticles(topic);

  for (let i = 0; i < articles.length; i++) {
    const title = articles[i].title;
    const words = title.split(" ");
    const score = analyzer.getSentiment(words);
    const message = getScoreMessage(score);

    if (score > 0) {
      length += 1;
      totalScore += score;
      titles.push({
        title,
        score,
        message,
      });
    }
  }

  const averageScore = totalScore / articles.length;
  let sentiment = getScoreMessage(averageScore);

  res.status(200).json({
    status: 200,
    message: "Sentiment found",
    data: {
      titles,
      total: {
        score: averageScore,
        sentiment,
      },
    },
  });
}
