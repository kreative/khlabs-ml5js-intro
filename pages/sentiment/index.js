import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import TitleCard from "../../components/TitleCard";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [topic, setTopic] = useState("");
  const [data, setData] = useState({});

  const checkTheFeels = async (encodedTopic) => {
    try {
      const res = await axios.get(`/api/sentiment?topic=${encodedTopic}`, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(res.data.data);
      setData(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log("Whoops... something went wrong!! (level 1)");
      console.log(error);
    }
  };

  useEffect(() => {
    const encodedTopic = window.location.href.split("=")[1];
    setTopic(decodeURI(encodedTopic));
    checkTheFeels(encodedTopic);
  }, []);

  return (
    <div className={"max-w-5xl m-auto"}>
      <h1 className={"py-12 text-4xl text-center font-bold"}>
        Here&apos;s the sentiment about &apos;{topic}&apos;...
      </h1>
      {loading && (
        <p className={"text-md text-gray-500 text-center"}>
          Checking on all the feels for the {topic}...
        </p>
      )}
      {!loading && (
        <div>
          <div>
            <h2
              className={"text-4xl font-bold text-center mb-4 text-purple-800"}
            >
              {data.total.sentiment}
            </h2>
            <p className={"text-center text-gray-600 pb-4"}>
              ({data.total.score})
            </p>
            <div className={"text-center pb-8"}>
              <Link
                className={
                  "text-purple-500 hover:text-purple-700 underline text-base"
                }
                href="/"
              >
                Try another topic
              </Link>
            </div>
          </div>
          <div>
            <h2 className={"text-2xl font-bold text-center mb-4 text-gray-800"}>
              Here are the news titles...
            </h2>
            <ul
              role="list"
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {data &&
                data.titles.map((title) => {
                  return (
                    <TitleCard
                      key={title.title}
                      title={title.title}
                      score={title.score}
                      message={title.message}
                    />
                  );
                })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
