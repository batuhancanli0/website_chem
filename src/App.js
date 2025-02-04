// src/App.js
import React, { useState, useEffect } from "react";
import "./App.css";
import { FaPhone, FaEnvelope, FaClock } from "react-icons/fa";

// Navbar bileşeni: aktif bölüm bilgisi prop olarak alınır
const Navbar = ({ activeSection }) => (
  <nav className="navbar">
    <ul>
      <li>
        <a
          href="#home"
          className={activeSection === "home" ? "active" : ""}
        >
          Ana Sayfa
        </a>
      </li>
      <li>
        <a
          href="#about"
          className={activeSection === "about" ? "active" : ""}
        >
          Hakkımızda
        </a>
      </li>
      <li>
        <a
          href="#products"
          className={activeSection === "products" ? "active" : ""}
        >
          Ürünler
        </a>
      </li>
      <li>
        <a
          href="#offer"
          className={activeSection === "offer" ? "active" : ""}
        >
          Teklif Al
        </a>
      </li>
      <li>
        <a
          href="#contact"
          className={activeSection === "contact" ? "active" : ""}
        >
          İletişim
        </a>
      </li>
    </ul>
  </nav>
);

// Ana Sayfa Bölümü: Logonuzun yer aldığı bölüm
const HomeSection = () => (
  <section id="home" className="section">
    <img src="/logo.png" alt="Firma Logosu" className="home-logo" />
    <h2>Ana Sayfa</h2>
    <p>Kimya sektöründe yenilikçi çözümler sunan firmamıza hoş geldiniz!</p>
  </section>
);

// Diğer bölümler için ortak bileşen
const Section = ({ id, title, children }) => (
  <section id={id} className="section">
    <h2>{title}</h2>
    <p>{children}</p>
  </section>
);

// İletişim bilgileri bileşeni: modern ikonlar kullanılıyor
const ContactInfo = () => (
  <div className="contact-info">
    <div className="contact-item">
      <FaPhone className="contact-icon" />
      <span>Telefon: +90 123 456 7890</span>
    </div>
    <div className="contact-item">
      <FaEnvelope className="contact-icon" />
      <span>E-Posta: info@ornekfirma.com</span>
    </div>
    <div className="contact-item">
      <FaClock className="contact-icon" />
      <span>Çalışma Saatleri: 09:00 - 18:00</span>
    </div>
  </div>
);

function App() {
  // Hangi bölümün aktif olduğunu tutan state
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.6, // Bölümün %60'ı görünür olduğunda aktif kabul edilir
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((section) => observer.observe(section));

    // Cleanup: observer'ı kaldırıyoruz
    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div>
      <Navbar activeSection={activeSection} />
      <HomeSection />
      <Section id="about" title="Hakkımızda">
        Firmamız, uzun yıllara dayanan tecrübesi ve modern teknolojileri kullanarak
        kimya sektöründe öncü konumda bulunmaktadır.
      </Section>
      <Section id="products" title="Ürünler">
        Geniş ürün yelpazemizle, kalite ve güvenilirliği ön planda tutuyoruz.
        Ürünlerimizi inceleyebilirsiniz.
      </Section>
      <Section id="offer" title="Teklif Al">
        İhtiyaçlarınıza özel teklifler almak için lütfen iletişim formumuzu doldurun.
      </Section>
      <section id="contact" className="section">
        <h2>İletişim</h2>
        <ContactInfo />
      </section>
    </div>
  );
}

export default App;



