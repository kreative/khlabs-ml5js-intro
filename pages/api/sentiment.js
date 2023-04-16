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

export default async function handler(req, res) {
  console.log("Sentiment analysis API started");

  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
  }

  const { topic } = req.query;
  const url = `https://newsapi.com/v2/everything?q=${topic}&apiKey=${process.env.NEWS_API_KEY}`;

  let totalScore = 0;
  let length = 0;

  const articles = await getArticles(topic);

  for (let i = 0; i < articles.length; i++) {
    const title = articles[i].title;
    const words = title.split(" ");
    const score = analyzer.getSentiment(words);

    if (score > 0) length += 1;

    totalScore += score;
  }

  const averageScore = totalScore / articles.length;
  let sentiment = "";

  console.log(averageScore);

  if (averageScore <= 0.1) {
    sentiment = "Very Negative";
  } else if (averageScore > 0.1 && averageScore < 0.4) {
    sentiment = "Negative";
  } else if (averageScore >= 0.4 && averageScore < 0.6) {
    sentiment = "Neutral";
  } else if (averageScore >= 0.6 && averageScore < 0.9) {
    sentiment = "Positive";
  } else {
    sentiment = "Very Positive";
  }

  res.status(200).json({
    status: 200,
    message: "Sentiment found",
    data: {
      score: averageScore,
      sentiment,
    },
  });
}
