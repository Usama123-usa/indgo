import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
    return (
        <div className="bg-background-light font-display text-text-main antialiased overflow-x-hidden relative">
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px]"></div>
            </div>

            <main className="relative z-10 w-full flex flex-col items-center">
                <section className="w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 pt-16 pb-12 lg:pt-24 lg:pb-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="flex flex-col gap-6 order-2 lg:order-1">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary-bright w-fit border border-secondary/20">
                                <span className="material-symbols-outlined text-[16px]">verified</span>
                                <span className="text-xs font-bold uppercase tracking-wider">Premium EV & Solar Solutions</span>
                            </div>
                            <h1 className="text-4xl lg:text-6xl font-bold leading-tight tracking-tight text-text-main">
                                Powering Pakistan's <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-light to-secondary">Green Revolution</span>
                            </h1>
                            <p className="text-gray-800 text-lg leading-relaxed max-w-lg">
                                Cutting-edge Electric Vehicle charging networks and Solar Energy infrastructure. We are building the sustainable backbone of Pakistan's future.
                            </p>
                            <div className="flex flex-wrap gap-4 pt-4">
                                <button onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })} className="bg-secondary hover:bg-secondary-bright text-white text-base font-bold py-3 px-8 rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
                                    Explore Solutions
                                </button>
                                <Link to="/projects" className="bg-white hover:bg-slate-50 text-primary border border-primary/20 text-base font-bold py-3 px-8 rounded-lg transition-all hover:shadow-lg flex items-center gap-2">
                                    <span className="material-symbols-outlined text-secondary">play_circle</span>
                                    View Projects
                                </Link>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 relative group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-secondary/20 to-primary/20 rounded-2xl blur-2xl -z-10 group-hover:blur-3xl transition-all duration-700"></div>
                            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-white/60">
                                <img alt="Solar panels and clean energy" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDR2uiixiOgsrBo3WelLFeZbl8-ePx-ZkUvzmzMHCBHyg-YrfJ_tx2kTq6d-cp6YxwSVjcka-n3RtHCo-7_RvGWjKBIICHPPXXyaQLttwRPGMZd5DETIeNLxoull0GhCyH9tJzrp2WCCxcCEe3-E93Dwl3Z_AT1hiLLZgkNEf52PZLegO5SAdqbYnarBtoDaW3yAfkVHrkwOUlSOUYMJ1hkQPh27M10ZrZL38IGBqBBDblgHviu9dtSeomx4hQM-VKjGbcCHnpWjAU" />
                                <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl text-white shadow-lg">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-xs font-medium text-white/90">Efficiency Rate</p>
                                            <p className="text-xl font-bold">99.2%</p>
                                        </div>
                                        <div className="size-10 rounded-full bg-secondary flex items-center justify-center shadow-lg">
                                            <span className="material-symbols-outlined text-white">eco</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full bg-white relative py-20 border-y border-slate-100" id="services">
                    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <h2 className="text-3xl lg:text-4xl font-bold text-text-main mb-4">Complete Energy Lifecycle</h2>
                            <p className="text-gray-800 text-lg">Expert services designed for the local climate and grid conditions, ensuring maximum reliability.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="group relative bg-background-light rounded-xl p-8 border border-slate-200 hover:border-secondary/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                                <div className="size-14 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                    <span className="material-symbols-outlined text-3xl">ev_station</span>
                                </div>
                                <h3 className="text-xl font-bold text-text-main mb-3">EV Installation</h3>
                                <p className="text-gray-800 leading-relaxed mb-6">Certified installation of residential and commercial EV chargers compatible with all major imported and local EV models.</p>
                                <a className="inline-flex items-center text-secondary font-bold text-sm hover:translate-x-1 transition-transform" href="#">
                                    Learn More <span className="material-symbols-outlined text-lg ml-1">arrow_right_alt</span>
                                </a>
                            </div>
                            <div className="group relative bg-background-light rounded-xl p-8 border border-slate-200 hover:border-secondary/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                                <div className="size-14 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center mb-6 group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                                    <span className="material-symbols-outlined text-3xl">solar_power</span>
                                </div>
                                <h3 className="text-xl font-bold text-text-main mb-3">Solar Integration</h3>
                                <p className="text-gray-800 leading-relaxed mb-6">Seamless integration of solar PV systems with hybrid inverters and battery backup for uninterrupted power supply.</p>
                                <a className="inline-flex items-center text-secondary font-bold text-sm hover:translate-x-1 transition-transform" href="#">
                                    Learn More <span className="material-symbols-outlined text-lg ml-1">arrow_right_alt</span>
                                </a>
                            </div>
                            <div className="group relative bg-background-light rounded-xl p-8 border border-slate-200 hover:border-secondary/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                                <div className="size-14 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                    <span className="material-symbols-outlined text-3xl">handyman</span>
                                </div>
                                <h3 className="text-xl font-bold text-text-main mb-3">Smart Maintenance</h3>
                                <p className="text-gray-800 leading-relaxed mb-6">24/7 remote monitoring and rapid response on-site maintenance across major cities in Pakistan.</p>
                                <a className="inline-flex items-center text-secondary font-bold text-sm hover:translate-x-1 transition-transform" href="#">
                                    Learn More <span className="material-symbols-outlined text-lg ml-1">arrow_right_alt</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 py-20 flex flex-col lg:flex-row gap-16">
                    <div className="lg:w-1/2">
                        <div className="sticky top-24">
                            <h2 className="text-3xl lg:text-4xl font-bold text-text-main mb-6">Nationwide Support <br /><span className="text-primary">You Can Trust</span></h2>
                            <p className="text-gray-800 text-lg mb-8">
                                Our technical support framework is designed for peace of mind. From Lahore to Karachi, we combine local expertise with advanced remote diagnostics.
                            </p>
                            <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10 shadow-sm">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="size-12 rounded-full bg-white flex items-center justify-center shadow-md text-secondary">
                                        <span className="material-symbols-outlined">headset_mic</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-500">24/7 Support Hotline</p>
                                        <p className="text-lg font-bold text-primary">+92 300 9358751</p>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-500 flex items-center gap-2">
                                    <span className="size-2 rounded-full bg-secondary animate-pulse"></span>
                                    Available Mon-Sat, 9am - 6pm PKT
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/2 flex flex-col gap-4">
                        <details className="group bg-white rounded-xl border border-slate-200 open:border-secondary/40 open:shadow-lg transition-all duration-200" open>
                            <summary className="flex cursor-pointer items-center justify-between p-6">
                                <div className="flex items-center gap-4">
                                    <span className="material-symbols-outlined text-primary">support_agent</span>
                                    <span className="text-text-main font-bold text-lg">Dedicated Helpdesk</span>
                                </div>
                                <span className="material-symbols-outlined text-primary-light/50 group-open:rotate-180 transition-transform">expand_more</span>
                            </summary>
                            <div className="px-6 pb-6 text-gray-800 leading-relaxed pl-[3.25rem]">
                                Our Urdu and English speaking support team is available around the clock to assist with operational inquiries, billing support, or emergency system shutdowns.
                            </div>
                        </details>
                        <details className="group bg-white rounded-xl border border-slate-200 open:border-secondary/40 open:shadow-lg transition-all duration-200">
                            <summary className="flex cursor-pointer items-center justify-between p-6">
                                <div className="flex items-center gap-4">
                                    <span className="material-symbols-outlined text-primary">engineering</span>
                                    <span className="text-text-main font-bold text-lg">On-site Troubleshooting</span>
                                </div>
                                <span className="material-symbols-outlined text-primary-light/50 group-open:rotate-180 transition-transform">expand_more</span>
                            </summary>
                            <div className="px-6 pb-6 text-gray-800 leading-relaxed pl-[3.25rem]">
                                We dispatch certified technicians to your location within 24 hours in metro areas to diagnose and resolve hardware issues directly.
                            </div>
                        </details>
                        <details className="group bg-white rounded-xl border border-slate-200 open:border-secondary/40 open:shadow-lg transition-all duration-200">
                            <summary className="flex cursor-pointer items-center justify-between p-6">
                                <div className="flex items-center gap-4">
                                    <span className="material-symbols-outlined text-primary">cloud_sync</span>
                                    <span className="text-text-main font-bold text-lg">Remote Updates</span>
                                </div>
                                <span className="material-symbols-outlined text-primary-light/50 group-open:rotate-180 transition-transform">expand_more</span>
                            </summary>
                            <div className="px-6 pb-6 text-gray-800 leading-relaxed pl-[3.25rem]">
                                We monitor your system health remotely, pushing firmware updates to ensure compatibility with new EV models arriving in the Pakistani market.
                            </div>
                        </details>
                        <details className="group bg-white rounded-xl border border-slate-200 open:border-secondary/40 open:shadow-lg transition-all duration-200">
                            <summary className="flex cursor-pointer items-center justify-between p-6">
                                <div className="flex items-center gap-4">
                                    <span className="material-symbols-outlined text-primary">school</span>
                                    <span className="text-text-main font-bold text-lg">Staff Training</span>
                                </div>
                                <span className="material-symbols-outlined text-primary-light/50 group-open:rotate-180 transition-transform">expand_more</span>
                            </summary>
                            <div className="px-6 pb-6 text-gray-800 leading-relaxed pl-[3.25rem]">
                                Comprehensive on-site training for your staff to ensure they understand how to operate the charging stations and monitor solar outputs safely.
                            </div>
                        </details>
                    </div>
                </section>

                <section className="w-full py-20 px-4">
                    <div className="max-w-[1280px] mx-auto relative rounded-3xl overflow-hidden shadow-2xl shadow-primary/20">
                        <div className="absolute inset-0 z-0">
                            <img alt="Abstract blurred background" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCA_o-Sutec4MkxHDIAh_-p8Ord0tWmzYyWVQ1Sd_f-ZqiXmpx8INQJTh1_a2lvvfltNs9hpR3vppMb166PsQiGnkEn-kr6OQopa6yBqqWCqhuBKNpHAYyRZxdEhTsye0yIMNAetMtp1FxiC-KpNs_N_jIpddK1sXs1gkwbyENt0FkrZXngahz54JJvsN9ga4N8lJbs3pScyZ27UgRjWhzRXVp94U6PXu-XpL_eKWZayWtJTtw8Be6cbKSQO4MWthu4Oy3h2ym4yL8" />
                            <div className="absolute inset-0 bg-background-dark/80 mix-blend-multiply"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-background-dark/95 via-primary/80 to-secondary/70"></div>
                        </div>
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 p-10 md:p-16 text-white">
                            <div className="max-w-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Ready to Switch to Green Energy?</h2>
                                <p className="text-indigo-100 text-lg">Get a customized solar or EV charging plan for your business or home today. Our experts in Lahore are ready to assist.</p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                                <Link to="/contact" className="bg-secondary hover:bg-white hover:text-secondary text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all transform hover:scale-105 border border-transparent hover:border-secondary flex items-center justify-center">
                                    Contact Sales
                                </Link>

                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Services;
