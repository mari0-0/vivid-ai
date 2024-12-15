"use client";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { AudioLines, MessageCircle, Mic, Send, X } from "lucide-react";
import useSpeechRecognition from "@/hooks/speechRecognition";
import { useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

const ChatUI = () => {
	const [chatHistory, setChatHistory] = useState([]); // Store the chat history
	const [inputValue, setInputValue] = useState(""); // Store the user input value
	const [processedTranscript, setProcessedTranscript] = useState(""); // Store the processed transcript
	const [loading, setLoading] = useState(false); // Track loading state
	const { transcript, listening, startListening, stopListening } =
		useSpeechRecognition({ lang: "en-US", silenceTimeout: 3000 });

	useEffect(() => {
		if (transcript && transcript !== processedTranscript) {
			// Append only the new portion of the transcript
			const newTranscript = transcript.slice(processedTranscript.length);
			setInputValue((prev) => prev + newTranscript);
			setProcessedTranscript(transcript); // Update processed transcript
		}
	}, [transcript, processedTranscript]);

	const handleToggleListening = () => {
		if (listening) {
			stopListening();
		} else {
			startListening();
		}
	};

	const handleInputChange = (e) => {
		setInputValue(e.target.value); // Allow manual input by the user
	};

	const handleSendMessage = async () => {
		setLoading(true);
		console.log("SENDING MESSAGE");
		console.log(inputValue);
		if (!inputValue || inputValue.trim() === "") {
			setLoading(false);
			return;
		}

		// Add user input to chat history
		setChatHistory((prevHistory) => [
			...prevHistory,
			{
				role: "user",
				parts: [
					{
						text: inputValue,
					},
				],
			},
		]);

		try {
			const res = await fetch("/api/chatbot", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					message: inputValue,
					tone: "Calm",
					history: chatHistory,
				}),
			});

			const data = await res.json();
			console.log("data", data);

			// Add chatbot response to chat history
			setChatHistory((prevHistory) => [
				...prevHistory,
				{
					role: "model",
					parts: [
						{
							text: data.chatbotMessage,
						},
					],
				},
			]);
		} catch (error) {
			console.error("Error:", error);
			setChatHistory((prevHistory) => [
				...prevHistory,
				{
					role: "model",
					parts: [
						{
							text: "An error occurred while processing your request.",
						},
					],
				},
			]);
		}
		setLoading(false);
		setInputValue(""); // Clear input after sending
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault(); // Prevent new line on Enter key press
			handleSendMessage(); // Call the send message function
		}
	};

	return (
		<div className="w-full h-full flex flex-col justify-center items-center ">
			<ScrollArea className="w-[70%] h-[90%] pb-4">
				<div className="w-full h-full flex justify-end items-end flex-col gap-6">
					{chatHistory.map((message, index) => (
						<ChatBubble key={index} variant={message.role}>
							{message.parts[0].text}
						</ChatBubble>
					))}

					{loading && (
						<ChatBubble variant="model">
							<div className="flex items-center gap-2">
								<div className="w-3 h-3 bg-zinc-300 dark:bg-zinc-700 rounded-full animate-ping" />
								<span>Thinking...</span>
							</div>
						</ChatBubble>
					)}
				</div>
				<ScrollBar />
			</ScrollArea>

			<div className="w-full h-[10%] pt-2 flex justify-center items-start">
				<div className="w-[70%] relative flex flex-wrap gap-2">
					<div className="relative flex-1 min-w-[200px]">
						<Input
							placeholder="Type your prompt here..."
							className="bg-zinc-100 dark:bg-neutral-700 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white pl-12 w-full shadow-lg"
							value={inputValue}
							onChange={handleInputChange}
							onKeyDown={handleKeyDown}
						/>
						<div className="absolute left-4 top-1/2 -translate-y-1/2 ">
							<MessageCircle
								className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${
									listening ? "rotate-90 scale-0" : "rotate-0 scale-100"
								}`}
							/>
							<AudioLines
								className={`w-5 h-5 transition-all ${
									!listening ? "rotate-0 scale-0" : "rotate-0 scale-100"
								}`}
							/>
						</div>
					</div>
					<div className="flex gap-2">
						<Button
							size="icon"
							variant="ghost"
							onClick={handleToggleListening}
							disabled={loading}
							className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white shadow-lg"
						>
							<Mic
								className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${
									listening ? "rotate-90 scale-0" : "rotate-0 scale-100"
								}`}
							/>
							<X
								className={`w-5 h-5 transition-all ${
									!listening ? "rotate-0 scale-0" : "rotate-0 scale-100"
								}`}
							/>
						</Button>
						<Button
							size="icon"
							className="bg-neutral-900 hover:bg-neutral-800 text-white shadow-lg"
							onClick={handleSendMessage}
							disabled={loading}
						>
							<Send className={`w-5 h-5 transition-all`} />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChatUI;

export const ChatBubble = ({ variant, children }) => {
	const isUser = variant === "user";

	return (
		<div
			className={`max-w-[85%] md:max-w-[60%] px-5 py-4 rounded-md border bg-zinc-100 dark:bg-neutral-700 border-zinc-200 dark:border-zinc-600 text-zinc-900 dark:text-white ${
				isUser ? "" : "self-start "
			} text-xs sm:text-sm md:text-[15px] text-justify tracking-wide shadow-lg`}
		>
			{children}
		</div>
	);
};
