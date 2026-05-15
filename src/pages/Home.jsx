import { handleShopClick } from "../scripts/myScript";
import BannerSlider from "../components/BannerSlider";
import CustomCollection from "../components/CustomCollection";
import HeroSection from "../components/HeroSection";
function Home() {
  return (
    
    <div className="container">

      <HeroSection />
      
      <BannerSlider />
      <CustomCollection />

         {/* Banner Section */}
      <section className="banner">
        <div className="banner-content">
          <h1>Big Sale 50% OFF</h1>
          <p>Shop the latest collection now</p>
          <button>Shop Now</button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured">
        <h2>Featured Products</h2>
      </section>

      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to My Store</h1>
        <p>Best products at best prices</p>
           <button onClick={handleShopClick}>Shop Now</button>

      </section>

      {/* Featured Products */}
      <section className="featured">
        <h2>Featured Products</h2>

        <div className="product-grid">
          <div className="product-card">
            <h3>Shoes</h3>
            <p>₹2000</p>
          </div>

          <div className="product-card">
            <h3>T-Shirt</h3>
            <p>₹1000</p>
          </div>

          <div className="product-card">
            <h3>Watch</h3>
            <p>₹5000</p>
          </div>
        </div>
      </section>

    </div>

  );
}

export default Home;
