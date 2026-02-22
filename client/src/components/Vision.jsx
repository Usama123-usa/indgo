import React from 'react';
import { Link } from 'react-router-dom';

const Vision = () => {
    return (
        <section className="py-24 bg-deep-indigo text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(#4338ca 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary rounded-full blur-[120px] opacity-40"></div>
            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
                <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-accent text-xs font-bold tracking-widest uppercase mb-6">Vision 2030</span>
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Connecting the Nation</h2>
                <p className="text-xl text-indigo-200 max-w-3xl mx-auto mb-12">
                    Our vision creates a seamless electric corridor from the Arabian Sea to the Karakoram. No range anxiety, just pure driving pleasure.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all group">
                        <div className="size-12 bg-primary rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-primary/30">
                            <span className="material-symbols-outlined">map</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3">Urban Densification</h3>
                        <p className="text-indigo-200 text-sm leading-relaxed">
                            Deploying fast chargers every 5km in major metropolitan areas including Lahore, and Islamabad.
                        </p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all group">
                        <div className="size-12 bg-accent rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-accent/30">
                            <span className="material-symbols-outlined text-white">add_road</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3">Motorway Electrification</h3>
                        <p className="text-indigo-200 text-sm leading-relaxed">
                            Complete coverage of M-Line motorways and M-2 Motorway with ultra-fast charging hubs.
                        </p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all group">
                        <div className="size-12 bg-indigo-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-indigo-600/30">
                            <span className="material-symbols-outlined">home_iot_device</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3">Smart Home Integration</h3>
                        <p className="text-indigo-200 text-sm leading-relaxed">
                            Bringing affordable 7kW AC chargers to Pakistani households integrated with existing solar setups.
                        </p>
                    </div>
                </div>
                <div className="mt-16">
                    <Link to="/contact" className="bg-white text-deep-indigo hover:bg-indigo-50 px-10 py-4 rounded-full font-bold text-lg transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 inline-block">
                        Join the Revolution
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Vision;
