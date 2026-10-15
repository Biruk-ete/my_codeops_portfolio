import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Toast from '../components/Toast';
import './Checkout.css';

import { FaCheck, FaHandHoldingHeart, FaQrcode, FaStore, FaRegCompass, FaCloudDownloadAlt, FaUser, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaInfoCircle, FaShieldAlt, FaWallet, FaMoneyBillWave, FaChevronDown, FaExclamationCircle } from 'react-icons/fa';
import { MdDeliveryDining, MdArrowBack } from 'react-icons/md';
import { BsBank } from 'react-icons/bs';
import { ImProfile } from "react-icons/im";
import { GoDotFill } from "react-icons/go";
import { RiWallet3Line } from "react-icons/ri";
import { TfiHeadphoneAlt } from "react-icons/tfi";


const Checkout = () => {
  const { cart, getTotal, clearCart } = useCart();
  const navigate = useNavigate();

  // Step state
  const [deliveryMode, setDeliveryMode] = useState('delivery');
  const [dispatchTiming, setDispatchTiming] = useState('immediate');
  const [paymentMethod, setPaymentMethod] = useState('telebirr');

  // Form state
  const [formData, setFormData] = useState({
    recipientName: 'Biruk Abera',
    phone: '+251 91 145 7890',
    email: 'Birukagelan6@gmail.com',
    subCity: 'Bole Medhanialem (Near Mesob House)',
    street: 'Behind Edna Mall, House No. 402, 3rd Floor',
    landmark: 'Opposite to Boston Day Spa, entrance through dark green gate',
  });

  // Round 3: Validation state
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Round 3: Toast state
  const [toasts, setToasts] = useState([]);
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };
  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Derived Values
  const subtotal = getTotal();
  const expressDelivery = 158;
  const grandTotal = subtotal + expressDelivery;
  const totalItems = cart.reduce((sum, item) => sum + (item.qty || 1), 0);

  // ============================================
  // VALIDATION (Day 33)
  // ============================================
  const validateField = (name, value) => {
    switch (name) {
      case 'recipientName':
        if (!value.trim()) return 'Please enter the recipient name';
        if (value.trim().length < 2) return 'Name is too short';
        return '';
      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        if (!/^(\+?251|0)?9\d{8}$/.test(value.replace(/\s+/g, '')))
          return 'Enter a valid Ethiopian phone (09XX XXX XXX)';
        return '';
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^\S+@\S+\.\S+$/.test(value)) return 'Enter a valid email address';
        return '';
      case 'street':
        if (!value.trim()) return 'Street address is required';
        return '';
      case 'landmark':
        if (!value.trim()) return 'A landmark helps our rider find you';
        return '';
      default:
        return '';
    }
  };

  const validateAll = () => {
    const newErrors = {};
    ['recipientName', 'phone', 'email', 'street', 'landmark'].forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Re-validate if the field was already touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // ============================================
  // SUBMIT
  // ============================================
  const handleConfirmOrder = async (e) => {
    e.preventDefault();

    // Mark all fields as touched so errors show
    const allTouched = {};
    ['recipientName', 'phone', 'email', 'street', 'landmark'].forEach(
      (k) => (allTouched[k] = true)
    );
    setTouched(allTouched);

    // Validate everything
    const newErrors = validateAll();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      showToast('Please fix the highlighted fields', 'error');
      return;
    }

    // Simulate a real order submission
    setSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1800));
      showToast('Order placed! Your feast is being prepared.');
      clearCart();
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      showToast('Something went wrong. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="checkout-page">
      {/*progress*/}
      <div className="checkout-stepper-wrapper">
        <div className="container">
          <div className="checkout-stepper">
            {/* Completed */}
            <div className="checkout-step completed">
              <div className="step-circle">
                <FaCheck />
              </div>
              <div className="step-text">
                <span className="step-label">STEP 1</span>
                <span className="step-name">Review Order</span>
              </div>
            </div>
            <div className="step-line completed"></div>
            {/* Active */}
            <div className="checkout-step active">
              <div className="step-circle">2</div>
              <div className="step-text">
                <span className="step-label">STEP 2</span>
                <span className="step-name">Delivery & Payment</span>
              </div>
            </div>
            <div className="step-line"></div>
            {/* Pending */}
            <div className="checkout-step">
              <div className="step-circle">3</div>
              <div className="step-text">
                <span className="step-label">STEP 3</span>
                <span className="step-name">Confirmation</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="checkout-layout">
          {/* Left side*/}
          <div className="checkout-main-col">

            {/* Delivery mode toggle*/}
            <div className="delivery-mode-toggle">
              <button
                type="button"
                className={`mode-btn ${deliveryMode === 'delivery' ? 'active' : ''}`}
                onClick={() => setDeliveryMode('delivery')}
              >
                <MdDeliveryDining /> Prompt Delivery across Addis
              </button>
              <button
                type="button"
                className={`mode-btn ${deliveryMode === 'pickup' ? 'active' : ''}`}
                onClick={() => setDeliveryMode('pickup')}
              >
                <FaStore /> Dine-in Pickup (Bole)
              </button>
            </div>

            {/* Contact & guest details */}
            <div className="checkout-card">
              <div className="card-header">
                <h3><span className="card-num"><ImProfile /></span>1. Contact & Guest Details</h3>
                <span className="card-badge gold">Habesha Hospitality</span>
              </div>
              <div className="form-grid-2">
                <div className="form-group">
                  <label>RECIPIENT NAME</label>
                  <div className={`input-with-icon ${errors.recipientName && touched.recipientName ? 'input-error' : ''}`}>
                    <input
                      type="text"
                      name="recipientName"
                      value={formData.recipientName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FaUser className="input-icon" />
                  </div>
                  {errors.recipientName && touched.recipientName && (
                    <span className="field-error">
                      <FaExclamationCircle /> {errors.recipientName}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label>PHONE (CALLS & TELEGRAM SMS)</label>
                  <div className={`input-with-icon phone-flag ${errors.phone && touched.phone ? 'input-error' : ''}`}>
                    <span className="flag">🇪🇹</span>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FaPhoneAlt className="input-icon" />
                  </div>
                  {errors.phone && touched.phone && (
                    <span className="field-error">
                      <FaExclamationCircle /> {errors.phone}
                    </span>
                  )}
                </div>
              </div>
              <div className="form-group">
                <label>EMAIL FOR DIGITAL RECEIPT</label>
                <div className={`input-with-icon ${errors.email && touched.email ? 'input-error' : ''}`}>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FaEnvelope className="input-icon" />
                </div>
                {errors.email && touched.email && (
                  <span className="field-error">
                    <FaExclamationCircle /> {errors.email}
                  </span>
                )}
              </div>
            </div>

            {/* Delivery location*/}
            <div className="checkout-card">
              <div className="card-header">
                <h3><span className="card-num"><FaRegCompass /></span>2. Delivery Location in Addis Ababa</h3>
                <span className="card-badge"><FaCloudDownloadAlt /> Insulated Mesob Carrier</span>
              </div>
              <div className="form-grid-2">
                <div className="form-group">
                  <label>SUB-CITY / NEIGHBORHOOD</label>
                  <div className="input-with-icon select-wrapper">
                    <select
                      name="subCity"
                      value={formData.subCity}
                      onChange={handleChange}
                    >
                      <option>Bole Medhanialem (Near Mesob House)</option>
                      <option>Kazanchis</option>
                      <option>Sarbet</option>
                      <option>Old Airport</option>
                    </select>
                    <FaChevronDown className="input-icon" />
                  </div>
                </div>
                <div className="form-group">
                  <label>STREET, BUILDING, FLAT NO.</label>
                  <div className={`input-with-icon ${errors.street && touched.street ? 'input-error' : ''}`}>
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  {errors.street && touched.street && (
                    <span className="field-error">
                      <FaExclamationCircle /> {errors.street}
                    </span>
                  )}
                </div>
              </div>
              <div className="form-group">
                <label>SPECIFIC LANDMARK / GATE INSTRUCTIONS</label>
                <div className={`input-with-icon ${errors.landmark && touched.landmark ? 'input-error' : ''}`}>
                  <input
                    type="text"
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FaMapMarkerAlt className="input-icon" />
                </div>
                {errors.landmark && touched.landmark && (
                  <span className="field-error">
                    <FaExclamationCircle /> {errors.landmark}
                  </span>
                )}
              </div>
              {/* Desired Dispatch Timing */}
              <div className="form-group mt-4">
                <label>DESIRED DISPATCH TIMING</label>
                <div className="dispatch-timing-grid">
                  <label className={`timing-card ${dispatchTiming === 'immediate' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="dispatch"
                      checked={dispatchTiming === 'immediate'}
                      onChange={() => setDispatchTiming('immediate')}
                    />
                    <div>
                      <strong>Immediate Dispatch</strong>
                      <span>Fresh & hot off clay stove (~35-45 min)</span>
                    </div>
                  </label>
                  <label className={`timing-card ${dispatchTiming === 'scheduled' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="dispatch"
                      checked={dispatchTiming === 'scheduled'}
                      onChange={() => setDispatchTiming('scheduled')}
                    />
                    <div>
                      <strong>Schedule for Dinner</strong>
                      <span>Set for evening feast (e.g., 7:30 PM)</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Payment method*/}
            <div className="checkout-card">
              <div className="card-header">
                <h3><span className="card-num"><RiWallet3Line /></span>3. Payment Method</h3>
                <span className="card-badge"><FaShieldAlt /> Encrypted & Direct</span>
              </div>

              <div className="payment-methods">

                {/* Telebirr */}
                <div className={`payment-option-wrapper ${paymentMethod === 'telebirr' ? 'active' : ''}`}>
                  <label className="payment-option-header">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'telebirr'}
                      onChange={() => setPaymentMethod('telebirr')}
                    />
                    <div className="payment-logo telebirr-logo">tb</div>
                    <div className="payment-info">
                      <div className="payment-title">
                        Telebirr
                        <span className="pop-badge">Popular</span>
                      </div>
                      <p>Instant SuperApp QR prompt or USSD confirmation</p>
                    </div>
                    <div className="payment-icon"><FaQrcode /></div>
                  </label>

                  {paymentMethod === 'telebirr' && (
                    <div className="telebirr-expanded-white">
                      <div className="telebirr-qr-left">
                        <span><FaQrcode /></span>
                      </div>
                      <div className="telebirr-content-right">
                        <h4>Telebirr Quick Merchant Pay</h4>
                        <p>Merchant ID: MESOB-7781. Enter your Telebirr registered phone to authorize instant debit:</p>
                        <div className="telebirr-input-row">
                          <input
                            type="tel"
                            value="091145 7890"
                            className="telebirr-input"
                            readOnly
                          />
                          <button type="button" className="btn-verify">Verify</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* CBE birr */}
                <div className={`payment-option-wrapper ${paymentMethod === 'cbe' ? 'active' : ''}`}>
                  <label className="payment-option-header">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cbe'}
                      onChange={() => setPaymentMethod('cbe')}
                    />
                    <div className="payment-logo cbe-logo">CBE</div>
                    <div className="payment-info">
                      <div className="payment-title">CBE Birr / CBE Mobile Banking</div>
                      <p>Direct settlement via Commercial Bank of Ethiopia</p>
                    </div>
                    <div className="payment-icon"><BsBank /></div>
                  </label>
                </div>

                {/* Cash on Delivery */}
                <div className={`payment-option-wrapper ${paymentMethod === 'cash' ? 'active' : ''}`}>
                  <label className="payment-option-header">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cash'}
                      onChange={() => setPaymentMethod('cash')}
                    />
                    <div className="payment-logo cash-logo">POS</div>
                    <div className="payment-info">
                      <div className="payment-title">Cash or Card on Delivery</div>
                      <p>Rider delivers with wireless POS card terminal + change for cash</p>
                    </div>
                    <div className="payment-icon"><FaMoneyBillWave /></div>
                  </label>
                </div>

                {/*Amole / Awash birr*/}
                <div className={`payment-option-wrapper ${paymentMethod === 'amole' ? 'active' : ''}`}>
                  <label className="payment-option-header">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'amole'}
                      onChange={() => setPaymentMethod('amole')}
                    />
                    <div className="payment-logo amole-logo">AB</div>
                    <div className="payment-info">
                      <div className="payment-title">Amole / Awash Birr</div>
                      <p>Dashen Amole wallet or Awash Birr direct integration</p>
                    </div>
                    <div className="payment-icon"><FaWallet /></div>
                  </label>
                </div>

              </div>
            </div>

            {/* Promise */}
            <div className="mesob-promise">
              <span className="promise-icon"><FaHandHoldingHeart /></span>
              <div>
                <h4>The Mesob House Promise</h4>
                <p>Each communal platter arrives with four extra folds of authentic 100% pure teff injera, warm wet towels, and our hand-blended Mitmita spice on the side.</p>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="checkout-side-col">
            <div className="order-summary">
              <div className="summary-header">
                <div>
                  <span className="summary-label">HABESHA FEAST</span>
                  <h3>Order Summary</h3>
                </div>
                <Link to="/cart" className="edit-cart-link">Edit Cart</Link>
              </div>

              <div className="summary-items">
                {cart.length === 0 ? (
                  <p className="empty-msg">Your basket is empty.</p>
                ) : (
                  cart.map((item) => (
                    <div className="summary-item" key={item.id}>
                      <div className="summary-item-image">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="summary-item-info">
                        <h4>{item.name}</h4>
                        <p className="summary-item-desc">{item.description?.substring(0, 60)}...</p>
                        <div className="summary-item-tags">
                          {item.tag && <span className="summary-tag">{item.tag}</span>}
                          <span className="summary-qty">• Qty: {item.qty}</span>
                        </div>
                      </div>
                      <span className="summary-item-price">ETB {item.price}</span>
                    </div>
                  ))
                )}
              </div>

              <div className="summary-delivery-box">
                <div className="delivery-box-header">
                  <span>DELIVERING TO</span>
                  <span className="active-corridor"><span className="dot"></span> Active Corridor</span>
                </div>
                <strong>{formData.subCity}</strong>
                <p>Estimated arrival: ~35-45 mins from clay oven sealing</p>
              </div>

              <div className="summary-totals">
                <div className="summary-row">
                  <span>Items Subtotal</span>
                  <span className="summary-val">ETB {subtotal.toLocaleString()}</span>
                </div>
                <div className="summary-row">
                  <span>Express Delivery (Bole Radius) <FaInfoCircle className="info-icon" /></span>
                  <span className="summary-val">ETB {expressDelivery}</span>
                </div>
                <div className="summary-row green">
                  <span>Complimentary Injera (4 Rolls)</span>
                  <span className="summary-val green">INCLUDED</span>
                </div>
                <div className="summary-row green">
                  <span>Clay Stew Thermal Packaging</span>
                  <span className="summary-val green">FREE</span>
                </div>
              </div>

              <div className="summary-grand-total">
                <div className="grand-total-text">
                  <span className="grand-label">TOTAL AMOUNT DUE</span>
                  <span className="grand-title">Grand Total</span>
                </div>
                <div className="grand-total-amount">
                  <span className="total-amount">ETB {grandTotal.toLocaleString()}</span>
                  <span className="vat-text">VAT Inclusive</span>
                </div>
              </div>

              <div className="guarantee-row">
                <FaShieldAlt className="guarantee-icon" />
                <p>Guaranteed steaming hot in woven sealed carriers or 100% remake.</p>
              </div>

              <button
                type="button"
                className="btn-confirm-order"
                onClick={handleConfirmOrder}
                disabled={submitting}
              >
                {submitting ? (
                  <>Placing Order...</>
                ) : (
                  <>
                    <FaCheck /> Confirm Order & Pay ETB {grandTotal.toLocaleString()}
                  </>
                )}
              </button>

              <div className="summary-bottom-links">
                <Link to="/cart"><MdArrowBack /> Return to Cart</Link>
                <GoDotFill />
                <Link to="/menu">Add More Dishes</Link>
              </div>
            </div>

            <div className="support-box">
              <span className="support-icon"><TfiHeadphoneAlt /></span>
              <div>
                <strong>Need Phone Support?</strong>
                <p>Direct Kitchen desk: +251911234567</p>
              </div>
              <button type="button" className="btn-call-now">Call Now</button>
            </div>
          </div>
        </div>
      </div>

      {/* Round 3: Toast */}
      <Toast toasts={toasts} onClose={removeToast} />
    </div>
  );
};

export default Checkout;