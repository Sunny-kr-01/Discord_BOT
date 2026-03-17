const pdfParse = require("pdf-parse");
const chunkText = require("../utils/chunkText");

async function pdfProcessor(buffer) {
    console.log(pdfParse)

    //const data = await pdfParse(buffer);

    //const chunks = chunkText(data.text);

    return {
        // type: "textChunks",
        // chunks: chunks
        "Hello": "This is a placeholder response from the PDF processor. The actual PDF parsing logic is currently commented out for testing purposes."
    };
}

module.exports = pdfProcessor;