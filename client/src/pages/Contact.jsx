import React from 'react';

const Contact = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display text-text-main overflow-x-hidden relative">
            <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary opacity-20 filter blur-[80px] animate-blob"></div>
            <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-80 h-80 rounded-full bg-secondary opacity-20 filter blur-[80px] animate-blob animation-delay-2000"></div>

            <main className="flex-grow pt-20 pb-20 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                        <div className="lg:col-span-6 flex flex-col gap-10">
                            <div className="flex flex-col gap-4">
                                <span className="text-secondary font-bold tracking-wider text-sm uppercase">Get in touch</span>
                                <h1 className="text-5xl md:text-6xl font-black text-primary dark:text-white leading-[1.1] tracking-tight">
                                    Connect with <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-600 to-secondary">INDIGOST</span>
                                </h1>
                                <p className="text-indigo-800/80 dark:text-indigo-200 text-lg md:text-xl max-w-lg leading-relaxed">
                                    Fueling Pakistan's green revolution. Reach out for EV Charging Stations, Solar Solutions, or Commercial Partnerships.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <a className="group flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-white dark:bg-white/5 border border-indigo-100 dark:border-white/10 hover:border-secondary dark:hover:border-secondary transition-all shadow-sm hover:shadow-md hover:shadow-green-100 dark:hover:shadow-none" href="tel:+923009358751">
                                    <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-primary dark:text-indigo-300 group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                                        <span className="material-symbols-outlined">call</span>
                                    </div>
                                    <span className="font-bold text-text-main dark:text-white group-hover:text-secondary transition-colors">Call Us</span>
                                </a>
                                <a className="group flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-white dark:bg-white/5 border border-indigo-100 dark:border-white/10 hover:border-secondary dark:hover:border-secondary transition-all shadow-sm hover:shadow-md hover:shadow-green-100 dark:hover:shadow-none" href="mailto:info@indigostsolar.com">
                                    <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-primary dark:text-indigo-300 group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                                        <span className="material-symbols-outlined">mail</span>
                                    </div>
                                    <span className="font-bold text-text-main dark:text-white group-hover:text-secondary transition-colors">Email Us</span>
                                </a>
                                <a className="group flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-white dark:bg-white/5 border border-indigo-100 dark:border-white/10 hover:border-secondary dark:hover:border-secondary transition-all shadow-sm hover:shadow-md hover:shadow-green-100 dark:hover:shadow-none" href="https://wa.me/923009358751">
                                    <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-primary dark:text-indigo-300 group-hover:bg-[#25D366] group-hover:text-white transition-colors duration-300">
                                        <span className="material-symbols-outlined">chat</span>
                                    </div>
                                    <span className="font-bold text-text-main dark:text-white group-hover:text-[#25D366] transition-colors">WhatsApp</span>
                                </a>
                            </div>
                            <div className="flex flex-col gap-6">
                                <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-lg shadow-indigo-200/50 dark:shadow-none group border-2 border-transparent hover:border-secondary transition-colors duration-500">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13274.31683416552!2d72.9926718501064!3d33.68112349141042!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbeeb9e230873%3A0xc39cfbe468087795!2sF-11%2F1%20F%2011%2F1%20F-11%2C%20Islamabad%2C%20Islamabad%20Capital%20Territory%2C%20Pakistan!5e0!3m2!1sen!2s!4v1706280000000!5m2!1sen!2s"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="INDIGOST Islamabad Office"
                                    ></iframe>
                                </div>
                                <div className="flex flex-col gap-6">
                                    <div className="flex items-start gap-4">
                                        <div className="mt-1 text-secondary p-2 bg-green-50 rounded-lg dark:bg-green-900/20">
                                            <span className="material-symbols-outlined">location_city</span>
                                        </div>
                                        <div>
                                            <p className="text-indigo-800/70 dark:text-indigo-300">
                                                <span className="text-xl font-black text-primary dark:text-white block mb-2 underline decoration-secondary decoration-2 underline-offset-4">Islamabad Office</span>
                                                Office# 2, Building# 1, Street# 1,<br />
                                                Ali-Market, F-11/1, Islamabad
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="mt-1 text-secondary p-2 bg-green-50 rounded-lg dark:bg-green-900/20">
                                            <span className="material-symbols-outlined">location_city</span>
                                        </div>
                                        <div>
                                            <p className="text-indigo-800/70 dark:text-indigo-300">
                                                <span className="text-xl font-black text-primary dark:text-white block mb-2 underline decoration-secondary decoration-2 underline-offset-4">Lahore Office</span>
                                                G-595 Central Park Housing Scheme,<br />
                                                Ferozepur Road, Lahore
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="mt-1 text-secondary p-2 bg-green-50 rounded-lg dark:bg-green-900/20">
                                            <span className="material-symbols-outlined">location_city</span>
                                        </div>
                                        <div>
                                            <p className="text-indigo-800/70 dark:text-indigo-300">
                                                <span className="text-xl font-black text-primary dark:text-white block mb-2 underline decoration-secondary decoration-2 underline-offset-4">Bahawalpur Office</span>
                                                Shop# 21, 22, Rohi Plaza,<br />
                                                Airport Road, Bahawalpur
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-6">
                            <div className="bg-white dark:bg-[#2e1065] p-8 md:p-10 rounded-3xl shadow-2xl shadow-indigo-200/50 dark:shadow-none border border-indigo-100 dark:border-white/5 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-secondary to-primary"></div>
                                <h3 className="text-2xl font-bold text-primary dark:text-white mb-2">Send us a message</h3>
                                <p className="text-indigo-600/70 dark:text-indigo-300 mb-8 text-sm">We typically reply within 2 hours during business hours.</p>
                                <form className="flex flex-col gap-6" onSubmit={(e) => {
                                    e.preventDefault();
                                    alert('Thank you for your inquiry! We will get back to you shortly.');
                                    e.target.reset();
                                }}>
                                    <label className="flex flex-col w-full">
                                        <span className="text-primary dark:text-indigo-200 text-sm font-semibold pb-2">Full Name</span>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-indigo-400 group-focus-within:text-secondary transition-colors">
                                                <span className="material-symbols-outlined text-[20px]">person</span>
                                            </div>
                                            <input required className="form-input flex w-full rounded-xl text-primary dark:text-white border border-indigo-200 dark:border-white/20 bg-indigo-50/50 dark:bg-white/5 focus:border-secondary focus:ring-1 focus:ring-secondary h-14 placeholder:text-indigo-300/70 pl-11 pr-4 transition-colors" placeholder="e.g. Ahmed Khan" type="text" />
                                        </div>
                                    </label>
                                    <label className="flex flex-col w-full">
                                        <span className="text-primary dark:text-indigo-200 text-sm font-semibold pb-2">Email Address</span>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-indigo-400 group-focus-within:text-secondary transition-colors">
                                                <span className="material-symbols-outlined text-[20px]">mail</span>
                                            </div>
                                            <input required className="form-input flex w-full rounded-xl text-primary dark:text-white border border-indigo-200 dark:border-white/20 bg-indigo-50/50 dark:bg-white/5 focus:border-secondary focus:ring-1 focus:ring-secondary h-14 placeholder:text-indigo-300/70 pl-11 pr-4 transition-colors" placeholder="e.g. ahmed@example.com" type="email" />
                                        </div>
                                    </label>
                                    <label className="flex flex-col w-full">
                                        <span className="text-primary dark:text-indigo-200 text-sm font-semibold pb-2">Inquiry Type</span>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-indigo-400 group-focus-within:text-secondary transition-colors">
                                                <span className="material-symbols-outlined text-[20px]">category</span>
                                            </div>
                                            <select required className="form-select flex w-full rounded-xl text-primary dark:text-white border border-indigo-200 dark:border-white/20 bg-indigo-50/50 dark:bg-white/5 focus:border-secondary focus:ring-1 focus:ring-secondary h-14 pl-11 pr-10 transition-colors appearance-none cursor-pointer">
                                                <option disabled="" selected="" value="">Select a topic</option>
                                                <option value="ev-charging">EV Charging Installation</option>
                                                <option value="solar-residential">Home Solar Solutions</option>
                                                <option value="solar-commercial">Commercial Solar Projects</option>
                                                <option value="dealership">Dealership Inquiry</option>
                                            </select>
                                            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-indigo-400">
                                                <span className="material-symbols-outlined">expand_more</span>
                                            </div>
                                        </div>
                                    </label>
                                    <label className="flex flex-col w-full">
                                        <span className="text-primary dark:text-indigo-200 text-sm font-semibold pb-2">Message</span>
                                        <textarea required className="form-textarea flex w-full rounded-xl text-primary dark:text-white border border-indigo-200 dark:border-white/20 bg-indigo-50/50 dark:bg-white/5 focus:border-secondary focus:ring-1 focus:ring-secondary placeholder:text-indigo-300/70 p-4 resize-none transition-colors" placeholder="Tell us about your requirements (Location, Load, etc.)" rows="4"></textarea>
                                    </label>
                                    <button className="mt-2 w-full bg-gradient-to-r from-primary to-indigo-800 hover:from-secondary hover:to-emerald-600 text-white h-14 rounded-xl font-bold text-base tracking-wide shadow-lg shadow-indigo-500/25 hover:shadow-green-500/40 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 group" type="submit">
                                        <span>Send Inquiry</span>
                                        <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">send</span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Contact;
