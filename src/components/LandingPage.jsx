import { useNavigate } from "react-router-dom"
import logo from "../img/MediScan.png"
import illustration from "../img/burn.png"

const LandingPage = () => {
  const navigate = useNavigate()

  return (
    <div className="h-screen bg-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 p-4 mx-2 my-2 md:mx-4 bg-white rounded-xl shadow-[5px_5px_10px_rgba(0,0,0,0.1),-5px_-5px_10px_rgba(255,255,255,0.8)]">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img src={logo || "/placeholder.svg"} alt="MediScan Logo" className="h-6 md:h-8" />
          </div>
          <div className="flex items-center gap-4 md:gap-8">
            <button onClick={() => navigate("/about")} className="text-gray-600 text-sm md:text-base">
              About
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

      {/* Main Content */}
      <div className="container mx-auto px-4 py-4 md:py-8 flex flex-col lg:flex-row gap-4 md:gap-8 h-[calc(100vh-80px)]">
        {/* MediScan Info Section */}
        <div className="flex-1 bg-[#78FFBE9E] rounded-tr-[40px] md:rounded-tr-[80px] p-6 md:p-12 relative order-2 lg:order-1">
          <h1 className="text-4xl md:text-6xl font-bold text-[#2D3748] leading-tight text-left mb-4 md:mb-6 relative z-10">
            Meet
            <br />
            MediScan.
          </h1>
          <p className="text-gray-600 text-base md:text-xl max-w-lg mb-6 md:mb-12 text-left relative z-10">
            MediScan is a burn Analyzer Tool that uses Google's Teachable Machine Image Identifier Model to analyze burn
            levels to get the adequate urgent care you need.
          </p>

          {/* Decorative Squares - Hidden on mobile */}
          <div className="absolute bottom-0 left-0 transform translate-x-[-30%] translate-y-[20%] hidden md:block">
            {[...Array(5)].map((_, row) => (
              <div key={`row-${row}`} className="flex gap-6 mb-6">
                {[...Array(4)].map((_, col) => (
                  <div key={`square-${row}-${col}`} className="w-6 md:w-8 h-6 md:h-8 bg-white" />
                ))}
              </div>
            ))}
          </div>

          {/* Decorative Plus Signs */}
          <div className="relative bottom-0 left-0 hidden md:block">
            {[...Array(3)].map((_, index) => (
              <div
                key={`plus-${index}`}
                className="absolute text-white text-[100px] md:text-[200px]"
                style={{
                  bottom: `-${100 + index * 120}px`,
                  right: "-50px",
                }}
              >
                +
              </div>
            ))}
          </div>
        </div>

        {/* Right Section Container */}
        <div className="flex gap-2 md:gap-4 order-1 lg:order-2">
          {/* Illustration Section */}
          <div className="flex-1 lg:w-[400px] rounded-2xl md:rounded-3xl shadow-[5px_5px_10px_rgba(0,0,0,0.1)]">
            <img
              src={illustration || "/placeholder.svg"}
              alt="Medical care illustration"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Severity Meter */}
          <div className="w-2 md:w-8 flex flex-col rounded-full">
            <div className="flex-1 bg-gradient-to-b from-[#4ade80] via-yellow-400 to-red-600" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage

