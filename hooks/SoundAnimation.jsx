import { useEffect, useState } from 'react';

const useSoundVolume = () => {
  const [volume, setVolume] = useState(0);

  useEffect(() => {
    const setupAudioContext = async () => {
      try {
        // Request permission for microphone
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        // Create the AudioContext and AnalyserNode
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        
        // Connect the microphone input to the analyser node
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);
        
        analyser.fftSize = 256;  // FFT size determines frequency resolution
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        
        // Function to get volume and update state
        const animateSound = () => {
          analyser.getByteFrequencyData(dataArray);

          // Calculate the average volume (RMS)
          let sum = 0;
          for (let i = 0; i < bufferLength; i++) {
            sum += dataArray[i];
          }
          const averageVolume = sum / bufferLength;
          
          // Normalize the volume between 0 and 1
          const normalizedVolume = averageVolume / 255;
          setVolume(normalizedVolume);

          // Continue the animation
          requestAnimationFrame(animateSound);
        };

        animateSound();
      } catch (err) {
        console.error('Error accessing the microphone:', err);
      }
    };

    setupAudioContext();

    // Cleanup when the component is unmounted
    return () => {
      // Ensure that audioContext is available before calling close
      if (typeof audioContext !== 'undefined' && audioContext.close) {
        audioContext.close();
      }
    };
  }, []);

  return volume;
};

export default useSoundVolume;
