import React from 'react';
import { X, Users, Stethoscope, Brain, FileText, TrendingUp, Calendar, Phone, MapPin } from 'lucide-react';

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'patients' | 'consultations' | 'predictions' | 'treatments';
}

const DetailModal: React.FC<DetailModalProps> = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  const getModalContent = () => {
    switch (type) {
      case 'patients':
        return {
          title: 'Active Patients Overview',
          icon: Users,
          color: 'blue',
          data: [
            {
              name: 'John Smith',
              age: 45,
              condition: 'Hypertension',
              lastVisit: '2024-01-20',
              status: 'Stable',
              doctor: 'Dr. Sarah Johnson',
              phone: '+1-555-0123'
            },
            {
              name: 'Emily Davis',
              age: 32,
              condition: 'Migraine',
              lastVisit: '2024-01-22',
              status: 'Improving',
              doctor: 'Dr. Michael Chen',
              phone: '+1-555-0124'
            },
            {
              name: 'Robert Wilson',
              age: 58,
              condition: 'Type 2 Diabetes',
              lastVisit: '2024-01-19',
              status: 'Monitoring',
              doctor: 'Dr. Sarah Johnson',
              phone: '+1-555-0125'
            },
            {
              name: 'Maria Garcia',
              age: 41,
              condition: 'Anxiety Disorder',
              lastVisit: '2024-01-21',
              status: 'Stable',
              doctor: 'Dr. Lisa Park',
              phone: '+1-555-0126'
            }
          ]
        };

      case 'consultations':
        return {
          title: 'Recent Health Consultations',
          icon: Stethoscope,
          color: 'green',
          data: [
            {
              patient: 'John Smith',
              type: 'Follow-up',
              date: '2024-01-22 10:30 AM',
              duration: '30 mins',
              doctor: 'Dr. Sarah Johnson',
              notes: 'Blood pressure stable, medication adjusted'
            },
            {
              patient: 'Emily Davis',
              type: 'Initial Consultation',
              date: '2024-01-22 02:15 PM',
              duration: '45 mins',
              doctor: 'Dr. Michael Chen',
              notes: 'Migraine assessment, prescribed preventive medication'
            },
            {
              patient: 'Robert Wilson',
              type: 'Routine Check',
              date: '2024-01-21 09:00 AM',
              duration: '25 mins',
              doctor: 'Dr. Sarah Johnson',
              notes: 'Diabetes management review, HbA1c improved'
            },
            {
              patient: 'Maria Garcia',
              type: 'Therapy Session',
              date: '2024-01-21 03:30 PM',
              duration: '50 mins',
              doctor: 'Dr. Lisa Park',
              notes: 'Anxiety management techniques discussed'
            }
          ]
        };

      case 'predictions':
        return {
          title: 'AI Disease Predictions',
          icon: Brain,
          color: 'purple',
          data: [
            {
              patient: 'Anonymous Patient #1247',
              symptoms: ['Persistent headache', 'Fatigue', 'Dizziness'],
              prediction: 'Tension Headache',
              confidence: '78%',
              date: '2024-01-22',
              recommendation: 'Stress management and hydration'
            },
            {
              patient: 'Anonymous Patient #1248',
              symptoms: ['Chest pain', 'Shortness of breath', 'Fatigue'],
              prediction: 'Cardiovascular Assessment Needed',
              confidence: '85%',
              date: '2024-01-22',
              recommendation: 'Immediate cardiology consultation'
            },
            {
              patient: 'Anonymous Patient #1249',
              symptoms: ['Frequent urination', 'Excessive thirst', 'Weight loss'],
              prediction: 'Type 2 Diabetes',
              confidence: '92%',
              date: '2024-01-21',
              recommendation: 'Blood glucose testing and endocrinology referral'
            },
            {
              patient: 'Anonymous Patient #1250',
              symptoms: ['Joint pain', 'Morning stiffness', 'Swelling'],
              prediction: 'Rheumatoid Arthritis',
              confidence: '74%',
              date: '2024-01-21',
              recommendation: 'Rheumatology consultation and inflammatory markers'
            }
          ]
        };

      case 'treatments':
        return {
          title: 'Generated Treatment Plans',
          icon: FileText,
          color: 'orange',
          data: [
            {
              patient: 'John Smith',
              condition: 'Hypertension',
              plan: 'Medication + Lifestyle',
              medications: ['Lisinopril 10mg', 'Amlodipine 5mg'],
              lifestyle: ['Low sodium diet', 'Regular exercise'],
              followUp: 'Every 4 weeks',
              created: '2024-01-20'
            },
            {
              patient: 'Emily Davis',
              condition: 'Migraine',
              plan: 'Preventive + Acute',
              medications: ['Sumatriptan 50mg', 'Propranolol 40mg'],
              lifestyle: ['Sleep hygiene', 'Trigger avoidance'],
              followUp: 'Every 6 weeks',
              created: '2024-01-22'
            },
            {
              patient: 'Robert Wilson',
              condition: 'Type 2 Diabetes',
              plan: 'Comprehensive Management',
              medications: ['Metformin 500mg', 'Glipizide 5mg'],
              lifestyle: ['Diabetic diet', 'Blood glucose monitoring'],
              followUp: 'Every 3 months',
              created: '2024-01-19'
            },
            {
              patient: 'Maria Garcia',
              condition: 'Anxiety Disorder',
              plan: 'Therapy + Medication',
              medications: ['Sertraline 50mg'],
              lifestyle: ['Mindfulness practice', 'Regular exercise'],
              followUp: 'Every 2 weeks',
              created: '2024-01-21'
            }
          ]
        };

      default:
        return { title: '', icon: Users, color: 'blue', data: [] };
    }
  };

  const content = getModalContent();
  const IconComponent = content.icon;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className={`bg-${content.color}-600 text-white p-6`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <IconComponent className="h-8 w-8" />
              <h2 className="text-2xl font-bold">{content.title}</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors duration-200"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="space-y-4">
            {content.data.map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow duration-200">
                {type === 'patients' && (
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">{(item as any).name}</h3>
                      <p className="text-gray-600">Age: {(item as any).age}</p>
                      <div className="flex items-center space-x-1 text-sm text-gray-600 mt-1">
                        <Phone className="h-3 w-3" />
                        <span>{(item as any).phone}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Condition</p>
                      <p className="font-medium text-gray-900">{(item as any).condition}</p>
                      <p className="text-sm text-gray-600 mt-1">Doctor: {(item as any).doctor}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        (item as any).status === 'Stable' ? 'bg-green-100 text-green-800' :
                        (item as any).status === 'Improving' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {(item as any).status}
                      </span>
                      <p className="text-sm text-gray-600 mt-1">Last visit: {(item as any).lastVisit}</p>
                    </div>
                  </div>
                )}

                {type === 'consultations' && (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">{(item as any).patient}</h3>
                      <p className="text-gray-600">{(item as any).type}</p>
                      <div className="flex items-center space-x-1 text-sm text-gray-600 mt-1">
                        <Calendar className="h-3 w-3" />
                        <span>{(item as any).date}</span>
                      </div>
                      <p className="text-sm text-gray-600">Duration: {(item as any).duration}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Doctor</p>
                      <p className="font-medium text-gray-900">{(item as any).doctor}</p>
                      <p className="text-sm text-gray-600 mt-2">Notes</p>
                      <p className="text-sm text-gray-700">{(item as any).notes}</p>
                    </div>
                  </div>
                )}

                {type === 'predictions' && (
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-gray-900 text-lg">{(item as any).patient}</h3>
                      <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm font-medium">
                        {(item as any).confidence} confidence
                      </span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Symptoms</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {(item as any).symptoms.map((symptom: string, idx: number) => (
                            <span key={idx} className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">
                              {symptom}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Prediction</p>
                        <p className="font-medium text-gray-900">{(item as any).prediction}</p>
                        <p className="text-sm text-gray-600 mt-1">Recommendation</p>
                        <p className="text-sm text-gray-700">{(item as any).recommendation}</p>
                      </div>
                    </div>
                  </div>
                )}

                {type === 'treatments' && (
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{(item as any).patient}</h3>
                        <p className="text-gray-600">{(item as any).condition}</p>
                      </div>
                      <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm">
                        {(item as any).plan}
                      </span>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 font-medium">Medications</p>
                        <ul className="text-sm text-gray-700 mt-1 space-y-1">
                          {(item as any).medications.map((med: string, idx: number) => (
                            <li key={idx}>• {med}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 font-medium">Lifestyle</p>
                        <ul className="text-sm text-gray-700 mt-1 space-y-1">
                          {(item as any).lifestyle.map((lifestyle: string, idx: number) => (
                            <li key={idx}>• {lifestyle}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 font-medium">Follow-up</p>
                        <p className="text-sm text-gray-700 mt-1">{(item as any).followUp}</p>
                        <p className="text-xs text-gray-500 mt-2">Created: {(item as any).created}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;