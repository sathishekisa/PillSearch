
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { MedicineData } from "../types";

const apiKey = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey });

const medicineSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    name: {
      type: Type.STRING,
      description: "The name of the identified medicine or generic name.",
    },
    summary: {
      type: Type.STRING,
      description: "A 1-2 sentence description of what the medicine does in very simple, normal fluency language.",
    },
    uses: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of common uses in simple terms.",
    },
    dosage_note: {
      type: Type.STRING,
      description: "General information about how it is typically taken.",
    },
    side_effects: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Common side effects in simple terms.",
    },
    warnings: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Important warnings or contraindications.",
    },
    alternates: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of common generic alternatives or similar brand medicines.",
    },
    is_medicine: {
      type: Type.BOOLEAN,
      description: "True if the input is identified as a medicine.",
    },
  },
  required: ["name", "summary", "uses", "dosage_note", "side_effects", "warnings", "alternates", "is_medicine"],
};

export const analyzeMedicine = async (
  inputText: string | null,
  imageBase64: string | null
): Promise<MedicineData> => {
  if (!apiKey) {
    throw new Error("API Key is missing. Please check your configuration.");
  }

  try {
    const model = "gemini-2.5-flash";

    // MODE 1: IMAGE ANALYSIS (Use structured JSON Schema)
    if (imageBase64) {
      const systemInstruction = `
        You are PillSearch. Identify the medicine in the image.
        Explain it in very simple, "normal fluency" language.
        Prioritize safety.
        Provide a list of common generic or brand alternatives in the 'alternates' field.
      `;

      const parts: any[] = [];
      const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");
      parts.push({
        inlineData: {
          data: cleanBase64,
          mimeType: "image/jpeg",
        },
      });
      parts.push({ text: "Identify this medicine, provide details and alternatives." });

      const response = await ai.models.generateContent({
        model,
        contents: { parts },
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: medicineSchema,
          temperature: 0.2,
        },
      });

      const jsonText = response.text;
      if (!jsonText) throw new Error("No response received from AI.");
      return JSON.parse(jsonText) as MedicineData;
    } 
    
    // MODE 2: TEXT SEARCH (Use Google Search Tool)
    else if (inputText) {
      const systemInstruction = `
        You are PillSearch.
        Search for the medicine "${inputText}". 
        Find its common uses, specific side effects, common generic or brand alternatives.
        
        Return the result AS A VALID JSON OBJECT string with the following structure:
        {
          "name": "Medicine Name",
          "summary": "Simple description",
          "uses": ["use 1", "use 2"],
          "dosage_note": "General dosage info",
          "side_effects": ["side effect 1", "side effect 2"],
          "warnings": ["warning 1", "warning 2"],
          "alternates": ["Alt 1", "Alt 2"],
          "is_medicine": true/false
        }
        
        Ensure "side_effects" are comprehensive but easy to understand.
        Do not use markdown code blocks. Just the JSON string.
      `;

      const response = await ai.models.generateContent({
        model,
        contents: { parts: [{ text: `Provide information for medicine: ${inputText}` }] },
        config: {
          systemInstruction,
          tools: [{ googleSearch: {} }],
        },
      });

      // Extract JSON from text (it might be wrapped in ```json ... ``` or just text)
      let jsonStr = response.text || "{}";
      const jsonMatch = jsonStr.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        jsonStr = jsonMatch[0];
      }

      let data: MedicineData;
      try {
        data = JSON.parse(jsonStr);
      } catch (e) {
        console.error("Failed to parse JSON from search result", jsonStr);
        throw new Error("Could not structure the search results. Please try again.");
      }

      // Extract Grounding Metadata (Sources)
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (groundingChunks) {
        data.sources = groundingChunks
          .map((chunk) => {
             if (chunk.web) {
                 return { title: chunk.web.title || "Source", uri: chunk.web.uri || "" };
             }
             return null;
          })
          .filter((s): s is { title: string; uri: string } => s !== null && !!s.uri);
      }

      return data;
    }

    throw new Error("No input provided.");

  } catch (error: any) {
    console.error("Gemini Analysis Error:", error);
    throw new Error(error.message || "Failed to analyze medicine.");
  }
};