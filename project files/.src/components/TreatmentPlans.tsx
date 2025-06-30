import React, { useState } from 'react';
import { FileText, Pill, Heart, Calendar, AlertTriangle, CheckCircle } from 'lucide-react';
import { TreatmentPlan } from '../types/health';
import { generateTreatmentPlan } from '../utils/aiSimulation';

const TreatmentPlans: React.FC = () => {
  const [condition, setCondition] = useState('');
  const [treatmentPlan, setTreatmentPlan] = useState<TreatmentPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const commonConditions = [
    'Hypertension',
    'Type 2 Diabetes',
    'High Cholesterol',
    'Anxiety',
    'Depression',
    'Asthma',
    'Arthritis',
    'Migraine'
  ];

  const handleGeneratePlan = async () => {
    if (!condition.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate API delay
    setTimeout(() => {
      const plan = generateTreatmentPlan(condition);
      setTreatmentPlan(plan);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-green-100 rounded-lg">
            <FileText className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Treatment Plans</h1>
            <p className="text-gray-600">AI-generated personalized treatment recommendations</p>
          </div>
        </div>

        {/* Condition Input */}
        <div className="space-y-4">
          <div className="flex space-x-3">
            <input
              type="text"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              placeholder="Enter medical condition (e.g., Hypertension, Diabetes)"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            />
            <button
              onClick={handleGeneratePlan}
              disabled={!condition.trim() || isGenerating}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center space-x-2"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <FileText className="h-4 w-4" />
                  <span>Generate Plan</span>
                </>
              )}
            </button>
          </div>

          {/* Common Conditions */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Common conditions:</p>
            <div className="flex flex-wrap gap-2">
              {commonConditions.map((cond) => (
                <button
                  key={cond}
                  onClick={() => setCondition(cond)}
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors duration-200"
                >
                  {cond}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Treatment Plan */}
      {treatmentPlan && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-6">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                Treatment Plan for {treatmentPlan.condition}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Medications */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Pill className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Medications</h3>
                </div>
                
                <div className="space-y-3">
                  {treatmentPlan.medications.map((med, index) => (
                    <div key={index} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-medium text-blue-900">{med.name}</h4>
                      <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-blue-700">
                        <div><span className="font-medium">Dosage:</span> {med.dosage}</div>
                        <div><span className="font-medium">Frequency:</span> {med.frequency}</div>
                        <div className="col-span-2"><span className="font-medium">Duration:</span> {med.duration}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lifestyle Modifications */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-red-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Lifestyle Changes</h3>
                </div>
                
                <div className="space-y-2">
                  {treatmentPlan.lifestyle.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-red-600 mt-0.5" />
                      <span className="text-sm text-red-800">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Follow-up Care */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">Follow-up Care</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {treatmentPlan.followUp.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                    <Calendar className="h-4 w-4 text-purple-600 mt-0.5" />
                    <span className="text-sm text-purple-800">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Warnings */}
            <div className="mt-6">
              <div className="flex items-center space-x-2 mb-4">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                <h3 className="text-lg font-semibold text-gray-900">Important Warnings</h3>
              </div>
              
              <div className="space-y-2">
                {treatmentPlan.warnings.map((warning, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
                    <span className="text-sm text-amber-800">{warning}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-gray-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900">Medical Disclaimer</h4>
                <p className="text-gray-700 text-sm mt-1">
                  This treatment plan is generated by AI based on general medical knowledge and should not replace 
                  professional medical advice. Always consult with qualified healthcare providers before starting, 
                  stopping, or changing any medical treatment. Individual treatment plans may vary based on patient 
                  history, current health status, and other factors.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TreatmentPlans;