import React, { useState } from "react";
import axios from "axios";
import "../styles/aistorymaker.css";

const AIStoryMaker = () => {

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    interest: "",
    character: "",
    theme: "",
    lesson: ""
  });

  const [story, setStory] = useState(null);

  const [loading, setLoading] = useState(false);


  // Handle form changes
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };


  // Generate AI Story
  const generateStory = async () => {

    // Check all fields
    if (
      !formData.name ||
      !formData.age ||
      !formData.interest ||
      !formData.character ||
      !formData.theme ||
      !formData.lesson
    ) {

      alert("Please fill in all the details!");

      return;
    }


    try {

      setLoading(true);

      setStory(null);


      // Send data to our backend
       const response = await axios.post(
  `${import.meta.env.VITE_API_URL}/generate-story`,
  formData
);

      // Store generated story
      setStory(response.data);


    } catch (error) {

      console.error("Story generation error:", error);

      alert(
        "Sorry! We couldn't create your story. Please make sure the AI server is running."
      );

    } finally {

      setLoading(false);

    }

  };


  // Create another story
  const createAnotherStory = () => {

    setStory(null);

    setFormData({
      name: "",
      age: "",
      interest: "",
      character: "",
      theme: "",
      lesson: ""
    });

  };


  return (

    <div className="story-page">


      {/* ================= HEADER ================= */}

      <div className="story-header">

        <div className="story-icon">
          ✨
        </div>

        <h1>
          KiddoWorld AI Story Maker
        </h1>

        <p>
          Create a magical story made especially
          for your little explorer!
        </p>

      </div>



      {/* ================= FORM ================= */}

      {!story && !loading && (

        <div className="story-form">


          {/* NAME */}

          <div className="form-group">

            <label>
              👧 Child's Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter child's name"
              value={formData.name}
              onChange={handleChange}
            />

          </div>



          {/* AGE */}

          <div className="form-group">

            <label>
              🎂 Age
            </label>

            <select
              name="age"
              value={formData.age}
              onChange={handleChange}
            >

              <option value="">
                Select age
              </option>

              <option value="3">
                3 years
              </option>

              <option value="4">
                4 years
              </option>

              <option value="5">
                5 years
              </option>

              <option value="6">
                6 years
              </option>

              <option value="7">
                7 years
              </option>

              <option value="8">
                8 years
              </option>

              <option value="9">
                9 years
              </option>

              <option value="10">
                10 years
              </option>

              <option value="11">
                11 years
              </option>

              <option value="12">
                12 years
              </option>

            </select>

          </div>



          {/* INTEREST */}

          <div className="form-group">

            <label>
              ❤️ Favorite Interest
            </label>

            <select
              name="interest"
              value={formData.interest}
              onChange={handleChange}
            >

              <option value="">
                Choose an interest
              </option>

              <option value="Space">
                🚀 Space
              </option>

              <option value="Dinosaurs">
                🦖 Dinosaurs
              </option>

              <option value="Science">
                🔬 Science
              </option>

              <option value="Animals">
                🐼 Animals
              </option>

              <option value="Art">
                🎨 Art
              </option>

              <option value="Sports">
                ⚽ Sports
              </option>

              <option value="Magic">
                🪄 Magic
              </option>

              <option value="Adventure">
                🏝️ Adventure
              </option>

            </select>

          </div>



          {/* CHARACTER */}

          <div className="form-group">

            <label>
              🦸 Character
            </label>

            <select
              name="character"
              value={formData.character}
              onChange={handleChange}
            >

              <option value="">
                Choose a character
              </option>

              <option value="brave explorer">
                🚀 Brave Explorer
              </option>

              <option value="young scientist">
                🔬 Young Scientist
              </option>

              <option value="curious detective">
                🕵️ Curious Detective
              </option>

              <option value="creative artist">
                🎨 Creative Artist
              </option>

              <option value="little superhero">
                🦸 Little Superhero
              </option>

              <option value="kind adventurer">
                🌟 Kind Adventurer
              </option>

            </select>

          </div>



          {/* STORY THEME */}

          <div className="form-group">

            <label>
              🌎 Story Theme
            </label>

            <select
              name="theme"
              value={formData.theme}
              onChange={handleChange}
            >

              <option value="">
                Choose a theme
              </option>

              <option value="magical">
                🪄 Magical
              </option>

              <option value="mysterious">
                🔮 Mysterious
              </option>

              <option value="fun-filled">
                🎉 Fun-filled
              </option>

              <option value="exciting">
                ⚡ Exciting
              </option>

              <option value="fantasy">
                🏰 Fantasy
              </option>

              <option value="science adventure">
                🔬 Science Adventure
              </option>

            </select>

          </div>



          {/* LESSON */}

          <div className="form-group">

            <label>
              💡 Lesson
            </label>

            <select
              name="lesson"
              value={formData.lesson}
              onChange={handleChange}
            >

              <option value="">
                Choose a lesson
              </option>

              <option value="the importance of teamwork">
                🤝 Teamwork
              </option>

              <option value="the importance of kindness">
                ❤️ Kindness
              </option>

              <option value="never giving up">
                💪 Never Give Up
              </option>

              <option value="believing in yourself">
                ⭐ Self Confidence
              </option>

              <option value="being curious and learning">
                🧠 Curiosity
              </option>

              <option value="helping others">
                🤗 Helping Others
              </option>

            </select>

          </div>



          {/* GENERATE BUTTON */}

          <button
            className="generate-btn"
            onClick={generateStory}
          >

            ✨ Create My Story

          </button>

        </div>

      )}



      {/* ================= LOADING ================= */}

      {loading && (

        <div className="loading-box">

          <div className="loading-icon">
            ✨
          </div>

          <h2>
            Creating your magical story...
          </h2>

          <p>
            KiddoWorld is preparing an adventure
            especially for you!
          </p>

        </div>

      )}



      {/* ================= STORY RESULT ================= */}

      {story && (

        <div className="story-result">

          <div className="story-card">


            {/* TITLE */}

            <div className="story-title">

              <div className="book-icon">
                📖
              </div>

              <h2>
                {story.title}
              </h2>

            </div>



            {/* STORY PARAGRAPHS */}

            <div className="story-content">

              {story.paragraphs &&
                story.paragraphs.map(
                  (paragraph, index) => (

                    <p key={index}>
                      {paragraph}
                    </p>

                  )
                )}

            </div>



            {/* LESSON */}

            <div className="lesson-box">

              <h3>
                🧠 What Did You Learn?
              </h3>

              <p>
                {story.lesson}
              </p>

            </div>



            {/* ACTIVITY */}

            <div className="activity-box">

              <h3>
                🎨 Try This Activity
              </h3>

              <p>
                {story.activity}
              </p>

            </div>



            {/* NEW STORY BUTTON */}

            <button
              className="new-story-btn"
              onClick={createAnotherStory}
            >

              ✨ Create Another Story

            </button>


          </div>

        </div>

      )}

    </div>

  );

};


export default AIStoryMaker;