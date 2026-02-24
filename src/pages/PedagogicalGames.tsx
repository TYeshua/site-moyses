import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config/api';
import { Gamepad2, ArrowLeft, PlayCircle, Star, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Game {
    id: number;
    name: string;
    category: string;
    rating: number;
    url: string;
    color: string;
}

export function PedagogicalGames() {
    const navigate = useNavigate();
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_BASE_URL}/games`)
            .then(res => res.json())
            .then(data => {
                setGames(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Erro ao buscar jogos:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-7xl mx-auto">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center gap-2 text-gray-400 hover:text-neon-blue mb-6 transition-colors group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Voltar ao Dashboard
                </button>

                <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-space-800 border border-neon-blue/30 rounded-lg text-neon-blue shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                        <Gamepad2 size={32} />
                    </div>
                    <h1 className="text-3xl font-display font-bold text-white neon-text">Jogos Pedagógicos</h1>
                </div>

                {loading ? (
                    <div className="text-center text-gray-400 py-12">Carregando arcade...</div>
                ) : games.length === 0 ? (
                    <div className="text-center text-gray-500 py-12 glass-panel rounded-xl">
                        <Search size={48} className="mx-auto mb-4 opacity-50" />
                        <p>Nenhum jogo disponível no momento.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {games.map((game) => (
                            <div key={game.id} className="glass-panel rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 group">
                                <div className={`h-40 ${game.color || 'bg-space-700'} bg-opacity-20 flex items-center justify-center p-6 text-white relative`}>
                                    <div className="absolute inset-0 bg-space-900/40"></div>
                                    <Gamepad2 size={64} className="opacity-80 text-white relative z-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                                </div>
                                <div className="p-5 text-center">
                                    <h3 className="font-bold text-lg text-white mb-1 group-hover:text-neon-blue transition-colors">{game.name}</h3>
                                    <p className="text-sm text-gray-400 mb-3">{game.category}</p>

                                    <div className="flex justify-center items-center gap-1 text-yellow-400 text-sm mb-4">
                                        <Star size={14} fill="currentColor" /> {game.rating}
                                    </div>

                                    <a
                                        href={game.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full bg-space-800 hover:bg-neon-blue hover:text-space-900 border border-neon-blue/30 text-neon-blue font-bold py-2 rounded-lg transition-all flex items-center justify-center gap-2 shadow-[0_0_10px_rgba(0,240,255,0.1)] hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                                    >
                                        <PlayCircle size={18} /> Jogar
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

