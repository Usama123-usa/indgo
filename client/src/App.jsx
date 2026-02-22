import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Products from './pages/Products';
import Projects from './pages/Projects';
import Media from './pages/Media';
import Contact from './pages/Contact';
import FindStation from './pages/FindStation';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import { useEffect } from 'react';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="bg-background-light font-body text-text-dark overflow-x-hidden">
        <Navbar />
        <main className="relative w-full min-h-screen flex flex-col pt-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/index.html" element={<Home />} /> {/* Handle legacy ink */}
            <Route path="/about_us.html" element={<About />} /> {/* Handle legacy link */}
            <Route path="/about" element={<About />} />
            <Route path="/services.html" element={<Services />} /> {/* Handle legacy ink */}
            <Route path="/services" element={<Services />} />
            <Route path="/product.html" element={<Products />} /> {/* Handle legacy link */}
            <Route path="/products" element={<Products />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/media" element={<Media />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/find-station" element={<FindStation />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
