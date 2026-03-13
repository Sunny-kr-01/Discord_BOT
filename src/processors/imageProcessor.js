async function imageProcessor(buffer, mimeType) {

    const base64 = buffer.toString("base64");

    return {
        type: "image",
        mimeType: mimeType,
        data: base64
    };

}

module.exports = imageProcessor;