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
// AI STORY GENERATION - FREE TEMPLATE
// ===============================

app.post("/generate-story", (req, res) => {
  try {
    const {
      name,
      age,
      interest,
      character,
      theme,
      lesson
    } = req.body;

    const childName = name || "the little hero";
    const childAge = age || "6";
    const childInterest = interest || "adventure";
    const childCharacter = character || "brave explorer";
    const storyTheme = theme || "friendship";
    const storyLesson = lesson || "being kind and helping others";

    const stories = [
      {
        title: `${childName}'s Magical ${childInterest} Adventure`,
        paragraphs: [
          `One bright morning, ${childName}, a ${childAge}-year-old ${childCharacter}, discovered a magical world connected to ${childInterest}. Everything around them looked colorful and wonderful.`,

          `${childName} decided to explore the amazing place. Along the way, they met a friendly little friend who needed help. Instead of continuing alone, ${childName} stopped and offered help.`,

          `Together, they solved a small problem and continued their adventure. ${childName} discovered that working together made the journey even more exciting and fun.`,

          `At the end of the day, ${childName} returned home with a big smile. The adventure taught ${childName} that ${storyLesson} can make every day more special.`
        ],
        lesson: storyLesson,
        activity: `Draw a picture of ${childName}'s magical ${childInterest} adventure.`
      },

      {
        title: `The Brave ${childName}`,
        paragraphs: [
          `Once upon a time, ${childName} was a curious ${childCharacter} who loved ${childInterest}. One day, ${childName} found a mysterious path leading to a beautiful new place.`,

          `At first, ${childName} was unsure what to do. But with courage and a positive attitude, ${childName} decided to follow the path and discover what was waiting ahead.`,

          `During the journey, ${childName} met others who needed help. ${childName} shared ideas, listened carefully, and worked together with them.`,

          `By the end of the adventure, everyone was happy. ${childName} learned that ${storyLesson} is one of the greatest strengths a person can have.`
        ],
        lesson: storyLesson,
        activity: `Tell someone about your favorite part of ${childName}'s adventure.`
      }
    ];

    // Select a story template
    const story = stories[
      Math.floor(Math.random() * stories.length)
    ];

    res.json(story);

  } catch (error) {
    console.error("Story generation error:", error);

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