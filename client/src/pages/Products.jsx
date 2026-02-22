import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const products = [
    {
        id: 1,
        category: 'ev',
        title: 'EV Charging Stations',
        subtitle: 'Focus Product',
        description: 'Ultra-fast, intelligent charging infrastructure tailored for Pakistan\'s grid. Compatible with all modern EVs, featuring smart load balancing and app connectivity.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEdECVrMnuNaEkWcqw_pt0loqlkrS2Hygc-I1-0_sfdatB9_dYgHt4Z2aZLJGeYQFdoIwu-qQ1UhquHM-rKkgIudl1zeR38UVeKqSgJw1hYo8B_-mtlOA8Y6Rapt9RQYI93gdcH-dS6Mz_Yr84tl9fp0r_FJxPh0xBo0igY9JX9jScyz9gODlC6GQhaWU-rvglqIXEgAYgDr7gvb765aCsZLn6poib_xfnBU7cOyIDpElvdgWcPlsbepWvYnzSP17sLqbBvwBUrqM',
        modalTitle: 'EV Charging Stations',
        modalDesc: 'Our EV charging stations are engineered specifically for Pakistan\'s environment and grid, utilizing ultra-fast charging technology to minimize downtime. Compatible with all modern EVs, they feature smart app connectivity, IP65 protection, and intelligent load balancing. We are dedicated to accelerating the adoption of green mobility across Pakistan.',
        isFeatured: true,
        badges: [
            { icon: 'bolt', text: 'Fast Charge' },
            { icon: 'wifi', text: 'Smart App' },
            { icon: 'shield', text: 'IP65 Rated' }
        ]
    },
    {
        id: 2,
        category: 'ev',
        title: 'EV Batteries',
        description: 'Long-range, high-density modular battery packs designed for performance and longevity.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvTSJ1tByJQw4SIH1PvrYCQmQiHBIiABento7R2jGpHob8N4DrrRC1sdpGt4XpDzox62AUFwCSOMp4FgJdY7OzecaWt6cZU7QQZJVveuoYqX_zX1Mns8GEU_N3J6Yn6RbBUG3FkAxYDp-7HnoZmrfbGxRbT7PTemuAGAxZJDz5f-XLWCnOQxwQCVKnjS6zom64_IHM0qYRlawkPLBa8lppD9sEP49A22TLrqlxaoNNS5BquG_Cb-Z62CsJjJvCEMyySBCdEUEGwOQ',
        modalTitle: 'EV Batteries',
        modalDesc: 'INDIGOST Group presents advanced Lithium-ion battery packs featuring high-density modular designs for extended life and superior range. Rigorously tested for Pakistan\'s high-temperature climate, we ensure uncompromised performance and safety. Our advanced cooling and Battery Management Systems (BMS) set a new market standard.',
        badge: { icon: 'battery_full', text: 'High Capacity' }
    },
    {
        id: 3,
        category: 'solar',
        title: 'ESS Solutions',
        description: 'Advanced Energy Storage Systems for optimizing power usage and industrial stability.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMyyYXsKvXBQuPPKHGLDLiNlACgN9ZnOsCMHDaTmJZHlAF2v2UfXYUshLK4Q4sS6TELvUVH9qJSd_xC6G6_trIlp5ExmcZxN7dhQEPFUm_KYDzL4PlmCIjGuXx8LnYDB1IQ16DZyqeNKIyWXRXxR0hv3SiTu2ehQqyLYsjkk2hnVBWiAnAiS2OorPzPho7EnSQxOVXXcUbh3PMJSyeQCjDamlzyvuKw3ovoT55SA8RuW_aI06KY4t6vhHm_uiuKJVEZyVqCfzCeyY',
        modalTitle: 'ESS Solutions',
        modalDesc: 'Energy Storage Systems (ESS) are essential for modern industrial efficiency. Our solutions capture excess energy for use during peak hours or outages, significantly reducing costs and ensuring system stability. Features include advanced inverter integration and comprehensive monitoring software.',
        badge: { icon: 'factory', text: 'Industrial' }
    },
    {
        id: 4,
        category: 'solar',
        title: 'BESS',
        description: 'Grid-scale Battery Energy Storage Systems for large scale deployments.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqTINHBRuPWhG59iuN5sIj-np-MuD8-CTykJFDPO1h9zomLsx4vHCh6xUZlGCI1RH561ANtJdPooA4r2Lzgsvui5sTN6fadj1h2z3zERCmdTZvHXAEs1NYMJZJvSOupGRJ8esDB-ikjkAFPrjlosMTTwQxHlB7SZrFbVxFxgWIr2yx878ZTsn8JzkrF8tAttsMvm-oA7IqaMMgUYJJ45q4TRo3Hx5M4HR_QRpUo5q-6iL9K4914xW_req7Xu46_xZ-JlpYx8Gd8nk',
        modalTitle: 'BESS',
        modalDesc: 'Our Grid-scale Battery Energy Storage Systems (BESS) offer superior large-scale energy management, balancing renewable sources like Solar and Wind with the grid. Essential for maximizing solar utility at night, INDIGOST provides full-spectrum installation and technical support for these critical technologies.',
        badge: { icon: 'grid_view', text: 'Grid Scale' }
    },
    {
        id: 5,
        category: 'solar',
        title: 'Solar Installation',
        description: 'Professional roof and ground mounting services for residential & commercial arrays.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmQt925Q6NA6yzTYr6OT32TiOCj3k1TxsUR8S0DdC3Ai33RCCdBm08IPhils3QQbpe3NImng5unb43fBf4SO-asVdH61vkipTVKzoyMCK7t-vmq-fcCztJlafoMaRQO3AmEhYJHixqxRWZElxunnv7VMR5kgOap6Nsw-wWetlP3w-eIDlDFtDp9xsdyILEdgXLdGawG4CufO54y_bbxyrwf2VO9bbcVMRFd5Leg_uzYkQ-JNkRnP7g2BHB1FqPePhGvLsOmxo3YAw',
        modalTitle: 'Solar Installation',
        modalDesc: 'We offer professional turnkey solar installation services. Our team manages every step, from initial site surveys to final mounting. We also provide full technical assistance for net-metering, enabling you to sell excess power back to the grid. We adhere to the highest quality standards, ensuring durability for years to come.',
        badge: { icon: 'solar_power', text: 'Turnkey' }
    },
    {
        id: 6,
        category: 'solar',
        title: 'Solar Designing',
        description: 'Custom blueprints and engineering planning for maximum efficiency and yield.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDthetthFg3rPLhaPMWLASyF3JDdI3jYXnFvtMkXbQWLa9WyrX-i_MhU7fcAj5wTiuvdVGh1hts771_NjIgGt35APW6sAeZMe29wxprECvwoLKoqu62NhAPGKgCTgL5g6FjIEhJcCBjtw_RyH8KVoyuN7wyKzzAYsOoHrfoOx3fD82m-5Jm9NAjvAPscO1gsnS97jS4xb3_PIeHl-FHl0HyXG4T-79qedaMtvA7jD--N0c5CKr54dzExpVbnGB4okFlNsUarNcrMtw',
        modalTitle: 'Solar Designing',
        modalDesc: 'Superior solar systems rely on superior design. INDIGOST\'s engineering team develops custom blueprints optimized for shadow analysis and maximum sunlight exposure. Our specialized design software and expertise can boost system efficiency by 20-30%.',
        badge: { icon: 'architecture', text: 'Engineering' }
    },
    {
        id: 7,
        category: 'solar',
        title: 'Solar Washing',
        description: 'Automated and manual panel cleaning services to maintain peak output performance.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhjCnjS275j3VLTaRIfxqRNzHqQd0KXXJiSOLNgr0EIAiX-_0un7zjTgF_XPhETXfpeRmtGXbQvrARZ0mCWwTpisLAjPibVoW8MrwbLv_7xJo7JdUx8JEZC-RHHd2CKTpkepnq4-k8Rt9qBaQ082M_gFqsaUBfB90XLKEi3EPCk06oekBNtdi9YVS9JCiSAbV_4acU7lM4r8F3MkEHflYXqADUCHy6HtFJhXP3JznumQqpL2o-cicQp11nydbUeEOtXunuxx6ytfI',
        modalTitle: 'Solar Washing',
        modalDesc: 'Dust and dirt can significantly hamper solar performance. Our solar washing service utilizes safe, automated, and manual techniques to clean panel surfaces without damaging the glass, ensuring optimal sunlight absorption. Regular maintenance guarantees your system operates at peak production.',
        badge: { icon: 'cleaning_services', text: 'Maintenance' }
    },
    {
        id: 8,
        category: 'solar',
        title: 'Solar Implementation',
        description: 'End-to-end execution of solar projects from permits to power-on.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYo2v3plqSh0j2YMxsZNtO8CBmok2zAiEiD-W4txXCjiKBGUb-lMKEkiOQQm9OBayfn7hgUdLCgLyUouoVUiJWCXnJK2gkk_YXtTZHspYk4TBLT-2M5LW3IwipSdU3kZDvD1PIr3ULPNSg7He8FJISdZ7xbKXWBYedCKN9esaz513zt3byM15Fd1AGFNSSmFJ4s2AsCJjhkSCHk823AlvulYQKBK9eZvhU33nN-oYU4usXGo7f-3rBs-0RDHQW1IKXuTAXG6t8pyg',
        modalTitle: 'Solar Implementation',
        modalDesc: 'We turn plans into reality. INDIGOST offers comprehensive project management, covering permitting, equipment sourcing, and technical execution. We are committed to delivering projects on time and within budget.',
        badge: { icon: 'engineering', text: 'Full Scale' }
    },
    {
        id: 9,
        category: 'solar',
        title: 'Electrical DB Panels',
        description: 'Smart distribution boards ensuring safety and intelligent routing.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA18zjsNDWMlUg9pdbntJOpio29DA-ye1vK9kqBinR47how7ZAZbMWKLexVENBeWbbJYl8Tv5U0cxn5y1zm_I8rAoVdIR9bMoHuGNZLktP4r-KdSzSGr5svTPiK-hqYR_XijmS4yaPseIb3eH0-JOsIV7BRKofRQxFW7Omtetqw5u3Yn9Z7IFMYpi5sAVRJ1o-Mda-obtQ3jdHcnb04khS9PlUp9w7nJ_wurBBcs2Yeix5Sg4cKYI2l98uL-5i7CTTEj3edAMzcJ_c',
        modalTitle: 'Electrical DB Panels',
        modalDesc: 'Our Electrical Distribution Boards (DB) represent the pinnacle of safety and smart power routing. These panels intelligently manage solar and grid inputs, featuring integrated voltage protection and circuit breakers to safeguard your equipment. Every panel is manufactured to rigorous industry-grade standards.',
        badge: { icon: 'settings_input_component', text: 'Infrastructure' }
    }
];

