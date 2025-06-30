import React, { useState } from 'react';
import { Search, Plus, X, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { Symptom, Disease } from '../types/health';
import { simulateDiseasePrediction } from '../utils/aiSimulation';
import { commonSymptoms } from '../utils/mockData';

const DiseasePrediction: React.FC = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [symptomInput, setSymptomInput] = useState('');
  const [predictions, setPredictions] = useState<Disease[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAddSymptom = (symptom: string) => {
    if (symptom && !selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
      setSymptomInput('');
    }
  };

  const handleRemoveSymptom = (symptom: string) => {
    setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
  };

  const handleAnalyze = async () => {
    if (selectedSymptoms.length === 0) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    setTimeout(() => {
      const results = simulateDiseasePrediction(selectedSymptoms);
      setPredictions(results);
      setIsAnalyzing(false);
    }, 2000);
  };

  const getLikelihoodColor = (likelihood: number) => {
    if (likelihood >= 70) return 'text-red-600 bg-red-100';
    if (likelihood >= 50) return 'text-orange-600 bg-orange-100';
    if (likelihood >= 30) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  const getLikelihoodIcon = (likelihood: number) => {
    if (likelihood >= 70) return AlertTriangle;
    if (likelihood >= 50) return Info;
    return CheckCircle;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Search className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Disease Prediction</h1>
            <p className="text-gray-600">AI-powered symptom analysis and condition prediction</p>
          </div>
        </div>

        {/* Symptom Input */}
        <div className="space-y-4">
          <div className="flex space-x-3">
            <input
              type="text"
              value={symptomInput}
              onChange={(e) => setSymptomInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddSymptom(symptomInput)}
              placeholder="Enter a symptom (e.g., headache, fever, cough)"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            />
            <button
              onClick={() => handleAddSymptom(symptomInput)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add</span>
            </button>
          </div>

          {/* Common Symptoms */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Common symptoms:</p>
            <div className="flex flex-wrap gap-2">
              {commonSymptoms.map((symptom) => (
                <button
                  key={symptom}
                  onClick={() => handleAddSymptom(symptom)}
                  disabled={selectedSymptoms.includes(symptom)}
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {symptom}
                </button>
              ))}
            </div>
          </div>

          {/* Selected Symptoms */}
          {selectedSymptoms.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Selected symptoms:</p>
              <div className="flex flex-wrap gap-2">
                {selectedSymptoms.map((symptom) => (
                  <div
                    key={symptom}
                    className="flex items-center space-x-2 px-3 py-1 bg-purple-100 text-purple-800 rounded-full"
                  >
                    <span className="text-sm">{symptom}</span>
                    <button
                      onClick={() => handleRemoveSymptom(symptom)}
                      className="text-purple-600 hover:text-purple-800"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analyze Button */}
          <button
            onClick={handleAnalyze}
            disabled={selectedSymptoms.length === 0 || isAnalyzing}
            className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Analyzing symptoms...</span>
              </>
            ) : (
              <>
                <Search className="h-4 w-4" />
                <span>Analyze Symptoms</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Predictions */}
      {predictions.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Prediction Results</h2>
          
          {predictions.map((disease, index) => {
            const IconComponent = getLikelihoodIcon(disease.likelihood);
            
            return (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <IconComponent className={`h-6 w-6 ${getLikelihoodColor(disease.likelihood).split(' ')[0]}`} />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{disease.name}</h3>
                      <p className="text-gray-600 text-sm">{disease.description}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getLikelihoodColor(disease.likelihood)}`}>
                    {disease.likelihood}% likelihood
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Related Symptoms</h4>
                    <div className="flex flex-wrap gap-2">
                      {disease.symptoms.map((symptom) => (
                        <span
                          key={symptom}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                        >
                          {symptom}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Recommendations</h4>
                    <ul className="space-y-1">
                      {disease.recommendations.map((rec, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-start space-x-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-amber-900">Important Notice</h4>
                <p className="text-amber-700 text-sm mt-1">
                  These predictions are based on AI analysis and should not replace professional medical diagnosis. 
                  Please consult with a qualified healthcare provider for accurate diagnosis and treatment.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiseasePrediction;