function loadPDF() {
    const url = document.getElementById('pdf-url').value;
    if (url) {
        const loadingTask = pdfjsLib.getDocument(url);
        loadingTask.promise.then(pdf => {
            pdf.getPage(1).then(page => {
                const scale = 1.5;
                const viewport = page.getViewport({ scale: scale });

                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                const renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };

                page.render(renderContext);
                document.getElementById('pdf-container').appendChild(canvas);
            });
        }).catch(error => {
            console.error('Error loading PDF:', error);
        });
    }
}