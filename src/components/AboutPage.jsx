import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../img/MediScan.png";
import burnImage from "../img/burn.png";

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 p-4 mx-2 my-2 md:mx-4 bg-white rounded-xl shadow-[5px_5px_10px_rgba(0,0,0,0.1),-5px_-5px_10px_rgba(255,255,255,0.8)]">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
            <img src={logo} alt="MediScan Logo" className="h-6 md:h-8" />
          </div>
          <div className="flex items-center gap-4 md:gap-8">
            <button onClick={() => navigate("/")} className="text-gray-600 text-sm md:text-base">
              Home
            </button>
            <button
              onClick={() => navigate("/analyze")}
              className="px-4 py-1.5 md:px-6 md:py-2 bg-[#98FB98] rounded-full hover:shadow-[2px_2px_4px_rgba(0,0,0,0.1)] transition-all text-sm md:text-base"
            >
              Analyze
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-14 lg:py-24 relative z-0 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative text-center">
          <h1 className="max-w-2xl mx-auto text-center font-manrope font-bold text-4xl text-gray-900 mb-5 md:text-5xl md:leading-normal">
            About <span className="text-[#98FB98]">MediScan</span>
          </h1>
          <p className="max-w-sm mx-auto text-center text-base font-normal leading-7 text-gray-500 mb-9">
            Your trusted companion in burn injury analysis and diagnosis. MediScan is just one snap away from analyzing the level of burn injury from your camera.
          </p>
        </div>
      </section>

      {/* About Section 1 */}
      <section className="py-14 lg:py-24 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-9">
            <div className="img-box">
              <img src={burnImage} alt="MediScan Burn Analysis" className="max-lg:mx-auto object-cover rounded-2xl shadow-lg" />
            </div>
            <div className="lg:pl-[100px] flex items-center">
              <div className="data w-full">
                <h2 className="font-manrope font-bold text-4xl lg:text-5xl text-black mb-9 max-lg:text-center relative">
                  Our Mission
                </h2>
                <p className="font-normal text-xl leading-8 text-gray-500 max-lg:text-center max-w-2xl mx-auto">
                  MediScan is dedicated to revolutionizing burn injury diagnosis through advanced AI technology. Our mission is to provide quick, accurate, and accessible burn analysis to help medical professionals and patients make informed decisions about treatment.
                  
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section 2 */}
      <section className="py-14 lg:py-24 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-9">
            <div className="lg:pr-24 flex items-center">
              <div className="data w-full">
                <h2 className="font-manrope font-bold text-4xl lg:text-5xl text-black mb-9 max-lg:text-center">
                  How It Works
                </h2>
                <p className="font-normal text-xl leading-8 text-gray-500 max-lg:text-center max-w-2xl mx-auto">
                  Using Google's Teachable Machine technology, MediScan analyzes images of burn injuries to determine their severity level. Our AI model has been trained on extensive datasets to accurately classify burns from first to fourth degree, helping healthcare providers make quick and informed decisions.
                </p>
              </div>
            </div>
            <div className="img-box">
              <div className="bg-[#98FB98] p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Key Features</h3>
                <ul className="space-y-4">
                  <li className="flex items-center space-x-3">
                    <span className="bg-white p-2 rounded-full">✓</span>
                    <span>Instant burn degree classification</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="bg-white p-2 rounded-full">✓</span>
                    <span>High accuracy diagnosis</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="bg-white p-2 rounded-full">✓</span>
                    <span>User-friendly interface</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="bg-white p-2 rounded-full">✓</span>
                    <span>Immediate treatment recommendations</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-manrope text-4xl text-center text-gray-900 font-bold mb-14">Our Goal</h2>
          <div className="flex flex-col gap-5 xl:gap-8 lg:flex-row lg:justify-between">
            <div className="w-full max-lg:max-w-2xl mx-auto lg:mx-0 lg:w-1/3 bg-white p-6 rounded-2xl shadow-[5px_5px_10px_rgba(0,0,0,0.1),-5px_-5px_10px_rgba(255,255,255,0.8)]">
              <div className="flex gap-5">
                <div className="font-manrope text-2xl font-bold text-[#98FB98]">95%</div>
                <div className="flex-1">
                  <h4 className="text-xl text-gray-900 font-semibold mb-2">Accuracy Rate</h4>
                  <p className="text-xs text-gray-500 leading-5">
                    Our AI model achieves high accuracy in burn classification
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full max-lg:max-w-2xl mx-auto lg:mx-0 lg:w-1/3 bg-white p-6 rounded-2xl shadow-[5px_5px_10px_rgba(0,0,0,0.1),-5px_-5px_10px_rgba(255,255,255,0.8)]">
              <div className="flex gap-5">
                <div className="font-manrope text-2xl font-bold text-[#98FB98]">24/7</div>
                <div className="flex-1">
                  <h4 className="text-xl text-gray-900 font-semibold mb-2">Availability</h4>
                  <p className="text-xs text-gray-500 leading-5">
                    Round-the-clock access to burn analysis
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full max-lg:max-w-2xl mx-auto lg:mx-0 lg:w-1/3 bg-white p-6 rounded-2xl shadow-[5px_5px_10px_rgba(0,0,0,0.1),-5px_-5px_10px_rgba(255,255,255,0.8)]">
              <div className="flex gap-5">
                <div className="font-manrope text-2xl font-bold text-[#98FB98]">&lt;1s</div>
                <div className="flex-1">
                  <h4 className="text-xl text-gray-900 font-semibold mb-2">Analysis Time</h4>
                  <p className="text-xs text-gray-500 leading-5">
                    Quick results for immediate decision making
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              MediScan is Created by BS-IT 3-2 Elective Group 3
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Disclaimer: MediScan is a diagnostic aid tool and should not replace professional medical advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;