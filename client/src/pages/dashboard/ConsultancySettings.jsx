import { Copy, Download, ExternalLink, Printer } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export default function ConsultancySettings() {
  const { user } = useSelector((state) => state.auth);
  const qrRef = useRef();

  // The URL students will visit
  const inquiryUrl = `${window.location.origin}/inquiry/${user?.consultancyId}`;

  const downloadQR = () => {
    const canvas = qrRef.current.querySelector('canvas');
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.download = 'Visa_Inquiry_QR.png';
    a.href = url;
    a.click();
  };

  const copyLink = () => {
    navigator.clipboard.writeText(inquiryUrl);
    toast.success("Link copied to clipboard!");
  };

  const printQR = () => {
    const printWindow = window.open('', '_blank');
    const canvas = qrRef.current.querySelector('canvas');
    const imgUrl = canvas.toDataURL('image/png');
    
    printWindow.document.write(`
        <html>
            <head><title>Print QR Code</title></head>
            <body style="text-align: center; font-family: sans-serif; padding-top: 50px;">
                <h1>Scan to Apply</h1>
                <p>Japan Student Visa Inquiry Form</p>
                <img src="${imgUrl}" width="300" style="margin: 20px 0;" />
                <h3>${user?.name || 'Consultancy'}</h3>
            </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      <div className="flex justify-between items-center border-b pb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Settings & Tools</h2>
            <p className="text-gray-500">Manage your consultancy assets.</p>
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* QR Code Card */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center text-center">
              <div className="bg-green-50 p-4 rounded-full mb-4">
                  <ExternalLink className="text-green-600" size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Student Inquiry QR Code</h3>
              <p className="text-sm text-gray-500 mb-6 max-w-xs">
                  Print this and place it at your reception desk. Students can scan it to fill their initial details directly.
              </p>

              {/* The QR Canvas */}
              <div ref={qrRef} className="p-4 bg-white border-2 border-gray-100 rounded-xl shadow-inner mb-6">
                  <QRCodeCanvas 
                      value={inquiryUrl} 
                      size={200} 
                      level="H" // High error correction
                      includeMargin={true}
                  />
              </div>

              <div className="grid grid-cols-2 gap-3 w-full">
                  <button 
                    onClick={downloadQR}
                    className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                  >
                      <Download size={16} /> Download PNG
                  </button>
                  <button 
                    onClick={printQR}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition shadow-sm"
                  >
                      <Printer size={16} /> Print Poster
                  </button>
              </div>
          </div>

          {/* Link Card */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-center">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Direct Link</h3>
              <p className="text-sm text-gray-500 mb-6">
                  Share this link via WhatsApp, Email, or SMS to invite students remotely.
              </p>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 break-all text-xs text-gray-600 font-mono mb-4">
                  {inquiryUrl}
              </div>

              <button 
                onClick={copyLink}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-lg font-bold hover:bg-gray-800 transition shadow-md"
              >
                  <Copy size={18} /> Copy Link
              </button>
          </div>

      </div>
    </div>
  );
}