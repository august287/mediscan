const InfoCard = ({ degrees }) => {
    const burnInfo = {
      "Normal / No burn": {
        description: "No burn detected. Skin appears normal and healthy.",
        advice: null,
        color: "from-green-400/30 to-green-200/30",
        textColor: "text-green-900",
        borderColor: "border-green-400/50",
        shadowColor: "shadow-green-400/20",
        emoji: "☺"
      },
      "1st degree burn": {
        description:
          "Affects only the outer layer of skin. Characterized by redness, minor swelling, and pain. Usually heals within a week.",
        advice: "Cool the burn with running water and seek medical advice if needed.",
        color: "from-amber-400/30 to-amber-200/30",
        textColor: "text-amber-900",
        borderColor: "border-amber-400/50",
        shadowColor: "shadow-amber-400/20",
        emoji: "☹"
      },
      "2nd degree burn": {
        description:
          "Affects both the outer and underlying layer of skin. Causes blisters, severe pain, and possible scarring. May require medical attention.",
        advice: "Seek immediate medical attention. Do not apply ice or ointments.",
        color: "from-orange-400/30 to-orange-200/30",
        textColor: "text-orange-900",
        borderColor: "border-orange-400/50",
        shadowColor: "shadow-orange-400/20",
        emoji: "⊗"
      },
      "3rd degree burn": {
        description:
          "Extends through every layer of skin. May appear white or charred. Requires immediate medical attention.",
        advice: "Seek immediate emergency medical attention. Do not remove clothing stuck to the burn.",
        color: "from-purple-400/30 to-purple-200/30",
        textColor: "text-purple-900",
        borderColor: "border-purple-400/50",
        shadowColor: "shadow-purple-400/20",
        emoji: "⊖"
      },
      "4th degree burn": {
        description:
          "Extends beyond the skin into fat, muscle, and bone. Extremely severe and life-threatening. Requires immediate emergency medical care.",
        advice: "Call emergency services immediately. Do not attempt to treat the burn.",
        color: "from-red-400/30 to-red-200/30",
        textColor: "text-red-900",
        borderColor: "border-red-400/50",
        shadowColor: "shadow-red-400/20",
        emoji: "⊘"
      },
    }
  
    const highestProbabilityDegree = degrees.reduce(
      (prev, current) => (current.probability > prev.probability ? current : prev),
      degrees[0],
    )
  
    const info = burnInfo[highestProbabilityDegree.name]
  
    return (
      <div 
        className={`relative backdrop-blur-md bg-gradient-to-br ${info.color} 
          rounded-2xl p-6 h-full border ${info.borderColor} 
          shadow-lg ${info.shadowColor} 
          transition-all duration-500 ease-in-out`}
        style={{
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      >
        <h2 className={`text-2xl font-bold mb-2 ${info.textColor}`}>
          {highestProbabilityDegree.name}
        </h2>
        <div className={`text-5xl mb-4 transition-all duration-500 ${info.textColor} font-thin`}>
          {info.emoji}
        </div>
        <p className={`mb-4 ${info.textColor} opacity-90`}>
          {info.description}
        </p>
        {info.advice && (
          <div className={`mt-4 p-4 bg-white/20 rounded-xl backdrop-blur-sm 
            border ${info.borderColor}`}>
            <p className={`font-bold ${info.textColor} mb-2`}>Advice:</p>
            <p className={`${info.textColor} opacity-90`}>{info.advice}</p>
          </div>
        )}
      </div>
    )
  }
  
  export default InfoCard
  
  