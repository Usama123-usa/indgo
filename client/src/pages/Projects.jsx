import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import projectUthalDho from '../assets/project_uthal_dho.png';

const Projects = () => {
    const [filter, setFilter] = useState('All Projects');

    const projects = [
        {
            id: 1,
            title: "250kWp Solar PV Plant – UNICEF, EPI Warehouse Karachi",
            location: "Karachi, Sindh",
            date: "In Process",
            category: "BESS Solutions",
            description: "Indigost Engineering (Pvt.) Ltd. is executing a 250kWp Solar PV Plant for UNICEF at the EPI Warehouse in Karachi, under the EPC model. Currently in process, the project will integrate high-efficiency Huawei LUNA2000-215-2S10 Battery Energy Storage Systems. The scope of work includes engineering design, procurement, installation, and commissioning. This project aims to support critical cold-chain operations with reliable renewable energy.",
            specs: [
                { icon: "solar_power", value: "250kWp", label: "Capacity" },
                { icon: "battery_charging_full", value: "215kWh", label: "BESS" },
                { icon: "engineering", value: "EPC", label: "Model" }
            ],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqTINHBRuPWhG59iuN5sIj-np-MuD8-CTykJFDPO1h9zomLsx4vHCh6xUZlGCI1RH561ANtJdPooA4r2Lzgsvui5sTN6fadj1h2z3zERCmdTZvHXAEs1NYMJZJvSOupGRJ8esDB-ikjkAFPrjlosMTTwQxHlB7SZrFbVxFxgWIr2yx878ZTsn8JzkrF8tAttsMvm-oA7IqaMMgUYJJ45q4TRo3Hx5M4HR_QRpUo5q-6iL9K4914xW_req7Xu46_xZ-JlpYx8Gd8nk"
        },
        {
            id: 2,
            title: "100kWp Solar PV Plant – UNICEF, DHQ Dera Murad",
            location: "Nasirabad, Balochistan",
            date: "July 2025 - Sept 2025",
            category: "BESS Solutions",
            description: "Indigost Engineering (Pvt.) Ltd. successfully executed a 100kWp Solar PV Plant integrated with a Battery Energy Storage System (BESS) of 107 kWh for UNICEF at DHQ Dera Murad, Nasirabad, Balochistan, under the EPC model. The project was completed within the stipulated timeframe of July 2025 to September 2025. The system incorporated JA Solar 610 W photovoltaic modules, a Huawei SUN2000- 115KTL grid-tied inverter, and a Huawei LUNA2000-107-1S11 Battery Energy Storage System (107 kWh), ensuring high efficiency, operational reliability, grid stability, and uninterrupted power supply for critical healthcare operations. The scope of work covered the complete project lifecycle, including engineering design, procurement, installation, testing & commissioning, along with one year of operation & maintenance (O&M) and specialized technical training for site personnel.",
            specs: [
                { icon: "solar_power", value: "100kWp", label: "Capacity" },
                { icon: "battery_charging_full", value: "107kWh", label: "BESS" },
                { icon: "calendar_month", value: "3 Months", label: "Timeline" }
            ],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmQt925Q6NA6yzTYr6OT32TiOCj3k1TxsUR8S0DdC3Ai33RCCdBm08IPhils3QQbpe3NImng5unb43fBf4SO-asVdH61vkipTVKzoyMCK7t-vmq-fcCztJlafoMaRQO3AmEhYJHixqxRWZElxunnv7VMR5kgOap6Nsw-wWetlP3w-eIDlDFtDp9xsdyILEdgXLdGawG4CufO54y_bbxyrwf2VO9bbcVMRFd5Leg_uzYkQ-JNkRnP7g2BHB1FqPePhGvLsOmxo3YAw"
        },
        {
            id: 3,
            title: "100kWp Solar PV Plant – UNICEF, DHQ Dera Allahyar",
            location: "Jaffarabad, Balochistan",
            date: "July 2025 - Sept 2025",
            category: "BESS Solutions",
            description: "Indigost Engineering (Pvt.) Ltd. delivered a 100kWp Solar Photovoltaic Plant integrated with a 107 kWh Battery Energy Storage System (BESS) for UNICEF at DHQ Dera Allahyar, Jaffarabad, Balochistan, under the EPC model. The project was implemented during the period July 2025 to September 2025. The system was equipped with JA Solar 610 W photovoltaic modules, a Huawei SUN2000-115KTL inverter, and a Huawei LUNA2000-107-1S11 Battery Energy Storage System, providing enhanced energy reliability, optimized power conversion, and uninterrupted electricity supply to support critical healthcare operations. The scope included detailed engineering, procurement, installation, testing & commissioning, and training.",
            specs: [
                { icon: "solar_power", value: "100kWp", label: "Capacity" },
                { icon: "battery_charging_full", value: "107kWh", label: "BESS" },
                { icon: "calendar_month", value: "3 Months", label: "Timeline" }
            ],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDthetthFg3rPLhaPMWLASyF3JDdI3jYXnFvtMkXbQWLa9WyrX-i_MhU7fcAj5wTiuvdVGh1hts771_NjIgGt35APW6sAeZMe29wxprECvwoLKoqu62NhAPGKgCTgL5g6FjIEhJcCBjtw_RyH8KVoyuN7wyKzzAYsOoHrfoOx3fD82m-5Jm9NAjvAPscO1gsnS97jS4xb3_PIeHl-FHl0HyXG4T-79qedaMtvA7jD--N0c5CKr54dzExpVbnGB4okFlNsUarNcrMtw"
        },
        {
            id: 4,
            title: "100kWp Solar PV Plant – UNICEF, DHQ Loralai",
            location: "Loralai, Balochistan",
            date: "July 2025 - Sept 2025",
            category: "BESS Solutions",
            description: "Indigost Engineering (Pvt.) Ltd. implemented a 100kWp Solar Photovoltaic System integrated with a 161 kWh Battery Energy Storage System (BESS) for UNICEF at DHQ Loralai, Balochistan, under the EPC model. The project was executed during July 2025 to September 2025. The installed system featured JA Solar 610 W photovoltaic modules, a Huawei SUN2000- 115KTL inverter, and a Huawei LUNA2000-161-2S11 Battery Energy Storage System (161 kWh), enabling optimized energy conversion, improved system resilience, and continuous power availability for essential hospital operations. This project reinforces Indigost Engineering’s experience in delivering scalable, high-performance solar-plus-storage solutions.",
            specs: [
                { icon: "solar_power", value: "100kWp", label: "Capacity" },
                { icon: "battery_charging_full", value: "161kWh", label: "BESS" },
                { icon: "calendar_month", value: "3 Months", label: "Timeline" }
            ],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYo2v3plqSh0j2YMxsZNtO8CBmok2zAiEiD-W4txXCjiKBGUb-lMKEkiOQQm9OBayfn7hgUdLCgLyUouoVUiJWCXnJK2gkk_YXtTZHspYk4TBLT-2M5LW3IwipSdU3kZDvD1PIr3ULPNSg7He8FJISdZ7xbKXWBYedCKN9esaz513zt3byM15Fd1AGFNSSmFJ4s2AsCJjhkSCHk823AlvulYQKBK9eZvhU33nN-oYU4usXGo7f-3rBs-0RDHQW1IKXuTAXG6t8pyg"
        },
        {
            id: 5,
            title: "1MW Solar PV Plant – UNICEF, FDI Islamabad",
            location: "Islamabad",
            date: "April 2025 - Oct 2025",
            category: "BESS Solutions",
            description: "Indigost Engineering (Pvt.) Ltd. successfully delivered a 1MW Solar Photovoltaic Plant integrated with a Battery Energy Storage System (BESS) for UNICEF at FDI Islamabad, under the EPC model. The project was implemented during the period April 2025 to October 2025. The system comprised 1,640 JA Solar photovoltaic modules, eight (8) Huawei SUN2000-115KTL grid-tied inverters, and three (3) Huawei LUNA2000-215-2S10 Battery Energy Storage units with a combined storage capacity of 645 kWh. This configuration ensures high energy yield, system redundancy, operational flexibility, and enhanced power reliability to support mission-critical operations.",
            specs: [
                { icon: "solar_power", value: "1MW", label: "Capacity" },
                { icon: "battery_charging_full", value: "645kWh", label: "BESS" },
                { icon: "calendar_month", value: "6 Months", label: "Timeline" }
            ],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBOhBu-R2EEGPUXda-fEwQYgj9lY3Ga_OzaBkEGWba_BTTY6rnhhMGSiwvWZw8T9l2piJi11q3h-b-BabuKx6MUr1KoJadJmUHOKs6_0ljpKSwikvA69TGf1_WSWxuK84Lx6do8gti9WUThUViWxtX-0WfWbeo3YVsjZCH-m100WGPvuR5IioS4WwsTA-UPip3UxzKwsFX_fhLeqVikKC6qZEz_rPXnolebwAz7TzcBaeQBz44q0N2sy2oyXj6vYu029jnOZueIWOY"
        },
        {
            id: 6,
            title: "500kW Solar PV Plant – UNICEF, EPI Warehouse Manga Mandi",
            location: "Manga Mandi, Lahore",
            date: "April 2025 - Oct 2025",
            category: "BESS Solutions",
            description: "Indigost Engineering (Pvt.) Ltd. successfully executed a 500kW Solar Photovoltaic Plant integrated with a Battery Energy Storage System (BESS) for UNICEF at the EPI Warehouse, Manga Mandi, under the EPC model. The project was implemented during the period April 2025 to October 2025. The system comprised 820 JA Solar photovoltaic modules, four (4) Huawei SUN2000-115KTL grid-tied inverters, and two (2) Huawei LUNA2000-215-2S10 Battery Energy Storage units, providing enhanced system redundancy, operational flexibility, and reliable power supply for critical cold-chain and warehouse operations.",
            specs: [
                { icon: "solar_power", value: "500kW", label: "Capacity" },
                { icon: "battery_charging_full", value: "430kWh", label: "BESS" },
                { icon: "calendar_month", value: "6 Months", label: "Timeline" }
            ],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMyyYXsKvXBQuPPKHGLDLiNlACgN9ZnOsCMHDaTmJZHlAF2v2UfXYUshLK4Q4sS6TELvUVH9qJSd_xC6G6_trIlp5ExmcZxN7dhQEPFUm_KYDzL4PlmCIjGuXx8LnYDB1IQ16DZyqeNKIyWXRXxR0hv3SiTu2ehQqyLYsjkk2hnVBWiAnAiS2OorPzPho7EnSQxOVXXcUbh3PMJSyeQCjDamlzyvuKw3ovoT55SA8RuW_aI06KY4t6vhHm_uiuKJVEZyVqCfzCeyY"
        },
        {
            id: 7,
            title: "120kW Solar PV Plant – UNICEF, EPI Warehouse Uthal",
            location: "Uthal, Lasbela, Balochistan",
            date: "April 2025 - Oct 2025",
            category: "BESS Solutions",
            description: "Indigost Engineering (Pvt.) Ltd. successfully implemented a 120kW Solar Photovoltaic System integrated with a Battery Energy Storage System (BESS) of 215 kWh for UNICEF at the EPI Warehouse, Uthal, Lasbela, Balochistan, under the EPC model. The project was executed during April 2025 to October 2025. The system comprised JA Solar 610 W photovoltaic modules, one (1) Huawei SUN2000-115KTL inverter, and one (1) Huawei LUNA2000-215-2S10 Battery Energy Storage unit (215 kWh), ensuring efficient power conversion and improved energy availability for critical cold-chain and warehouse operations.",
            specs: [
                { icon: "solar_power", value: "120kW", label: "Capacity" },
                { icon: "battery_charging_full", value: "215kWh", label: "BESS" },
                { icon: "calendar_month", value: "6 Months", label: "Timeline" }
            ],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhjCnjS275j3VLTaRIfxqRNzHqQd0KXXJiSOLNgr0EIAiX-_0un7zjTgF_XPhETXfpeRmtGXbQvrARZ0mCWwTpisLAjPibVoW8MrwbLv_7xJo7JdUx8JEZC-RHHd2CKTpkepnq4-k8Rt9qBaQ082M_gFqsaUBfB90XLKEi3EPCk06oekBNtdi9YVS9JCiSAbV_4acU7lM4r8F3MkEHflYXqADUCHy6HtFJhXP3JznumQqpL2o-cicQp11nydbUeEOtXunuxx6ytfI"
        },
        {
            id: 8,
            title: "130kW Solar PV Plant – UNICEF, DHO Office Uthal",
            location: "Uthal, Balochistan",
            date: "April 2025 - Oct 2025",
            category: "BESS Solutions",
            description: "Indigost Engineering (Pvt.) Ltd. successfully implemented a 130kW Solar Photovoltaic System integrated with a Battery Energy Storage System (BESS) of 161 kWh for UNICEF at the DHO Office, Uthal, Balochistan, under the EPC model. The project was executed during April 2025 to October 2025. The installed system comprised JA Solar 610 W photovoltaic modules, one (1) Huawei SUN2000-115KTL inverter, and one (1) Huawei LUNA2000-161-2S11 Battery Energy Storage unit (161 kWh), ensuring efficient power conversion, improved system stability, and enhanced energy availability for critical healthcare operations.",
            specs: [
                { icon: "solar_power", value: "130kW", label: "Capacity" },
                { icon: "battery_charging_full", value: "161kWh", label: "BESS" },
                { icon: "calendar_month", value: "6 Months", label: "Timeline" }
            ],
            image: projectUthalDho
        },
        {
            id: 9,
            title: "580kW Solar Power Plant – Al Jehan Flour Mills",
            location: "Multan, Punjab",
            date: "March 2024 - Oct 2024",
            category: "Solar Systems",
            description: "Indigost Engineering (Pvt.) Ltd. successfully executed a 580kW Solar Power Plant for Al Jehan Flour Mills in Multan, under the EPC model. Carried out between March 2024 and October 2024, the project deployed JA 610 W panels delivering efficient performance and long-term energy reliability. The scope of work included engineering design, procurement, installation, testing & commissioning, supported by one year of operation & maintenance and professional training services.",
            specs: [
                { icon: "solar_power", value: "580kW", label: "Capacity" },
                { icon: "grid_view", value: "JA 610W", label: "Modules" },
                { icon: "engineering", value: "EPC", label: "Model" }
            ],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMX_V6PEFJkd3ypV5NptbA3F6dU1edS5eftjVez8lhSGzzKhhxVjgNbqrBFzwdiv-oAjcCd98SvZPhsK3tF5zA9T8PFhmgvhQiUiLv7LBnHyj1ULUFfH0P6Ymk2dpaWCEZbluIe89I08xbDyE4RmGdRCPW3MvbqWy2nX9qxXBb29muyo2nnAS-MvYTC3fyk5WwftCbwt8pGncX-lBvLGkXE3hki7sD6feDSZSdPHsl1oiTExWM0KpOTNywuxqhG0Q4JCL4vn5SI0I"
        },
        {
            id: 10,
            title: "50kWp Solar Power Plant – Drug Testing Laboratory",
            location: "Bahawalpur, Punjab",
            date: "Nov 2023 - Dec 2023",
            category: "Solar Systems",
            description: "Indigost Engineering (Pvt.) Ltd. has successfully delivered a 50kWp Solar Power Plant for the Drug Testing Laboratory in Bahawalpur, executed under the EPC model. Completed within November 2023 to December 2023, the project incorporated JINKO 585 W panels, ensuring consistent energy generation and dependable system performance. Our responsibilities covered the full scope, including engineering design, procurement, installation, testing & commissioning, as well as one year of operation & maintenance and training services.",
            specs: [
                { icon: "solar_power", value: "50kWp", label: "Capacity" },
                { icon: "grid_view", value: "Jinko 585W", label: "Modules" },
                { icon: "calendar_month", value: "2 Months", label: "Timeline" }
            ],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFcm3jtZrodSHMcgFctyjV5tvsqJKSEdsl5JQFd-nrHEYZA-66MyLhwr4Ku3Qw2q1s226g_Bqj_znV-nUOLR26DXWJD8neCStUpp7EmDsiYlNCTyOsoXeMl2f6zNamAf8k1_xDK3ztN39GslIHmpl28ahzinuoxfvSqESyQofAmRW8ysu7ry4djqlAmQ6C0YUmL2ej4kAVEs4xE6eB0M29Uwv_NNEKB3WaH_KmMTwLk2R6JhGxHRG50fIDqvkbEKiVAG1Jth2lLC4"
        },
        {
            id: 11,
            title: "2MW Solar PV Plant – PAF (MES), Kamra Cantt",
            location: "Kamra, Attock, Punjab",
            date: "Aug 2022 - Nov 2023",
            category: "Solar Systems",
            description: "Indigost Engineering (Pvt.) Ltd. successfully delivered a 2MW Solar PV Plant for PAF (MES) at Hamza Base Camp, PAF Base Minhas, Kamra, Attock, Punjab, under the EPC model. Executed from August 2022 to November 2023, the project integrated JINKO 585 W panels, ensuring robust performance, high efficiency, and long-term energy reliability. The comprehensive scope included engineering design, procurement, installation, testing & commissioning, along with one year of operation & maintenance and specialized training services.",
            specs: [
                { icon: "solar_power", value: "2MW", label: "Capacity" },
                { icon: "grid_view", value: "Jinko 585W", label: "Modules" },
                { icon: "shield", value: "Defense", label: "Sector" }
            ],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmQt925Q6NA6yzTYr6OT32TiOCj3k1TxsUR8S0DdC3Ai33RCCdBm08IPhils3QQbpe3NImng5unb43fBf4SO-asVdH61vkipTVKzoyMCK7t-vmq-fcCztJlafoMaRQO3AmEhYJHixqxRWZElxunnv7VMR5kgOap6Nsw-wWetlP3w-eIDlDFtDp9xsdyILEdgXLdGawG4CufO54y_bbxyrwf2VO9bbcVMRFd5Leg_uzYkQ-JNkRnP7g2BHB1FqPePhGvLsOmxo3YAw"
        },
        {
            id: 12,
            title: "750kW Solar PV Plant – Alkaram Oil Industries",
            location: "Multan, Punjab",
            date: "March 2023 - Aug 2023",
            category: "Solar Systems",
            description: "Indigost Engineering (Pvt.) Ltd. successfully completed a 750kW Solar PV Plant for Alkaram Oil Industries Pvt Ltd at Dunyapur Road, Multan, under the EPC model. Implemented between March 2023 and August 2023, the project incorporated JINKO 585 W panels, delivering reliable, high-efficiency solar performance tailored to industrial operations. The comprehensive scope included engineering design, procurement, installation, testing & commissioning, complemented by one year of operation & maintenance and professional training services.",
            specs: [
                { icon: "solar_power", value: "750kW", label: "Capacity" },
                { icon: "grid_view", value: "Jinko 585W", label: "Modules" },
                { icon: "factory", value: "Industrial", label: "Sector" }
            ],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqTINHBRuPWhG59iuN5sIj-np-MuD8-CTykJFDPO1h9zomLsx4vHCh6xUZlGCI1RH561ANtJdPooA4r2Lzgsvui5sTN6fadj1h2z3zERCmdTZvHXAEs1NYMJZJvSOupGRJ8esDB-ikjkAFPrjlosMTTwQxHlB7SZrFbVxFxgWIr2yx878ZTsn8JzkrF8tAttsMvm-oA7IqaMMgUYJJ45q4TRo3Hx5M4HR_QRpUo5q-6iL9K4914xW_req7Xu46_xZ-JlpYx8Gd8nk"
        },
        {
            id: 13,
            title: "500kW Solar PV Plant – Ahbab Oil Industries",
            location: "Lodhran, Punjab",
            date: "Sept 2022 - Jan 2023",
            category: "Solar Systems",
            description: "Indigost Engineering (Pvt.) Ltd. successfully delivered a 500kW Solar PV Plant for Ahbab Oil Industries Pvt Ltd in Karorpakka, Lodhran, under the EPC model. Executed between September 2022 and January 2023, the project featured JINKO 585 W panels, ensuring optimal performance and long-term reliability. The scope covered engineering design, procurement, installation, testing & commissioning, along with one year of operation & maintenance and training services.",
            specs: [
                { icon: "solar_power", value: "500kW", label: "Capacity" },
                { icon: "grid_view", value: "Jinko 585W", label: "Modules" },
                { icon: "calendar_month", value: "5 Months", label: "Timeline" }
            ],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYo2v3plqSh0j2YMxsZNtO8CBmok2zAiEiD-W4txXCjiKBGUb-lMKEkiOQQm9OBayfn7hgUdLCgLyUouoVUiJWCXnJK2gkk_YXtTZHspYk4TBLT-2M5LW3IwipSdU3kZDvD1PIr3ULPNSg7He8FJISdZ7xbKXWBYedCKN9esaz513zt3byM15Fd1AGFNSSmFJ4s2AsCJjhkSCHk823AlvulYQKBK9eZvhU33nN-oYU4usXGo7f-3rBs-0RDHQW1IKXuTAXG6t8pyg"
        },
        {
            id: 14,
            title: "1.47MW Solar PV Plant – Naveena Denim Ltd",
            location: "Lahore, Punjab",
            date: "July 2021 - Oct 2022",
            category: "Solar Systems",
            description: "Indigost Engineering (Pvt.) Ltd. successfully delivered a 1.47MW Solar PV Plant for Naveena Denim Ltd at Defense Road, Lahore, under the EPC model. Executed between July 2021 and October 2022, the project deployed JINKO 585 W panels, ensuring maximum energy yield and long-term reliability. Our end-to-end scope covered engineering design, procurement, installation, testing & commissioning, along with one year of operation & maintenance and tailored training services.",
            specs: [
                { icon: "solar_power", value: "1.47MW", label: "Capacity" },
                { icon: "grid_view", value: "Jinko 585W", label: "Modules" },
                { icon: "factory", value: "Textile", label: "Sector" }
            ],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBOhBu-R2EEGPUXda-fEwQYgj9lY3Ga_OzaBkEGWba_BTTY6rnhhMGSiwvWZw8T9l2piJi11q3h-b-BabuKx6MUr1KoJadJmUHOKs6_0ljpKSwikvA69TGf1_WSWxuK84Lx6do8gti9WUThUViWxtX-0WfWbeo3YVsjZCH-m100WGPvuR5IioS4WwsTA-UPip3UxzKwsFX_fhLeqVikKC6qZEz_rPXnolebwAz7TzcBaeQBz44q0N2sy2oyXj6vYu029jnOZueIWOY"
        },
        {
            id: 15,
            title: "1MW Solar Power Plant – Indus Hospital",
            location: "Badin, Sindh",
            date: "Nov 2020 - Dec 2021",
            category: "Solar Systems",
            description: "Indigost Engineering (Pvt.) Ltd. successfully executed a 1MW Solar Power Plant for Indus Hospital, Badin under the EPC model. The project spanned from November 2020 to December 2021, featuring JINKO 585 W panels to deliver exceptional efficiency and durability. Our comprehensive scope included engineering design, procurement, installation, testing & commissioning, as well as one year of operation & maintenance and specialized training services.",
            specs: [
                { icon: "solar_power", value: "1MW", label: "Capacity" },
                { icon: "grid_view", value: "Jinko 585W", label: "Modules" },
                { icon: "local_hospital", value: "Hospital", label: "Sector" }
            ],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMyyYXsKvXBQuPPKHGLDLiNlACgN9ZnOsCMHDaTmJZHlAF2v2UfXYUshLK4Q4sS6TELvUVH9qJSd_xC6G6_trIlp5ExmcZxN7dhQEPFUm_KYDzL4PlmCIjGuXx8LnYDB1IQ16DZyqeNKIyWXRXxR0hv3SiTu2ehQqyLYsjkk2hnVBWiAnAiS2OorPzPho7EnSQxOVXXcUbh3PMJSyeQCjDamlzyvuKw3ovoT55SA8RuW_aI06KY4t6vhHm_uiuKJVEZyVqCfzCeyY"
        },
        {
            id: 16,
            title: "450kW Solar Power Plant – Children Hospital",
            location: "Multan, Punjab",
            date: "Oct 2020 - Jan 2021",
            category: "Solar Systems",
            description: "Indigost Engineering (Pvt.) Ltd. implemented a 450kW Solar Power Plant for Children Hospital Multan in Punjab, under the EPC model. The project, carried out between October 2020 and January 2021, integrated Canadian 585 W panels to ensure consistent performance, energy efficiency, and long-term reliability. Our team managed the full project cycle, including engineering design, procurement, installation, testing & commissioning, along with one year of operation & maintenance and training services.",
            specs: [
                { icon: "solar_power", value: "450kW", label: "Capacity" },
                { icon: "grid_view", value: "Canadian", label: "Modules" },
                { icon: "local_hospital", value: "Hospital", label: "Sector" }
            ],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhjCnjS275j3VLTaRIfxqRNzHqQd0KXXJiSOLNgr0EIAiX-_0un7zjTgF_XPhETXfpeRmtGXbQvrARZ0mCWwTpisLAjPibVoW8MrwbLv_7xJo7JdUx8JEZC-RHHd2CKTpkepnq4-k8Rt9qBaQ082M_gFqsaUBfB90XLKEi3EPCk06oekBNtdi9YVS9JCiSAbV_4acU7lM4r8F3MkEHflYXqADUCHy6HtFJhXP3JznumQqpL2o-cicQp11nydbUeEOtXunuxx6ytfI"
        },
        {
            id: 17,
            title: "517 kW Solar Power Plant – MS DHQ Tando M Khan",
            location: "Tando Muhammad Khan, Sindh",
            date: "Dec 2019 - Aug 2020",
            category: "Solar Systems",
            description: "Indigost Engineering (Pvt.) Ltd. successfully delivered a 517 kW solar power project for MS DHQ Tando M Khan, Sindh, completed within nine months (Dec 2019 – Aug 2020). Equipped with Canadian 585 W panels, the system was designed and installed to ensure maximum efficiency and long-term durability. The scope covered engineering design, procurement, installation, testing & commissioning, one year of O&M, and training services—providing a reliable, cost-effective, and sustainable energy solution to support the hospital’s critical operations.",
            specs: [
                { icon: "solar_power", value: "517kW", label: "Capacity" },
                { icon: "grid_view", value: "Canadian", label: "Modules" },
                { icon: "calendar_month", value: "9 Months", label: "Timeline" }
            ],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmQt925Q6NA6yzTYr6OT32TiOCj3k1TxsUR8S0DdC3Ai33RCCdBm08IPhils3QQbpe3NImng5unb43fBf4SO-asVdH61vkipTVKzoyMCK7t-vmq-fcCztJlafoMaRQO3AmEhYJHixqxRWZElxunnv7VMR5kgOap6Nsw-wWetlP3w-eIDlDFtDp9xsdyILEdgXLdGawG4CufO54y_bbxyrwf2VO9bbcVMRFd5Leg_uzYkQ-JNkRnP7g2BHB1FqPePhGvLsOmxo3YAw"
        },
        {
            id: 18,
            title: "501kW Solar Power Plant – Taluqa Hospital",
            location: "Sujawal, Sindh",
            date: "Dec 2019 - Aug 2020",
            category: "Solar Systems",
            description: "Indigost Engineering (Pvt.) Ltd. delivered a 501kW Solar Power Plant for Taluqa Hospital Sujawal in Sindh, under the EPC model. Implemented from December 2019 to August 2020, the project was equipped with Canadian 585 W panels to guarantee dependable performance, high efficiency, and long-term sustainability. Our responsibilities covered the entire scope of work, including engineering design, procurement, installation, testing & commissioning, followed by one year of operation & maintenance and capacity-building training services.",
            specs: [
                { icon: "solar_power", value: "501kW", label: "Capacity" },
                { icon: "grid_view", value: "Canadian", label: "Modules" },
                { icon: "local_hospital", value: "Hospital", label: "Sector" }
            ],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDthetthFg3rPLhaPMWLASyF3JDdI3jYXnFvtMkXbQWLa9WyrX-i_MhU7fcAj5wTiuvdVGh1hts771_NjIgGt35APW6sAeZMe29wxprECvwoLKoqu62NhAPGKgCTgL5g6FjIEhJcCBjtw_RyH8KVoyuN7wyKzzAYsOoHrfoOx3fD82m-5Jm9NAjvAPscO1gsnS97jS4xb3_PIeHl-FHl0HyXG4T-79qedaMtvA7jD--N0c5CKr54dzExpVbnGB4okFlNsUarNcrMtw"
        },
        {
            id: 19,
            title: "220 kW Solar Power Plant – Yasrab Cotton Mills",
            location: "Rajanpur, Punjab",
            date: "June 2019 - Oct 2019",
            category: "Solar Systems",
            description: "Indigost Engineering (Pvt.) Ltd. executed a 220 kW solar power project for Yasrab Cotton Mills in Rajanpur, Punjab, completed within four months (June 2019 – October 2019). The system was equipped with Canadian 585 W panels, ensuring high performance, efficiency, and durability. The project scope included engineering design, procurement, installation, testing & commissioning, one year of O&M, and training services—delivering a sustainable and cost-effective energy solution tailored to industrial operations.",
            specs: [
                { icon: "solar_power", value: "220kW", label: "Capacity" },
                { icon: "grid_view", value: "Canadian", label: "Modules" },
                { icon: "calendar_month", value: "4 Months", label: "Timeline" }
            ],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYo2v3plqSh0j2YMxsZNtO8CBmok2zAiEiD-W4txXCjiKBGUb-lMKEkiOQQm9OBayfn7hgUdLCgLyUouoVUiJWCXnJK2gkk_YXtTZHspYk4TBLT-2M5LW3IwipSdU3kZDvD1PIr3ULPNSg7He8FJISdZ7xbKXWBYedCKN9esaz513zt3byM15Fd1AGFNSSmFJ4s2AsCJjhkSCHk823AlvulYQKBK9eZvhU33nN-oYU4usXGo7f-3rBs-0RDHQW1IKXuTAXG6t8pyg"
        },
        {
            id: 20,
            title: "120 kW Solar Power Plant – Shahzada Cold Storage",
            location: "Kasur, Punjab",
            date: "May 2019 - July 2019",
            category: "Solar Systems",
            description: "Indigost Engineering (Pvt.) Ltd. successfully completed a 120 kW solar power plant for Shahzada Cold Storage in Kasur, Punjab, within three months (May 2019 – July 2019). The system, equipped with Canadian 585 W panels, was designed to deliver reliable performance and long-term sustainability. The project scope included engineering design, procurement, installation, testing & commissioning, one year of O&M, and training services—providing a dependable renewable energy solution to meet the facility’s continuous cooling and storage demands.",
            specs: [
                { icon: "solar_power", value: "120kW", label: "Capacity" },
                { icon: "grid_view", value: "Canadian", label: "Modules" },
                { icon: "calendar_month", value: "3 Months", label: "Timeline" }
            ],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBOhBu-R2EEGPUXda-fEwQYgj9lY3Ga_OzaBkEGWba_BTTY6rnhhMGSiwvWZw8T9l2piJi11q3h-b-BabuKx6MUr1KoJadJmUHOKs6_0ljpKSwikvA69TGf1_WSWxuK84Lx6do8gti9WUThUViWxtX-0WfWbeo3YVsjZCH-m100WGPvuR5IioS4WwsTA-UPip3UxzKwsFX_fhLeqVikKC6qZEz_rPXnolebwAz7TzcBaeQBz44q0N2sy2oyXj6vYu029jnOZueIWOY"
        },
        {
            id: 21,
            title: "Islamabad EV Charging Stations",
            location: "Islamabad",
            date: "2024",
            category: "EV Charging",
            description: "Islamabad has three EV charging stations, each with a capacity of 215 kW. These fast chargers provide quick and efficient charging for electric vehicles. They help reduce waiting time for users. This setup supports the city’s shift toward clean energy. The stations are designed for modern EV needs. They improve overall charging reliability.",
            specs: [
                { icon: "ev_station", value: "215kW", label: "Power" },
                { icon: "tag", value: "3 Stations", label: "Quantity" },
                { icon: "bolt", value: "Fast", label: "Type" }
            ],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEdECVrMnuNaEkWcqw_pt0loqlkrS2Hygc-I1-0_sfdatB9_dYgHt4Z2aZLJGeYQFdoIwu-qQ1UhquHM-rKkgIudl1zeR38UVeKqSgJw1hYo8B_-mtlOA8Y6Rapt9RQYI93gdcH-dS6Mz_Yr84tl9fp0r_FJxPh0xBo0igY9JX9jScyz9gODlC6GQhaWU-rvglqIXEgAYgDr7gvb765aCsZLn6poib_xfnBU7cOyIDpElvdgWcPlsbepWvYnzSP17sLqbBvwBUrqM"
        },
        {
            id: 22,
            title: "Lahore EV Charging Stations",
            location: "Lahore, Punjab",
            date: "2024",
            category: "EV Charging",
            description: "Lahore is equipped with two EV charging stations, both operating at 215 kW. These stations offer high-speed charging for daily EV users. They improve accessibility across the city. This infrastructure promotes eco-friendly transportation. The chargers meet international standards. They ensure consistent performance.",
            specs: [
                { icon: "ev_station", value: "215kW", label: "Power" },
                { icon: "tag", value: "2 Stations", label: "Quantity" },
                { icon: "bolt", value: "Fast", label: "Type" }
            ],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAG0sChLVrApGYY4BX8rG4HYtJiWQaB9ekZtzOlsr5_G96t_mWr4Lu54gSnLJLwBn6pw_RFIsW2SHbJ4vi84UxB-w8hBXzrlghPYWFvTAQMuqT2JzBNgldMUIPSvA05pJHJxkaSCj0c5rZkHszwMG6SNzYzwrWomSnA-gEl4JlWPjKsKmp-gbjAGYiiEvDOTErtiajF7Kc5cL8QZ2pKvySErjzJQonL10s__5NdGqx009anyLwl-74o6JeU_fRsXCrBn249qG1mqU4"
        },
        {
            id: 23,
            title: "Dera Ali Yar EV Charging Station",
            location: "Dera Ali Yar, Balochistan",
            date: "2024",
            category: "EV Charging",
            description: "Dera Ali Yar has one EV charging station with a power capacity of 107 kW. It provides dependable charging for electric vehicles in the area. The station supports local commuters. It helps expand EV usage in smaller cities. This facility improves energy efficiency. It strengthens local EV infrastructure.",
            specs: [
                { icon: "ev_station", value: "107kW", label: "Power" },
                { icon: "location_on", value: "City", label: "Type" },
                { icon: "bolt", value: "Standard", label: "Speed" }
            ],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEdECVrMnuNaEkWcqw_pt0loqlkrS2Hygc-I1-0_sfdatB9_dYgHt4Z2aZLJGeYQFdoIwu-qQ1UhquHM-rKkgIudl1zeR38UVeKqSgJw1hYo8B_-mtlOA8Y6Rapt9RQYI93gdcH-dS6Mz_Yr84tl9fp0r_FJxPh0xBo0igY9JX9jScyz9gODlC6GQhaWU-rvglqIXEgAYgDr7gvb765aCsZLn6poib_xfnBU7cOyIDpElvdgWcPlsbepWvYnzSP17sLqbBvwBUrqM"
        },
        {
            id: 24,
            title: "Dera Murad Jamali EV Charging Station",
            location: "Dera Murad Jamali, Balochistan",
            date: "2024",
            category: "EV Charging",
            description: "In Dera Murad Jamali, one 107 kW EV charging station has been installed. It ensures safe and stable charging for EV owners. This facility increases convenience for users. It contributes to regional EV development. The station is easy to access. It supports future EV growth.",
            specs: [
                { icon: "ev_station", value: "107kW", label: "Power" },
                { icon: "location_on", value: "City", label: "Type" },
                { icon: "bolt", value: "Standard", label: "Speed" }
            ],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAG0sChLVrApGYY4BX8rG4HYtJiWQaB9ekZtzOlsr5_G96t_mWr4Lu54gSnLJLwBn6pw_RFIsW2SHbJ4vi84UxB-w8hBXzrlghPYWFvTAQMuqT2JzBNgldMUIPSvA05pJHJxkaSCj0c5rZkHszwMG6SNzYzwrWomSnA-gEl4JlWPjKsKmp-gbjAGYiiEvDOTErtiajF7Kc5cL8QZ2pKvySErjzJQonL10s__5NdGqx009anyLwl-74o6JeU_fRsXCrBn249qG1mqU4"
        },
        {
            id: 25,
            title: "Lower Ali EV Charging Station",
            location: "Lower Ali",
            date: "2024",
            category: "EV Charging",
            description: "Lower Ali features an EV charging station with a capacity of 107 kW. The station delivers efficient and reliable charging services. It supports local EV drivers. The station encourages sustainable mobility. This charger reduces charging downtime. It improves user confidence.",
            specs: [
                { icon: "ev_station", value: "107kW", label: "Power" },
                { icon: "location_on", value: "Local", label: "Type" },
                { icon: "bolt", value: "Standard", label: "Speed" }
            ],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEdECVrMnuNaEkWcqw_pt0loqlkrS2Hygc-I1-0_sfdatB9_dYgHt4Z2aZLJGeYQFdoIwu-qQ1UhquHM-rKkgIudl1zeR38UVeKqSgJw1hYo8B_-mtlOA8Y6Rapt9RQYI93gdcH-dS6Mz_Yr84tl9fp0r_FJxPh0xBo0igY9JX9jScyz9gODlC6GQhaWU-rvglqIXEgAYgDr7gvb765aCsZLn6poib_xfnBU7cOyIDpElvdgWcPlsbepWvYnzSP17sLqbBvwBUrqM"
        },
        {
            id: 26,
            title: "Karachi EV Charging Station",
            location: "Karachi, Sindh",
            date: "2024",
            category: "EV Charging",
            description: "Karachi has one high-power EV charging station rated at 215 kW. It offers fast and efficient charging in a high-demand city. The station reduces charging delays. It supports the growing EV network in Karachi. It handles heavy usage smoothly. It strengthens urban EV infrastructure.",
            specs: [
                { icon: "ev_station", value: "215kW", label: "Power" },
                { icon: "tag", value: "1 Station", label: "Quantity" },
                { icon: "bolt", value: "Fast", label: "Type" }
            ],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAG0sChLVrApGYY4BX8rG4HYtJiWQaB9ekZtzOlsr5_G96t_mWr4Lu54gSnLJLwBn6pw_RFIsW2SHbJ4vi84UxB-w8hBXzrlghPYWFvTAQMuqT2JzBNgldMUIPSvA05pJHJxkaSCj0c5rZkHszwMG6SNzYzwrWomSnA-gEl4JlWPjKsKmp-gbjAGYiiEvDOTErtiajF7Kc5cL8QZ2pKvySErjzJQonL10s__5NdGqx009anyLwl-74o6JeU_fRsXCrBn249qG1mqU4"
        }
    ];

    const filteredProjects = filter === 'All Projects'
        ? projects
        : projects.filter(project => project.category === filter);

    return (
        <div className="bg-background-light text-text-main font-display overflow-x-hidden selection:bg-secondary/30">
            <Helmet>
                <title>Solar & EV Projects in Pakistan | INDIGOST Case Studies</title>
                <meta name="description" content="Explore our nationwide impact: 2.3MW PV solar installations, UNICEF-funded BESS projects, and motorway EV charging hubs across Pakistan." />
            </Helmet>
            <main className="flex flex-col w-full min-h-screen">
                {/* Hero Section */}
                <section className="relative w-full pt-0 pb-12 md:pt-0 md:pb-16 px-4 overflow-hidden bg-background-light">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none"></div>
                    <div className="absolute -top-20 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
                    <div className="layout-content-container max-w-[1280px] mx-auto flex flex-col items-center">
                        <div className="w-full relative rounded-2xl overflow-hidden min-h-[480px] flex flex-col items-center justify-center text-center p-8 md:p-16 gap-8 bg-cover bg-center shadow-2xl shadow-primary/20" data-alt="Futuristic solar panel array with glowing connections" style={{ backgroundImage: 'linear-gradient(rgba(30, 27, 75, 0.85) 0%, rgba(30, 27, 75, 0.9) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuA_Sg7rZYwkAM2teEBjqKA3P_RsJA48BH724ZKKqtyVIdQP2HT7iLaQO5EMFSZ4nvvrmS91R1IWOJULykZVk0GY037tuHtYW3JmNONbSN9mOigjATGtz7FfP2tykbsv_AFcJsPrln6X_RKdsICV8aN1JLM36X35-1r09b_HgLK_9cS8SbxjVVShYMaa3cSXDOHseYQf66FmcD_rwjxgYg2C-xkIZUdMXtWnbZK90Lj9VjhrwbowtxDP3eGFNOV2NV0siovSoosa3rA")' }}>
                            <div className="flex flex-col gap-6 max-w-4xl z-10">
                                <span className="text-secondary font-bold tracking-widest text-xs uppercase bg-deep-indigo/50 px-4 py-1.5 rounded-full w-fit mx-auto backdrop-blur-sm border border-secondary/30 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                                    UNICEF-Funded Project
                                </span>
                                <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight tracking-tight drop-shadow-lg">
                                    Installation of a 2.3 MW PV Solar System Integrated with 2 MWh BESS
                                </h1>
                                <h2 className="text-indigo-100 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
                                    Energy Storage System Across All Provinces of Pakistan
                                </h2>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Filter Section */}
                <section className="sticky top-[73px] z-40 bg-background-light/95 backdrop-blur-sm py-4 border-b border-indigo-200/50 shadow-sm">
                    <div className="max-w-[1280px] mx-auto px-4 sm:px-10 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                        {['All Projects', 'EV Charging', 'Solar Systems', 'BESS Solutions'].map((category) => (
                            <button
                                key={category}
                                onClick={() => setFilter(category)}
                                className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-6 transition-all transform hover:-translate-y-0.5 ${filter === category
                                    ? 'bg-deep-indigo text-white shadow-lg shadow-primary/30'
                                    : 'bg-white border border-indigo-100 text-text-main hover:border-secondary hover:text-secondary'
                                    }`}
                            >
                                <span className="text-sm font-medium">{category}</span>
                            </button>
                        ))}
                    </div>
                </section>

                {/* Projects Grid */}
                <section className="py-16 px-4 md:px-10 bg-white min-h-[600px]">
                    <div className="max-w-[1280px] mx-auto">
                        <div className="grid grid-cols-1 gap-12">
                            {filteredProjects.map((project) => (
                                <div key={project.id} className="flex flex-col md:flex-row gap-8 bg-background-light rounded-2xl overflow-hidden border border-indigo-100 hover:shadow-xl transition-all duration-300 group">
                                    {/* Image Section */}
                                    <div className="w-full md:w-2/5 relative overflow-hidden min-h-[300px]">
                                        <div
                                            role="img"
                                            aria-label={project.title}
                                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                            style={{ backgroundImage: `url("${project.image}")` }}
                                        ></div>
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-white/90 backdrop-blur-md text-deep-indigo px-3 py-1 rounded-full text-xs font-bold border border-indigo-100 shadow-sm">
                                                {project.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="w-full md:w-3/5 p-8 flex flex-col justify-center gap-6">
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-2 text-primary font-bold text-sm tracking-wider uppercase">
                                                <span className="material-symbols-outlined text-lg text-secondary">location_on</span>
                                                <span>{project.location}</span>
                                                <span className="w-1.5 h-1.5 bg-secondary rounded-full mx-2"></span>
                                                <span>{project.date}</span>
                                            </div>
                                            <h2 className="text-2xl md:text-3xl font-bold text-deep-indigo group-hover:text-primary transition-colors">
                                                {project.title}
                                            </h2>
                                        </div>

                                        <p className="text-gray-800 leading-relaxed text-sm md:text-base">
                                            {project.description}
                                        </p>

                                        <div className="grid grid-cols-3 gap-4 border-t border-indigo-200/50 pt-6 mt-2">
                                            {project.specs.map((spec, index) => (
                                                <div key={index} className="flex flex-col gap-1">
                                                    <span className="material-symbols-outlined text-secondary text-2xl mb-1">{spec.icon}</span>
                                                    <span className="text-deep-indigo font-bold text-lg">{spec.value}</span>
                                                    <span className="text-text-muted text-xs uppercase tracking-wide">{spec.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredProjects.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-20 text-center opacity-70">
                                <span className="material-symbols-outlined text-6xl text-indigo-200 mb-4">folder_off</span>
                                <h3 className="text-2xl font-bold text-deep-indigo">No projects found</h3>
                                <p className="text-gray-600">There are currently no projects listed in this category.</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Call to Action */}
                <section className="py-20 px-4 bg-primary text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-90"></div>
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center gap-8">
                        <h2 className="text-3xl md:text-5xl font-bold">Ready to modernize Pakistan's infrastructure?</h2>
                        <p className="text-indigo-50 text-lg md:text-xl max-w-2xl">
                            Join the energy revolution. From initial consultation to 3D planning and final installation, INDIGOST is your partner in sustainable power.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                            <Link to="/contact" className="bg-white text-primary px-8 py-4 rounded-lg font-bold hover:bg-deep-indigo hover:text-white transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1">
                                Start Your Project
                            </Link>

                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Projects;
