import { useState, useEffect, useRef } from "react";

const useSpeechRecognition = ({
	lang = "en-US",
	silenceTimeout = 2500, // Configurable silence timeout in milliseconds
} = {}) => {
	const [transcript, setTranscript] = useState("");
	const [listening, setListening] = useState(false);
	const [error, setError] = useState(null);
	const recognitionRef = useRef(null);
	const timeoutRef = useRef(null);

	useEffect(() => {
		if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
			recognitionRef.current = new (window.SpeechRecognition ||
				window.webkitSpeechRecognition)();
			recognitionRef.current.continuous = true;
			recognitionRef.current.interimResults = true;
			recognitionRef.current.lang = lang;
		} else {
			console.error("Speech Recognition API is not supported in this browser.");
		}
	}, [lang]);

	const resetTimeout = () => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		timeoutRef.current = setTimeout(() => {
			stopListening();
		}, silenceTimeout);
	};

	const startListening = () => {
		if (!recognitionRef.current) return;
		if (listening) {
			console.warn("Speech recognition is already running.");
			return;
		}
		recognitionRef.current.start();
		setListening(true);
		setError(null); // Reset errors when starting
		resetTimeout();
	};

	const pauseListening = () => {
		if (!recognitionRef.current) return;
		recognitionRef.current.stop();
		setListening(false);
	};

	const stopListening = () => {
		if (!recognitionRef.current) return;
		recognitionRef.current.abort(); // Stops recognition immediately and clears the session
		setListening(false);
	};

	useEffect(() => {
		if (!recognitionRef.current) return;

		const recognition = recognitionRef.current;

		recognition.onresult = (event) => {
			let liveTranscript = "";

			// Process both final and interim results
			for (let i = 0; i < event.results.length; i++) {
				liveTranscript += event.results[i][0].transcript;
			}

			setTranscript(liveTranscript);

			// Reset the timeout timer when there's speech activity
			resetTimeout();
		};

		recognition.onerror = (event) => {
			if (event.error === "aborted") {
				// Ignore "aborted" error
				console.warn("Speech recognition was aborted.");
				return;
			}

			setError(event.error);
			console.error("Speech recognition error:", event.error);
			stopListening(); // Stop on other errors
		};

		recognition.onend = () => {
			setListening(false); // Update state when recognition ends
		};

		return () => {
			recognition.stop();
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
			recognition.onresult = null;
			recognition.onerror = null;
			recognition.onend = null;
		};
	}, []);

	return {
		transcript,
		listening,
		error,
		startListening,
		pauseListening,
		stopListening,
	};
};

export default useSpeechRecognition;
