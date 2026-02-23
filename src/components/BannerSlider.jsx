import React, { useState, useEffect } from "react";
import "./BannerSlider.css";

function BannerSlider() {
  const [banners, setBanners] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch API
  useEffect(() => {
    fetch("https://picsum.photos/v2/list?page=1&limit=3")
      .then(res => res.json())
      .then(data => {
        const formatted = data.map(item => ({
          id: item.id,
          image: item.download_url,
          title: item.title,
          subtitle: "Shop Now"
        }));
        setBanners(formatted);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching banners:", error);
        setLoading(false);
      });
  }, []);

  // Auto Slide
  useEffect(() => {
    if (banners.length === 0) return;

    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [banners]);

  if (loading) return <h2>Loading banners...</h2>;

  return (
    <div className="slider">
      <div
        className="slider-track"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {banners.map((banner) => (
          <div className="slide" key={banner.id}>
            <img src={banner.image} alt={banner.title} />
            <div className="banner-content">
              <h2>{banner.title}</h2>
              <p>{banner.subtitle}</p>
              <button>Shop Now</button>
            </div>
          </div>
        ))}
      </div>

      <button
        className="prev"
        onClick={() =>
          setCurrent((prev) => (prev - 1 + banners.length) % banners.length)
        }
      >
        ❮
      </button>

      <button
        className="next"
        onClick={() =>
          setCurrent((prev) => (prev + 1) % banners.length)
        }
      >
        ❯
      </button>

      <div className="dots">
        {banners.map((_, index) => (
          <span
            key={index}
            className={current === index ? "dot active" : "dot"}
            onClick={() => setCurrent(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default BannerSlider;
