const pdf = require("pdf-parse");

async function pdfProcessor(buffer) {

    const data = await pdf(buffer);

    return {
        type: "text",
        content: data.text
    };

}

module.exports = pdfProcessor;