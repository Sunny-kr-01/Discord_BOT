async function downloadFile(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Failed to download file: ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return buffer;
}

module.exports = downloadFile;