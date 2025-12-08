import axios from 'axios'; // Using direct axios for public route to avoid interceptors
import { Building2, CheckCircle, Loader2, Send } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function InquiryForm() {
  const { consultancyId } = useParams();
  
  // States
  const [consultancy, setConsultancy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    personalInfo: {
        firstName: '', lastName: '', email: '', phone: '', 
        dobAD: '', gender: 'Male'
    },
    visaDetails: {
        japaneseLanguage: { status: 'None', level: '', testName: '' },
        education: { lastDegree: '', passedYear: '', percentage: '' },
        intake: ''
    }
  });

  // Fetch Consultancy Info on Load
  useEffect(() => {
    const fetchInfo = async () => {
        try {
            // Using full URL because 'api' utility adds headers we don't need here
            const res = await axios.get(`http://localhost:5000/api/public/consultancy/${consultancyId}`);
            setConsultancy(res.data.data);
        } catch (error) {
            toast.error("Invalid QR Code or Consultancy Not Found");
        } finally {
            setLoading(false);
        }
    };
    if(consultancyId) fetchInfo();
  }, [consultancyId]);

  // Handlers
  const handlePersonalChange = (e) => {
      setFormData(prev => ({
          ...prev,
          personalInfo: { ...prev.personalInfo, [e.target.name]: e.target.value }
      }));
  };

  const handleVisaChange = (section, field, value) => {
      setFormData(prev => ({
          ...prev,
          visaDetails: {
              ...prev.visaDetails,
              [section]: {
                  ...prev.visaDetails[section],
                  [field]: value
              }
          }
      }));
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      setSubmitting(true);
      
      try {
          await axios.post('http://localhost:5000/api/public/inquiry', {
              consultancyId,
              ...formData
          });
          setIsSuccess(true);
      } catch (error) {
          toast.error(error.response?.data?.message || "Submission failed");
      } finally {
          setSubmitting(false);
      }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-green-600" size={40}/></div>;
  if (!consultancy) return <div className="min-h-screen flex items-center justify-center text-red-500">Consultancy Not Found</div>;

  if (isSuccess) {
      return (
          <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-6 text-center">
              <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
                  <div className="mx-auto bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle className="text-green-600" size={40} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Inquiry Sent!</h2>
                  <p className="text-gray-600 mb-6">
                      Thank you for contacting <strong>{consultancy.name}</strong>. 
                      We have sent login credentials to your email. Please check your inbox to track your application.
                  </p>
                  <a href="/login" className="block w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700">
                      Go to Login
                  </a>
              </div>
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* Mobile Header */}
      <div className="bg-green-700 text-white p-6 pb-12 rounded-b-[3rem] shadow-lg">
          <div className="flex items-center justify-center gap-3 mb-4">
              <div className="bg-white/20 p-2 rounded-lg">
                  <Building2 size={24} />
              </div>
              <h1 className="text-xl font-bold text-center">{consultancy.name}</h1>
          </div>
          <p className="text-center text-green-100 text-sm">Japan Student Visa Inquiry Form</p>
      </div>

      {/* Form Container */}
      <div className="max-w-lg mx-auto px-4 -mt-8">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md overflow-hidden">
              
              {/* 1. Personal Info */}
              <div className="p-6 space-y-4">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Personal Details</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                      <div>
                          <label className="block text-xs font-semibold text-gray-600 mb-1">First Name</label>
                          <input required name="firstName" value={formData.personalInfo.firstName} onChange={handlePersonalChange} className="w-full border p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-green-500 outline-none transition" placeholder="John" />
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-gray-600 mb-1">Last Name</label>
                          <input required name="lastName" value={formData.personalInfo.lastName} onChange={handlePersonalChange} className="w-full border p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-green-500 outline-none transition" placeholder="Doe" />
                      </div>
                  </div>

                  <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Email Address</label>
                      <input required type="email" name="email" value={formData.personalInfo.email} onChange={handlePersonalChange} className="w-full border p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-green-500 outline-none transition" placeholder="student@gmail.com" />
                  </div>
                  
                  <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Phone Number</label>
                      <input required type="tel" name="phone" value={formData.personalInfo.phone} onChange={handlePersonalChange} className="w-full border p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-green-500 outline-none transition" placeholder="9800000000" />
                  </div>
              </div>

              <hr className="border-gray-100" />

              {/* 2. Japan Specifics */}
              <div className="p-6 space-y-4 bg-green-50/50">
                  <h3 className="text-sm font-bold text-green-600 uppercase tracking-wider mb-2">Visa Eligibility</h3>
                  
                  {/* Language */}
                  <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Japanese Language Status</label>
                      <select 
                          className="w-full border p-3 rounded-lg bg-white focus:ring-2 focus:ring-green-500 outline-none"
                          value={formData.visaDetails.japaneseLanguage.status}
                          onChange={(e) => handleVisaChange('japaneseLanguage', 'status', e.target.value)}
                      >
                          <option value="None">Not Started</option>
                          <option value="Studying">Currently Studying</option>
                          <option value="Passed">Passed Test (NAT/JLPT)</option>
                      </select>
                  </div>

                  {formData.visaDetails.japaneseLanguage.status !== 'None' && (
                      <div className="grid grid-cols-2 gap-4 animate-in slide-in-from-top-2">
                          <div>
                              <label className="block text-xs font-semibold text-gray-600 mb-1">Test Name</label>
                              <select 
                                  className="w-full border p-3 rounded-lg bg-white"
                                  onChange={(e) => handleVisaChange('japaneseLanguage', 'testName', e.target.value)}
                              >
                                  <option>JLPT</option>
                                  <option>NAT-TEST</option>
                                  <option>TOP-J</option>
                                  <option>J-CERT</option>
                              </select>
                          </div>
                          <div>
                              <label className="block text-xs font-semibold text-gray-600 mb-1">Level / Score</label>
                              <input 
                                  className="w-full border p-3 rounded-lg bg-white" 
                                  placeholder="e.g. N5 or 150"
                                  onChange={(e) => handleVisaChange('japaneseLanguage', 'level', e.target.value)}
                              />
                          </div>
                      </div>
                  )}

                  {/* Education */}
                  <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Last Qualification</label>
                      <select 
                          className="w-full border p-3 rounded-lg bg-white focus:ring-2 focus:ring-green-500 outline-none"
                          onChange={(e) => handleVisaChange('education', 'lastDegree', e.target.value)}
                      >
                          <option value="">Select Degree</option>
                          <option value="+2/High School">+2 / High School</option>
                          <option value="Bachelor">Bachelor's Degree</option>
                          <option value="Master">Master's Degree</option>
                      </select>
                  </div>

                  {formData.visaDetails.education.lastDegree && (
                      <div className="grid grid-cols-2 gap-4 animate-in slide-in-from-top-2">
                          <div>
                              <label className="block text-xs font-semibold text-gray-600 mb-1">Passed Year</label>
                              <input 
                                  type="number" 
                                  className="w-full border p-3 rounded-lg bg-white" 
                                  placeholder="2023"
                                  onChange={(e) => handleVisaChange('education', 'passedYear', e.target.value)}
                              />
                          </div>
                          <div>
                              <label className="block text-xs font-semibold text-gray-600 mb-1">GPA / %</label>
                              <input 
                                  className="w-full border p-3 rounded-lg bg-white" 
                                  placeholder="3.6"
                                  onChange={(e) => handleVisaChange('education', 'percentage', e.target.value)}
                              />
                          </div>
                      </div>
                  )}

              </div>

              {/* Submit Button */}
              <div className="p-6 border-t border-gray-100">
                  <button 
                      type="submit" 
                      disabled={submitting}
                      className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-green-200 hover:bg-green-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                      {submitting ? <Loader2 className="animate-spin" /> : <><Send size={20} /> Submit Inquiry</>}
                  </button>
                  <p className="text-center text-xs text-gray-400 mt-4">
                      By submitting, you agree to share your details with {consultancy.name}.
                  </p>
              </div>

          </form>
      </div>
    </div>
  );
}