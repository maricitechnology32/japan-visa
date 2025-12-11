 

import { CheckCircle, DollarSign, Loader2, RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../../../utils/api'; // Use your configured axios instance
import { InputGroup, SectionHeader } from '../ProfileShared';

export default function FinancialTab({ formData, updateField }) {
  const [isLoadingRate, setIsLoadingRate] = useState(false);

  // Function to fetch live rate from YOUR Backend (which calls NRB)
  const fetchLiveRate = async () => {
    setIsLoadingRate(true);
    try {
      const response = await api.get('/public/forex');
      if (response.data.success) {
        const { rate, date } = response.data.data;
        updateField('financialInfo', 'exchangeRate', rate);
        toast.success(`Updated from Nepal Rastra Bank (${date}): 1 USD = ${rate} NPR`);
      }
    } catch (error) {
      console.error("Exchange Rate Error:", error);
      toast.error("Could not fetch NRB rate. Please check internet connection.");
    } finally {
      setIsLoadingRate(false);
    }
  };

  // Auto-fetch on mount if rate is default (134) or missing
  useEffect(() => {
    const currentRate = formData.financialInfo.exchangeRate;
    if (!currentRate || currentRate === 134) {
        fetchLiveRate();
    }
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <SectionHeader 
            title="Financial Status" 
            subtitle="Data for Annual Income & Tax Clearance." 
            icon={<DollarSign className="text-emerald-600"/>} 
        />
        
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <div className="max-w-md">
                <div className="flex items-end gap-3">
                    <div className="flex-1">
                        <InputGroup 
                            label="Current Exchange Rate (1 USD = ? NPR)" 
                            type="number" 
                            value={formData.financialInfo.exchangeRate} 
                            onChange={(e) => updateField('financialInfo', 'exchangeRate', e.target.value)} 
                        />
                    </div>
                    <button 
                        onClick={fetchLiveRate}
                        disabled={isLoadingRate}
                        className="mb-1 p-3.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl border border-slate-300 transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center"
                        title="Fetch Official NRB Rate"
                    >
                        {isLoadingRate ? (
                            <Loader2 size={20} className="animate-spin text-emerald-600" />
                        ) : (
                            <RefreshCw size={20} />
                        )}
                    </button>
                </div>
                <p className="text-xs text-slate-400 mt-2 ml-1 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    Source: Nepal Rastra Bank (Official API)
                </p>
            </div>

            <div className="mt-8 p-5 bg-amber-50 border border-amber-200 rounded-xl flex gap-4 text-amber-800 text-sm items-start">
                <div className="p-2 bg-amber-100 rounded-full shrink-0"><CheckCircle size={16} /></div>
                <div>
                    <p className="font-bold mb-1">Important Note</p>
                    <p className="leading-relaxed">
                        Income source details are handled via the "Annual Income" generator in the Generators tab. 
                        Please consult with the document officer.
                    </p>
                </div>
            </div>
        </div>
    </div>
  );
}