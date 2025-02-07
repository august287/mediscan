const BurnMeter = ({ degrees }) => {
    const getColorForSeverity = (name) => {
      switch (name) {
        case "Normal / No burn":
          return "from-green-200 to-green-300 border-green-400"
        case "1st degree burn":
          return "from-amber-200 to-amber-300 border-amber-400"
        case "2nd degree burn":
          return "from-orange-200 to-orange-300 border-orange-400"
        case "3rd degree burn":
          return "from-purple-200 to-purple-300 border-purple-400"
        case "4th degree burn":
          return "from-red-200 to-red-300 border-red-400"
        default:
          return "from-gray-200 to-gray-300 border-gray-400"
      }
    }
  
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 h-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Burn Severity</h2>
        <div className="space-y-4">
          {degrees.map((degree, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-32 text-sm font-medium text-gray-700">{degree.name}</div>
              <div className="flex-grow bg-gray-100 rounded-full h-6 overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 bg-gradient-to-r rounded-full border ${getColorForSeverity(degree.name)}`}
                  style={{ width: `${(degree.probability * 100).toFixed(1)}%` }}
                />
              </div>
              <div className="w-16 text-right text-sm font-medium text-gray-700">
                {(degree.probability * 100).toFixed(1)}%
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  export default BurnMeter
  
  