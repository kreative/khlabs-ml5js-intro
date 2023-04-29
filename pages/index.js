import Input from "@/components/Input";
import { Inter } from "next/font/google";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className={"flex flex-col min-h-screen justify-between"}>
      <main className="flex flex-col items-center p-24">
        <ChatBubbleBottomCenterTextIcon className={"h-12 w-12"} />
        <h1 className={"pt-6 pb-2 text-4xl text-center font-bold"}>
          News Sentiment Analyzer by Guppy
        </h1>
        <h2 className={"pb-12 text-xl text-center font-base text-gray-500"}>
          Let&apos;s see what the world thinks about your topic!
        </h2>
        <div className={"w-2/3 md:w-1/2 lg:1/3"}>
          <Input />
        </div>
      </main>
      <footer className={"py-4"}>
        <p className={"text-sm text-gray-400 text-center"}>
          Started with Kreative Horizon Labs ADD LOGO HERE
        </p>
      </footer>
    </div>
  );
}
