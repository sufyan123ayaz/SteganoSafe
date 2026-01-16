import { useState } from 'react';
import { Upload, Unlock, Copy, Check } from 'lucide-react';
import { decodeMessage, loadImageToCanvas } from '../utils/steganography';

export default function Decode() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [decodedMessage, setDecodedMessage] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setDecodedMessage('');
      setError('');
    }
  };

  const handleDecode = async () => {
    if (!selectedFile) {
      setError('Please select an image');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      const canvas = await loadImageToCanvas(selectedFile);
      const message = decodeMessage(canvas);
      setDecodedMessage(message);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to decode message');
      setDecodedMessage('');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = async () => {
    if (!decodedMessage) return;

    try {
      await navigator.clipboard.writeText(decodedMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setError('Failed to copy to clipboard');
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    setDecodedMessage('');
    setError('');
    setCopied(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-green-100 rounded-xl">
            <Unlock className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Decode Message</h2>
            <p className="text-gray-600 text-sm">Extract hidden messages from images</p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Encoded Image
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="decode-file-input"
              />
              <label
                htmlFor="decode-file-input"
                className="flex items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-green-500 transition-colors cursor-pointer bg-gray-50 hover:bg-green-50"
              >
                <div className="text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    {selectedFile ? selectedFile.name : 'Click to upload an encoded image'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                </div>
              </label>
            </div>
          </div>

          {previewUrl && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Preview
              </label>
              <div className="relative rounded-xl overflow-hidden border border-gray-200">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-64 object-contain bg-gray-100"
                />
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={handleDecode}
              disabled={!selectedFile || isProcessing}
              className="flex-1 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Unlock className="w-5 h-5" />
                  Decode Message
                </>
              )}
            </button>
            <button
              onClick={handleReset}
              className="px-6 py-3 rounded-xl font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Reset
            </button>
          </div>

          {decodedMessage && (
            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Decoded Message</h3>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-green-600" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <div className="relative rounded-xl border border-gray-200 bg-gray-50 p-4">
                <p className="text-gray-800 whitespace-pre-wrap break-words">
                  {decodedMessage}
                </p>
              </div>
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  Successfully extracted the hidden message from the image!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
