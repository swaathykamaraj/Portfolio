import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowUpRight, Download, Mail, ChevronRight, Star,
    MapPin, Phone, Linkedin, Calendar, CheckCircle,
    Briefcase, Send, MessageSquare, Menu, X, ArrowRight
} from 'lucide-react';
import resumeData from './resume.json';

// --- Assets & Icons ---
// Using placeholder for images since we don't have the exact ones from the design
const UserAvatar = ({ size = "lg", className = "" }) => (
    <div className={`rounded-full bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center text-[#FF4D30] font-bold border-4 border-white shadow-xl ${size === "lg" ? "w-64 h-64 text-6xl" : "w-16 h-16 text-xl"} ${className}`}>
        <span>SK</span>
    </div>
);

// --- Components ---

const NavBar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4 bg-white/90 backdrop-blur-md shadow-sm' : 'py-8 bg-transparent'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-[#FF4D30] rounded-full flex items-center justify-center text-white font-bold text-xl">
                        S
                    </div>
                    <span className="font-['Outfit'] font-bold text-2xl text-[#1C1C1C]">Swaathy<span className="text-[#FF4D30]">.</span></span>
                </div>

                <div className="hidden md:flex items-center gap-8 font-medium text-gray-600">
                    <a href="#home" className="text-[#FF4D30]">Home</a>
                    <a href="#services" className="hover:text-[#1C1C1C] transition-colors">Expertise</a>
                    <a href="#experience" className="hover:text-[#1C1C1C] transition-colors">Experience</a>
                    <a href="#contact" className="hover:text-[#1C1C1C] transition-colors">Contact</a>
                </div>

                <button className="hidden md:flex bg-black text-white px-6 py-2.5 rounded-full font-medium hover:bg-[#FF4D30] transition-colors">
                    Let's Talk
                </button>

                <button className="md:hidden p-2 text-black">
                    <Menu size={24} />
                </button>
            </div>
        </nav>
    );
};

