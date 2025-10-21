import React, { useState, useRef, useEffect } from 'react';
import type { Article } from '../types';

interface InteractiveGlobeProps {
  articles: Article[];
  onArticleClick: (article: Article) => void;
}

const InteractiveGlobe: React.FC<InteractiveGlobeProps> = ({ articles, onArticleClick }) => {
    const globeRef = useRef<HTMLDivElement>(null);
    const [rotation, setRotation] = useState({ x: -20, y: 45 });
    const [isDragging, setIsDragging] = useState(false);
    const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
    const [hoveredArticle, setHoveredArticle] = useState<Article | null>(null);

    useEffect(() => {
        let animationFrameId: number;
        const autoRotate = () => {
            if (!isDragging) {
                setRotation(prev => ({ ...prev, y: prev.y + 0.05 }));
            }
            animationFrameId = requestAnimationFrame(autoRotate);
        };
        animationFrameId = requestAnimationFrame(autoRotate);
        return () => cancelAnimationFrame(animationFrameId);
    }, [isDragging]);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setLastMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        const dx = e.clientX - lastMousePos.x;
        const dy = e.clientY - lastMousePos.y;
        setRotation(prev => ({
            x: Math.max(-90, Math.min(90, prev.x - dy * 0.5)),
            y: prev.y + dx * 0.5
        }));
        setLastMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => setIsDragging(false);

    const latLonToPoint = (lat: number, lon: number) => {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lon + 180) * (Math.PI / 180);
        const x = -(1 * Math.sin(phi) * Math.cos(theta));
        const y = -(1 * Math.cos(phi));
        const z = (1 * Math.sin(phi) * Math.sin(theta));
        return { x, y, z };
    };

    const globeStyle = {
        transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
    };
    
    return (
        <section className="my-12 -mx-4 sm:-mx-6 lg:-mx-8 py-16 bg-navy overflow-hidden">
             <style>{`
                .globe-container { perspective: 1000px; }
                .globe { transform-style: preserve-3d; transition: transform 0.1s linear; }
                .globe-ping { transform: translate(-50%, -50%); }
            `}</style>
            <h2 className="text-3xl font-extrabold mb-8 text-center text-white">
                Global News Explorer
            </h2>
            <div 
                className="globe-container w-full h-[500px] flex items-center justify-center cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <div ref={globeRef} className="relative w-[300px] h-[300px] rounded-full globe" style={globeStyle}>
                    <div className="absolute inset-0 bg-cover bg-center rounded-full" style={{ backgroundImage: "url(https://i.imgur.com/6X0t9n2.jpeg)" }}></div>
                    <div className="absolute inset-0 bg-blue-900/50 rounded-full"></div>
                    <div className="absolute inset-0 rounded-full" style={{boxShadow: 'inset 0 0 50px rgba(0,0,0,0.7), 0 0 50px rgba(74, 144, 226, 0.3)'}}></div>

                    {articles.filter(a => a.coordinates).map(article => {
                        const { x, y, z } = latLonToPoint(article.coordinates!.lat, article.coordinates!.lon);
                        const radius = 150; // half of width/height
                        return (
                            <div 
                                key={article.id} 
                                className="absolute top-1/2 left-1/2" 
                                style={{ transform: `translateX(${x * radius}px) translateY(${y * radius}px) translateZ(${z * radius}px)` }}
                                onMouseEnter={() => setHoveredArticle(article)}
                                onMouseLeave={() => setHoveredArticle(null)}
                                onClick={() => onArticleClick(article)}
                            >
                                <div className="absolute globe-ping w-4 h-4">
                                    <div className="relative w-full h-full">
                                      <div className="absolute -inset-1.5 bg-red-500/50 rounded-full animate-map-ping"></div>
                                      <div className="absolute -inset-0.5 bg-red-500 rounded-full"></div>
                                    </div>
                                </div>
                                {hoveredArticle?.id === article.id && (
                                     <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 bg-slate-800 text-white text-xs font-bold rounded-md whitespace-nowrap z-10">
                                        {article.title}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default InteractiveGlobe;
