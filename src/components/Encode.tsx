import { useState } from 'react';
import { Upload, Lock, Download, Image as ImageIcon } from 'lucide-react';
import { encodeMessage, loadImageToCanvas } from '../utils/steganography';

export default function Encode() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [message, setMessage] = useState('');
  const [encodedImageUrl, setEncodedImageUrl] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string>('');

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setEncodedImageUrl('');
      setError('');
    }
  };

  const handleEncode = async () => {
    if (!selectedFile || !message.trim()) {
      setError('Please select an image and enter a message');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      const canvas = await loadImageToCanvas(selectedFile);
      const encodedCanvas = encodeMessage(canvas, message);

      encodedCanvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          setEncodedImageUrl(url);
        }
      }, 'image/png');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to encode message');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!encodedImageUrl) return;

    const link = document.createElement('a');
    link.href = encodedImageUrl;
    link.download = 'encoded-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    setMessage('');
    setEncodedImageUrl('');
    setError('');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-blue-100 rounded-xl">
            <Lock className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Encode Message</h2>
            <p className="text-gray-600 text-sm">Hide your secret message inside an image</p>
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
              Select Image
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="file-input"
              />
              <label
                htmlFor="file-input"
                className="flex items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 transition-colors cursor-pointer bg-gray-50 hover:bg-blue-50"
              >
                <div className="text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    {selectedFile ? selectedFile.name : 'Click to upload an image'}
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

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Secret Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your secret message here..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-32"
              maxLength={10000}
            />
            <p className="text-xs text-gray-500 mt-1">
              {message.length} / 10,000 characters
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleEncode}
              disabled={!selectedFile || !message.trim() || isProcessing}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  Encode Message
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

          {encodedImageUrl && (
            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Encoded Image</h3>
                </div>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
              <div className="relative rounded-xl overflow-hidden border border-gray-200">
                <img
                  src={encodedImageUrl}
                  alt="Encoded"
                  className="w-full h-64 object-contain bg-gray-100"
                />
              </div>
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  Your message has been successfully hidden in the image. Download it and share it securely!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
