# 🔐 SteganoSafe  
### Secure Image Steganography Web Application

## 📌 Overview
**SteganoSafe** is a **web-based steganography application** developed for **educational and cybersecurity learning purposes**.  
It allows users to **securely hide secret text inside images** and later **extract the hidden message using a password**.

The project combines **steganography + encryption** to demonstrate **confidential communication techniques** used in information security.

⚠️ **Disclaimer:**  
This project is intended **only for ethical and educational use**.

---

## 🎯 Project Objectives
- Understand **image-based steganography (LSB technique)**
- Implement **secure message hiding**
- Apply **AES encryption** for confidentiality
- Learn **secure file handling in web applications**
- Demonstrate cybersecurity concepts practically

---

## 🛠️ Tech Stack

### Backend
- Python (Flask)
- Pillow (PIL) – Image processing
- cryptography (Fernet / AES encryption)

### Frontend
- HTML5
- CSS3
- JavaScript (Vanilla)

---

## 🔐 Security Features
- AES encryption of secret message before embedding
- Password-based encryption and decryption
- File type validation (PNG, JPG only)
- File size validation
- No permanent storage of uploaded images
- Secure temporary file handling
- Input validation and sanitization

---

## 🧠 Steganography Technique Used
- **LSB (Least Significant Bit) Steganography**
- Encrypted message bits are embedded into image pixel data
- Visual quality of image remains unchanged
- Message can only be extracted with the correct password

---

## 🧩 Features

### Encode (Hide Message)
- Upload an image
- Enter secret text
- Set a password
- Encrypt and embed message into image
- Download the encoded image

### Decode (Extract Message)
- Upload encoded image
- Enter password
- Decrypt and extract hidden message
- Error shown if password is incorrect

---

## 🎨 UI Features
- Clean cybersecurity-themed interface
- Separate pages for:
  - Encode
  - Decode
- Image preview before processing
- Success and error messages
- Responsive layout (desktop-first)

---

## 📂 Project Structure



steganosafe/
│
├── app.py
├── requirements.txt
├── README.md
│
├── templates/
│ ├── encode.html
│ ├── decode.html
│
├── static/
│ ├── css/
│ └── js/
│
└── utils/
├── steganography.py
└── encryption.py


---

## ⚙️ How to Run the Project

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/steganosafe.git
cd steganosafe

2️⃣ Install Dependencies
pip install -r requirements.txt

3️⃣ Run the Application
python app.py

4️⃣ Open in Browser
http://127.0.0.1:5000

🚨 Security & Ethical Notice

Do NOT use this project for illegal activities

Do NOT hide malicious content

This project is for learning and demonstration only

📚 Learning Outcomes

Practical steganography implementation

Encryption + data hiding workflow

Secure file upload handling

Web security best practices

Cybersecurity-focused development mindset

🚀 Future Enhancements

Support for hiding files (PDF, text)

Stronger key derivation (PBKDF2 / Argon2)

Image capacity indicator

Drag-and-drop UI

Deployment on cloud

👨‍💻 Author
(Muhammad Sufyan Ayaz)

Mustafa
Bachelor’s in Cybersecurity
Web Security & Information Security Enthusiast
