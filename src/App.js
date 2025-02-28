import React, { useState, useEffect } from "react";
import "./App.css";
import { FaPhone, FaEnvelope, FaClock } from "react-icons/fa";
import ProductModal from "./ProductModal";

// Örnek ürün verileri: Her kategori için ürünler
const productsData = {
  kategori1: [
    {
      id: 1,
      name: "Kalsiyum",
      image: "/calcium.jpg",
      description: "Kalsiyum."
    },
    {
      id: 2,
      name: "Ürün 2",
      image: "https://via.placeholder.com/150",
      description: "Ürün 2 açıklaması."
    }
  ],
  kategori2: [
    {
      id: 3,
      name: "Ürün 3",
      image: "https://via.placeholder.com/150",
      description: "Ürün 3 açıklaması."
    },
    {
      id: 4,
      name: "Ürün 4",
      image: "https://via.placeholder.com/150",
      description: "Ürün 4 açıklaması."
    }
  ]
};

// Navbar: Aktif bölüm bilgisine göre linke "active" sınıfı ekliyoruz
const Navbar = ({ activeSection }) => (
  <nav className="navbar">
    <ul>
      <li>
        <a href="#home" className={activeSection === "home" ? "active" : ""}>
          Ana Sayfa
        </a>
      </li>
      <li>
        <a href="#about" className={activeSection === "about" ? "active" : ""}>
          Hakkımızda
        </a>
      </li>
      <li>
        <a href="#products" className={activeSection === "products" ? "active" : ""}>
          Ürünler
        </a>
      </li>
      <li>
        <a href="#offer" className={activeSection === "offer" ? "active" : ""}>
          Teklif Al
        </a>
      </li>
      <li>
        <a href="#contact" className={activeSection === "contact" ? "active" : ""}>
          İletişim
        </a>
      </li>
    </ul>
  </nav>
);

// Ana Sayfa Bölümü (Logonuzu içerir)
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

// Ürünler Bölümü: Tab yapısı ve ürün modalı içerir
const ProductsSection = () => {
  const [activeTab, setActiveTab] = useState("kategori1");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <section id="products" className="section">
      <h2>Ürünler</h2>
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === "kategori1" ? "active" : ""}`}
          onClick={() => handleTabClick("kategori1")}
        >
          Kategori 1
        </button>
        <button
          className={`tab-button ${activeTab === "kategori2" ? "active" : ""}`}
          onClick={() => handleTabClick("kategori2")}
        >
          Kategori 2
        </button>
      </div>
      <div className="products-grid">
        {productsData[activeTab].map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => handleProductClick(product)}
          >
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <h3 className="product-name">{product.name}</h3>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={closeModal} />
      )}
    </section>
  );
};

// İletişim Bilgileri: Modern ikonlar kullanılarak telefon, e-posta ve çalışma saatlerini gösterir.
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
  // Aktif bölümü takip etmek için state
  const [activeSection, setActiveSection] = useState("home");

  // Intersection Observer kullanarak hangi bölümün görünür olduğunu tespit ediyoruz.
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.6
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
      <ProductsSection />
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





