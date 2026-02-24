import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/api';
import { Video, Play, Clock, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


export function RecordedLessons() {
    const navigate = useNavigate();
    // const { user } = useAuth();
    const [lessons, setLessons] = useState<any[]>([]);

    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/videos`);
            const data = await res.json();
            setLessons(data);
        } catch (error) {
            console.error("Erro ao carregar vídeos:", error);
        }
    };

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-7xl mx-auto">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center gap-2 text-gray-400 hover:text-neon-blue mb-6 transition-colors group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Voltar ao Dashboard
                </button>

                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-space-800 border border-neon-blue/30 rounded-lg text-neon-blue shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                            <Video size={32} />
                        </div>
                        <h1 className="text-3xl font-display font-bold text-white neon-text">Aulas Gravadas</h1>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {lessons.map((lesson) => (
                        <div
                            key={lesson.id}
                            className="glass-panel rounded-xl overflow-hidden group cursor-pointer hover:border-neon-blue/50 transition-all hover:-translate-y-1"
                            onClick={() => window.open(lesson.url, '_blank')}
                        >
                            <div className={`h-48 ${lesson.thumb || 'bg-space-800'} relative flex items-center justify-center bg-cover bg-center`}>
                                <div className="absolute inset-0 bg-space-900/50"></div>
                                <div className="glass-panel p-4 rounded-full opacity-80 group-hover:opacity-100 transition-opacity transform scale-90 group-hover:scale-100 z-10 shadow-lg">
                                    <Play fill="currentColor" className="text-neon-blue" size={32} />
                                </div>
                                <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1 z-10 border border-white/10">
                                    <Clock size={12} className="text-neon-blue" /> {lesson.duration}
                                </span>
                                {lesson.type === 'file' && (
                                    <span className="absolute top-2 left-2 bg-neon-purple/80 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                                        Upload
                                    </span>
                                )}
                            </div>
                            <div className="p-5">
                                <h3 className="font-bold text-lg text-white mb-2 group-hover:text-neon-blue transition-colors line-clamp-1">{lesson.title}</h3>
                                <p className="text-gray-400 text-sm">Aprenda os conceitos fundamentais sobre {lesson.title.toLowerCase()}.</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
