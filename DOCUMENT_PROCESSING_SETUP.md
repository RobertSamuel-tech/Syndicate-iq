# Document Processing Setup Guide

## ✅ What Was Fixed

The document processing system was previously returning **hardcoded mock data** regardless of the uploaded PDF. This has been completely fixed to use **real PDF extraction and AI analysis**.

## 🔧 How It Works Now

### Correct Workflow (Implemented)

1. **User uploads PDF** → File is received
2. **Extract raw text from PDF** → Using `pdfjs-dist` library
3. **Send extracted text to AI** → Claude API analyzes the actual document content
4. **AI parses structured data** → Returns JSON with extracted fields
5. **UI renders parsed result** → Shows real data from the document

### Key Features

- ✅ **Real PDF text extraction** - Uses pdfjs-dist to extract text from all pages
- ✅ **AI-powered parsing** - Claude AI analyzes the extracted text
- ✅ **Validation** - Prevents hardcoded/fallback data from being used
- ✅ **Error handling** - Clear error messages if extraction or parsing fails
- ✅ **UI indicators** - Shows which fields were found vs. missing
- ✅ **Confidence scoring** - Displays extraction confidence percentage

## 🚀 Setup Instructions

### 1. Install Dependencies

All required dependencies are already in `package.json`:
- `pdfjs-dist` - PDF text extraction
- `@anthropic-ai/sdk` - Claude AI integration

### 2. Configure API Key

Create a `.env` file in the root directory:

```bash
VITE_ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

**Get your API key from:** https://console.anthropic.com/

### 3. Run the Application

```bash
npm install
npm run dev
```

## 📋 What Changed

### New Files Created

1. **`src/lib/utils/pdfExtractor.ts`**
   - Extracts text from PDF files
   - Validates extraction (requires at least 100 characters)
   - Returns structured extraction results

2. **`src/lib/services/aiDocumentParser.ts`**
   - Sends extracted text to Claude AI
   - Parses AI response into structured loan document data
   - Validates against hardcoded values
   - Calculates confidence scores

### Updated Files

1. **`src/pages/DocumentProcessing.tsx`**
   - Removed all hardcoded mock data
   - Integrated real PDF extraction
   - Integrated AI parsing
   - Added error handling
   - Added UI indicators for extracted vs. missing fields
   - Added confidence score display
   - Added extracted text preview (debug panel)

## 🧪 Testing

### Test with Different PDFs

Upload 3 different PDFs to verify the fix:

| PDF | Expected Result |
|-----|----------------|
| Loan A | Should show different borrower name |
| Loan B | Should show different loan amount |
| Loan C | Missing ESG data should show "Not found in document" |

### If You Still See "Green Energy Corp" or "USD 250,000,000"

This means:
- ❌ API key is not configured (check `.env` file)
- ❌ PDF extraction failed (check browser console)
- ❌ AI parsing returned an error (check error message)

## 🎨 UI Indicators

### Green Badge ✅
- "Extracted from uploaded document" - Confirms real extraction
- Checkmark icons next to found fields

### Yellow Badge ⚠️
- "Not found in document" - Field was not found in the PDF
- Shows honest indication of missing data

### Red Badge ❌
- Error messages if extraction or parsing fails

## 🔍 Debug Features

- **Extracted Text Preview** - Collapsible section showing first 500 characters of extracted text
- **Confidence Score** - Percentage of fields successfully extracted
- **Processing Stages** - Shows current step (extraction vs. AI analysis)

## ⚠️ Important Notes

1. **API Key Required** - The system will not work without a valid Anthropic API key
2. **PDF Quality** - Image-based PDFs (scanned documents) may not extract text properly
3. **Token Limits** - Very large PDFs (>100k characters) are truncated for AI analysis
4. **No Defaults** - The system will show "Not found in document" rather than using placeholder values

## 🐛 Troubleshooting

### "Anthropic API key not configured"
- Create `.env` file with `VITE_ANTHROPIC_API_KEY=your_key`
- Restart the dev server after adding the key

### "Unable to read document text"
- PDF may be image-based (scanned)
- PDF may be corrupted
- Try a different PDF with selectable text

### "Validation failed: Detected hardcoded borrower name"
- This is a safety check preventing default values
- If you see this, the AI may have returned placeholder data
- Check the extracted text preview to verify the PDF was read correctly

## 📊 Confidence Score

The confidence score shows what percentage of expected fields were successfully extracted:
- **90-100%** - Excellent extraction
- **70-89%** - Good extraction
- **50-69%** - Partial extraction
- **<50%** - Poor extraction (many fields missing)

This helps you understand the quality of the document processing.
