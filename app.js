// Configure PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdfjs/pdf.worker.js';

// Function to load and render PDF
function loadPDF() {
  var url = document.getElementById('urlInput').value;
  var loadingTask = pdfjsLib.getDocument(url);
  
  loadingTask.promise.then(function(pdf) {
    console.log('PDF loaded');
    
    // Fetch the first page
    pdf.getPage(1).then(function(page) {
      console.log('Page loaded');
      
      var scale = 1.5;
      var viewport = page.getViewport({ scale: scale });
      
      // Prepare canvas using PDF page dimensions
      var canvas = document.getElementById('pdfCanvas');
      var context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      
      // Render PDF page into canvas context
      var renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      var renderTask = page.render(renderContext);
      renderTask.promise.then(function() {
        console.log('Page rendered');
      });
    });
  }, function (reason) {
    console.error(reason);
  });
}
