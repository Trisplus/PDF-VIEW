const viewerContainer = document.getElementById('viewerContainer');
const pdfUrlInput = document.getElementById('pdfUrl');

function loadPDF() {
  const url = pdfUrlInput.value;

  // Clear any existing PDF content
  viewerContainer.innerHTML = '';

  pdfjsLib.getDocument(url)
    .promise
    .then(pdf => {
      const viewer = new pdfjsLib.PDFViewer({
        container: viewerContainer,
      });
      viewerContainer.appendChild(viewer.container);

      viewer.setDocument(pdf);
    })
    .catch(error => {
      console.error('Error loading PDF:', error);
      viewerContainer.innerHTML = 'Error loading PDF';
    });
}

// Initial load if a default URL is provided
const defaultPdfUrl = 'https://example.com/your-pdf.pdf'; // Replace with your default URL
if (defaultPdfUrl) {
  pdfUrlInput.value = defaultPdfUrl;
  loadPDF();
}
