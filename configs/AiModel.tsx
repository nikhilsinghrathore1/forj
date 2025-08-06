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
    // First check for JSON in code blocks
    const codeBlockMatch = text.match(/```json\s*([\s\S]*?)\s*```/);
    
    if (codeBlockMatch) {
      let cleanText = codeBlockMatch[1].trim();
      
      // Remove extra whitespace, newlines, and ensure valid JSON structure
      cleanText = cleanText
        .replace(/\r\n/g, "\n") // Normalize newlines
        .replace(/\n\s+/g, "\n") // Trim unnecessary leading spaces on new lines
        .replace(/,(\s*[}\]])/g, "$1") // Remove trailing commas before closing braces/brackets
        .trim();

      return JSON.parse(cleanText);
    }

    // Check if the entire text (trimmed) is a JSON object or array
    const trimmedText = text.trim();
    
    // Only try to parse as JSON if it starts with { or [ and ends with } or ]
    if ((trimmedText.startsWith('{') && trimmedText.endsWith('}')) || 
        (trimmedText.startsWith('[') && trimmedText.endsWith(']'))) {
      
      let cleanText = trimmedText
        .replace(/\r\n/g, "\n") // Normalize newlines
        .replace(/\n\s+/g, "\n") // Trim unnecessary leading spaces on new lines
        .replace(/,(\s*[}\]])/g, "$1") // Remove trailing commas before closing braces/brackets
        .trim();

      // Try to parse as JSON
      try {
        return JSON.parse(cleanText);
      } catch (jsonError) {
        // If JSON parsing fails, fall through to string handling
      }
    }

    // Handle as plain string
    // Remove leading and trailing quotes, handling unbalanced quotes
    let result = trimmedText;
    
    // Remove leading quotes (handle multiple quotes)
    while (result.startsWith('"')) {
      result = result.slice(1);
    }
    
    // Remove trailing quotes (handle multiple quotes)  
    while (result.endsWith('"')) {
      result = result.slice(0, -1);
    }
    
    return result;

  } catch (error) {
    // If anything fails, try to return the original text as a fallback
    const trimmedText = text.trim();
    
    // Remove leading and trailing quotes, handling unbalanced quotes
    let result = trimmedText;
    
    // Remove leading quotes (handle multiple quotes)
    while (result.startsWith('"')) {
      result = result.slice(1);
    }
    
    // Remove trailing quotes (handle multiple quotes)  
    while (result.endsWith('"')) {
      result = result.slice(0, -1);
    }
    
    return result;
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
