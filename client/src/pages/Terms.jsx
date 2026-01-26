import React from 'react';

const Terms = () => {
    return (
        <div className="bg-background-light text-text-main font-display selection:bg-accent selection:text-white dark:bg-background-dark dark:text-white pt-10 pb-20">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
                <h1 className="text-4xl md:text-5xl font-black mb-8 text-deep-indigo dark:text-white">Terms & Conditions</h1>
                <div className="prose dark:prose-invert max-w-none">
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                        Last updated: {new Date().getFullYear()}
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">1. Agreement to Terms</h2>
                    <p>
                        These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and Indigost Engineering (“we,” “us” or “our”), concerning your access to and use of the website.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">2. Intellectual Property Rights</h2>
                    <p>
                        Unless otherwise indicated, the Site and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by Indigost Engineering, its licensors, or other providers of such material and are protected by copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">3. User Representations</h2>
                    <p>
                        By using the Site, you represent and warrant that: (1) you have the legal capacity and you agree to comply with these Terms of Use; (2) you are not a minor in the jurisdiction in which you reside; (3) you will not access the Site through automated or non-human means, whether through a bot, script or otherwise.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">4. Limitation of Liability</h2>
                    <p>
                        In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the site.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">5. Governing Law</h2>
                    <p>
                        These conditions are governed by and construed in accordance with the laws of Pakistan, and the application of the United Nations Convention of Contracts for the International Sale of Goods is expressly excluded.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">6. Contact Us</h2>
                    <p>
                        In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:<br />
                        <strong>Indigost Engineering</strong><br />
                        Lahore, Pakistan
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Terms;
