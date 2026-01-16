import { useState } from 'react';
import { Lock, Unlock, Shield, Eye, EyeOff } from 'lucide-react';
import Encode from './components/Encode';
import Decode from './components/Decode';

type Tab = 'encode' | 'decode';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('encode');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Steganography Lab
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hide and reveal secret messages within images using advanced LSB steganography.
            Perfect for educational cybersecurity purposes.
          </p>
        </header>

        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-2xl p-2 shadow-lg inline-flex gap-2">
            <button
              onClick={() => setActiveTab('encode')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'encode'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Eye className="w-5 h-5" />
              Encode
            </button>
            <button
              onClick={() => setActiveTab('decode')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'decode'
                  ? 'bg-green-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <EyeOff className="w-5 h-5" />
              Decode
            </button>
          </div>
        </div>

        <main className="mb-12">
          {activeTab === 'encode' ? <Encode /> : <Decode />}
        </main>

        <footer className="mt-16 pt-8 border-t border-gray-200">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-blue-600" />
                How It Works
              </h3>
              <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Encoding Process</h4>
                  <p>
                    Uses LSB (Least Significant Bit) steganography to hide your message in the image pixels.
                    The message is converted to binary and embedded in the least significant bits of the RGB values,
                    making it invisible to the human eye while preserving the original image appearance.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Decoding Process</h4>
                  <p>
                    Extracts the hidden message by reading the least significant bits from the image pixels
                    and converting them back to text. Only images encoded with this tool can be decoded successfully.
                  </p>
                </div>
              </div>
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800 flex items-start gap-2">
                  <Shield className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Educational Purpose:</strong> This tool is designed for learning about steganography
                    and digital security concepts. All processing happens locally in your browser - no data is sent to any server.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </footer>

        <div className="text-center text-gray-500 text-sm mt-8">
          <p>Built with React, TypeScript, and Tailwind CSS</p>
        </div>
      </div>
    </div>
  );
}

export default App;
