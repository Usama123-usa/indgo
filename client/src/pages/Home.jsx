import React from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import Features from '../components/Features';
import Vision from '../components/Vision';

const Home = () => {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "INDIGOST Group Pakistan",
        "url": "https://indigost.com",
        "logo": "https://indigost.com/images/logo.png",
        "description": "Pakistan's leading provider of EV charging infrastructure, industrial solar solutions, and Battery Energy Storage Systems (BESS).",
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+92-300-9358751",
            "contactType": "customer service"
        }
    };

    return (
        <>
            <Helmet>
                <title>INDIGOST Group | Leading EV Charging & Solar Solutions in Pakistan</title>
                <meta name="description" content="INDIGOST Group is Pakistan's premier provider of high-speed EV charging networks, industrial solar energy, and smart BESS solutions. Powering the green revolution." />
                <script type="application/ld+json">
                    {JSON.stringify(organizationSchema)}
                </script>
            </Helmet>
            <Hero />
            <Marquee />
            <Features />
            <Vision />
        </>
    );
};

export default Home;
