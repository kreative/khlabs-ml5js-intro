import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [topic, setTopic] = useState("");

  useEffect(() => {
    try {
      const encodedTopic = window.location.href.split("=")[1];
      const topic = decodeURI(encodedTopic);
      setTopic(topic);
      checkTheFeels(teamName);
    } catch (error) {
      console.log("Whoops... something went wrong!! (level 1)");
      console.log(error);
    }
  }, []);

  const checkTheFeels = async (teamName) => {
    try {
      const payload = {
        teamName,
      };
      const res = await axios.post("/api/team", JSON.stringify(payload), {
        headers: { "Content-Type": "application/json" },
      });
      setSentiment(res.data);
      setLoading(false);
    } catch (error) {
      console.log("Whoops... something went wrong!! (level 2)");
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className={"py-12 text-4xl text-center font-bold"}>
        Here&apos;s the sentiment about your team
      </h1>
      {loading && (
        <p className={"text-md text-gray-500 text-center"}>
          Checking on all the feels for the {teamName}...
        </p>
      )}
      {!loading && (
        <div>
          <Link
            className={"text-blue-500 hover:text-blue-700 underline text-base"}
            href="/"
          >
            Try another team
          </Link>
        </div>
      )}
    </div>
  );
}
