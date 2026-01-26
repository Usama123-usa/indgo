import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const sliderData = [
    {
        badge: "Live: Pakistan's Fastest Charging Network",
        h1: "Electrifying <br/><span class='text-transparent bg-clip-text bg-gradient-to-r from-accent to-emerald-200'>Pakistan's</span> <br/> Future Journey.",
        p: "From Karachi to Khyber, INDIGOST is building the backbone of sustainable transportation. World-class EV charging & smart solar solutions tailored for the nation.",
        bg: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2072&auto=format&fit=crop"
    },
    {
        badge: "Solar: High-Efficiency Energy Solutions",
        h1: "Harnessing <br/><span class='text-transparent bg-clip-text bg-gradient-to-r from-accent to-emerald-200'>Solar Power</span> <br/> for Tomorrow.",
        p: "Maximize your energy independence with INDIGOST's premium solar EPC services for industries, businesses, and modern homes.",
        bg: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop"
    },
    {
        badge: "BESS: Smart Energy Storage Systems",
        h1: "Unlocking <br/><span class='text-transparent bg-clip-text bg-gradient-to-r from-accent to-emerald-200'>Power Backup</span> <br/> with BESS.",
        p: "Advanced Battery Energy Storage Systems (BESS) designed to provide seamless backup and grid stability for mission-critical operations.",
        bg: "https://images.unsplash.com/photo-1594818379496-da1e345b0ded?q=80&w=2070&auto=format&fit=crop"
    }
];

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % sliderData.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const slide = sliderData[currentSlide];

    return (
        <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden">
            <div id="hero-slider" className="absolute inset-0 w-full h-full z-0">
                {sliderData.map((data, index) => (
                    <div
                        key={index}
                        className={`slide-fade ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                        style={{ backgroundImage: `url('${data.bg}')` }}
                    ></div>
                ))}
            </div>
            <div className="absolute inset-0 z-10 hero-gradient-overlay"></div>
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background-light to-transparent z-20"></div>
            <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full py-20">
                <div className="flex flex-col gap-6 lg:gap-8 max-w-2xl text-white">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-deep-indigo/50 border border-indigo-400/30 w-fit backdrop-blur-md shadow-lg shadow-indigo-500/10">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
                        </span>
                        <span className="text-xs font-bold tracking-wide uppercase text-indigo-100">{slide.badge}</span>
                    </div>
                    {/* Render HTML content for H1 safely */}
                    <h1
                        className="text-5xl lg:text-7xl font-display font-bold leading-[1.05] tracking-tight"
                        dangerouslySetInnerHTML={{ __html: slide.h1 }}
                    >
                    </h1>
                    <p className="text-lg lg:text-xl text-indigo-100 font-light leading-relaxed max-w-lg border-l-4 border-accent pl-6">
                        {slide.p}
                    </p>
                    <div className="flex flex-wrap gap-4 mt-4">
                        <Link to="/products" className="bg-accent hover:bg-accent-hover text-white h-14 px-8 rounded-lg font-bold text-base transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] hover:-translate-y-1 flex items-center gap-2 group flex justify-center items-center">
                            Find a Station
                            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">location_on</span>
                        </Link>
                        <Link to="/services" className="bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/20 text-white h-14 px-8 rounded-lg font-bold text-base transition-all flex items-center gap-2 hover:border-accent/50 flex justify-center items-center">
                            Solar for Business
                            <span className="material-symbols-outlined text-yellow-300">solar_power</span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-6 mt-6 pt-6 border-t border-white/10 text-sm font-medium text-indigo-200">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-accent">verified</span>
                            <span>Licensed by NEPRA</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-accent">engineering</span>
                            <span>IEC Certified</span>
                        </div>
                    </div>
                </div>
                <div className="hidden lg:flex flex-col justify-center items-end relative h-full">
                    <div className="glass-panel p-6 rounded-2xl w-96 mb-6 mr-8 transform translate-y-4 animate-float-slow border-l-4 border-l-accent">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-white font-bold text-lg">Super Charger V3</h3>
                                <p className="text-indigo-300 text-xs">Islamabad M-2 Interchange</p>
                            </div>
                            <div className="px-2 py-1 rounded bg-green-500/20 text-green-300 text-xs font-bold border border-green-500/30">
                                AVAILABLE
                            </div>
                        </div>
                        <div className="flex items-end gap-2 mb-2">
                            <span className="text-5xl font-display font-bold text-white">120</span>
                            <span className="text-xl text-accent font-bold mb-2">kW</span>
                        </div>
                        <div className="w-full bg-indigo-900/50 rounded-full h-2 mb-4">
                            <div className="bg-gradient-to-r from-accent to-emerald-300 h-2 rounded-full w-3/4 animate-pulse"></div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div className="bg-indigo-900/30 rounded-lg p-2 col-span-2">
                                <span className="material-symbols-outlined text-white mb-1">timer</span>
                                <p className="text-indigo-200 text-xs">15 mins to 80%</p>
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-20 right-0 glass-panel p-4 rounded-xl flex items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
                        <div className="size-10 rounded-full bg-accent flex items-center justify-center text-white shadow-lg shadow-accent/40">
                            <span className="material-symbols-outlined">bolt</span>
                        </div>
                        <div>
                            <p className="text-xs text-indigo-200 uppercase font-bold">Total Energy Delivered</p>
                            <p className="text-xl text-white font-display font-bold">4.2 GWh</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
