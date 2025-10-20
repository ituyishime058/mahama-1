import React from 'react';
import { mockSponsors } from '../constants';

const SponsoredBanners: React.FC = () => {
    return (
        <div className="bg-slate-100 dark:bg-navy py-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                 <h3 className="text-center font-bold text-sm uppercase text-slate-500 tracking-widest mb-6">In Partnership With</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ perspective: '1000px' }}>
                    {mockSponsors.map((sponsor, index) => (
                        <a 
                            key={sponsor.name}
                            href={sponsor.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block relative rounded-lg overflow-hidden shadow-lg animate-tilt-in"
                            style={{ animationDelay: `${index * 150}ms`, transformStyle: 'preserve-3d' }}
                        >
                            <img src={sponsor.imageUrl} alt={sponsor.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"/>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent transition-all duration-300 group-hover:from-black/90"></div>
                             <div 
                                className="absolute inset-0 bg-gradient-to-br from-gold via-deep-red to-navy opacity-0 group-hover:opacity-30 transition-opacity duration-500 animate-gradient-shift"
                                style={{ backgroundSize: '200% 200%' }}
                            ></div>
                            <div className="relative p-6 flex flex-col justify-between h-48 text-white transition-transform duration-300" style={{ transform: 'translateZ(20px)' }}>
                                <img src={sponsor.logoUrl} alt={`${sponsor.name} logo`} className="h-8 w-auto self-start filter brightness-0 invert opacity-80" />
                                <div>
                                    <h4 className="font-bold text-lg">{sponsor.name}</h4>
                                    <p className="text-sm opacity-80">{sponsor.tagline}</p>
                                </div>
                            </div>
                             <div className="absolute inset-0 border-2 border-transparent rounded-lg group-hover:border-gold transition-all duration-300 opacity-0 group-hover:opacity-100" style={{ boxShadow: '0 0 15px rgba(217, 119, 6, 0.5)' }}></div>
                        </a>
                    ))}
                </div>
            </div>
             <style>{`
                .group {
                    transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                }
                @media (min-width: 768px) {
                    .group:hover {
                        transform: rotateX(5deg) rotateY(-5deg) scale(1.05) translateZ(10px);
                        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
                    }
                }
             `}</style>
        </div>
    );
};

export default SponsoredBanners;