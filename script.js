function loadPDF() {
  const pdfUrlInput = document.getElementById('pdfUrlInput');
  const pdfUrl = pdfUrlInput.value;
  const container = document.getElementById('viewerContainer');

  // Clear previous content
  container.innerHTML = '';

  // Basic error handling for empty input
  if (!pdfUrl) {
    alert('Please enter a PDF URL');
    return;
  }

  pdfjsLib.getDocument(pdfUrl).promise.then(function(pdf) {
    const numPages = pdf.numPages;
    const loadPagePromises = [];

    for (let i = 1; i <= numPages; i++) {
      loadPagePromises.push(pdf.getPage(i));
    }

    Promise.all(loadPagePromises).then(function(pages) {
      pages.forEach(function(page, index) {
        const viewport = page.getViewport({ scale: 1.0 });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        container.appendChild(canvas);

        const context = canvas.getContext('2d');
        page.render({ canvasContext: context, viewport: viewport }).promise.then(function() {
          // Page rendered successfully
        });
      });
    }).catch(function(error) {
      console.error('Error loading PDF:', error);
      // Handle error, e.g., display an error message to the user
    });
  }).catch(function(error) {
    console.error('Error fetching PDF:', error);
    // Handle error, e.g., display an error message to the user
  });
}
