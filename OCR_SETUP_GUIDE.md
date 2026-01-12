# OCR Fallback Setup Guide

## ✅ What Was Implemented

A complete **OCR fallback architecture** for processing scanned PDFs. The system automatically detects scanned documents and uses OCR when normal text extraction fails.

## 🏗️ Architecture

```
Upload PDF
   ↓
Try normal text extraction (pdf-parse)
   ↓
IF extracted text < 100 characters
   ↓
Run OCR (PDF → Images → Tesseract)
   ↓
Send OCR text to AI
```

## 🚀 Quick Start

### 1. Install Backend Dependencies

```bash
cd server
npm install
```

**Note:** This will install:
- `pdf-parse` - Fast digital PDF extraction
- `tesseract.js` - OCR engine
- `pdf2pic` - PDF to image conversion
- `canvas` - Image processing

### 2. Start Backend Server

```bash
cd server
npm run dev
```

Server runs on `http://localhost:3001`

### 3. Configure Frontend (Optional)

If your backend runs on a different URL, create a `.env` file in the root:

```env
VITE_BACKEND_URL=http://localhost:3001
```

### 4. Start Frontend

```bash
npm run dev
```

## 📋 How It Works

### Detection Logic

The system uses a **100-character threshold** to detect scanned PDFs:

```javascript
if (extractedText.trim().length < 100) {
  // Treat as scanned PDF → Run OCR
}
```

This is the industry standard for detecting image-based PDFs.

### Processing Flow

1. **Digital PDF** (has selectable text)
   - Normal extraction: `pdf-parse`
   - Time: 1-3 seconds
   - Source: `"digital"`

2. **Scanned PDF** (image-based)
   - OCR fallback: PDF → Images → Tesseract
   - Time: 10-30 seconds
   - Source: `"ocr"`

### Safety Checks

- ✅ Rejects OCR results with < 100 characters (unreadable)
- ✅ Validates file size (50MB limit)
- ✅ Validates file type (PDF only)
- ✅ Error handling at every step

## 🎨 UI Features

### OCR Badge

When OCR is used, a yellow badge appears:

```
🟡 OCR used (scanned document)
```

This:
- Builds user trust
- Explains slower processing
- Looks enterprise-grade

### Processing Messages

- **Digital PDF**: "Extracting text from PDF..."
- **Scanned PDF**: "Running OCR on scanned document... (this may take 10-30 seconds)"

## 🤖 AI Prompt Updates

The AI prompt now includes OCR-specific warnings:

```
⚠️ IMPORTANT: This text was extracted using OCR (Optical Character Recognition) 
from a scanned document. OCR text may contain errors, character misrecognitions, 
or formatting issues.
- Infer values carefully and account for potential OCR errors
- Do NOT hallucinate missing fields - return null if unclear
```

This prevents the AI from:
- ❌ Hallucinating data from OCR errors
- ❌ Making assumptions about unclear text
- ✅ Returning null when uncertain

## 📊 Performance Expectations

| PDF Type | Processing Time | Method |
|----------|----------------|--------|
| Digital PDF | 1-3 sec | pdf-parse |
| Scanned PDF (1-5 pages) | 10-25 sec | OCR |
| Scanned PDF (10+ pages) | 30-60 sec | OCR |

## 🔧 Configuration

### OCR Quality

Edit `server/services/pdfProcessor.js`:

```javascript
const convert = fromBuffer(buffer, {
  density: 200, // Increase for better quality (slower)
  // ...
});
```

### Text Threshold

Edit `server/services/pdfProcessor.js`:

```javascript
const MIN_TEXT_LENGTH = 100; // Adjust threshold
```

### Language Support

Edit `server/services/pdfProcessor.js`:

```javascript
const worker = await createWorker('eng+fra+de'); // Multiple languages
```

## 🐛 Troubleshooting

### Backend Won't Start

**Error:** `Cannot find module 'pdf2pic'`

**Solution:**
```bash
cd server
npm install
```

### OCR is Very Slow

**Cause:** Large PDFs or high DPI settings

**Solution:**
- Reduce `density` in `pdfProcessor.js` (200 → 150)
- Process fewer pages at once
- Use a faster server

### "Unable to extract sufficient text"

**Cause:** PDF quality too low or corrupted

**Solution:**
- Try a higher resolution scan
- Ensure PDF is not corrupted
- Check if PDF is password-protected

### Frontend Can't Connect to Backend

**Error:** `Failed to fetch` or CORS errors

**Solution:**
1. Ensure backend is running on port 3001
2. Check `VITE_BACKEND_URL` in `.env`
3. Verify CORS is enabled in backend (it is by default)

## 📁 File Structure

```
server/
├── index.js              # Express server
├── services/
│   └── pdfProcessor.js  # OCR logic
├── tmp/                 # Temporary images (auto-created)
└── package.json
```

## ✅ Testing

### Test with Digital PDF

1. Upload a PDF with selectable text
2. Should process in 1-3 seconds
3. Should show "Extracted from uploaded document" badge
4. No OCR badge should appear

### Test with Scanned PDF

1. Upload a scanned/image-based PDF
2. Should show "Running OCR..." message
3. Should process in 10-30 seconds
4. Should show "OCR used (scanned document)" badge

## 🎯 Best Practices

1. **Always run backend on server** - Browser OCR is unstable
2. **Show loading indicators** - OCR takes time
3. **Display OCR badge** - Users need to know
4. **Handle errors gracefully** - Some PDFs are unreadable
5. **Cache results** - Avoid re-processing same PDFs

## 🔒 Security Notes

- Backend validates file types (PDF only)
- File size limit: 50MB
- Temporary images are stored in `server/tmp/` (auto-cleaned)
- No sensitive data is logged

## 📚 Additional Resources

- [Tesseract.js Documentation](https://tesseract.projectnaptha.com/)
- [pdf-parse Documentation](https://www.npmjs.com/package/pdf-parse)
- [pdf2pic Documentation](https://www.npmjs.com/package/pdf2pic)

---

**✅ Result:** Your system now handles both digital and scanned PDFs with automatic OCR fallback!
