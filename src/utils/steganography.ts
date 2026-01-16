export const encodeMessage = (
  canvas: HTMLCanvasElement,
  message: string
): HTMLCanvasElement => {
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  const messageLength = message.length;
  const messageBinary = stringToBinary(message);
  const lengthBinary = numberToBinary(messageLength, 32);

  const totalBinary = lengthBinary + messageBinary;

  if (totalBinary.length > data.length * 0.75) {
    throw new Error('Message is too long for this image');
  }

  let binaryIndex = 0;

  for (let i = 0; i < data.length && binaryIndex < totalBinary.length; i += 4) {
    for (let j = 0; j < 3 && binaryIndex < totalBinary.length; j++) {
      const bit = parseInt(totalBinary[binaryIndex]);
      data[i + j] = (data[i + j] & 0xfe) | bit;
      binaryIndex++;
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
};

export const decodeMessage = (canvas: HTMLCanvasElement): string => {
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  let lengthBinary = '';
  let binaryIndex = 0;

  for (let i = 0; i < data.length && binaryIndex < 32; i += 4) {
    for (let j = 0; j < 3 && binaryIndex < 32; j++) {
      lengthBinary += (data[i + j] & 1).toString();
      binaryIndex++;
    }
  }

  const messageLength = binaryToNumber(lengthBinary);

  if (messageLength <= 0 || messageLength > 100000) {
    throw new Error('No valid message found in image');
  }

  let messageBinary = '';
  const totalBitsNeeded = messageLength * 8;

  for (
    let i = Math.ceil(32 / 3) * 4;
    i < data.length && messageBinary.length < totalBitsNeeded;
    i += 4
  ) {
    for (let j = 0; j < 3 && messageBinary.length < totalBitsNeeded; j++) {
      messageBinary += (data[i + j] & 1).toString();
    }
  }

  return binaryToString(messageBinary);
};

const stringToBinary = (str: string): string => {
  return str
    .split('')
    .map((char) => {
      return char.charCodeAt(0).toString(2).padStart(8, '0');
    })
    .join('');
};

const binaryToString = (binary: string): string => {
  const chars = binary.match(/.{1,8}/g) || [];
  return chars.map((byte) => String.fromCharCode(parseInt(byte, 2))).join('');
};

const numberToBinary = (num: number, bits: number): string => {
  return num.toString(2).padStart(bits, '0');
};

const binaryToNumber = (binary: string): number => {
  return parseInt(binary, 2);
};

export const loadImageToCanvas = (
  file: File
): Promise<HTMLCanvasElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }
        ctx.drawImage(img, 0, 0);
        resolve(canvas);
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};
