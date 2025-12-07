import React, { useState } from 'react';
import axios from 'axios';

// ==================================================================
// 🟢 KONFIGURASI BACKEND (GANTI INI DENGAN URL RENDER ANDA)
// ==================================================================
// Contoh: "https://neuro-api.onrender.com" (tanpa slash di akhir)
const API_BASE_URL = "https://GANTI_DENGAN_URL_RENDER_ANDA.onrender.com"; 
// ==================================================================

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null); 
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError("");
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Mengirim file ke Backend Render
      const response = await axios.post(`${API_BASE_URL}/predict`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(response.data);
    } catch (err) {
      console.error(err);
      setError("Gagal terhubung ke server. Pastikan server Render sudah aktif.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans flex flex-col">
      
      {/* Navbar Sederhana */}
      <nav className="bg-white border-b border-gray-200 py-4 px-6 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 text-white p-1.5 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <span className="font-bold text-xl tracking-tight text-indigo-900">NeuroSense</span>
          </div>
          <div className="text-sm text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full">
            v1.0 • AI Powered
          </div>
        </div>
      </nav>

      {/* Konten Utama */}
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="w-full max-w-lg">
          
          {/* Header Kartu */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Deteksi Stres EEG</h1>
            <p className="text-gray-500">Unggah file rekaman sinyal otak (.edf) untuk analisis.</p>
          </div>

          {/* Kartu Upload */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            
            <div className="p-8">
              {/* Area Drag & Drop */}
              <label 
                className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl cursor-pointer transition-colors duration-300 ${
                  file ? 'border-indigo-400 bg-indigo-50' : 'border-gray-300 hover:bg-gray-50 hover:border-indigo-300'
                }`}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {file ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-sm font-semibold text-indigo-600">{file.name}</p>
                      <p className="text-xs text-gray-400 mt-1">{(file.size / 1024).toFixed(1)} KB</p>
                    </>
                  ) : (
                    <>
                      <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                      <p className="mb-2 text-sm text-gray-500"><span className="font-semibold text-indigo-600">Klik untuk upload</span></p>
                      <p className="text-xs text-gray-400">Format .edf didukung</p>
                    </>
                  )}
                </div>
                <input type="file" accept=".edf" className="hidden" onChange={handleFileChange} />
              </label>

              {/* Tombol Analisis */}
              <button
                onClick={handleSubmit}
                disabled={!file || loading}
                className={`w-full mt-6 py-3.5 px-4 rounded-xl text-white font-bold shadow-lg transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 ${
                  loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-500/30'
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Menganalisis...</span>
                  </>
                ) : (
                  <>
                    <span>Mulai Analisis</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>

              {/* Error Message */}
              {error && (
                <div className="mt-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg flex items-center gap-2 animate-pulse">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              )}
            </div>

            {/* Bagian Hasil (Hanya muncul jika sudah ada result) */}
            {result && (
              <div className="border-t border-gray-100 bg-gray-50/50 p-8 animate-fade-in-up">
                <div className="flex flex-col items-center">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Hasil Diagnosa</span>
                  
                  <div className={`text-4xl font-black mb-1 tracking-tight ${
                    result.result === 'STRES' ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {result.result}
                  </div>
                  
                  <div className="mt-4 w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-3 rounded-full transition-all duration-1000 ${
                        result.result === 'STRES' ? 'bg-red-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${result.confidence}%` }}
                    ></div>
                  </div>
                  
                  <div className="mt-2 flex justify-between w-full text-xs font-medium text-gray-500">
                    <span>Akurasi Model</span>
                    <span>{result.confidence}%</span>
                  </div>

                  <div className="mt-6 p-3 bg-white border border-gray-200 rounded-lg w-full text-center">
                    <p className="text-xs text-gray-400">File: {result.filename}</p>
                  </div>
                </div>
              </div>
            )}

          </div>
          
          <p className="text-center text-xs text-gray-400 mt-8">
            &copy; 2025 Mini Project Kecerdasan Buatan. All rights reserved.
          </p>

        </div>
      </main>
    </div>
  );
}

export default App;