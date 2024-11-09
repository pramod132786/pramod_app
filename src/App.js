import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import "./App.css";

// HomePage Component
function HomePage() {
  const navigate = useNavigate(); // For navigation to next page

  // Handle button click to navigate to the next page
  const handleClick = () => {
    navigate("/wall");
  };

  return (
    <div className="home-page">
      <Container className="text-center my-5">
        <h1 className="animated-text">
          Hello Mumma! Welcome to Your Special Day 🎉
        </h1>

        {/* Button to trigger navigation */}
        <Button variant="danger" onClick={handleClick}>
          Click Me
        </Button>
      </Container>
    </div>
  );
}

// WallPage - Display images hanging like on a rope
function WallPage() {
  const navigate = useNavigate();

  // Handle click on image to go to the carousel page
  const handleImageClick = () => {
    navigate("/carousel");
  };

  return (
    <div className="wall-page" style={{ backgroundColor: "#d3d3d3" }}>
      <Container className="text-center my-5">
        <h2>Look at these lovely pictures hanging!</h2>
        <h3 className="text-secondary">Click on Any Image</h3>

        {/* Image Rope Effect */}
        <div className="image-rope">
          {["3", "4", "5", "6"].map((img, index) => (
            <img
              key={index}
              src={`/images/${img}.jpg`} // Reference images from public folder
              alt={`image-${img}`}
              className="hanging-image"
              onClick={handleImageClick} // Go to carousel on click
            />
          ))}
        </div>
      </Container>
    </div>
  );
}

// CarouselPage - Image carousel with quotes
function CarouselPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = Array.from({ length: 12 }, (_, i) => `7-${i + 1}.jpg`); // Image names 7-1.jpg, 7-2.jpg, etc.
  const quotes = [
    "Wishing you the happiest of birthdays, filled with love, laughter, and unforgettable memories! 💖",
    "May your day be as bright and beautiful as your smile. Happy Birthday, Mumma! 🌟",
    "Here's to celebrating YOU and all the joy you bring to the world. Happy Birthday! 🎉🎂",
  ];

  // Handle next image transition
  const nextImage = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  // Show carousel and transition images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 4000); // Transition every 4 seconds

    return () => clearInterval(interval);
  }, [currentImageIndex]);

  return (
    <div className="carousel-page">
      <Container className="text-center my-5">
        <h2>Birthday Carousel</h2>

        {/* Display Image */}
        <img
          src={`/images/${images[currentImageIndex]}`} // Display current image from array
          alt={`carousel-image-${currentImageIndex}`}
          className="carousel-image"
        />

        {/* Show quotes below */}
        <div className="quotes-section">
          <p>{quotes[currentImageIndex % quotes.length]}</p>
        </div>

        {/* Button to continue after all images */}
        {currentImageIndex === images.length - 1 && (
          <Button variant="primary" onClick={() => window.location.href = "/final"}>
            More surprise is waiting for you. Click Me!
          </Button>
        )}
      </Container>
    </div>
  );
}

