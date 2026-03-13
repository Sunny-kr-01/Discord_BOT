// const parser = require("pptx-parser");

// async function pptProcessor(buffer) {

//     const slides = await parser.parse(buffer);

//     let text = "";

//     slides.forEach((slide, index) => {

//         text += `Slide ${index + 1}:\n`;

//         slide.texts.forEach(t => {
//             text += t + "\n";
//         });

//         text += "\n";

//     });

//     return {
//         type: "text",
//         content: text
//     };

// }

// module.exports = pptProcessor;