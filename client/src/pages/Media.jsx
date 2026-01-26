import React, { useState } from 'react';

const Media = () => {
    const [activeTab, setActiveTab] = useState('All Media');
    const [playingVideo, setPlayingVideo] = useState(null);

    const mediaItems = [
        {
            id: 1,
            type: 'video',
            category: 'Solar Installations',
            title: 'Punjab Solar Park Expansion',
            description: 'Providing clean energy to over 50,000 homes in Punjab starting this winter.',
            src: 'https://assets.mixkit.co/videos/preview/mixkit-solar-panels-in-a-field-2633-large.mp4',
            thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFcm3jtZrodSHMcgFctyjV5tvsqJKSEdsl5JQFd-nrHEYZA-66MyLhwr4Ku3Qw2q1s226g_Bqj_znV-nUOLR26DXWJD8neCStUpp7EmDsiYlNCTyOsoXeMl2f6zNamAf8k1_xDK3ztN39GslIHmpl28ahzinuoxfvSqESyQofAmRW8ysu7ry4djqlAmQ6C0YUmL2ej4kAVEs4xE6eB0M29Uwv_NNEKB3WaH_KmMTwLk2R6JhGxHRG50fIDqvkbEKiVAG1Jth2lLC4',
            location: 'Cholistan Desert'
        },
        {
            id: 2,
            type: 'image',
            category: 'Success Stories',
            title: 'Corporate Fleet Transformation',
            description: 'INDIGOST transformed our corporate fleet efficiency in Islamabad. The transition to solar-powered charging stations was seamless.',
            src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCerQJ2GUvYegw0gjDXUm7YxeIOaYh9uBsKIt8cUkQmFgfknSRoRSG3NTQU6ilCkX6_gl3fjds8koaF_dGK4Z7_C3V9H1o79yiFQhGHnyintGD-rknCFS1Dpu7bqbSpKv_SOwdplzci5eC32QJmFQc_I5GL5CPmrARMiFAgkr_vyZFpdwQljjIrzaInkpYlZsLkdFOmhuhdggGhPTBlmk8QamQOZCZkTODH_9UluHAnKdYXJ6SU1qsC72Io4fCUeggB775o724suBo',
            author: 'Ayesha Ahmed',
            role: 'CEO, Logistics PK'
        },
        {
            id: 3,
            type: 'video',
            category: 'EV Fleet',
            title: 'Fast Charging Network',
            description: 'Experience ultra-fast charging at our new Lahore stations.',
            src: 'https://assets.mixkit.co/videos/preview/mixkit-electric-car-charging-at-a-station-4339-large.mp4',
            thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAG0sChLVrApGYY4BX8rG4HYtJiWQaB9ekZtzOlsr5_G96t_mWr4Lu54gSnLJLwBn6pw_RFIsW2SHbJ4vi84UxB-w8hBXzrlghPYWFvTAQMuqT2JzBNgldMUIPSvA05pJHJxkaSCj0c5rZkHszwMG6SNzYzwrWomSnA-gEl4JlWPjKsKmp-gbjAGYiiEvDOTErtiajF7Kc5cL8QZ2pKvySErjzJQonL10s__5NdGqx009anyLwl-74o6JeU_fRsXCrBn249qG1mqU4',
            location: 'Lahore'
        },
        {
            id: 4,
            type: 'image',
            category: 'Solar Installations',
            title: 'Islamabad HQ Sustainability',
            description: 'Our headquarters is now 100% powered by rooftop solar.',
            src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMX_V6PEFJkd3ypV5NptbA3F6dU1edS5eftjVez8lhSGzzKhhxVjgNbqrBFzwdiv-oAjcCd98SvZPhsK3tF5zA9T8PFhmgvhQiUiLv7LBnHyj1ULUFfH0P6Ymk2dpaWCEZbluIe89I08xbDyE4RmGdRCPW3MvbqWy2nX9qxXBb29muyo2nnAS-MvYTC3fyk5WwftCbwt8pGncX-lBvLGkXE3hki7sD6feDSZSdPHsl1oiTExWM0KpOTNywuxqhG0Q4JCL4vn5SI0I',
            location: 'Islamabad'
        },
        {
            id: 5,
            type: 'video',
            category: 'EV Fleet',
            title: 'M-2 Motorway Smart Grid',
            description: 'Testing our smart grid integration for highway EV chargers.',
            src: 'https://assets.mixkit.co/videos/preview/mixkit-man-driving-a-convertible-car-on-a-road-trip-4433-large.mp4',
            thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCM831VKaQnvbP8sEjXJDFeCbcD1R1tAci2Zjzkq8CbQ-SyNHTb_f1EIJI8qZ4kr8DglhyH0M1S1663egu6ip_40XsLn5k0tilRkxAgZTxlIrjRmeoyp2TAYeZiZ4P5ZvIZOYs9d96CQsiBq7gjDZWj3A6ZHZdn1pbeRSyxHY9KyzqOzEqbxl264PhXIi3WE5jrbyTRexozqX5wIg6zHTP3WBI3aUaNF_atOFKhHBRjVA1ZRL8CxrzZ9HO0U5x6qHggQK9lvuSncnM',
            location: 'M-2 Motorway'
        },
        {
            id: 6,
            type: 'image',
            category: 'Success Stories',
            title: 'Bahria Town Reliability',
            description: 'Reliability was our main concern for the new housing project. INDIGOST proved that sustainable means reliable.',
            src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxal8lGWT020Qw46IB7ArzROMfMN8oBv3Z5VTjjbikXemaC4rYJmoPVWn8QSP0ujbYzKTVqWzk5OYU5-H76EGyC6e6zDWrNEp0SNuBoTisBAmpCtCKZv3prFglESlPDyAGsHRJ-g1anLQSa5hg4ibgODqyt7fyK8YmH_UVDrqeMN2d_tbr3DSJt2c3K7x57MhCaeuQf38PllNZ6dn0ROWEFN6qxU5iXkQcZNUKQDr5yhVT2iWL72tTmBHwSLhbcBoiIAyhrMT4HLg',
            author: 'Omar Farooq',
            role: 'Bahria Town Planner'
        },
        {
            id: 7,
            type: 'video',
            category: 'Solar Installations',
            title: 'UNICEF Warehouse Solarization',
            description: 'Ensuring 24/7 power for critical vaccine storage at UNICEF EPI Warehouse.',
            src: 'https://assets.mixkit.co/videos/preview/mixkit-solar-panels-in-the-sunset-1279-large.mp4',
            thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqTINHBRuPWhG59iuN5sIj-np-MuD8-CTykJFDPO1h9zomLsx4vHCh6xUZlGCI1RH561ANtJdPooA4r2Lzgsvui5sTN6fadj1h2z3zERCmdTZvHXAEs1NYMJZJvSOupGRJ8esDB-ikjkAFPrjlosMTTwQxHlB7SZrFbVxFxgWIr2yx878ZTsn8JzkrF8tAttsMvm-oA7IqaMMgUYJJ45q4TRo3Hx5M4HR_QRpUo5q-6iL9K4914xW_req7Xu46_xZ-JlpYx8Gd8nk',
            location: 'Karachi, Sindh'
        },
        {
            id: 8,
            type: 'image',
            category: 'Success Stories',
            title: 'Reliable Hospital Power',
            description: 'Indigost Engineering provided a robust 1MW solar solution that has drastically reduced our energy costs and ensured uninterrupted patient care.',
            src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMyyYXsKvXBQuPPKHGLDLiNlACgN9ZnOsCMHDaTmJZHlAF2v2UfXYUshLK4Q4sS6TELvUVH9qJSd_xC6G6_trIlp5ExmcZxN7dhQEPFUm_KYDzL4PlmCIjGuXx8LnYDB1IQ16DZyqeNKIyWXRXxR0hv3SiTu2ehQqyLYsjkk2hnVBWiAnAiS2OorPzPho7EnSQxOVXXcUbh3PMJSyeQCjDamlzyvuKw3ovoT55SA8RuW_aI06KY4t6vhHm_uiuKJVEZyVqCfzCeyY',
            author: 'Dr. Rafay Khan',
            role: 'MS, Indus Hospital'
        },
        {
            id: 9,
            type: 'video',
            category: 'EV Fleet',
            title: 'Highway Fast Charging',
            description: 'A glimpse into our high-speed charging nodes on the motorway.',
            src: 'https://assets.mixkit.co/videos/preview/mixkit-car-driving-through-the-forest-4428-large.mp4',
            thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEdECVrMnuNaEkWcqw_pt0loqlkrS2Hygc-I1-0_sfdatB9_dYgHt4Z2aZLJGeYQFdoIwu-qQ1UhquHM-rKkgIudl1zeR38UVeKqSgJw1hYo8B_-mtlOA8Y6Rapt9RQYI93gdcH-dS6Mz_Yr84tl9fp0r_FJxPh0xBo0igY9JX9jScyz9gODlC6GQhaWU-rvglqIXEgAYgDr7gvb765aCsZLn6poib_xfnBU7cOyIDpElvdgWcPlsbepWvYnzSP17sLqbBvwBUrqM',
            location: 'M-2 Motorway'
        },
        {
            id: 10,
            type: 'image',
            category: 'Solar Installations',
            title: 'Large Scale Industrial Solar',
            description: 'Powering the textile industry with a massive 1.47MW installation.',
            src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOhBu-R2EEGPUXda-fEwQYgj9lY3Ga_OzaBkEGWba_BTTY6rnhhMGSiwvWZw8T9l2piJi11q3h-b-BabuKx6MUr1KoJadJmUHOKs6_0ljpKSwikvA69TGf1_WSWxuK84Lx6do8gti9WUThUViWxtX-0WfWbeo3YVsjZCH-m100WGPvuR5IioS4WwsTA-UPip3UxzKwsFX_fhLeqVikKC6qZEz_rPXnolebwAz7TzcBaeQBz44q0N2sy2oyXj6vYu029jnOZueIWOY',
            location: 'Naveena Denim Ltd, Lahore'
        },
        {
            id: 11,
            type: 'image',
            category: 'Success Stories',
            title: 'Industrial Efficiency Boost',
            description: 'The transition to solar has been a game-changer for our flour mill operations, stabilizing our power supply and cutting overheads.',
            src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMX_V6PEFJkd3ypV5NptbA3F6dU1edS5eftjVez8lhSGzzKhhxVjgNbqrBFzwdiv-oAjcCd98SvZPhsK3tF5zA9T8PFhmgvhQiUiLv7LBnHyj1ULUFfH0P6Ymk2dpaWCEZbluIe89I08xbDyE4RmGdRCPW3MvbqWy2nX9qxXBb29muyo2nnAS-MvYTC3fyk5WwftCbwt8pGncX-lBvLGkXE3hki7sD6feDSZSdPHsl1oiTExWM0KpOTNywuxqhG0Q4JCL4vn5SI0I',
            author: 'Mr. Bilal Khan',
            role: 'Owner, Al Jehan Flour Mills'
        },
        {
            id: 12,
            type: 'video',
            category: 'Solar Installations',
            title: 'Rooftop Solar Array',
            description: 'Aerial view of our efficient rooftop installations in Multan.',
            src: 'https://assets.mixkit.co/videos/preview/mixkit-solar-panels-on-a-roof-4299-large.mp4',
            thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqTINHBRuPWhG59iuN5sIj-np-MuD8-CTykJFDPO1h9zomLsx4vHCh6xUZlGCI1RH561ANtJdPooA4r2Lzgsvui5sTN6fadj1h2z3zERCmdTZvHXAEs1NYMJZJvSOupGRJ8esDB-ikjkAFPrjlosMTTwQxHlB7SZrFbVxFxgWIr2yx878ZTsn8JzkrF8tAttsMvm-oA7IqaMMgUYJJ45q4TRo3Hx5M4HR_QRpUo5q-6iL9K4914xW_req7Xu46_xZ-JlpYx8Gd8nk',
            location: 'Multan'
        },
        {
            id: 13,
            type: 'video',
            category: 'EV Fleet',
            title: 'Electric Delivery Vans',
            description: 'Our electric fleet in action, delivering zero-emission logistics.',
            src: 'https://assets.mixkit.co/videos/preview/mixkit-white-electric-car-driving-1620-large.mp4',
            thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvTSJ1tByJQw4SIH1PvrYCQmQiHBIiABento7R2jGpHob8N4DrrRC1sdpGt4XpDzox62AUFwCSOMp4FgJdY7OzecaWt6cZU7QQZJVveuoYqX_zX1Mns8GEU_N3J6Yn6RbBUG3FkAxYDp-7HnoZmrfbGxRbT7PTemuAGAxZJDz5f-XLWCnOQxwQCVKnjS6zom64_IHM0qYRlawkPLBa8lppD9sEP49A22TLrqlxaoNNS5BquG_Cb-Z62CsJjJvCEMyySBCdEUEGwOQ',
            location: 'Islamabad'
        },
        {
            id: 14,
            type: 'image',
            category: 'Success Stories',
            title: 'Sustainable Oil Processing',
            description: 'The 500kW solar plant has significantly reduced our operational costs and carbon footprint, setting a new standard for the oil industry.',
            src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYo2v3plqSh0j2YMxsZNtO8CBmok2zAiEiD-W4txXCjiKBGUb-lMKEkiOQQm9OBayfn7hgUdLCgLyUouoVUiJWCXnJK2gkk_YXtTZHspYk4TBLT-2M5LW3IwipSdU3kZDvD1PIr3ULPNSg7He8FJISdZ7xbKXWBYedCKN9esaz513zt3byM15Fd1AGFNSSmFJ4s2AsCJjhkSCHk823AlvulYQKBK9eZvhU33nN-oYU4usXGo7f-3rBs-0RDHQW1IKXuTAXG6t8pyg',
            author: 'Mr. Ahsan',
            role: 'Director, Ahbab Oil Industries'
        },
        {
            id: 15,
            type: 'image',
            category: 'Success Stories',
            title: 'Powering Textile Innovation',
            description: 'Reliable energy is crucial for textiles. Indigost\'s 220kW solution delivered exactly that, ensuring smooth operations for our cotton mills.',
            src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOhBu-R2EEGPUXda-fEwQYgj9lY3Ga_OzaBkEGWba_BTTY6rnhhMGSiwvWZw8T9l2piJi11q3h-b-BabuKx6MUr1KoJadJmUHOKs6_0ljpKSwikvA69TGf1_WSWxuK84Lx6do8gti9WUThUViWxtX-0WfWbeo3YVsjZCH-m100WGPvuR5IioS4WwsTA-UPip3UxzKwsFX_fhLeqVikKC6qZEz_rPXnolebwAz7TzcBaeQBz44q0N2sy2oyXj6vYu029jnOZueIWOY',
            author: 'Mr. Yasrab',
            role: 'CEO, Yasrab Cotton Mills'
        }
    ];

    const filteredItems = activeTab === 'All Media'
        ? [...mediaItems].sort((a, b) => {
            if (a.category === 'Success Stories' && b.category !== 'Success Stories') return 1;
            if (a.category !== 'Success Stories' && b.category === 'Success Stories') return -1;
            return 0;
        })
        : mediaItems.filter(item => item.category === activeTab);

    return (
        <div className="bg-background-light text-text-main font-display overflow-x-hidden selection:bg-accent selection:text-white dark:bg-background-dark dark:text-white">
            <main className="w-full">
                <section className="relative w-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-background-light via-white to-background-light dark:from-background-dark dark:via-surface-dark dark:to-background-dark opacity-90 z-0"></div>
                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-10 lg:pt-4 lg:pb-16">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-indigo-900/20">
                            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDILX0EfJH00u9dPiZdZlnnSffR7qj44O3gFkrvD83PcdOkRDcR7XTY5O9hZqmYdjsW5H5qFmi7H2zXYaKNWEoONgMVtwo8oqRv3M4gGgXt24U-xiwhLDxMYeCYwL3eYoxq2Ej4gjRfD5Ep2Zdy9atSZdxdXQphZNpXfsDEn8B7XSDPvuTYy1Y0AJscbrFNKOXxrij2OBeRi19BttXM_v9ZAUovX43IvQ5wXctpbIguxCEfknmgNMdPjAOS1Cm0UTAA_YFUlzdjH2c")' }}></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-background-dark/50 to-transparent"></div>
                            <div className="relative flex flex-col items-center justify-center text-center min-h-[350px] p-8 md:p-16 gap-6">
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

                <section id="media-gallery" className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-8">
                    <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide">
                        {['All Media', 'EV Fleet', 'Solar Installations', 'Success Stories'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all active:scale-95 ${activeTab === tab
                                    ? 'bg-primary text-white shadow-md shadow-primary/25'
                                    : 'bg-white dark:bg-surface-dark border border-indigo-100 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200 hover:bg-indigo-50 dark:hover:bg-indigo-800'
                                    }`}
                            >
                                {tab === 'EV Fleet' && <span className="material-symbols-outlined text-[18px]">directions_car</span>}
                                {tab === 'Solar Installations' && <span className="material-symbols-outlined text-[18px]">solar_power</span>}
                                {tab === 'Success Stories' && <span className="material-symbols-outlined text-[18px]">movie</span>}
                                {tab}
                            </button>
                        ))}
                    </div>
                </section>

                <section className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]">
                        {filteredItems.map(item => (
                            <div key={item.id} className={`group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-1 ${item.id === 1 ? 'md:col-span-2 row-span-2' : 'h-64 lg:h-auto'}`}>
                                {item.type === 'video' ? (
                                    <div className="w-full h-full cursor-pointer" onClick={() => setPlayingVideo(item)}>
                                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url("${item.thumbnail}")` }}></div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-background-dark/20 to-transparent"></div>
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-accent/90 backdrop-blur-md text-white shadow-lg shadow-accent/50">
                                                <span className="material-symbols-outlined text-[32px]">play_arrow</span>
                                            </div>
                                        </div>
                                        <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="bg-primary px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase tracking-wider">Video</span>
                                                <span className="text-indigo-200 text-xs font-medium">{item.location}</span>
                                            </div>
                                            <h3 className="text-white text-2xl font-bold leading-tight mb-1">{item.title}</h3>
                                            <p className="text-indigo-200 text-sm line-clamp-2">{item.description}</p>
                                        </div>
                                    </div>
                                ) : item.category === 'Success Stories' ? (
                                    <div className="bg-white dark:bg-surface-dark rounded-2xl p-6 flex flex-col justify-center h-full border border-indigo-100 dark:border-indigo-800 hover:border-accent transition-colors">
                                        <div className="mb-3 text-primary">
                                            <span className="material-symbols-outlined text-[32px]">format_quote</span>
                                        </div>
                                        <p className="text-text-main dark:text-indigo-100 text-base font-medium leading-snug mb-4 italic">
                                            "{item.description}"
                                        </p>
                                        <div className="flex items-center gap-4 pt-4 border-t border-indigo-50 dark:border-indigo-800 mt-auto">
                                            <div className="bg-center bg-no-repeat bg-cover rounded-full size-12 shadow-inner ring-2 ring-indigo-100 dark:ring-indigo-700" style={{ backgroundImage: `url("${item.src}")` }}></div>
                                            <div>
                                                <p className="text-primary dark:text-white font-bold text-sm">{item.author}</p>
                                                <p className="text-indigo-400 dark:text-indigo-300 text-xs">{item.role}</p>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-full h-full relative">
                                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url("${item.src}")` }}></div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <p className="text-white font-bold text-lg">{item.title}</p>
                                            <p className="text-indigo-200 text-xs">{item.location}</p>
                                        </div>
                                    </div>
                                )}
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
