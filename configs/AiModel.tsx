// const { GoogleGenerativeAI } = require('@google/generative-ai');

// const apiKey = process.env.NEXT_PUBLIC_GEMINI_KEY;
// const genAI = new GoogleGenerativeAI(apiKey);

// const model = genAI.getGenerativeModel({
//   model: 'gemini-2.0-flash-exp',
// });

// const generationConfig = {
//   temperature: 0.9,
//   topP: 0.95,
//   topK: 40,
//   maxOutputTokens: 8192,
//   responseMimeType: 'text/plain',
// };

// const CodeGenerationConfig = {
//   temperature: 0.7,
//   topP: 0.95,
//   topK: 40,
//   maxOutputTokens: 8192,
//   responseMimeType: 'application/json',
// };
const sanitizeAndParseJSON = (text: string) => {
  try {
    // Extract JSON content between triple backticks (```json ... ```) or within curly braces `{...}`
    const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/) || text.match(/({[\s\S]*})/);
    
    if (!jsonMatch) {
      throw new Error("No valid JSON structure found in text.");
    }

    let cleanText = jsonMatch[1].trim(); // Extract JSON content

    // Remove extra whitespace, newlines, and ensure valid JSON structure
    cleanText = cleanText
      .replace(/\r\n/g, "\n") // Normalize newlines
      .replace(/\n\s+/g, "\n") // Trim unnecessary leading spaces on new lines
      .replace(/,(\s*[}\]])/g, "$1") // Remove trailing commas before closing braces/brackets
      .trim();

    return JSON.parse(cleanText);
  } catch (error) {
    console.error("JSON parsing error:", error);
    console.error("Original text:", text);
    throw new Error(`Invalid JSON response: `);
  }
};

// export const chatSession = model.startChat({
//   generationConfig,
//   history: [
//     {
//       role: 'user',
//       parts: [
//         {
//           text: 'You are a helpful AI assistant focused on generating clean, valid JSON responses. Always ensure your JSON output is properly formatted with double quotes around property names.',
//         },
//       ],
//     },
//   ],
// });

// export const GenAiCode = model.startChat({
//   generationConfig: CodeGenerationConfig,
//   history: [],
// });

// // Export the helper function for use in routes
export { sanitizeAndParseJSON };

//  const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
//  console.log(result.response.text());
