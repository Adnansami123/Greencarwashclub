import "../../Services.css";
import {
  FaCar,
  FaSprayCan,
  FaCogs,
  FaGem,
  FaDollarSign,
  FaExchangeAlt,
  FaShieldAlt,
  FaTools,
} from "react-icons/fa";
import { useState } from "react";

export default function Services() {
  const [videoUrl, setVideoUrl] = useState(null);

  const servicesData = [
    { icon: <FaCar />, title: "Premium Exterior Wash", desc: "Advanced foam wash to protect shine." },
    { icon: <FaSprayCan />, title: "Interior Detailing", desc: "Deep cleaning & sanitization." },
    { icon: <FaCogs />, title: "Engine Wash", desc: "Remove grease & improve durability." },
    { icon: <FaGem />, title: "Polishing", desc: "Restore shine & remove scratches." },
    { icon: <FaCar />, title: "Ceramic Coating", desc: "Long-lasting protection & gloss." },
    { icon: <FaSprayCan />, title: "Foam Wash", desc: "Gentle dirt removal." },
  ];

  const extraServices = [
    { icon: <FaCar />, title: "Vehicle Sales", desc: "Buy verified vehicles." },
    { icon: <FaCar />, title: "Vehicle Purchase", desc: "Sell at best price." },
    { icon: <FaDollarSign />, title: "Finance", desc: "Quick loans & EMI." },
    { icon: <FaExchangeAlt />, title: "Exchange", desc: "Upgrade your car." },
    { icon: <FaShieldAlt />, title: "Insurance", desc: "Easy claims support." },
    { icon: <FaTools />, title: "Maintenance", desc: "Complete servicing." },
  ];

  const videos = [
    { id: 1, src: "https://www.youtube.com/embed/abcd1234" },
    { id: 2, src: "https://www.youtube.com/embed/xyz5678" },
  ];

  return (
    <div className="service-page">

      {/* HEADER */}
      <div className="service-header">
        <div className="service-header-box">
          <h1>Our Premium Services</h1>
          <p>
            We provide top-quality car care solutions using advanced technology
            and expert professionals. From basic cleaning to premium detailing,
            we ensure your vehicle looks brand new every time.
          </p>
        </div>
      </div>

      {/* MAIN SERVICES */}
      <div className="service-grid">
        {servicesData.map((item, i) => (
          <div key={i} className="service-card">
            <div className="service-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
            <button className="service-btn">Book Now</button>
          </div>
        ))}
      </div>

      {/* OTHER SERVICES */}
      <section className="service-section">
        <h2 className="section-title">Other Services</h2>
        <div className="service-grid">
          {extraServices.map((item, i) => (
            <div key={i} className="service-card light">
              <div className="service-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* VIDEOS */}
      <section className="service-section">
        <h2 className="section-title">Watch Our Work</h2>
        <div className="video-grid">
          {videos.map((v) => (
            <div key={v.id} className="video-box" onClick={() => setVideoUrl(v.src)}>
              ▶ Play Video
            </div>
          ))}
        </div>
      </section>

      {/* VIDEO MODAL */}
      {videoUrl && (
        <div className="video-modal" onClick={() => setVideoUrl(null)}>
          <div className="video-wrapper" onClick={(e) => e.stopPropagation()}>
            <span className="close-btn" onClick={() => setVideoUrl(null)}>✕</span>
            <iframe
              src={`${videoUrl}?autoplay=1&mute=1`}
              title="video"
              allow="autoplay"
            />
          </div>
        </div>
      )}
    </div>
  );
}