const ServiceCard = ({ label, title, details, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        viewport={{ once: true }}
        className="bg-[#111111] p-8 rounded-[32px] relative group h-full flex flex-col items-start text-left hover:bg-[#161616] transition-colors border border-white/5"
    >
        <span className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-3 block">{label}</span>
        <h3 className="text-xl md:text-2xl font-bold text-white mb-6 font-['Outfit'] leading-tight pr-8">{title}</h3>

        <ul className="space-y-3 mb-8 flex-1">
            {details.map((item, i) => (
                <li key={i} className="text-gray-400 text-sm leading-relaxed">
                    {item}
                </li>
            ))}
        </ul>

        <div className="absolute bottom-8 right-8 w-10 h-10 bg-[#FF4D30] rounded-full flex items-center justify-center text-white shadow-lg shadow-orange-500/20 group-hover:scale-110 group-hover:bg-[#ff644c] group-hover:shadow-orange-500/60 transition-all duration-300">
            <ArrowRight size={20} />
        </div>
    </motion.div>
);

const TimelineItem = ({ data, index }) => (
    <div className="flex gap-6 md:gap-12 relative pb-12 last:pb-0">
        <div className="hidden md:flex flex-col items-center w-24 shrink-0 pt-2">
            <div className="w-4 h-4 rounded-full bg-[#FF4D30] ring-4 ring-orange-100 mb-2"></div>
            {index !== 3 && <div className="w-0.5 h-full bg-gray-200 absolute top-8 bottom-0 left-[51px]"></div>}
        </div>

        <div className="md:hidden absolute left-[7px] top-3 bottom-0 w-0.5 bg-gray-200"></div>
        <div className="md:hidden absolute left-0 w-4 h-4 rounded-full bg-[#FF4D30] mt-2"></div>

        <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="flex-1 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow"
        >
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2">
                <div>
                    <h3 className="text-xl md:text-2xl font-bold font-['Outfit'] text-[#1C1C1C]">{data.role}</h3>
                    <p className="text-[#FF4D30] font-medium">{data.company}</p>
                </div>
                <span className="inline-block px-4 py-2 bg-gray-100 rounded-lg text-sm font-semibold text-gray-600 self-start">
                    {data.period}
                </span>
            </div>

            <p className="text-gray-600 mb-4 italic text-sm border-l-2 border-[#FF4D30] pl-3">
                "{data.achievements[0]}"
            </p>

            <div className="flex flex-wrap gap-2">
                {data.tags.map((tag, i) => (
                    <span key={i} className="text-xs font-bold px-3 py-1.5 rounded-full bg-orange-50 text-orange-600">
                        {tag}
                    </span>
                ))}
            </div>
        </motion.div>
    </div>
);

export default function App() {
    const { profile, core_expertise, experience, education, certifications } = resumeData;

    const services = [
        {
            label: "Product Strategy",
            title: "0→1 & Growth Product Management",
            details: ["End-to-end product discovery & delivery", "OKRs, business metrics & product sense", "Roadmapping & stakeholder alignment"]
        },
        {
            label: "Analytics & Experimentation",
            title: "Data-Driven Decision Making",
            details: ["User behaviour & funnel analytics", "Optimization & A/B testing frameworks", "Retention, NPS & pricing strategy"]
        },
        {
            label: "AI & CX Products",
            title: "AI-Driven Customer Experience",
            details: ["Intent modeling & predictive analytics", "Global CX product portfolios", "Chatbots & automation for support load reduction"]
        },
    ];

    return (
        <div className="bg-gray-50/50 min-h-screen relative" id="home">
            <NavBar />

            {/* --- HERO SECTION --- */}
            <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6">
                <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 text-[#FF4D30] rounded-full font-bold text-sm mb-6">
                            <span className="flex h-3 w-3 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FF4D30]"></span>
                            </span>
                            Top Rated Data Product Manager
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8 font-['Outfit'] text-[#1C1C1C]">
                            I'm <span className="text-[#FF4D30]">{profile.name.split(' ')[0]}</span>,<br />
                            {profile.role.replace('Senior ', '')}
                        </h1>

                        <p className="text-lg text-gray-500 mb-10 leading-relaxed max-w-lg">
                            {profile.tagline}. Specializing in <span className="text-[#1C1C1C] font-semibold">AI-Driven CX</span> & <span className="text-[#1C1C1C] font-semibold">Funnel Optimization</span> with a proven track record of $5M+ revenue generation.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <a href="#contact" className="btn-primary">
                                Hire Me <ArrowRight size={20} />
                            </a>
                            <a href={profile.linkedin} target="_blank" className="btn-outline">
                                Portfolio <ArrowUpRight size={20} />
                            </a>
                        </div>

                        <div className="mt-12 flex items-center gap-8">
                            <div>
                                <h4 className="text-3xl font-bold font-['Outfit']">7+</h4>
                                <p className="text-gray-500 text-sm">Years Exp.</p>
                            </div>
                            <div className="w-px h-10 bg-gray-200"></div>
                            <div>
                                <h4 className="text-3xl font-bold font-['Outfit']">25+</h4>
                                <p className="text-gray-500 text-sm">Markets</p>
                            </div>
                            <div className="w-px h-10 bg-gray-200"></div>
                            <div>
                                <h4 className="text-3xl font-bold font-['Outfit']">9%</h4>
                                <p className="text-gray-500 text-sm">Uplift</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative flex justify-center"
                    >
                        {/* Decorative Circles */}
                        <div className="absolute top-0 right-10 w-20 h-20 bg-orange-100 rounded-full blur-2xl"></div>
                        <div className="absolute bottom-10 left-10 w-32 h-32 bg-blue-50 rounded-full blur-2xl"></div>

                        <div className="relative z-10">
                            <div className="relative">
                                <UserAvatar className="w-80 h-80 md:w-[450px] md:h-[450px]" />

                                {/* Floating Cards */}
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ repeat: Infinity, duration: 4 }}
                                    className="absolute -left-4 top-20 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-gray-50"
                                >
                                    <div className="bg-green-100 p-2 rounded-lg text-green-600">
                                        <CheckCircle size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-bold uppercase">Success</p>
                                        <p className="font-bold text-sm">12% ROI Boost</p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    animate={{ y: [0, 10, 0] }}
                                    transition={{ repeat: Infinity, duration: 5, delay: 1 }}
                                    className="absolute -right-8 bottom-20 bg-white p-4 rounded-2xl shadow-xl border border-gray-50 text-center"
                                >
                                    <span className="text-3xl font-bold text-[#FF4D30]">50+</span>
                                    <p className="text-xs text-gray-500 font-bold">Projects Done</p>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- SERVICES SECTION --- */}
            <section id="services" className="py-24 bg-[#1C1C1C] text-white">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div>
                            <h4 className="text-[#FF4D30] font-bold uppercase tracking-widest mb-2">Technical Expertise</h4>
                            <h2 className="text-4xl md:text-5xl font-bold font-['Outfit']">My Core <span className="text-[#FF4D30]">Competencies</span></h2>
                        </div>
                        <p className="text-gray-400 max-w-md leading-relaxed">
                            Leveraging a unique blend of technical background, design thinking, and data analytics to build scalable consumer products.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {services.map((s, i) => (
                            <ServiceCard key={i} {...s} delay={i * 0.2} />
                        ))}
                    </div>

                    <div className="mt-16 flex flex-wrap gap-3 justify-center">
                        {core_expertise.map((skill, i) => (
                            <span key={i} className="px-5 py-2 rounded-full border border-gray-700 hover:border-[#FF4D30] hover:text-[#FF4D30] transition-colors text-sm font-medium cursor-default">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- EXPERIENCE SECTION --- */}
            <section id="experience" className="py-24 px-6 bg-white">
                <div className="container mx-auto max-w-5xl">
                    <div className="text-center mb-16">
                        <h4 className="text-[#FF4D30] font-bold uppercase tracking-widest mb-2">Career Path</h4>
                        <h2 className="text-4xl md:text-5xl font-bold font-['Outfit'] text-[#1C1C1C]">Work <span className="text-[#FF4D30]">Experience</span></h2>
                    </div>

                    <div className="relative">
                        {experience.map((job, i) => (
                            <TimelineItem key={job.id} data={job} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* --- CTA / EDUCATION --- */}
            <section className="py-24 px-6 bg-[#FF4D30] relative overflow-hidden">
                {/* Background Patterns */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

                <div className="container mx-auto relative z-10 text-center text-white">
                    <h2 className="text-3xl md:text-5xl font-bold font-['Outfit'] mb-8">Academic Background</h2>
                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {education.map((edu, i) => (
                            <div key={i} className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 hover:bg-white/20 transition-colors">
                                <div className="w-12 h-12 bg-white text-[#FF4D30] rounded-xl flex items-center justify-center text-xl font-bold mb-4 mx-auto">
                                    <Briefcase size={24} />
                                </div>
                                <h3 className="text-xl font-bold mb-2">{edu.degree}</h3>
                                <p className="text-white/80">{edu.school}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- CONTACT/FOOTER --- */}
            <section id="contact" className="bg-[#1C1C1C] text-white pt-24 pb-12 px-6">
                <div className="container mx-auto">
                    <div className="bg-[#FF4D30] rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-bold font-['Outfit'] mb-4">Have an Awesome Project?</h2>
                            <p className="text-white/90 text-lg">Let's discuss how I can help scale your product to the next level.</p>
                        </div>
                        <div className="relative z-10 flex gap-4">
                            <a href={`mailto:${profile.email}`} className="bg-white text-[#FF4D30] px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg">
                                Let's Discuss
                            </a>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-4 gap-12 mt-20 border-b border-gray-800 pb-12">
                        <div className="col-span-2">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-10 h-10 bg-[#FF4D30] rounded-full flex items-center justify-center text-white font-bold text-xl">S</div>
                                <span className="font-['Outfit'] font-bold text-2xl">Swaathy<span className="text-[#FF4D30]">.</span></span>
                            </div>
                            <p className="text-gray-400 max-w-sm">
                                Senior Product Manager focused on building data-driven, customer-centric digital products.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-bold text-lg mb-6">Contact</h4>
                            <ul className="space-y-4 text-gray-400">
                                <li className="flex items-center gap-2"><Mail size={16} className="text-[#FF4D30]" /> {profile.email}</li>
                                <li className="flex items-center gap-2"><Phone size={16} className="text-[#FF4D30]" /> {profile.phone}</li>
                                <li className="flex items-center gap-2"><MapPin size={16} className="text-[#FF4D30]" /> {profile.location}</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-lg mb-6">Social</h4>
                            <div className="flex gap-4">
                                <a href={profile.linkedin} className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#FF4D30] transition-colors">
                                    <Linkedin size={20} />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="text-center pt-8 text-gray-600 text-sm">
                        <p>© 2025 Swaathy Kamaraj. All rights reserved.</p>
                    </div>
                </div>
            </section>

        </div>
    );
}