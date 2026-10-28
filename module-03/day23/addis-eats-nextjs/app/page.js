import Link from 'next/link';
import './Home.css';

export default function Home() {
  return (
    <div className="home-wrapper">
      <div className="hero-section">
        <span className="tag">TRADITIONAL HABESHA HEARTH</span>
        <h1>
          Communal Warmth, <br />
          <span className="highlight">Slow-Cooked Heritage.</span>
        </h1>
        <p className="hero-desc">
          Handcrafted wats, ancient stone-ground teff injera, and velvety kifto simmered in 72-hour infused niter kibbeh and heirloom berbere
          harvested from the Ethiopian highlands.
        </p>

        <Link href="/menu" className="btn-primary">
          Explore Full Menu
        </Link>
      </div>
    </div>
  );
}