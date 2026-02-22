import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-indigo-100 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-3">
                            <img src="/images/logo.png" alt="INDIGOST Logo" className="h-[120px] w-auto" />
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Pioneering Pakistan's transition to sustainable energy. We empower businesses and individuals with smart EV and solar technologies.
                        </p>
                        <div className="flex gap-4">
                            <a className="size-10 rounded-full bg-indigo-50 hover:bg-primary text-primary hover:text-white flex items-center justify-center transition-colors duration-300" href="#">
                                <span className="material-symbols-outlined text-xl">public</span>
                            </a>
                            <a className="size-10 rounded-full bg-indigo-50 hover:bg-primary text-primary hover:text-white flex items-center justify-center transition-colors duration-300" href="#">
                                <span className="material-symbols-outlined text-xl">mail</span>
                            </a>
                            <a className="size-10 rounded-full bg-indigo-50 hover:bg-primary text-primary hover:text-white flex items-center justify-center transition-colors duration-300" href="#">
                                <span className="material-symbols-outlined text-xl">share</span>
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold text-deep-indigo mb-6">Solutions</h4>
                        <ul className="space-y-4">
                            <li><Link className="text-gray-500 hover:text-primary text-sm transition-colors" to="/find-station">EV Charging Stations</Link></li>
                            <li><Link className="text-gray-500 hover:text-primary text-sm transition-colors" to="/services">Industrial Solar</Link></li>
                            <li><Link className="text-gray-500 hover:text-primary text-sm transition-colors" to="/products">Home Energy Storage</Link></li>
                            <li><Link className="text-gray-500 hover:text-primary text-sm transition-colors" to="/services">Fleet Management</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-deep-indigo mb-6">Company</h4>
                        <ul className="space-y-4">
                            <li><Link className="text-gray-500 hover:text-primary text-sm transition-colors" to="/">Home</Link></li>
                            <li><Link className="text-gray-500 hover:text-primary text-sm transition-colors" to="/about">About Us</Link></li>
                            <li><Link className="text-gray-500 hover:text-primary text-sm transition-colors" to="/projects">Projects in Pakistan</Link></li>
                            <li><Link className="text-gray-500 hover:text-primary text-sm transition-colors" to="/media">Press and Media</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-deep-indigo mb-6">Stay Charged</h4>
                        <p className="text-gray-500 text-sm mb-4">Get the latest updates on EV infrastructure in Pakistan.</p>
                        <form className="flex flex-col gap-3" onSubmit={(e) => { e.preventDefault(); alert('Subscribed!'); }}>
                            <input className="w-full h-10 px-4 rounded-lg bg-indigo-50 border border-indigo-100 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm text-deep-indigo placeholder-gray-400" placeholder="Email address" type="email" />
                            <button className="w-full h-10 bg-deep-indigo hover:bg-primary text-white text-sm font-bold rounded-lg transition-colors shadow-md hover:shadow-lg" type="submit">Subscribe</button>
                        </form>
                    </div>
                </div>
                <div className="border-t border-indigo-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-sm">© 2024 INDIGOST Group Pakistan. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link className="text-gray-400 hover:text-primary text-sm" to="/privacy">Privacy Policy</Link>
                        <Link className="text-gray-400 hover:text-primary text-sm" to="/terms">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
