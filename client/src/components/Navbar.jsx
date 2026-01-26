import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Common styling for nav links
    const getLinkClasses = ({ isActive }) =>
        `relative text-sm font-medium transition-all duration-300 py-2 ${isActive ? 'text-primary' : 'text-gray-500 hover:text-primary'
        } after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:transform after:scale-x-0 after:transition-transform after:duration-300 ${isActive ? 'after:scale-x-100' : 'hover:after:scale-x-100'}`;

    return (
        <nav className="fixed top-0 left-0 w-full z-50 glass-nav border-b border-indigo-100 transition-all duration-300 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Link to="/" className="flex items-center gap-3 group cursor-pointer">
                        <img src="./images/logo.png" alt="INDIGOST Logo" className="h-12 w-auto" />
                        <div>
                            <span className="text-xl font-display font-semibold tracking-tight text-deep-indigo leading-none block">INDIGOST</span>
                            <span className="text-[10px] font-bold tracking-widest text-accent uppercase block">Group of Companies</span>
                        </div>
                    </Link>
                    <div className="hidden md:flex items-center gap-8">
                        <NavLink to="/" className={getLinkClasses}>Home</NavLink>
                        <NavLink to="/about" className={getLinkClasses}>About</NavLink>
                        <NavLink to="/services" className={getLinkClasses}>Services</NavLink>
                        <NavLink to="/products" className={getLinkClasses}>Products</NavLink>
                        <NavLink to="/projects" className={getLinkClasses}>Projects</NavLink>
                        <NavLink to="/media" className={getLinkClasses}>Media</NavLink>
                        <NavLink to="/contact" className={getLinkClasses}>Contact</NavLink>
                    </div>
                    <div className="hidden md:flex">
                        <Link to="/contact" className="relative group overflow-hidden bg-deep-indigo hover:bg-primary text-white text-sm font-medium py-2.5 px-6 rounded-lg transition-all shadow-lg shadow-indigo-900/20">
                            <span className="relative z-10 flex items-center gap-2">
                                Partner With Us
                                <span className="material-symbols-outlined text-sm">handshake</span>
                            </span>
                        </Link>
                    </div>
                    <button className="md:hidden p-2 text-deep-indigo hover:text-primary" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </div>
            </div>
            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden glass-nav absolute w-full h-screen overflow-y-auto border-b border-indigo-100 p-4">
                    <div className="flex flex-col gap-4">
                        <NavLink to="/" className={getLinkClasses} onClick={() => setIsMenuOpen(false)}>Home</NavLink>
                        <NavLink to="/about" className={getLinkClasses} onClick={() => setIsMenuOpen(false)}>About</NavLink>
                        <NavLink to="/services" className={getLinkClasses} onClick={() => setIsMenuOpen(false)}>Services</NavLink>
                        <NavLink to="/products" className={getLinkClasses} onClick={() => setIsMenuOpen(false)}>Products</NavLink>
                        <NavLink to="/projects" className={getLinkClasses} onClick={() => setIsMenuOpen(false)}>Projects</NavLink>
                        <NavLink to="/media" className={getLinkClasses} onClick={() => setIsMenuOpen(false)}>Media</NavLink>
                        <NavLink to="/contact" className={getLinkClasses} onClick={() => setIsMenuOpen(false)}>Contact</NavLink>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