const Products = () => {
    const [filter, setFilter] = useState('all');
    const [selectedProduct, setSelectedProduct] = useState(null);

    const filteredProducts = filter === 'all'
        ? products
        : products.filter(product => product.category === filter);

    return (
        <div className="bg-background-light font-display text-text-main dark:text-white transition-colors duration-300">
            <Helmet>
                <title>EV Charging Stations & Solar Products Pakistan | INDIGOST</title>
                <meta name="description" content="Browse INDIGOST's range of premium EV charging stations, solar batteries, BESS solutions and industrial solar components designed for the Pakistan market." />
            </Helmet>
            <main className="relative flex flex-col items-center w-full min-h-screen pb-20 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-radial from-primary/10 to-transparent opacity-70 pointer-events-none -z-10"></div>
                <div className="absolute top-[10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-secondary/10 blur-[100px] pointer-events-none -z-10"></div>

                <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-12">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16 border-b border-indigo-100 dark:border-indigo-900/30 pb-8">
                        <div className="max-w-3xl">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold tracking-wider text-secondary uppercase bg-secondary/10 rounded-full border border-secondary/20">
                                    <span className="material-symbols-outlined text-sm">eco</span> Sustainable Future
                                </span>
                                <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold tracking-wider text-primary uppercase bg-primary/10 rounded-full border border-primary/20">
                                    <span className="material-symbols-outlined text-sm">flag</span> Trusted in Pakistan
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight leading-tight mb-6">
                                <span className="text-gradient bg-gradient-to-r from-primary via-primary-light to-secondary text-transparent bg-clip-text">Premium Energy</span><br />
                                <span className="text-text-main dark:text-white">Solutions</span>
                            </h1>
                            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                                Pioneering the future of mobility and energy in Pakistan. Discover our state-of-the-art EV Charging infrastructure and industrial solar solutions designed for maximum efficiency.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2 p-1 bg-white/50 dark:bg-indigo-950/50 rounded-xl border border-indigo-100 dark:border-indigo-800 backdrop-blur-sm self-start md:self-end shadow-sm">
                            <button
                                onClick={() => setFilter('all')}
                                className={`px-6 py-3 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${filter === 'all' ? 'bg-primary text-white shadow-md shadow-primary/30' : 'hover:bg-white/80 dark:hover:bg-indigo-900 text-slate-600 dark:text-indigo-200'}`}
                            >
                                <span className="material-symbols-outlined text-lg">grid_view</span> All Products
                            </button>
                            <button
                                onClick={() => setFilter('ev')}
                                className={`px-6 py-3 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${filter === 'ev' ? 'bg-primary text-white shadow-md shadow-primary/30' : 'hover:bg-white/80 dark:hover:bg-indigo-900 text-slate-600 dark:text-indigo-200'}`}
                            >
                                <span className="material-symbols-outlined text-lg">ev_station</span> EV Solutions
                            </button>
                            <button
                                onClick={() => setFilter('solar')}
                                className={`px-6 py-3 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${filter === 'solar' ? 'bg-primary text-white shadow-md shadow-primary/30' : 'hover:bg-white/80 dark:hover:bg-indigo-900 text-slate-600 dark:text-indigo-200'}`}
                            >
                                <span className="material-symbols-outlined text-lg">sunny</span> Solar Energy
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-container text-left">
                        {filteredProducts.map(product => (
                            <div
                                key={product.id}
                                className={`group product-card relative overflow-hidden rounded-2xl bg-white dark:bg-card-bg-dark border cursor-pointer ${product.isFeatured ? 'border-2 border-secondary/50 dark:border-secondary/50 shadow-2xl shadow-secondary/10 hover:shadow-green-glow md:col-span-2 lg:col-span-2' : 'border-indigo-100 dark:border-indigo-800/50 shadow-xl hover:shadow-neon-hover'}`}
                                onClick={() => setSelectedProduct(product)}
                            >
                                {product.isFeatured && (
                                    <div className="absolute top-4 left-4 z-40 bg-secondary text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">star</span> Top Seller in Pakistan
                                    </div>
                                )}
                                {product.isFeatured ? (
                                    <div className="grid md:grid-cols-2 h-full">
                                        <div className="relative h-64 md:h-full w-full bg-indigo-50 dark:bg-indigo-950 overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-tr from-secondary/20 to-transparent z-10"></div>
                                            <div className="w-full h-full bg-center bg-cover transform group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url('${product.image}')` }}></div>
                                            <div className="shine-overlay z-20"></div>
                                        </div>
                                        <div className="relative p-8 z-30 flex flex-col justify-center bg-white dark:bg-card-bg-dark">
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="text-secondary dark:text-secondary font-bold tracking-wider text-sm uppercase">Focus Product</span>
                                            </div>
                                            <h3 className="text-3xl font-black text-text-main dark:text-white mb-4 group-hover:text-primary transition-colors">{product.title}</h3>
                                            <p className="text-base text-slate-600 dark:text-indigo-200 mb-6 leading-relaxed">{product.description}</p>

                                            {product.badges && (
                                                <div className="flex flex-wrap gap-3 mb-8">
                                                    {product.badges.map((badge, idx) => (
                                                        <span key={idx} className="flex items-center gap-1 text-xs font-semibold text-primary bg-primary/5 px-2 py-1 rounded border border-primary/10">
                                                            <span className="material-symbols-outlined text-sm">{badge.icon}</span>{badge.text}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}

                                            <button className="w-fit flex items-center gap-2 px-6 py-3 rounded-lg bg-primary hover:bg-primary-light text-white font-bold transition-all shadow-lg shadow-primary/30">
                                                View Models <span className="material-symbols-outlined">arrow_forward</span>
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="relative h-56 w-full bg-indigo-50 dark:bg-indigo-950 overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent z-10"></div>
                                            <div className="w-full h-full bg-center bg-cover transform group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url('${product.image}')` }}></div>
                                            <div className="shine-overlay z-20"></div>
                                        </div>
                                        <div className="relative p-6 z-30">
                                            <h3 className="text-xl font-bold text-text-main dark:text-white mb-2 group-hover:text-primary transition-colors">{product.title}</h3>
                                            <p className="text-sm text-slate-500 dark:text-indigo-300 mb-4 line-clamp-2">{product.description}</p>
                                            <div className="flex items-center justify-between mt-4 border-t border-indigo-50 dark:border-indigo-800/50 pt-4">
                                                {product.badge ? (
                                                    <div className="flex items-center gap-2 text-xs font-bold text-secondary uppercase tracking-wider">
                                                        <span className="material-symbols-outlined text-sm">{product.badge.icon}</span>
                                                        {product.badge.text}
                                                    </div>
                                                ) : <div></div>}
                                                <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="w-full max-w-6xl px-4 mt-16 mb-10">
                        <div className="relative overflow-hidden rounded-3xl bg-background-dark text-white p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl shadow-primary/30 border border-indigo-800">
                            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
                            <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>
                            <div className="relative z-10 flex flex-col gap-4 text-center md:text-left max-w-xl">
                                <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Ready to green your energy?</h2>
                                <p className="text-indigo-200 text-lg">Contact our experts today for a custom consultation and detailed quote for your project in Pakistan.</p>
                            </div>
                            <div className="relative z-10 shrink-0">
                                <Link to="/contact" className="group relative flex items-center justify-center px-10 py-5 rounded-xl bg-secondary hover:bg-secondary-bright text-white text-lg font-bold overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-lg shadow-secondary/20">
                                    <span className="relative z-10 flex items-center gap-2">
                                        Get a Free Quote
                                        <span className="material-symbols-outlined">arrow_forward</span>
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Modal */}
            {selectedProduct && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200" onClick={() => setSelectedProduct(null)}>
                    <div className="bg-white dark:bg-card-bg-dark p-8 md:p-12 rounded-[2rem] max-w-2xl w-full relative shadow-2xl border border-indigo-100 dark:border-indigo-800 animate-in zoom-in duration-300" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setSelectedProduct(null)} className="absolute top-6 right-6 text-slate-400 hover:text-red-500 transition-colors">
                            <span className="material-symbols-outlined text-4xl">cancel</span>
                        </button>
                        <div className="flex items-center gap-3 mb-6">
                            <span className="p-3 bg-primary/10 rounded-full text-primary material-symbols-outlined">info</span>
                            <h2 className="text-3xl font-black text-primary dark:text-white">{selectedProduct.modalTitle}</h2>
                        </div>
                        <div className="prose dark:prose-invert max-w-none">
                            <p className="text-lg text-slate-600 dark:text-indigo-200 leading-relaxed mb-8">{selectedProduct.modalDesc}</p>
                        </div>
                        <div className="flex justify-end gap-4 border-t border-indigo-50 dark:border-indigo-800 pt-6">
                            <button onClick={() => setSelectedProduct(null)} className="px-8 py-3 rounded-xl bg-slate-100 dark:bg-indigo-900/50 font-bold hover:bg-red-500 hover:text-white transition-all">Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Products;
