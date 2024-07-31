const viewerContainer = document.getElementById('viewerContainer');
const pdfUrlInput = document.getElementById('pdfUrl');
const loadPdfButton = document.getElementById('loadPdfButton'); // Assuming a button with id 'loadPdfButton'

function loadPDF() {
  const url = pdfUrlInput.value;

  // Clear the viewer container
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

// Assuming the button has an id 'loadPdfButton'
loadPdfButton.addEventListener('click', loadPDF);
