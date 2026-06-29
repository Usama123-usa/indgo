import React from 'react';
import { Link } from 'react-router-dom';

const sections = [
    {
        tag: 'EV Charging',
        tagIcon: 'ev_station',
        tagColor: 'text-primary bg-primary/10 border-primary/20',
        heading: 'Ultra-Fast EV Charging',
        headingAccent: 'on Pakistan\'s Motorways',
        description: 'INDIGOST operates 240kW DC Fast Chargers along the M-2 Motorway, cutting charge times to under 20 minutes. Our stations are engineered for Pakistan\'s climate, available 24/7, and compatible with all modern electric vehicles.',
        bullets: [
            { icon: 'bolt', text: '240kW ultra-fast DC charging' },
            { icon: 'location_on', text: 'Sial, Kallar Kahar & Chakri Service Areas' },
            { icon: 'schedule', text: '24/7 operation, 365 days a year' },
            { icon: 'electric_car', text: 'Compatible with all EV standards' },
        ],
        cta: { label: 'Find a Station', to: '/find-station' },
        image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80',
        imageAlt: 'Electric vehicle charging at an ultra-fast charging station',
        imageRight: true,
        accentColor: 'from-primary to-primary-light',
        badgeColor: 'bg-primary',
    },
    {
        tag: 'BESS Solutions',
        tagIcon: 'battery_charging_full',
        tagColor: 'text-accent bg-accent/10 border-accent/20',
        heading: 'Battery Energy Storage',
        headingAccent: 'Systems (BESS)',
        description: 'Our BESS installations store surplus solar energy and stabilise grid supply for hospitals, warehouses, and industrial sites across Pakistan. UNICEF-funded projects under our belt prove our capability at scale.',
        bullets: [
            { icon: 'battery_full', text: 'Multi-MWh storage capacity' },
            { icon: 'local_hospital', text: 'Powering DHQ hospitals & EPI warehouses' },
            { icon: 'hub', text: 'Seamless solar + grid integration' },
            { icon: 'verified', text: 'UNICEF-certified project execution' },
        ],
        cta: { label: 'View Projects', to: '/projects' },
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvTSJ1tByJQw4SIH1PvrYCQmQiHBIiABento7R2jGpHob8N4DrrRC1sdpGt4XpDzox62AUFwCSOMp4FgJdY7OzecaWt6cZU7QQZJVveuoYqX_zX1Mns8GEU_N3J6Yn6RbBUG3FkAxYDp-7HnoZmrfbGxRbT7PTemuAGAxZJDz5f-XLWCnOQxwQCVKnjS6zom64_IHM0qYRlawkPLBa8lppD9sEP49A22TLrqlxaoNNS5BquG_Cb-Z62CsJjJvCEMyySBCdEUEGwOQ',
        imageAlt: 'Large-scale battery energy storage system installation',
        imageRight: false,
        accentColor: 'from-accent to-green-400',
        badgeColor: 'bg-accent',
    },
    {
        tag: 'Solar Energy',
        tagIcon: 'solar_power',
        tagColor: 'text-amber-600 bg-amber-50 border-amber-200',
        heading: 'Industrial & Residential',
        headingAccent: 'Solar Solutions',
        description: 'From rooftop home systems to multi-megawatt industrial PV plants, INDIGOST delivers full EPCengineering, procurement, and constructionwith net metering support and long-term O&M contracts across all of Pakistan.',
        bullets: [
            { icon: 'home', text: 'Residential & commercial rooftop solar' },
            { icon: 'factory', text: 'Industrial PV plants up to 2.3 MWp+' },
            { icon: 'engineering', text: 'Full EPC modeldesign to commissioning' },
            { icon: 'build', text: 'Operation & maintenance contracts' },
        ],
        cta: { label: 'Our Services', to: '/services' },
        image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80',
        imageAlt: 'Industrial solar panel array generating clean energy',
        imageRight: true,
        accentColor: 'from-amber-400 to-yellow-300',
        badgeColor: 'bg-amber-500',
    },
];

const ServiceSections = () => {
    return (
        <div className="bg-background-light">
            {sections.map((section, idx) => (
                <section key={idx} className="py-20 relative overflow-hidden">
                    {/* Subtle background blob */}
                    <div
                        className={`absolute ${section.imageRight ? 'right-0' : 'left-0'} top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 bg-gradient-to-br ${section.accentColor} pointer-events-none`}
                    />

                    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                        <div className={`flex flex-col ${section.imageRight ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-16 items-stretch`}>

                            {/* Text */}
                            <div className="w-full lg:w-1/2 flex flex-col gap-6">
                                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider w-fit ${section.tagColor}`}>
                                    <span className="material-symbols-outlined text-[16px]">{section.tagIcon}</span>
                                    {section.tag}
                                </div>

                                <h2 className="text-4xl lg:text-5xl font-black text-deep-indigo leading-tight">
                                    {section.heading}{' '}
                                    <span className={`text-transparent bg-clip-text bg-gradient-to-r ${section.accentColor}`}>
                                        {section.headingAccent}
                                    </span>
                                </h2>

                                <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                                    {section.description}
                                </p>

                                <ul className="space-y-3">
                                    {section.bullets.map((b, i) => (
                                        <li key={i} className="flex items-center gap-3 text-gray-700">
                                            <span className={`shrink-0 size-8 rounded-lg flex items-center justify-center text-white ${section.badgeColor}`}>
                                                <span className="material-symbols-outlined text-[18px]">{b.icon}</span>
                                            </span>
                                            <span className="font-medium">{b.text}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    to={section.cta.to}
                                    className="inline-flex items-center gap-2 w-fit bg-deep-indigo hover:bg-primary text-white font-bold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg shadow-indigo-900/20 mt-2"
                                >
                                    {section.cta.label}
                                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                </Link>
                            </div>

                            {/* Image */}
                            <div className="w-full lg:w-1/2 min-h-[480px]">
                                <div className="relative h-full">
                                    <div className={`absolute inset-0 bg-gradient-to-tr ${section.accentColor} rounded-3xl blur-2xl opacity-20 transform ${section.imageRight ? 'rotate-3' : '-rotate-3'}`} />
                                    <img
                                        src={section.image}
                                        alt={section.imageAlt}
                                        loading="lazy"
                                        decoding="async"
                                        className="relative z-10 w-full h-full object-cover rounded-3xl shadow-2xl"
                                    />
                                    {/* Floating badge */}
                                    <div className="absolute z-20 bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-xl border border-white/60 flex items-center gap-3">
                                        <span className={`size-9 rounded-xl flex items-center justify-center text-white ${section.badgeColor}`}>
                                            <span className="material-symbols-outlined text-[20px]">{section.tagIcon}</span>
                                        </span>
                                        <div>
                                            <p className="text-xs text-gray-500 font-medium">INDIGOST</p>
                                            <p className="text-sm font-bold text-deep-indigo">{section.tag}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Dividerskip on last section */}
                    {idx < sections.length - 1 && (
                        <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-20">
                            <div className="border-b border-indigo-100" />
                        </div>
                    )}
                </section>
            ))}
        </div>
    );
};

export default ServiceSections;
