// hook
import { useUserInput } from "./hooks/useUserInput";

function App() {
  const {
    userInput,
    isLoading,
    isError,
    error,
    sentiment,
    handleChange,
    handleReset,
    handleSubmit,
  } = useUserInput();

  return (
    <div className="flex flex-col h-[100vh] w-1/2 m-auto">
      <div className="text-center text-2xl pt-4">
        Sentiment Analyzer{" "}
        <span className="text-[16px] ml-[-4px] font-bold text-white bg-gray-300 rounded-full py-1 px-3 align-top relative group cursor-pointer">
          ?
          <span
            className="absolute text-black w-[300px] text-left bg-white p-2 rounded-lg shadow-lg font-normal opacity-0 group-hover:opacity-100"
            style={{ zIndex: 9 }}
          >
            <b>Sentiment Analyzer</b> is a powerful tool that helps you quickly
            assess the emotional tone of any text. Whether you're analyzing
            customer reviews, social media posts, or feedback, our app
            classifies sentiment into{" "}
            <span className="font-bold underline">
              <span className="text-green-500">positive</span>,{" "}
              <span className="text-red-500">negative</span>, or{" "}
              <span className="text-gray-500">neutral</span>
            </span>{" "}
            categories, giving you valuable insights into public opinion and
            emotional responses. Perfect for businesses, marketers, and content
            creators looking to understand and engage with their audience more
            effectively.
          </span>
        </span>
      </div>
      {isError && (
        <div className="m-4 text-red-500">{(error as Error).message}</div>
      )}
      <div className="m-4 flex flex-col">
        <textarea
          className="border border-2 p-2 rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-700"
          placeholder="Enter text here..."
          value={userInput}
          disabled={sentiment !== ""}
          onChange={handleChange}
        />
        {sentiment === "" ? (
          <button
            className={`mt-2 p-2 bg-blue-500 rounded text-white font-bold disabled:opacity-50 cursor-pointer`}
            onClick={handleSubmit}
            disabled={!userInput}
          >
            {isLoading ? "Processing...." : "Submit"}
          </button>
        ) : (
          <button
            className={`mt-2 p-2 bg-white-500 border rounded text-black font-bold disabled:opacity-50 cursor-pointer`}
            onClick={handleReset}
          >
            {"Try Again"}
          </button>
        )}
        {sentiment && (
          <div
            className={`${
              sentiment === "Positive"
                ? "bg-green-500"
                : sentiment === "Negative"
                ? "bg-red-500"
                : "bg-grey-500"
            }
            p-2 text-white text-center w-full mt-4 rounded text-xl`}
          >
            The sentiment is <b>{sentiment}</b>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
