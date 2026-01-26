import React from 'react';

const Features = () => {
    return (
        <section className="py-20 bg-background-light relative">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white to-transparent opacity-50 pointer-events-none"></div>
            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl font-display font-bold text-deep-indigo mb-6">Why Choose <span className="text-primary">INDIGOST?</span></h2>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            We aren't just installing chargers; we are engineering an ecosystem. Designed specifically for the voltage fluctuations and environmental conditions of Pakistan.
                        </p>
                        <div className="space-y-6">
                            <div className="flex gap-4 group">
                                <div className="shrink-0 size-14 rounded-xl bg-white border border-indigo-100 flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:border-primary/30 transition-all duration-300">
                                    <span className="material-symbols-outlined text-3xl text-primary">speed</span>
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-deep-indigo group-hover:text-primary transition-colors">Ultra-Fast Charging</h4>
                                    <p className="text-gray-500 text-sm mt-1">120kW+ DC Fast Chargers on Motorways (M-2, M-1, M-5).</p>
                                </div>
                            </div>
                            <div className="flex gap-4 group">
                                <div className="shrink-0 size-14 rounded-xl bg-white border border-indigo-100 flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:border-primary/30 transition-all duration-300">
                                    <span className="material-symbols-outlined text-3xl text-accent">solar_power</span>
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-deep-indigo group-hover:text-primary transition-colors">Green Energy Mix</h4>
                                    <p className="text-gray-500 text-sm mt-1">Hybrid stations powered by solar, reducing grid dependency by 40%.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 group">
                                <div className="shrink-0 size-14 rounded-xl bg-white border border-indigo-100 flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:border-primary/30 transition-all duration-300">
                                    <span className="material-symbols-outlined text-3xl text-indigo-500">support_agent</span>
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-deep-indigo group-hover:text-primary transition-colors">24/7 Local Support</h4>
                                    <p className="text-gray-500 text-sm mt-1">Dedicated Urdu & English support centers in Lahore and Karachi.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent rounded-3xl blur-2xl opacity-20 transform rotate-3"></div>
                        <div className="bg-white rounded-3xl p-8 shadow-xl border border-indigo-50 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-700"></div>
                            <h3 className="text-2xl font-bold text-deep-indigo mb-6 relative z-10">Our Impact</h3>
                            <div className="grid grid-cols-2 gap-6 relative z-10">
                                <div className="p-4 rounded-xl bg-indigo-50/50 hover:bg-indigo-50 transition-colors">
                                    <p className="text-3xl font-bold text-primary mb-1">50+</p>
                                    <p className="text-xs text-gray-500 font-semibold uppercase">Cities Connected</p>
                                </div>
                                <div className="p-4 rounded-xl bg-green-50/50 hover:bg-green-50 transition-colors">
                                    <p className="text-3xl font-bold text-accent mb-1">10k</p>
                                    <p className="text-xs text-gray-500 font-semibold uppercase">Tons CO2 Saved</p>
                                </div>
                                <div className="col-span-2 p-4 rounded-xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 transition-all">
                                    <div className="flex justify-between items-center mb-2">
                                        <p className="text-sm font-bold text-gray-700">Customer Satisfaction</p>
                                        <span className="text-accent font-bold">4.9/5</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-accent h-2 rounded-full w-[98%]"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
