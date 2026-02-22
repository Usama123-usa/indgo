import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

const Media = () => {
    const [activeTab, setActiveTab] = useState('All Media');
    const [playingVideo, setPlayingVideo] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    const heroImages = [
        "/images/HSP_3425.JPG",
        "/images/HSP_3426.JPG",
        "/images/HSP_3601.JPG"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroImages.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [heroImages.length]);

    const mediaItems = [
        {
            id: 1,
            type: 'image',
            category: 'Events',
            title: 'Ultra-Fast EV Charging Inauguration',
            description: 'Invitation for the grand opening ceremony of our ultra-fast EV charging station at M-2 Motorway.',
            src: '/images/2.jpeg',
            location: 'M-2 Motorway Sial West'
        },
        {
            id: 2,
            type: 'image',
            category: 'Events',
            title: 'Clean Energy Mobility Milestone',
            description: 'Join us for a milestone event for sustainable and clean energy mobility in Pakistan.',
            src: '/images/5.jpeg',
            location: 'M-2 Motorway'
        },
        {
            id: 3,
            type: 'image',
            category: 'Events',
            title: 'Sustainable Future Celebration',
            description: 'Experience the future of EV charging with our Huawei collaboration.',
            src: '/images/6.jpeg',
            location: 'M-2 Motorway'
        },
        {
            id: 4,
            type: 'image',
            category: 'Infrastructure',
            title: 'BESS Power Control Center',
            description: 'A look at the robust high-voltage power control infrastructure of our Battery Energy Storage System (BESS).',
            src: '/images/HSP_3425.JPG',
            location: ''
        },
        {
            id: 5,
            type: 'image',
            category: 'Infrastructure',
            title: 'Huawei BESS Inverter Array',
            description: 'State-of-the-art Huawei smart string inverters specifically designed for our Battery Energy Storage System efficiency.',
            src: '/images/HSP_3426.JPG',
            location: ''
        },
        {
            id: 9,
            type: 'image',
            category: 'Infrastructure',
            title: 'BESS Solar Integration Assembly',
            description: 'View of the solar inverter assembly integrated with our Battery Energy Storage System for optimized power management.',
            src: '/images/HSP_3427.JPG',
            location: ''
        },
        {
            id: 10,
            type: 'image',
            category: 'Infrastructure',
            title: 'High-Voltage Distribution',
            description: 'Internal view of the distribution cabinets for the EV power station.',
            src: '/images/HSP_3428.JPG',
            location: ''
        },
        {
            id: 11,
            type: 'image',
            category: 'Infrastructure',
            title: 'Primary Power Bus',
            description: 'Secure power distribution hub for industrial-scale charging networks.',
            src: '/images/HSP_3429.JPG',
            location: ''
        },
        {
            id: 12,
            type: 'image',
            category: 'Infrastructure',
            title: 'Presidential Site Inspection',
            description: 'The President visited our ultra-fast charging facility, recognizing it as a key milestone for sustainable mobility. We invite everyone to come and witness the future of green energy.',
            src: '/images/HSP_3601.JPG',
            location: ''
        }
    ];

    const filteredItems = mediaItems;

    return (
        <div className="bg-background-light text-text-main font-display overflow-x-hidden selection:bg-accent selection:text-white dark:bg-background-dark dark:text-white">
            <Helmet>
                <title>Media & News | INDIGOST Group Green Energy Updates</title>
                <meta name="description" content="Latest photos and news from INDIGOST Group. See our EV charging inaugurations, presidential site inspections, and infrastructure milestones in Pakistan." />
            </Helmet>
            <main className="w-full">
                <section className="relative w-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-background-light via-white to-background-light dark:from-background-dark dark:via-surface-dark dark:to-background-dark opacity-90 z-0"></div>
                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-10 lg:pt-4 lg:pb-16">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-indigo-900/20 group h-[450px]">
                            {heroImages.map((img, index) => (
                                <div
                                    key={index}
                                    className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1500ms] ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                                    style={{ backgroundImage: `url("${img}")` }}
                                ></div>
                            ))}
                            <div className="absolute inset-0 bg-gradient-to-t from-background-dark/95 via-background-dark/60 to-transparent"></div>
                            <div className="relative h-full flex flex-col items-center justify-center text-center p-8 md:p-16 gap-6">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 backdrop-blur-sm border border-accent/40 text-accent-light text-white text-xs font-medium uppercase tracking-wider mb-2">
                                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                                    Powering Pakistan
                                </div>
                                <h1 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-tight max-w-3xl">
                                    Green Energy for a Cleaner Future
                                </h1>
                                <p className="text-indigo-100 text-lg md:text-xl max-w-2xl font-light">
                                    Experience the future of sustainable mobility in Pakistan. Watch how our solar arrays power the next generation of EVs from Lahore to Karachi.
                                </p>
                                <button
                                    onClick={() => document.getElementById('media-gallery').scrollIntoView({ behavior: 'smooth' })}
                                    className="group mt-4 flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 rounded-full pl-2 pr-6 py-2 transition-all duration-300 hover:border-accent"
                                >
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent text-white group-hover:scale-110 transition-transform shadow-lg shadow-accent/40">
                                        <span className="material-symbols-outlined text-[20px]">grid_view</span>
                                    </div>
                                    <span className="text-white font-bold text-sm tracking-wide">Explore Gallery</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>



                <section className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredItems.map(item => (
                            <div key={item.id} className={`group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-2 bg-white dark:bg-surface-dark border border-indigo-50 dark:border-indigo-900 ${item.id <= 3 ? 'aspect-[2/3]' : 'aspect-square'}`}>
                                <div className="w-full h-full relative">
                                    <div
                                        role="img"
                                        aria-label={item.title}
                                        className={`absolute inset-0 bg-center transition-transform duration-700 group-hover:scale-105 ${item.id <= 3 ? 'bg-contain bg-no-repeat bg-background-dark/5 shadow-inner' : 'bg-cover'}`} style={{ backgroundImage: `url("${item.src}")` }}></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-background-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

                                    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 duration-300">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="bg-accent px-2.5 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-tighter">{item.category}</span>
                                            <span className="text-white/80 text-xs font-medium backdrop-blur-md bg-white/10 px-2.5 py-1 rounded-full">{item.location}</span>
                                        </div>
                                        <h2 className="text-white text-xl md:text-2xl font-black leading-tight mb-2">{item.title}</h2>
                                        <p className="text-white/80 text-sm line-clamp-3 font-light leading-relaxed">{item.description}</p>
                                    </div>

                                    {/* Minimalist indicator for default state */}
                                    <div className="absolute bottom-4 left-6 group-hover:opacity-0 transition-opacity duration-300">
                                        <p className="text-indigo-900/60 dark:text-white/60 font-bold text-sm tracking-tight">{item.title}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredItems.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20 text-center opacity-70">
                            <span className="material-symbols-outlined text-6xl text-indigo-200 mb-4">videocam_off</span>
                            <h3 className="text-2xl font-bold text-deep-indigo">No media found</h3>
                            <p className="text-gray-600">Try selecting a different category.</p>
                        </div>
                    )}
                </section>
            </main>

            {playingVideo && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-200" onClick={() => setPlayingVideo(null)}>
                    <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
                        <button onClick={() => setPlayingVideo(null)} className="absolute top-4 right-4 z-10 text-white/50 hover:text-white bg-black/50 hover:bg-red-500/80 rounded-full p-2 transition-all">
                            <span className="material-symbols-outlined text-2xl">close</span>
                        </button>
                        <video
                            src={playingVideo.src}
                            poster={playingVideo.thumbnail}
                            className="w-full h-full"
                            controls
                            autoPlay
                            muted
                            playsInline
                        >
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Media;
