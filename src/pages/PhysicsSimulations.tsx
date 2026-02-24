import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config/api';
import { Atom, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Simulation {
    id: number;
    title: string;
    description: string;
    url: string;
}

export function PhysicsSimulations() {
    const navigate = useNavigate();
    const [simulations, setSimulations] = useState<Simulation[]>([]);
    const [activeSim, setActiveSim] = useState<Simulation | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_BASE_URL}/simulations`)
            .then(res => res.json())
            .then(data => {
                setSimulations(data);
                if (data.length > 0) setActiveSim(data[0]);
                setLoading(false);
            })
            .catch(err => {
                console.error("Erro ao buscar simulações:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-7xl mx-auto h-full flex flex-col">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center gap-2 text-gray-400 hover:text-neon-blue mb-6 transition-colors group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Voltar ao Dashboard
                </button>

                <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-space-800 border border-neon-blue/30 rounded-lg text-neon-blue shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                        <Atom size={32} className="animate-spin-slow" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-display font-bold text-white neon-text">Simulações de Física</h1>
                        <p className="text-gray-400 text-sm">Laboratório Virtual Interativo</p>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 flex-1">
                    {/* List of Simulations (Sidebar) */}
                    <div className="w-full lg:w-64 glass-panel p-4 rounded-xl space-y-2 h-fit max-h-[500px] overflow-y-auto">
                        <h3 className="text-neon-purple font-bold mb-4 px-2 uppercase text-xs tracking-wider">Disponíveis</h3>
                        {simulations.length === 0 && <p className="text-gray-500 text-sm px-2">Nenhuma simulação.</p>}
                        {simulations.map(sim => (
                            <button
                                key={sim.id}
                                onClick={() => setActiveSim(sim)}
                                className={`w-full text-left px-4 py-3 rounded-lg transition-all text-sm font-medium ${activeSim?.id === sim.id ? 'bg-neon-blue text-space-900 shadow-[0_0_10px_rgba(0,240,255,0.3)]' : 'text-gray-300 hover:bg-white/5'}`}
                            >
                                {sim.title}
                            </button>
                        ))}
                    </div>

                    {/* Simulation Area */}
                    <div className="flex-1 bg-black/80 border border-white/10 rounded-2xl relative overflow-hidden flex items-center justify-center min-h-[500px] shadow-2xl">
                        {loading ? (
                            <div className="text-neon-blue animate-pulse">Carregando laboratório...</div>
                        ) : activeSim ? (
                            <iframe
                                src={activeSim.url}
                                title={activeSim.title}
                                className="w-full h-full border-0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <div className="text-center relative z-10 p-8">
                                <Atom size={80} className="text-gray-700 mx-auto mb-4" />
                                <p className="text-gray-500">Selecione uma simulação para começar</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

