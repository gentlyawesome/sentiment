// react
import { useState } from "react";

// api
import processSentiment from "../api/processSentiment";

// react-query
import { useMutation } from "react-query";

export const useUserInput = () => {
  const [userInput, setUserInput] = useState<string>("");
  const [sentiment, setSentiment] = useState<string>("");

  const { mutate, isLoading, isError, error } = useMutation(
    (input: string) => processSentiment(input),
    {
      onSuccess: (data) => {
        setSentiment(data.message);
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );

  const handleChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async () => {
    mutate(userInput);
  };

  const handleReset = async () => {
    setUserInput("");
    setSentiment("");
  };

  return {
    handleSubmit,
    handleChange,
    handleReset,
    userInput,
    isLoading,
    isError,
    error,
    sentiment,
  };
};
