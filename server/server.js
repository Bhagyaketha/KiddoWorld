const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());


// ===============================
// DATABASE: db.json
// ===============================

const dbPath = path.join(__dirname, "../data/db.json");

function getDatabase() {
  const data = fs.readFileSync(dbPath, "utf8");
  return JSON.parse(data);
}

const collections = [
  "toys",
  "categories",
  "ageGroups",
  "interests",
  "giftProducts",
  "clothing",
  "books",
  "schoolSupplies",
  "artsCrafts",
  "sports",
  "deals",
  "users",
  "wishlist",
  "cart",
  "orders"
];

collections.forEach((collection) => {
  app.get(`/${collection}`, (req, res) => {
    try {
      const db = getDatabase();

      if (!db[collection]) {
        return res.status(404).json({
          error: `${collection} not found`
        });
      }

      res.json(db[collection]);

    } catch (error) {
      console.error(`${collection} error:`, error);

      res.status(500).json({
        error: `Unable to read ${collection}`
      });
    }
  });
});
// ===============================
// GET USER BY ID
// ===============================

app.get("/users/:id", (req, res) => {
  try {
    const db = getDatabase();

    const user = db.users.find(
      (u) => String(u.id) === String(req.params.id)
    );

    if (!user) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    res.json(user);

  } catch (error) {
    console.error("User fetch error:", error);

    res.status(500).json({
      error: "Unable to fetch user"
    });
  }
});
// ===============================
// GET GIFT BY ID
// ===============================

app.get("/giftProducts/:id", (req, res) => {
  try {
    const db = getDatabase();

    const gift = db.giftProducts.find(
      (item) => String(item.id) === String(req.params.id)
    );

    if (!gift) {
      return res.status(404).json({
        error: "Gift not found"
      });
    }

    res.json(gift);

  } catch (error) {
    console.error("Gift fetch error:", error);

    res.status(500).json({
      error: "Unable to fetch gift"
    });
  }
});

// ===============================
// CREATE ORDER
// ===============================

app.post("/orders", (req, res) => {
  try {
    const db = getDatabase();

    if (!db.orders) {
      db.orders = [];
    }

    const newOrder = {
      id: Date.now().toString(),
      ...req.body
    };

    db.orders.push(newOrder);

    fs.writeFileSync(
      dbPath,
      JSON.stringify(db, null, 2),
      "utf8"
    );

    res.status(201).json(newOrder);

  } catch (error) {
    console.error("Order creation error:", error);

    res.status(500).json({
      error: "Unable to create order"
    });
  }
});


// ===============================
// AI STORY GENERATION - OLLAMA
// ===============================

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


// ===============================
// SERVER
// ===============================

const PORT = process.env.PORT || 5001;

app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `AI Story Server running on port ${PORT}`
  );
});