// FinalPage - Display special birthday wishes and images
function FinalPage() {
  const navigate = useNavigate();
  const [currentWishIndex, setCurrentWishIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);

  const wishes = [
    { image: "potti_wishes", message: "Wish you a Happy Birthday Pinni! 💖" },
    { image: "dhanu_wishes", message: "Wish you a Happy Birthday Chiyaa with love 💖" }
  ];

  // Show the next wish after some delay
  useEffect(() => {
    if (currentWishIndex < wishes.length - 1) {
      const timer = setTimeout(() => {
        setCurrentWishIndex(currentWishIndex + 1);
      }, 5000); // Show each wish for 5 seconds
      return () => clearTimeout(timer);
    } else {
      // Show the button after all wishes are displayed
      const timer = setTimeout(() => {
        setShowButton(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [currentWishIndex]);

  // Handle button click to navigate to the special wishes page
  const handleSpecialWishesClick = () => {
    navigate("/special-wishes");
  };

  return (
    <div className="final-page">
      <Container className="text-center my-5">
        <h2>Special Birthday Wishes</h2>

        {/* Display the current wish */}
        {wishes.slice(0, currentWishIndex + 1).map((wish, index) => (
          <div key={index} className="wish-container">
            <img
              src={`/images/${wish.image}.jpg`}
              alt={wish.image}
              className="final-image animated"
            />
            <p className="wish-message">{wish.message}</p>
          </div>
        ))}

        {/* Show the button once all wishes are displayed */}
        {showButton && (
          <Button variant="primary" onClick={handleSpecialWishesClick}>
            Special wishes for you. Click here!
          </Button>
        )}
      </Container>
    </div>
  );
}

// SpecialWishesPage - Show additional images with birthday wishes
function SpecialWishesPage() {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [showQuotes, setShowQuotes] = useState(false);
  const [showBirthdayMessage, setShowBirthdayMessage] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false); // State for the final message

  // List of images for the special wishes page
  const images = ["birthday_1", "birthday_2", "birthday_3", "birthday_4", "birthday_5"];

  // List of quotes to be displayed after images
  const quotes = [
    "Many more happy returns of the Day, Chinna Bangram (Mumma with love 💖💋)",
    "True love isn’t about perfection, it’s about accepting each other’s flaws and loving one another unconditionally. You and I are the perfect example of that. 💖",
    "Love is not just about finding the right person, but creating a beautiful life together. 💖",
    "Thank you for being my forever source of love, strength, and joy. 💕"
  ];

  // Show the next image every 3 seconds
  const nextImage = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      // Once all images are shown, start showing the birthday message and quotes
      setShowBirthdayMessage(true);
      setShowQuotes(true);
    }
  };

  // Auto transition to the next image every 3 seconds
  useEffect(() => {
    if (!showBirthdayMessage) {
      const interval = setInterval(() => {
        nextImage();
      }, 3000); // Transition every 3 seconds
      return () => clearInterval(interval);
    }
  }, [currentImageIndex, showBirthdayMessage]);

  // Show the next quote every 4 seconds after all images are shown
  useEffect(() => {
    if (showQuotes && currentQuoteIndex < quotes.length) {
      const timer = setTimeout(() => {
        setCurrentQuoteIndex(currentQuoteIndex + 1);
      }, 4000); // Transition every 4 seconds
      return () => clearTimeout(timer);
    }
  }, [currentQuoteIndex, showQuotes]);

  // Display the final message after all quotes are shown
  useEffect(() => {
    if (currentQuoteIndex === quotes.length) {
      setTimeout(() => {
        setShowFinalMessage(true);
      }, 3000); // Delay showing final message for 3 seconds after the last quote
    }
  }, [currentQuoteIndex]);

  return (
    <div className="special-wishes-page">
      <Container className="text-center my-5">
        <h2>Special Birthday Wishes!</h2>

        {/* Display Birthday images one after another */}
        {!showBirthdayMessage && (
          <img
            src={`/images/${images[currentImageIndex]}.jpg`}
            alt={images[currentImageIndex]}
            className="birthday-image animated"
          />
        )}

        {/* Display the Birthday message after all images are shown */}
        {!showBirthdayMessage && currentImageIndex === images.length - 1 && (
          <h3>
            Many more happy returns of the Day, Chinna Bangram (Mumma with love 💖)
          </h3>
        )}

        {/* Display quotes one after another after images and message */}
        {showQuotes && currentQuoteIndex < quotes.length && (
          <h3 className="centered-quote">{quotes[currentQuoteIndex]}</h3>
        )}


        {/* Final birthday message */}
        {showFinalMessage && (
          <h3>Wish you Many more Happy Returns of the Day, Mumma! 🎉💖</h3>
        )}
      </Container>
    </div>
  );
}

// App Component with Routing
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/wall" element={<WallPage />} />
        <Route path="/carousel" element={<CarouselPage />} />
        <Route path="/final" element={<FinalPage />} />
        <Route path="/special-wishes" element={<SpecialWishesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
