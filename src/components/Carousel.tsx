import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export function CarouselComponent() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % numberOfSlides);
  };

  const numberOfSlides = 10;

  return (
    <div>
      <Carousel
        selectedItem={currentIndex}
        showThumbs={false}
        showStatus={true}
        infiniteLoop
        autoPlay
        interval={6000000}
        swipeable={true}
        showArrows={false}
        showIndicators={true}
        onChange={(index) => setCurrentIndex(index)}
        className="background-carousel"
      >
        <div
          className="wallpaper"
          style={{
            backgroundImage: `url("https://wallpaperaccess.com/full/17510.jpg")`,
          }}
        ></div>
        <div
          className="wallpaper"
          style={{
            backgroundImage: `url("https://wallpaperaccess.com/full/837256.jpg")`,
          }}
        ></div>
        <div
          className="wallpaper"
          style={{
            backgroundImage: `url("https://wallpaperaccess.com/full/17520.jpg")`,
          }}
        ></div>
        <div
          className="wallpaper"
          style={{
            backgroundImage: `url("https://wallpaperaccess.com/full/19609.jpg")`,
          }}
        ></div>
        <div
          className="wallpaper"
          style={{
            backgroundImage: `url("https://wallpaperaccess.com/full/735.jpg")`,
          }}
        ></div>
        <div
          className="wallpaper"
          style={{
            backgroundImage: `url("https://wallpaperaccess.com/full/38637.jpg")`,
          }}
        ></div>
        <div
          className="wallpaper"
          style={{
            backgroundImage: `url("https://wallpaperaccess.com/full/1872.jpg")`,
          }}
        ></div>
        <div
          className="wallpaper"
          style={{
            backgroundImage: `url("https://wallpaperaccess.com/full/6313.jpg")`,
          }}
        ></div>
        <div
          className="wallpaper"
          style={{
            backgroundImage: `url("https://wallpaperaccess.com/full/121245.jpg")`,
          }}
        ></div>
        <div
          className="wallpaper"
          style={{
            backgroundImage: `url("https://wallpaperaccess.com/full/811004.jpg")`,
          }}
        ></div>
      </Carousel>
      <button className="theme" onClick={handleNextSlide}>
        Theme
      </button>
    </div>
  );
}
