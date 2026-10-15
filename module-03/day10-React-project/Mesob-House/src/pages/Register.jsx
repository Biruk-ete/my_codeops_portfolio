import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Registor_page from '../Assets/Registor_page.png';
import './Register.css';

import { FaUser, FaPhoneAlt, FaEnvelope, FaGoogle, FaExclamationCircle } from 'react-icons/fa';
import { LuWine, LuCoins, LuClock, LuZap, LuSmartphone } from 'react-icons/lu';

export const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    dietary: 'All Heritage Delicacies',
    agreed: false
  });

  // Round 4: Submitting state + password mismatch error
  const [submitting, setSubmitting] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear the password error whenever either password field changes
    if (name === 'password' || name === 'confirmPassword') {
      setPasswordError('');
    }
  };

  // Round 4: Async handleRegister with validation + submitting state
  const handleRegister = async (e) => {
    e.preventDefault();

    // Check passwords match
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      return;
    }

    setPasswordError('');
    setSubmitting(true);

    // Simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 900));

    console.log('Registering:', formData);

    setSubmitting(false);

    navigate('/login', {
      state: {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone
      }
    });
  };

  return (
    <div className="mesob-register-page">
      <div className="register-breadcrumb">
        <Link to="/">/ Account</Link>
        <span>/ Join the Mesob Family</span>
      </div>

      <div className="register-container">

        {/* Left side */}
        <aside className="register-sidebar">
          <div className="register-sidebar-inner">
            <div className="register-sidebar-header">
              <div className="register-member-badge">
                <span>. MEMBER CIRCLE</span>
              </div>

              <h1 className="register-sidebar-title">
                Become an Honored Table Guest
              </h1>

              <p className="register-sidebar-desc">
                Immerse yourself in authentic highland hospitality, where every shared meal honors community, connection,
                and craft.
              </p>
            </div>

            <div className="register-perks-list">
              <div className="register-perk-card register-perk-card-active">
                <div className="register-perk-icon">
                  <LuWine />
                </div>

                <div className="register-perk-content">
                  <h4>Welcome Gift: Pure Tej or Buna</h4>
                  <p>
                    Enjoy a complimentary flask of house-fermented Tej (pure honey wine) or a personalized Jebena Buna coffee ceremony with your inaugural banquet
                    booking.
                  </p>
                </div>
              </div>

              <div className="register-perk-card">
                <div className="register-perk-icon">
                  <LuCoins />
                </div>

                <div className="register-perk-content">
                  <h4>Communal Gursha Points</h4>
                  <p>
                    Earn generous loyalty points redeemable for hand-poured pure Teff injera, prime Sigá Tibs,
                    and bespoke banquet upgrades.
                  </p>
                </div>
              </div>

              <div className="register-perk-card">
                <div className="register-perk-icon">
                  <LuClock />
                </div>

                <div className="register-perk-content">
                  <h4>Fasting Calendar Alerts</h4>
                  <p>
                    Timely seasonal notifications for Tsom fastingperiods, Chef's Beyaynetu spreads, and lenten
                    specialties.
                  </p>
                </div>
              </div>

              <div className="register-perk-card">
                <div className="register-perk-icon">
                  <LuZap />
                </div>

                <div className="register-perk-content">
                  <h4>Express Addis Delivery</h4>
                  <p>
                    Save Bole, Kazanchis, Old Airport, or Sarbet drop-offs for fast clay-pot temperature delivery
                    straight to your doorstep.
                  </p>
                </div>
              </div>

              <div className="register-perk-card">
                <div className="register-perk-icon">
                  <LuZap />
                </div>

                <div className="register-perk-content">
                  <h4>Priority Mesob Table Reservations</h4>
                  <p>
                    Skip standard waitlists for weekend live Kirar acoustic sets and evening green-coffee roasting
                    ceremonies.
                  </p>
                </div>
              </div>

            </div>
          </div>

          <div className="register-tradition-card">
            <div className="register-tradition-image">
              <img
                src={Registor_page}
                alt="Featured Mesob Table"
              />
            </div>

            <div className="register-tradition-content">
              <span className="register-tradition-label">
                TRADITION IN EVERY BITE
              </span>

              <p className="register-tradition-quote">
                "Sharing from the same mesob is the ancient covenant of love and trust."
              </p>

              <span className="register-tradition-author">
                — Habesha Proverb
              </span>
            </div>
          </div>
        </aside>

        {/* Right side */}
        <main className="register-form-section">

          <div className="register-form-header">
            <h2>Create Your Mesob House Account</h2>
            <p>
              Join our culinary heritage circle in less than a minute.
            </p>
          </div>

          <div className="register-social-login">
            <button
              type="button"
              className="register-social-btn register-telebirr-btn"
            >
              <span className="register-social-icon register-telebirr-icon">
                <LuSmartphone />
              </span>

              Telebirr Quick Sign
            </button>

            <button
              type="button"
              className="register-social-btn register-google-btn"
            >
              <span className="register-social-icon register-google-icon">
                <FaGoogle />
              </span>

              Continue with Google
            </button>
          </div>

          <div className="register-divider-text">
            <span>Or register with your details</span>
          </div>

          <form
            onSubmit={handleRegister}
            className="register-registration-form"
          >
            <div className="register-form-group">
              <label htmlFor="register-full-name">
                Full Name (<span className="register-required">*</span>)
              </label>

              <div className="register-input-wrapper">
                <span className="register-input-icon">
                  <FaUser />
                </span>

                <input
                  id="register-full-name"
                  type="text"
                  name="fullName"
                  placeholder="e.g. Abebe Bikila or Genet Tadesse"
                  value={formData.fullName}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                />
              </div>
            </div>

            <div className="register-form-group">
              <label htmlFor="register-phone">
                Ethiopian Mobile Number (
                <span className="register-required">*</span>)
              </label>

              <div className="register-input-wrapper register-phone-input">
                <span className="register-input-icon">
                  <FaPhoneAlt />
                </span>

                <span className="register-country-code">+251</span>

                <input
                  id="register-phone"
                  type="tel"
                  name="phone"
                  placeholder="911 234 567"
                  value={formData.phone}
                  onChange={handleChange}
                  autoComplete="tel-national"
                  required
                />
              </div>

              <p className="register-input-hint">
                We will send a 4-digit code to verify your Ethiopian
                mobile number.
              </p>
            </div>

            <div className="register-form-group">
              <label htmlFor="register-email">
                Email Address
              </label>

              <div className="register-input-wrapper">
                <span className="register-input-icon">
                  <FaEnvelope />
                </span>

                <input
                  id="register-email"
                  type="email"
                  name="email"
                  placeholder="guest@mesobhouse.com"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="register-form-row">

              <div className="register-form-group register-form-half">
                <label htmlFor="register-password">
                  Password
                </label>

                <input
                  id="register-password"
                  type="password"
                  name="password"
                  placeholder="Minimum 8 characters"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  minLength={8}
                  required
                />

                <div className="register-strength-meter">
                  <div className="register-strength-bar"></div>
                  <span>8+ chars</span>
                </div>
              </div>

              <div className="register-form-group register-form-half">
                <label htmlFor="register-confirm-password">
                  Confirm Password
                </label>

                <input
                  id="register-confirm-password"
                  type="password"
                  name="confirmPassword"
                  placeholder="Repeat password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  minLength={8}
                  required
                />
              </div>

            </div>

            {/* Round 4: Inline password mismatch error */}
            {passwordError && (
              <div className="register-password-error">
                <FaExclamationCircle /> {passwordError}
              </div>
            )}

            <div className="register-form-group">
              <label>
                Primary Dining Preference (Optional)
              </label>

              <p className="register-input-hint">
                Helps our chefs customize your banquet platters and
                fasting recommendations.
              </p>

              <div className="register-dietary-tags">
                {[
                  'All Heritage Delicacies',
                  'Fasting & Vegan (Tsom)',
                  'Halal Certified Meat',
                  '100% Pure Teff (Gluten-Free)'
                ].map((pref) => (
                  <button
                    key={pref}
                    type="button"
                    className={`register-tag-btn ${formData.dietary === pref
                      ? 'register-tag-btn-active'
                      : ''
                      }`}
                    aria-pressed={formData.dietary === pref}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        dietary: pref
                      }))
                    }
                  >
                    {pref}
                  </button>
                ))}
              </div>
            </div>

            <div className="register-checkbox-group">
              <input
                type="checkbox"
                id="register-terms"
                name="agreed"
                checked={formData.agreed}
                onChange={handleChange}
                required
              />

              <label htmlFor="register-terms">
                I agree to the{' '}
                <a href="#register-terms">
                  Mesob House Hospitality Terms
                </a>
                {' '}and{' '}
                <a href="#register-privacy">
                  Privacy Guidelines
                </a>.
              </label>
            </div>

            {/* Round 4: Submitting state on button */}
            <button
              type="submit"
              className="register-submit-btn"
              disabled={submitting}
            >
              {submitting
                ? 'Creating your account...'
                : 'Create Account & Receive Welcome Gursha →'}
            </button>

          </form>

          <p className="register-login-prompt">
            Already part of our dining family?
            <Link to="/login">Sign in here</Link>
          </p>

        </main>
      </div>
    </div>
  );
};

export default Register;