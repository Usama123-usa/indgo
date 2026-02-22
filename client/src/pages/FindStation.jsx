import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const stations = [
    {
        id: 1,
        name: "M-2 Motorway - Sial Rest Area",
        location: "M-2 Southbound/Northbound, Sial Service Area",
        city: "Sial",
        type: "DC Fast Charger",
        power: "240kW",
        status: "Available",
        lat: 32.0645,
        lng: 73.1687,
        googleMapsUrl: "https://www.google.com/maps/search/Sial+Service+Area+M2+Motorway/@32.0645,73.1687,15z"
    },
    {
        id: 2,
        name: "M-2 Motorway - Kallar Kahar Rest Area",
        location: "M-2 Southbound/Northbound, Kallar Kahar Service Area",
        city: "Kallar Kahar",
        type: "DC Fast Charger",
        power: "240kW",
        status: "Available",
        lat: 32.7719,
        lng: 72.7144,
        googleMapsUrl: "https://www.google.com/maps/search/Kallar+Kahar+Service+Area+M2+Motorway/@32.7719,72.7144,15z"
    },
    {
        id: 3,
        name: "M-2 Motorway - Chakri Rest Area",
        location: "M-2 Southbound/Northbound, Chakri Service Area",
        city: "Chakri",
        type: "DC Fast Charger",
        power: "240kW",
        status: "Available",
        lat: 33.2458,
        lng: 72.7844,
        googleMapsUrl: "https://www.google.com/maps/search/Chakri+Service+Area+M2+Motorway/@33.2458,72.7844,15z"
    }
];

const FindStation = () => {
    const [selectedStation, setSelectedStation] = useState(stations[0]);

    return (
        <div className="bg-background-light min-h-screen">
            <Helmet>
                <title>Find EV Charging Station Pakistan | M-2 Motorway Fast Chargers</title>
                <meta name="description" content="Locate INDIGOST 240kW ultra-fast EV charging stations along the M-2 Motorway (Sial, Kallar Kahar, Chakri). Plan your electric journey across Pakistan." />
            </Helmet>
            {/* Hero Section */}
            <section className="bg-deep-indigo text-white py-16 px-6 lg:px-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-accent opacity-10 blur-3xl transform translate-x-1/2"></div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Find a Charging Station</h1>
                    <p className="text-indigo-100 text-lg max-w-2xl">
                        Locate INDIGOST high-speed chargers along the M-2 Motorway.
                        Powering your journey from Lahore to Islamabad with 240kW ultra-fast charging.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Station List */}
                    <div className="lg:col-span-1 flex flex-col gap-4">
                        <h3 className="text-xl font-bold text-deep-indigo mb-2">Available Stations</h3>
                        {stations.map((station) => (
                            <div
                                key={station.id}
                                onClick={() => setSelectedStation(station)}
                                className={`p-6 rounded-2xl border transition-all cursor-pointer group ${selectedStation.id === station.id
                                    ? 'bg-white border-primary shadow-xl ring-1 ring-primary'
                                    : 'bg-white border-indigo-50 hover:border-primary/50 shadow-sm'
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-2 rounded-lg ${selectedStation.id === station.id ? 'bg-primary text-white' : 'bg-indigo-50 text-primary'}`}>
                                        <span className="material-symbols-outlined">ev_station</span>
                                    </div>
                                    <span className="text-xs font-bold px-2 py-1 rounded bg-green-100 text-green-700 uppercase">
                                        {station.status}
                                    </span>
                                </div>
                                <h4 className="font-bold text-deep-indigo mb-1">{station.name}</h4>
                                <p className="text-gray-500 text-sm mb-4 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">location_on</span>
                                    {station.location}
                                </p>
                                <div className="flex items-center gap-4 text-sm font-bold">
                                    <div className="flex items-center gap-1 text-primary">
                                        <span className="material-symbols-outlined text-sm">bolt</span>
                                        {station.power}
                                    </div>
                                    <div className="flex items-center gap-1 text-accent">
                                        <span className="material-symbols-outlined text-sm">electric_car</span>
                                        {station.type}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Map View */}
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        <div className="bg-white rounded-3xl p-4 shadow-xl border border-indigo-50 h-[500px] lg:h-full min-h-[500px] relative overflow-hidden">
                            {/* Real Map Iframe */}
                            <iframe
                                title="Station Map"
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                scrolling="no"
                                marginHeight="0"
                                marginWidth="0"
                                src={`https://maps.google.com/maps?q=${selectedStation.lat},${selectedStation.lng}&z=15&output=embed`}
                                className="rounded-2xl"
                            ></iframe>

                            {/* Overlay Info for Active Station */}
                            <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white/50 flex flex-col md:flex-row justify-between items-center gap-4">
                                <div>
                                    <h3 className="font-bold text-deep-indigo text-lg">{selectedStation.name}</h3>
                                    <p className="text-gray-500 text-sm">{selectedStation.location}</p>
                                </div>
                                <a
                                    href={selectedStation.googleMapsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg flex items-center gap-2 shrink-0"
                                >
                                    Open in Google Maps
                                    <span className="material-symbols-outlined">directions</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose INDIGOST Chargers Section */}
            <section className="bg-white py-20 px-6 lg:px-8 border-t border-indigo-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-deep-indigo mb-4">Unmatched Power on the M-2</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">Experience the highest standard of EV infrastructure in Pakistan with our 240kW ultra-fast charging technology.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-8 rounded-3xl bg-indigo-50/50 border border-indigo-100/50 hover:bg-white hover:shadow-xl transition-all group">
                            <div className="size-14 rounded-2xl bg-primary text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-3xl">bolt</span>
                            </div>
                            <h3 className="text-xl font-bold text-deep-indigo mb-3">240kW Ultra-Fast</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">Boost your range in minutes. Our chargers deliver up to 240kW of power, the fastest on the Lahore-Islamabad Motorway.</p>
                        </div>
                        <div className="p-8 rounded-3xl bg-indigo-50/50 border border-indigo-100/50 hover:bg-white hover:shadow-xl transition-all group">
                            <div className="size-14 rounded-2xl bg-primary text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-3xl">settings_input_component</span>
                            </div>
                            <h3 className="text-xl font-bold text-deep-indigo mb-3">Universal Compatibility</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">Equipped with standard CCS2 connectors, our stations support all major imported and local Electric Vehicles in Pakistan.</p>
                        </div>
                        <div className="p-8 rounded-3xl bg-indigo-50/50 border border-indigo-100/50 hover:bg-white hover:shadow-xl transition-all group">
                            <div className="size-14 rounded-2xl bg-primary text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-3xl">thermostat</span>
                            </div>
                            <h3 className="text-xl font-bold text-deep-indigo mb-3">Liquid-Cooled Tech</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">Advanced liquid-cooling ensures consistent high-power delivery even in the peak summer temperatures of Pakistan.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Support CTA */}
            <section className="bg-deep-indigo py-16 px-6 lg:px-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/10 blur-[100px] -translate-x-1/2"></div>
                <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-white max-w-xl">
                        <h2 className="text-3xl font-bold mb-4">Need On-Road Assistance?</h2>
                        <p className="text-indigo-100 opacity-80">Our technical support team is available 24/7 for any charging assistance on the Motorway.</p>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <a href="tel:+923009358751" className="bg-white text-deep-indigo px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-50 transition-all shadow-lg">
                            <span className="material-symbols-outlined">call</span>
                            Technical Support
                        </a>
                        <Link to="/contact" className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg flex items-center gap-2">
                            Inquire for Fleet
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FindStation;
