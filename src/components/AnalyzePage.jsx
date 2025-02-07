"use client"

import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import BurnMeter from "./BurnMeter"
import InfoCard from "./InfoCard"
import logo from "../img/MediScan.png"

function AnalyzePage() {
  const navigate = useNavigate()
  const [burnDegrees, setBurnDegrees] = useState([
    { name: "Normal / No burn", probability: 0 },
    { name: "1st degree burn", probability: 0 },
    { name: "2nd degree burn", probability: 0 },
    { name: "3rd degree burn", probability: 0 },
    { name: "4th degree burn", probability: 0 },
  ])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [model, setModel] = useState(null)
  const [isModelLoading, setIsModelLoading] = useState(true)
  const [showPreview, setShowPreview] = useState(true)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [isVideoReady, setIsVideoReady] = useState(false)
  const [showDisclaimer, setShowDisclaimer] = useState(true);


  useEffect(() => {
    let isMounted = true

    const loadModel = async () => {
      try {
        // Load TensorFlow.js first
        const tfScript = document.createElement("script")
        tfScript.src = "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1/dist/tf.min.js"
        await new Promise((resolve) => {
          tfScript.onload = resolve
          document.body.appendChild(tfScript)
        })

        // Then load Teachable Machine
        const tmScript = document.createElement("script")
        tmScript.src = "https://cdn.jsdelivr.net/npm/@teachablemachine/image@0.8.3/dist/teachablemachine-image.min.js"
        await new Promise((resolve) => {
          tmScript.onload = resolve
          document.body.appendChild(tmScript)
        })

        // Wait a bit to ensure scripts are fully initialized
        await new Promise((resolve) => setTimeout(resolve, 1000))

        if (!isMounted) return

        const URL = "https://teachablemachine.withgoogle.com/models/dmONaOiia/"
        const modelURL = URL + "model.json"
        const metadataURL = URL + "metadata.json"

        if (window.tmImage) {
          const loadedModel = await window.tmImage.load(modelURL, metadataURL)
          if (isMounted) {
            setModel(loadedModel)
            setIsModelLoading(false)
            console.log("Model loaded successfully")
          }
        } else {
          console.error("tmImage is not defined")
        }
      } catch (error) {
        console.error("Error in model loading:", error)
        setIsModelLoading(false)
      }
    }

    // Initialize camera
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({
          video: {
            facingMode: "environment",
            width: { ideal: 224 },
            height: { ideal: 224 },
          },
        })
        .then((stream) => {
          if (videoRef.current && isMounted) {
            videoRef.current.srcObject = stream
            // Add event listener for when video is ready
            videoRef.current.onloadedmetadata = () => {
              if (isMounted) {
                setIsVideoReady(true)
              }
            }
          }
        })
        .catch((err) => console.error("Error accessing the camera:", err))
    }

    loadModel()

    return () => {
      isMounted = false
      setIsVideoReady(false)
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  const predict = async (canvas) => {
    if (!model) return null
    try {
      const predictions = await model.predict(canvas)
      console.log("Raw predictions from model:", predictions);

      // Map of truncated names to full names
      const nameMap = {
        'Normal / No ...': "Normal / No burn",
        '1st degree b...': "1st degree burn",
        '2nd degree b...': "2nd degree burn",
        '3rd degree b...': "3rd degree burn",
        '4th degree b...': "4th degree burn"
      };

      // Map the predictions to match exact Teachable Machine labels
      const orderedPredictions = [
        { name: "Normal / No burn", probability: 0 },
        { name: "1st degree burn", probability: 0 },
        { name: "2nd degree burn", probability: 0 },
        { name: "3rd degree burn", probability: 0 },
        { name: "4th degree burn", probability: 0 },
      ]

      // Process each prediction
      predictions.forEach(p => {
        console.log("Processing prediction:", p.className, p.probability);
        const fullName = nameMap[p.className];
        if (fullName) {
          const index = orderedPredictions.findIndex(op => op.name === fullName);
          if (index !== -1) {
            orderedPredictions[index].probability = p.probability;
          }
        } else {
          console.warn("Unmatched prediction class:", p.className);
        }
      });

      console.log("Final ordered predictions:", orderedPredictions);
      return orderedPredictions;
    } catch (error) {
      console.error("Prediction error:", error)
      return null
    }
  }

  const captureAndAnalyze = async () => {
    if (!videoRef.current || !model || !isVideoReady) {
      console.error("Required elements not initialized", {
        video: !!videoRef.current,
        model: !!model,
        videoReady: isVideoReady
      });
      return;
    }

    try {
      setIsAnalyzing(true);
      setShowPreview(false);

      // Get the canvas element from the ref
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      // Set fixed dimensions for the canvas
      canvas.width = 224;
      canvas.height = 224;

      // Clear the canvas first
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the current video frame
      ctx.drawImage(
        videoRef.current,
        0, 0,
        videoRef.current.videoWidth,
        videoRef.current.videoHeight,
        0, 0,
        224, 224
      );

      // Get predictions
      const predictions = await predict(canvas);
      if (predictions) {
        console.log("Predictions received:", predictions);
        setBurnDegrees(predictions);
      }
    } catch (error) {
      console.error("Error during capture and prediction:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const retakePhoto = () => {
    setShowPreview(true);
    // Reset the canvas
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
    setBurnDegrees([
      { name: "Normal / No burn", probability: 0 },
      { name: "1st degree burn", probability: 0 },
      { name: "2nd degree burn", probability: 0 },
      { name: "3rd degree burn", probability: 0 },
      { name: "4th degree burn", probability: 0 },
    ]);
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden relative pb-24">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 p-4 mx-2 my-2 md:mx-4 bg-white rounded-xl shadow-[5px_5px_10px_rgba(0,0,0,0.1),-5px_-5px_10px_rgba(255,255,255,0.8)]">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
            <img src={logo} alt="MediScan Logo" className="h-6 md:h-8" />
          </div>
          <div className="flex items-center gap-4 md:gap-8">
            <button onClick={() => navigate("/about")} className="text-gray-600 text-sm md:text-base">
              About
            </button>
            <button
              onClick={() => navigate("/")}
              className="px-4 py-1.5 md:px-6 md:py-2 bg-[#98FB98] rounded-full hover:shadow-[2px_2px_4px_rgba(0,0,0,0.1)] transition-all text-sm md:text-base"
            >
              Home
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Burn Degree Classifier</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="relative">
            <div className="w-full aspect-video rounded-2xl shadow-lg overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover bg-gray-900 ${showPreview ? 'block' : 'hidden'}`}
              />
              <canvas
                ref={canvasRef}
                className={`w-full h-full object-contain bg-gray-100 ${showPreview ? 'hidden' : 'block'}`}
              />
            </div>
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4">
              {showPreview ? (
                <button
                  onClick={captureAndAnalyze}
                  disabled={isModelLoading || isAnalyzing || !isVideoReady}
                  className={`w-16 h-16 flex items-center justify-center ${(!isVideoReady || isModelLoading) ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  aria-label="Capture and analyze"
                >
                  <div className="absolute w-14 h-14 bg-white rounded-full opacity-80"></div>
                  <div className="absolute w-12 h-12 border-4 border-[#78FFBE] rounded-full"></div>
                  <div className="absolute w-10 h-10 bg-[#78FFBE] rounded-full transition-transform transform hover:scale-95 active:scale-90"></div>
                </button>
              ) : (
                <button
                  onClick={retakePhoto}
                  className="px-4 py-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow text-gray-800"
                >
                  Retake Photo
                </button>
              )}
            </div>
            {(isModelLoading || isAnalyzing) && (
              <div className="absolute inset-0 rounded-2xl bg-white bg-opacity-50 flex items-center justify-center">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 border-4 border-[#78FFBE] border-t-transparent rounded-full animate-spin"></div>
                  <div className="absolute inset-2 border-4 border-[#78FFBE] border-t-transparent rounded-full animate-spin-slow"></div>
                </div>
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
            <BurnMeter degrees={burnDegrees} />
            <InfoCard degrees={burnDegrees} />
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      {showDisclaimer && (
        <div className="fixed bottom-0 left-0 right-0 w-full backdrop-blur-md bg-gradient-to-r from-yellow-400/20 to-yellow-200/20 border-t border-yellow-400/30 shadow-lg shadow-yellow-400/10">
          <div className="container mx-auto px-4 py-4 flex items-center gap-4 relative">
            <div className="text-3xl text-yellow-600">
              ⚠
            </div>
            <p className="text-yellow-800 text-sm md:text-base pr-8">
              <span className="font-bold">Important!:</span> Make sure to have an ample amount of light in the environment when using this analyzer to get the most accurate results.
              <br></br>
              <span className="font-bold">Medical Disclaimer:</span> This tool is designed to help identify burn severity levels but should not be considered as a definitive medical assessment. Always seek professional medical advice for proper diagnosis and treatment of burns.
            </p>
            <button
              onClick={() => setShowDisclaimer(false)}
              className="absolute top-4 right-4 text-yellow-600 hover:text-yellow-800 transition-colors"
              aria-label="Close disclaimer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnalyzePage

