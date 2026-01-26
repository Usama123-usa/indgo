import React from 'react';

const Marquee = () => {
    return (
        <section className="py-16 bg-white border-b border-indigo-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-10 text-center">
                <span className="text-accent font-bold text-sm tracking-widest uppercase mb-2 block">Collaboration</span>
                <h2 className="text-3xl font-display font-bold text-deep-indigo">Powering Pakistan Together</h2>
                <p className="text-gray-500 mt-2 max-w-2xl mx-auto">Strategic alliances with the nation's leading telecommunications and energy providers.</p>
            </div>
            <div className="relative w-full">
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10"></div>
                <div className="flex overflow-hidden group">
                    <div className="flex space-x-12 animate-marquee whitespace-nowrap py-4">
                        {/* Repeat twice for seamless loop - copied from HTML structure which had duplicates manually or could map */}
                        {[...Array(2)].map((_, i) => (
                            <React.Fragment key={i}>
                                <div className="flex items-center justify-center bg-indigo-50 w-48 h-24 rounded-lg border border-indigo-100 grayscale hover:grayscale-0 transition-all duration-300">
                                    <span className="text-2xl font-bold text-gray-800">HUAWEI</span>
                                </div>
                                <div className="flex items-center justify-center bg-indigo-50 w-48 h-24 rounded-lg border border-indigo-100 grayscale hover:grayscale-0 transition-all duration-300">
                                    <span className="text-2xl font-bold text-blue-600">CAMEL ENERGY</span>
                                </div>
                                <div className="flex items-center justify-center bg-indigo-50 w-48 h-24 rounded-lg border border-indigo-100 grayscale hover:grayscale-0 transition-all duration-300">
                                    <span className="text-2xl font-bold text-[#ea0029]">JA SOLAR</span>
                                </div>
                                <div className="flex items-center justify-center bg-indigo-50 w-48 h-24 rounded-lg border border-indigo-100 grayscale hover:grayscale-0 transition-all duration-300">
                                    <span className="text-2xl font-bold text-[#00928f]">JINKO SOLAR</span>
                                </div>
                                <div className="flex items-center justify-center bg-indigo-50 w-48 h-24 rounded-lg border border-indigo-100 grayscale hover:grayscale-0 transition-all duration-300">
                                    <span className="text-2xl font-bold text-[#005c65]">SUNGROW</span>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Marquee;
