"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useSoundVolume from "@/hooks/SoundAnimation";
import useSpeechRecognition from "@/hooks/speechRecognition";

import { Mic, Send, AudioLines, X, MessageCircle } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ScrollBar } from "@/components/ui/scroll-area";

export default function InitialCard() {
	const [tone, setTone] = useState("Calm");
	const [inputValue, setInputValue] = useState("");
	const [processedTranscript, setProcessedTranscript] = useState("");
	const [response, setResponse] = useState("");
	const [loading, setLoading] = useState(false);

	const visualizerRef = useRef(null);
	const contentToHideRef = useRef([]);
	const microphoneRef = useRef(null);
	const { transcript, listening, startListening, stopListening } =
		useSpeechRecognition({ lang: "en-US", silenceTimeout: 3000 });
	const volume = useSoundVolume();

	useGSAP(() => {
		const handleMicrophoneClick = () => {
			gsap.to(contentToHideRef.current, {
				scale: 0,
				ease: "power2.inOut",
				onComplete: () => {
					visualizerRef.current.classList.remove("mb-4");
					contentToHideRef.current.forEach((el) => {
						if (el && el.parentNode) {
							el.parentNode.removeChild(el);
						}
					});
					contentToHideRef.current = [];
				},
			});

			gsap.to(visualizerRef.current, {
				width: "50%",
				height: "50%",
				ease: "power2.inOut",
				delay: 0.7,
			});
		};
		microphoneRef.current.addEventListener("click", handleMicrophoneClick);

		return () => {
			microphoneRef.current.removeEventListener("click", handleMicrophoneClick);
		};
	}, [microphoneRef]);

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

		try {
			const res = await fetch("/api/chatbot", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message: inputValue, tone: tone }),
			});

			const data = await res.json();
			setResponse(data.chatbotMessage);
		} catch (error) {
			console.error("Error:", error);
			setResponse("An error occurred while processing your request.");
		}
		setLoading(false);
	};

	return (
		<div className="w-full min-h-[37rem] max-w-md md:max-w-2xl mx-auto p-6 bg-neutral-50 dark:bg-zinc-900 rounded-3xl overflow-x-auto transition-colors duration-200 flex flex-col">
			<div className="w-full h-full flex-1 relative flex flex-col justify-center items-center transition-all ease-in-out">
				<div
					className="mb-8 w-36 h-36 flex justify-center items-center rounded-full"
					ref={visualizerRef}
				>
					<img
						src="/logo.png"
						alt="logo"
						className="w-full h-full rounded-full object-contain"
						draggable={false}
						style={{
							width: listening ? `${200 + volume * 200}px` : "100%",
							height: listening ? `${200 + volume * 200}px` : "100%",
							transition: "all 0.05s ease-out",
						}}
					/>
				</div>

				<div
					className="text-center mb-8"
					ref={(el) => (contentToHideRef.current[0] = el)}
				>
					<h1 className="text-2xl font-medium text-zinc-900 dark:text-white mb-2">
						How can I help you today?
					</h1>
					<p className="text-sm max-w-xs text-zinc-600 dark:text-zinc-400">
						This code will display a prompt asking the user for their name, and
						then it will display a greeting message with the name entered by the
						user.
					</p>
				</div>
			</div>

			<div className="w-full">
				<ScrollArea className="flex gap-4 mb-6 text-sm pb-2 overflow-auto">
					{["Calm", "Positive", "Friendly", "Philosophical", "Encouraging"].map(
						(filter) => (
							<Button
								key={filter}
								variant={tone === filter ? "secondary" : "ghost"}
								onClick={() => setTone(filter)}
								className={`text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white ${
									filter === tone ? "text-zinc-900 dark:text-white " : ""
								}`}
							>
								{filter}
							</Button>
						)
					)}
					<ScrollBar orientation="horizontal" />
				</ScrollArea>

				{/* Input Field */}
				<div className="flex flex-wrap gap-2">
					<div className="relative flex-1 min-w-[200px]">
						<Input
							placeholder="Type your prompt here..."
							className="bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white pl-12 w-full"
							value={inputValue} // Bind the value to the state
							onChange={handleInputChange} // Allow user input
						/>
						<div className="absolute left-4 top-1/2 -translate-y-1/2">
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
							className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
							ref={microphoneRef}
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
							className="bg-neutral-900 hover:bg-neutral-800 text-white"
							onClick={handleSendMessage}
						>
							<Send className={`w-5 h-5 transition-all`} />
						</Button>
					</div>
				</div>
			</div>
			<h1 className="text-lg">{response}</h1>
		</div>
	);
}
