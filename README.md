# File Upload System

A full-stack file upload application built with **React**, **Node.js**, **Express.js**, **MongoDB**, and **AWS S3**.

Users upload images and videos through a React frontend. The Express backend validates the files and stores them in an S3 bucket, while file metadata is saved in MongoDB.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, Axios |
| Backend | Node.js, Express.js, express-fileupload, CORS |
| Database | MongoDB, Mongoose |
| Cloud Storage | Amazon S3, AWS SDK v3 |

---

## Project Structure

```text
FileUploadSystem/
├── backend/
│   ├── config/
│   │   ├── aws.js
│   │   └── database.js
│   ├── controllers/
│   │   └── fileController.js
│   ├── models/
│   │   └── fileModel.js
│   ├── routes/
│   │   └── fileRoutes.js
│   ├── .env
│   ├── index.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── UploadBox.jsx
│   │   │   └── FileCard.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

---

## Features

- Image and video upload
- File type validation
- AWS S3 cloud storage
- MongoDB metadata storage
- REST API with Express
- Responsive dark-themed UI

---

## How It Works

```
React Frontend (5173) → Axios → Express Backend (4000) → Controller → AWS S3
                                        │
                                        └──► MongoDB (metadata)
```

**Upload flow:** User selects a file → sent via Axios to the backend → validated by the controller → uploaded to S3 → S3 URL returned to the frontend.

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/sahilhinge89/FileUploadSystem.git
cd FileUploadSystem
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
PORT=4000
MONGODB_URL=your_mongodb_connection_string

AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=ap-south-1
AWS_BUCKET_NAME=your_s3_bucket_name
```

> ⚠️ Never commit your `.env` file.

Start the backend:

```bash
npm start
```
Runs on `http://localhost:4000`

### 3. Frontend setup

```bash
cd frontend
npm install
npm run dev
```
Runs on `http://localhost:5173`

---

## API Reference

Base URL: `http://localhost:4000/api/v1/upload`

### Local file upload
`POST /localFileUpload`
| Field | Type |
|---|---|
| file | File |

### Image upload
`POST /imageUpload`
| Field | Type |
|---|---|
| name | Text |
| tags | Text |
| email | Text |
| imagefiles | File |

Supported formats: `jpg`, `jpeg`, `png`

### Video upload
`POST /videoUpload`
| Field | Type |
|---|---|
| name | Text |
| tags | Text |
| email | Text |
| videoFile | File |

Supported formats: `mp4`, `mov`, `mkv`, `avi`

### Example response

```json
{
  "success": true,
  "message": "Image successfully uploaded",
  "imageUrl": "https://your-bucket.s3.ap-south-1.amazonaws.com/images/example.png",
  "fileKey": "images/example.png"
}
```

---

## Security

Never commit the following:

```
.env
node_modules/
```

Never expose AWS credentials (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`) in frontend code or public repositories.

---

## Project Status

| Component | Status |
|---|---|
| Frontend | ✅ Done |
| Backend | ✅ Done |
| MongoDB | ✅ Done |
| Image/Video Upload | ✅ Done |
| AWS S3 | ✅ Integrated |
| Authentication | 🔄 Planned |
| File Management (list/delete/preview) | 🔄 Planned |
| Deployment & CI/CD | 🔄 Planned |

---

## Future Improvements

- JWT authentication & user-specific storage
- File listing, deletion, download & preview
- Multiple file uploads, size validation, search & filtering
- S3 presigned URLs, CloudFront, and IAM least-privilege policies
- Docker + CI/CD (GitHub Actions) deployment pipeline

---

## Author

**Sahil Hinge**
