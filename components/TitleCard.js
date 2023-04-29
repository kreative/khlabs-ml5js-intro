export default function TitleCard(props) {
  return (
    <div className={"text-center p-8 border border-gray-300 rounded-md"}>
      <h1 className={"text-lg font-bold"}>{props.title}</h1>
      <p className={"mb-4"}>Score: {props.score}</p>
      <div>
        <span
          className={
            "p-2 text-blue-600 bg-blue-200 text-md font-medium rounded-lg"
          }
        >
          {props.message}
        </span>
      </div>
    </div>
  );
}
