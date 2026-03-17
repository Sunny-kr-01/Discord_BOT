async function downloadFile(url) {
    const response = await fetch(url);

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Failed to download file");
        }

        const buffer = Buffer.from(await response.arrayBuffer());

        return buffer;

    } catch (error) {

        console.error("FILE DOWNLOAD ERROR:", error);

        throw new Error("File download failed");

    }

}

module.exports ={ downloadFile };