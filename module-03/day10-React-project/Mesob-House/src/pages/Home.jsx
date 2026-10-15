import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuItem from '../components/MenuItem';
import Loader from '../components/Loader';
import Toast from '../components/Toast';
import { useFetch } from '../hooks/useFetch';
import { fetchFeaturedDishes } from '../api/dishes';
import { useCart } from '../context/CartContext';
import HeroSection from '../Assets/Todays_special/HeroSection.png';
import './Home.css';

import { FaStar, FaCoffee, FaLeaf } from 'react-icons/fa';
import { LuCoffee, LuFlame } from 'react-icons/lu';
import { MdArrowOutward, MdOutlineBakeryDining } from "react-icons/md";
import { RiUserCommunityLine } from "react-icons/ri";
import { FaArrowDown } from "react-icons/fa6";
import { GiKnifeFork } from "react-icons/gi";

const Home = () => {
  const { addToCart } = useCart();
  const [toasts, setToasts] = useState([]);

  // Fetch featured dishes (Day 29)
  const { data: featuredItems, loading, error, refetch } = useFetch(
    () => fetchFeaturedDishes(3),
    []
  );

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };
  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };
  const handleAddToCart = (item) => {
    addToCart(item);
    showToast(`${item.name} added to your basket`);
  };

  return (
    <div className="home-page">
      <div className="top-banner">
        <div className="banner-content">
          <span className="banner-icon"><FaLeaf /></span>
          <span><strong>Tsom / Fasting Observance:</strong> 12-item Royal Beyaynetu Vegan Platter simmered fresh all day.</span>
        </div>
        <div className="banner-links">
          <span>100% Pure Teff Injera Available</span>
          <Link to="/menu">See Fasting Specialties →</Link>
        </div>
      </div>

      {/* Hero section */}
      <div className="section-bg-a">
        <div className="container">
          <div className="hero-section">
            <div className="hero-text">
              <span className="tag">TRADITIONAL HABESHA HEARTH</span>
              <h1>
                Communal Warmth, <br />
                <span className="highlight">Slow-Cooked Heritage.</span>
              </h1>
              <p className="hero-desc">
                Handcrafted wats, ancient stone-ground teff injera, and velvety kifto
                simmered in 72-hour infused niter kibbeh and heirloom berbere
                harvested from the Ethiopian highlands.
              </p>

              <div className="hero-actions">
                <a href="#todays-specials" className="btn-primary">
                  Explore Today's Specials <FaArrowDown />
                </a>
                <Link to="/menu" className="btn-outline">Full Banquet Menu</Link>
                <span className="hero-link-text"><FaCoffee /> Buna Ceremony 4:00 PM Daily</span>
              </div>

              <div className="hero-stats">
                <div className="stat-item">
                  <strong className="strong1">100%</strong>
                  <span>Brown & White Teff</span>
                </div>
                <div className="stat-item">
                  <strong className="strong2">6+ Hours</strong>
                  <span>Slow Stew Caramels</span>
                </div>
                <div className="stat-item">
                  <strong className="strong3">Gursha</strong>
                  <span>Hospitality Shared</span>
                </div>
              </div>
            </div>

            <div className="hero-image-wrapper">
              <img src={HeroSection} alt="Ethiopian Food" className="hero-image" />
              <div className="floating-badge">
                <span className="badge-icon"><LuFlame /></span>
                <div className="badge-text">
                  <strong>Stone Ground</strong>
                  <span>Fresh Berbere & Pepper</span>
                </div>
              </div>
              <div className="hero-overlay-card">
                <div>
                  <span className="overlay-label">CENTREPIECE</span>
                  <h4>Great Mesob Feast</h4>
                </div>
                <span className="overlay-price">ETB 1,650</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Special Menu */}
      <div className="section-bg-b" id="todays-specials">
        <div className="container">
          <div className="section-header">
            <div className="section-header-left">
              <span className="section-label"><GiKnifeFork /> FROM THE CLAY POTS</span>
              <h2>Today's Curated Chef Specials</h2>
              <p className="section-desc">
                Carefully balanced stews prepared at dawn using our matriarch's 40-spice blend,
                served piping hot on hand-stretched injera.
              </p>
            </div>
            <div className="section-filters">
              <span className="filter-label">FILTER:</span>
              <button className="filter-btn active">All (3)</button>
              <button className="filter-btn">Poultry</button>
              <button className="filter-btn">Fasting / Tsom</button>
            </div>
          </div>

          {/* Loading / Error / Grid */}
          {loading && <Loader message="Plating today's specials..." />}

          {error && !loading && (
            <div className="menu-error-state">
              <h3>Couldn't load today's specials</h3>
              <p>{error}</p>
              <button onClick={refetch} className="btn-retry">Try Again</button>
            </div>
          )}

          {!loading && !error && featuredItems && (
            <div className="home-menu-grid">
              {featuredItems.map((item) => (
                <MenuItem key={item.id} item={item} onAdd={handleAddToCart} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Gursha */}
      <div className="section-bg-c">
        <div className="container">
          <div className="gursha-section">
            <span className="gursha-section-label">
              <RiUserCommunityLine /> THE SPIRIT OF GURSHA
            </span>

            <div className="gursha-text-col">
              <h2>"Those Who Share a Mesob Never Walk Alone."</h2>
              <p>
                Gursha is the cherished act of honoring a companion by rolling choice morsels of wat with warm injera and feeding them directly by hand. At Mesob House, every table is configured for communal
                warmth and slow gratitude.
              </p>

              <div className="ceremony-card">
                <div className="ceremony-icon">
                  <LuCoffee />
                </div>
                <div>
                  <h4>Authentic Clay Jebena Buna Ceremony</h4>
                  <p>
                    Every day at 4:00 PM, frankincense fills our courtyard as green Sidama beans are hand-roasted on iron pans, ground fresh, and brewed in traditional clay Jebenas with popped sorghum
                    snack (Fendisha).
                  </p>
                  <Link to="/menu" className="text-link">
                    Reserve Ceremony Seating <MdArrowOutward />
                  </Link>
                </div>
              </div>
            </div>

            <div className="gursha-menu-col">
              <div className="gursha-item">
                <div className="gursha-item-header">
                  <span className="item-tag">HOUSE-FERMENTED</span>
                  <span className="item-price">ETB 350</span>
                </div>
                <h4>Golden Tej (Honey Wine)</h4>
                <p>
                  Crafted in-house using raw Ethiopian wild honey and dried Gesho
                  (indigenous hops), cold-sed for 21 days in glass carafes (Berele).
                </p>
                <div className="gursha-item-footer">
                  <span>500ml Carafe • 11% ABV</span>
                  <button className="btn-add">+ Add Carafe</button>
                </div>
              </div>

              <div className="gursha-item">
                <div className="gursha-item-header">
                  <span className="item-tag">DAILY INFUSION</span>
                  <span className="item-price">ETB 80</span>
                </div>
                <h4>Highland Spiced Shai</h4>
                <p>
                  Slow-simmered highland black tea leaves infused with crushed
                  cinnamon bark, fragrant cardamom pods, cloves, and a hint of wild
                  ginger.
                </p>
                <div className="gursha-item-footer">
                  <span>Served with Raw Sugar</span>
                  <button className="btn-add">+ Add Cup</button>
                </div>
              </div>

              <div className="gursha-item compact">
                <div className="gursha-item-compact-left">
                  <div className="gursha-item-compact-icon">
                    <MdOutlineBakeryDining />
                  </div>
                  <div>
                    <h4>Extra Teff Injera Rolls (Basket of 3)</h4>
                    <p>
                      Naturally gluten-friendly ancient grain, fermented 3 days for airy eyes (Ayn).
                    </p>
                  </div>
                </div>

                <div className="gursha-item-compact-right">
                  <div className="item-price-stacked">
                    <span className="price-label">ETB</span>
                    <span className="price-value">90</span>
                  </div>
                  <button className="btn-add dark">+ Add Extra</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="section-bg-d">
        <div className="container">
          <div className="testimonials-section">
            <div className="testimonials-header">
              <span className="testimonial-section-label">VOICES AROUND THE MESOB</span>
              <h2>Honored Guest Reflections</h2>
            </div>

            <div className="testimonials-grid">
              <div className="testimonial-card">
                <div className="stars"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div>
                <p>"The Doro Wat was so reminiscent of my grandmother's cooking in Gondar. The berbere depth and the slow-simmered onion sweet finish are impossible to find elsewhere."</p>
                <div className="author-info">
                  <div className="author-avatar">AM</div>
                  <div>
                    <strong>Amanuel Mengistu</strong>
                    <span>Bole Resident & Food Patron</span>
                  </div>
                </div>
              </div>

              <div className="testimonial-card">
                <div className="stars"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div>
                <p>"Their Fasting Beyaynetu is unmatched on Wednesdays. 12 vibrant dishes, and the Shiro tagamino came out bubbling in clay. True culinary devotion."</p>
                <div className="author-info">
                  <div className="author-avatar">ST</div>
                  <div>
                    <strong>Sara Tesfaye</strong>
                    <span>Plant-Based Dining Advocate</span>
                  </div>
                </div>
              </div>

              <div className="testimonial-card">
                <div className="stars"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div>
                <p>"We hosted a 10-person family reunion around their large handcrafted mesobs. The coffee ceremony with fresh frankincense made the evening unforgettable."</p>
                <div className="author-info">
                  <div className="author-avatar">DK</div>
                  <div>
                    <strong>Dr. Kebede Wolde</strong>
                    <span>Diaspora Homecoming Guest</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="section-bg-e">
        <div className="container">
          <div className="cta-section">
            <div className="cta-content">
              <span className="cta-label">JOIN OUR TABLE</span>
              <h2>Experience Authentic Habesha Warmth Tonight</h2>
              <p>
                Whether gathering around our circular mesobs for communal dining or ordering freshly baked injera to your home in Addis Ababa.
              </p>
            </div>
            <div className="cta-actions">
              <Link to="/checkout" className="btn-cta-primary">Book a Mesob Table</Link>
              <Link to="/menu" className="btn-cta-outline">View Complete Menu</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Toasts */}
      <Toast toasts={toasts} onClose={removeToast} />

    </div>
  );
};

export default Home;