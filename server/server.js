const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/generate-story", async (req, res) => {
  try {
    const {
      name,
      age,
      interest,
      character,
      theme,
      lesson
    } = req.body;

    const prompt = `
Create a fun, safe and age-appropriate children's story.

Child's name: ${name}
Age: ${age}
Favorite interest: ${interest}
Character: ${character}
Story theme: ${theme}
Lesson: ${lesson}

Requirements:
- Write a creative story suitable for the child's age.
- Make the child the main character.
- Make the story exciting and imaginative.
- Use simple language.
- Include a beginning, middle and ending.
- Include a positive lesson.
- Include one fun activity the child can do after reading.
- Do not include violence, scary content, inappropriate content,
  romance, or dangerous instructions.

Return ONLY valid JSON.

Use exactly this format:

{
  "title": "Story title",
  "paragraphs": [
    "Paragraph 1",
    "Paragraph 2",
    "Paragraph 3",
    "Paragraph 4"
  ],
  "lesson": "What the child learned",
  "activity": "Fun activity related to the story"
}
`;

    const response = await fetch(
      "http://localhost:11434/api/generate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          model: "llama3.2",
          prompt: prompt,
          stream: false,
          format: "json"
        })
      }
    );

    if (!response.ok) {
      throw new Error(
        `Ollama error: ${response.status}`
      );
    }

    const data = await response.json();

    console.log("Ollama response:");
    console.log(data.response);

    const story = JSON.parse(data.response);

    res.json(story);

  } catch (error) {
    console.error(
      "Story generation error:",
      error
    );

    res.status(500).json({
      error: "Unable to generate story"
    });
  }
});

app.listen(5001, () => {
  console.log(
    "AI Story Server running on http://localhost:5001"
  );
});