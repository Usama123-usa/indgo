import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="bg-background-light font-display text-text-main antialiased overflow-x-hidden selection:bg-secondary selection:text-white">
            {/* Hero Section */}
            <div className="relative w-full">
                <div className="flex min-h-[560px] flex-col gap-6 bg-cover bg-center items-center justify-center p-4 relative" style={{ backgroundImage: 'linear-gradient(rgba(30, 27, 75, 0.8) 0%, rgba(16, 185, 129, 0.2) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDpHGWgcqdR0VBz0MzHq0jrbb-yf5kbk6Bdx8VFG78r_sVtV5QMUMX78m4PpNH3srn_Bt_ewVsZbN2gXwlcC-V1Dx32hcDJ1JYdQ92jaHfDLyKOruDAPjgvZRZkeqNe3DHzYghyTZ89mrS0Izzp2pou_Gz5xKieiT3q8d1SWTF3FXRM5JPKmHXKlz4HTFvkjuJMM4_SfXQA40DQT2Ik1QS6xtnkgxczbwxTU2xbynRnVP1j7DuAUcLb9xX3bW-Qd_R79Y8Zc3S3sFg")' }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-background-light to-transparent opacity-95"></div>
                    <div className="relative z-10 flex flex-col gap-4 text-center max-w-3xl">
                        <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 text-deep-indigo text-xs font-medium mx-auto mb-2">
                            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                            Pioneering Solar Since 2015
                        </div>
                        <h1 className="text-deep-indigo text-5xl md:text-7xl font-black leading-[1.1]">
                            Lighting the Path to a <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-green-300">Sustainable</span> Future
                        </h1>
                        <h2 className="text-indigo-800 text-lg md:text-xl font-normal max-w-2xl mx-auto">
                            Indigost Engineering is your partner in renewable transformation, delivering professional, reliable, and sustainable energy solutions.
                        </h2>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                            <Link to="/projects" className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-lg font-bold transition-all shadow-xl shadow-primary/40 flex items-center justify-center">Our Local Impact</Link>
                            <Link to="/media" className="bg-white hover:bg-indigo-50 text-primary px-8 py-3 rounded-lg font-bold border-2 border-primary transition-all flex items-center justify-center">
                                <span className="mr-2 material-symbols-outlined text-accent">play_circle</span> Watch Video
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="layout-container flex grow flex-col max-w-7xl mx-auto w-full px-4 md:px-10 pb-20">

                {/* Mission / Vision */}
                <div className="py-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="group relative overflow-hidden rounded-xl h-[350px] shadow-lg border border-indigo-100">
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'linear-gradient(0deg, rgba(67, 56, 202, 0.9) 0%, rgba(67, 56, 202, 0.4) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuB0RfcrBXcdC_3EnHSCqWxCScEvFPqSM4zGT2eu8Ks6QNxqFxbQ4uvHpk0NHbWIBxJzYS95pQFUBJVCJM1ypdlQonsX7TcWNyIqGXOjCZKn_THgNoqt2YBoButMxp3FRplTKwWWpIY3O9UJNFUmMzMjWy2DhP1F4w_5vyEg1bS5wsxr06X9qkjhamEIZ6cR-NkqQBqf4XEOeVxYDcPnwYLWO43cxSIrIvy0zudVrquHyeCmY7k9HTR9qiN9jnj-gqjKdx6qDLH60mI")' }}></div>
                        <div className="absolute inset-0 flex flex-col justify-end p-8">
                            <h3 className="text-white text-3xl font-bold mb-2">Our Mission</h3>
                            <p className="text-indigo-100 text-lg leading-relaxed">Empowering communities through sustainable solar solutions that reduce carbon emissions and fossil fuel dependence.</p>
                        </div>
                    </div>
                    <div className="group relative overflow-hidden rounded-xl h-[350px] shadow-lg border border-indigo-100">
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'linear-gradient(0deg, rgba(30, 27, 75, 0.9) 0%, rgba(16, 185, 129, 0.2) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCOon2Sfz0jyG0Crp0NZeNtAYpZ-dMAPRJEK8LcAMSUJxTGMCIsu2J2aJmJBBKnWbPeOCRZdOJ0qPaZhVbHS7tgZmKX351A_3Xw6eNDW2La9cMKH5q1nM3PEQ8XXpxm1uXwszmeafK_tF5JNiwInJ9qYxdaJZwZjPOofPytnJSon3PjY2vM2lRzPOxcTQ_fc98Fiwypg5JN0ZjRKDDalteh5V5ir0WPGUsZxbs_Z5OZy8iS25QQ8torkcAnYYye4SpY9v1zFtGAqRs")' }}></div>
                        <div className="absolute inset-0 flex flex-col justify-end p-8">
                            <h3 className="text-white text-3xl font-bold mb-2">Our Vision</h3>
                            <p className="text-indigo-100 text-lg leading-relaxed">A future where Pakistan is a hub of renewable energy adoption, leading the charge as pioneers of green transformation.</p>
                        </div>
                    </div>
                </div>

                {/* Journey Timeline */}
                <div className="py-20 bg-white/50 rounded-3xl px-6">
                    <div className="mb-16 text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-deep-indigo">Our Journey Since 2015</h2>
                        <p className="text-indigo-600">A decade of trust and technical excellence in Pakistan's renewable sector.</p>
                    </div>

                    <div className="relative">
                        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-indigo-100"></div>

                        {/* 2015 */}
                        <div className="relative flex flex-col md:flex-row items-center mb-16">
                            <div className="md:w-1/2 flex justify-start md:justify-end md:pr-12 w-full pl-8 md:pl-0">
                                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-accent max-w-md text-left md:text-right">
                                    <span className="text-accent font-bold text-lg">2015</span>
                                    <h4 className="text-xl font-bold mb-2">Establishment</h4>
                                    <p className="text-sm text-indigo-700">Indigost Engineering started leading the lead in renewable energy with a focus on cutting-edge solar solutions.</p>
                                </div>
                            </div>
                            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 size-4 bg-accent rounded-full border-4 border-white z-10 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                            <div className="md:w-1/2 hidden md:block"></div>
                        </div>

                        {/* 2018 */}
                        <div className="relative flex flex-col md:flex-row items-center mb-16">
                            <div className="md:w-1/2 hidden md:block"></div>
                            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 size-4 bg-accent rounded-full border-4 border-white z-10 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                            <div className="md:w-1/2 flex justify-start md:pl-12 w-full pl-8">
                                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-accent md:border-l-0 md:border-r-4 max-w-md">
                                    <span className="text-accent font-bold text-lg">2018</span>
                                    <h4 className="text-xl font-bold mb-2">EPC Specialization</h4>
                                    <p className="text-sm text-indigo-700">Perfected end-to-end Engineering, Procurement, and Construction services for industrial and residential clients.</p>
                                </div>
                            </div>
                        </div>

                        {/* 2021 */}
                        <div className="relative flex flex-col md:flex-row items-center mb-16">
                            <div className="md:w-1/2 flex justify-start md:justify-end md:pr-12 w-full pl-8 md:pl-0">
                                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-accent max-w-md text-left md:text-right">
                                    <span className="text-accent font-bold text-lg">2021</span>
                                    <h4 className="text-xl font-bold mb-2">Nationwide Impact</h4>
                                    <p className="text-sm text-indigo-700">Partnered with NGOs and institutions to solarize over 500+ factories across Pakistan.</p>
                                </div>
                            </div>
                            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 size-4 bg-accent rounded-full border-4 border-white z-10 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                            <div className="md:w-1/2 hidden md:block"></div>
                        </div>

                        {/* 2024 */}
                        <div className="relative flex flex-col md:flex-row items-center">
                            <div className="md:w-1/2 hidden md:block"></div>
                            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 size-4 bg-accent rounded-full border-4 border-white z-10 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                            <div className="md:w-1/2 flex justify-start md:pl-12 w-full pl-8">
                                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-accent md:border-l-0 md:border-r-4 max-w-md">
                                    <span className="text-accent font-bold text-lg">2024 & Beyond</span>
                                    <h4 className="text-xl font-bold mb-2">Hybrid Revolution</h4>
                                    <p className="text-sm text-indigo-700">Introducing hybrid solar + storage and driving industries toward complete carbon neutrality.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Why Choose Grids */}
                <div className="py-20">
                    <div className="mb-12 flex items-end justify-between">
                        <div className="max-w-xl">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-deep-indigo">Why Choose INDIGOST?</h2>
                            <p className="text-indigo-600 text-lg">Leading with quality and transparency since 2015.</p>
                        </div>
                        <button className="hidden md:flex text-accent font-bold items-center gap-2 hover:gap-3 transition-all">
                            View Solutions <span className="material-symbols-outlined">arrow_forward</span>
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-8 rounded-xl bg-white border border-indigo-100 shadow-sm hover:shadow-xl transition-all group">
                            <div className="size-14 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-3xl">verified</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Proven Track Record</h3>
                            <p className="text-indigo-800">Consistent quality and professional execution since our establishment in 2015.</p>
                        </div>
                        <div className="p-8 rounded-xl bg-white border border-indigo-100 shadow-sm hover:shadow-xl transition-all group">
                            <div className="size-14 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-3xl">engineering</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Expert Engineering</h3>
                            <p className="text-indigo-800">Our skilled engineers ensure every project is built to international quality standards.</p>
                        </div>
                        <div className="p-8 rounded-xl bg-white border border-indigo-100 shadow-sm hover:shadow-xl transition-all group">
                            <div className="size-14 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-3xl">eco</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Eco Stewardship</h3>
                            <p className="text-indigo-800">Dedicated to reducing carbon footprints and promoting environmental health.</p>
                        </div>
                    </div>
                </div>

                {/* Leadership */}
                <div className="py-10 border-t border-indigo-100">
                    <h2 className="text-3xl font-bold mb-12 text-center">Our Leadership</h2>
                    <div className="flex flex-wrap justify-center gap-16">
                        <div className="flex flex-col items-center gap-3">
                            <div className="size-32 rounded-full border-4 border-accent shadow-lg overflow-hidden">
                                <img className="w-full h-full object-cover object-top" src="./images/aleem.jpeg" alt="Muhammad Aleem" />
                            </div>
                            <div className="text-center">
                                <h4 className="font-bold text-lg">Muhammad Aleem</h4>
                                <p className="text-sm text-accent font-medium">CEO & Founder</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-3">
                            <div className="size-32 rounded-full border-4 border-accent shadow-lg overflow-hidden">
                                <img className="w-full h-full object-cover object-top" src="./images/hammad.jpeg" alt="Muhammad Hammad Rafique" />
                            </div>
                            <div className="text-center">
                                <h4 className="font-bold text-lg">Muhammad Hammad Rafique</h4>
                                <p className="text-sm text-accent font-medium">Chief Operating Officer (COO)</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-3">
                            <div className="size-32 rounded-full border-4 border-accent shadow-lg overflow-hidden">
                                <img className="w-full h-full object-cover object-center" src="./images/azher.jpeg" alt="Azher" />
                            </div>
                            <div className="text-center">
                                <h4 className="font-bold text-lg">Muhammad Azher Sardar</h4>
                                <p className="text-sm text-accent font-medium">Chief Technology Officer (CTO)</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default About;
