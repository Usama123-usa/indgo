import React from 'react';

const Privacy = () => {
    return (
        <div className="bg-background-light text-text-main font-display selection:bg-accent selection:text-white dark:bg-background-dark dark:text-white pt-10 pb-20">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
                <h1 className="text-4xl md:text-5xl font-black mb-8 text-deep-indigo dark:text-white">Privacy Policy</h1>
                <div className="prose dark:prose-invert max-w-none">
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                        Last updated: {new Date().getFullYear()}
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">1. Introduction</h2>
                    <p>
                        Welcome to Indigost Engineering. We respect your privacy and are committed to protecting your personal data.
                        This privacy policy will inform you as to how we look after your personal data when you visit our website
                        and tell you about your privacy rights.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">2. Data We Collect</h2>
                    <p>
                        We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
                    </p>
                    <ul className="list-disc pl-6 mb-4 space-y-2">
                        <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                        <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
                        <li><strong>Technical Data:</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location.</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-8 mb-4">3. How We Use Your Data</h2>
                    <p>
                        We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                    </p>
                    <ul className="list-disc pl-6 mb-4 space-y-2">
                        <li>To provide the services you have requested (e.g., project consultations).</li>
                        <li>To manage our relationship with you.</li>
                        <li>To improve our website and services.</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-8 mb-4">4. Data Security</h2>
                    <p>
                        We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">5. Contact Us</h2>
                    <p>
                        If you have any questions about this privacy policy or our privacy practices, please contact us at: <br />
                        <strong>Email:</strong> info@indigost.com <br />
                        <strong>Address:</strong> Office # 203, 2nd Floor, Al-Hafeez Heights, Gulberg III, Lahore, Pakistan.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
