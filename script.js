const urlInput = document.createElement('input');
urlInput.type = 'text';
urlInput.placeholder = 'Enter PDF URL';

const loadButton = document.createElement('button');
loadButton.textContent = 'Load PDF';

const pdfViewer = document.getElementById('pdf-viewer');

document.body.insertBefore(urlInput, pdfViewer);
document.body.insertBefore(loadButton, pdfViewer);

loadButton.addEventListener('click', () => {
    const url = urlInput.value;
    pdfjsLib.getDocument(url).promise.then((pdf) => {
        // Load the first page
        pdf.getPage(1).then((page) => {
            const viewport = page.getViewport({ scale: 1.0 });
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            pdfViewer.appendChild(canvas);

            page.render({ canvasContext: context, viewport }).promise.then(() => {
                // You can add more logic here for displaying multiple pages, zooming, etc.
            });
        });
    });
});
