export class Exporter {
    static exportSVG(svgElement) {
        if (!svgElement) return;
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const svgUrl = URL.createObjectURL(svgBlob);
        const downloadLink = document.createElement('a');
        downloadLink.href = svgUrl;
        downloadLink.download = 'illustration.svg';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    static async exportPNG(svgElement) {
        // Implementation for PNG export via Canvas
        console.log('Exporting as PNG...');
    }
}
