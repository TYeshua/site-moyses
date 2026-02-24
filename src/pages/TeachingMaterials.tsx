import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/api';
import { BookOpen, Download, FileText, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Material {
    id: number;
    title: string;
    type: string;
    size: string;
    path: string;
}

export function TeachingMaterials() {
    const navigate = useNavigate();
    const [materials, setMaterials] = useState<Material[]>([]);

    // Fetch materials on load
    useEffect(() => {
        fetchMaterials();
    }, []);

    const fetchMaterials = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/materials`);
            const data = await res.json();
            setMaterials(data);
        } catch (err) {
            console.error("Erro ao buscar materiais:", err);
        }
    };

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-5xl mx-auto">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center gap-2 text-gray-400 hover:text-neon-blue mb-6 transition-colors group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Voltar ao Dashboard
                </button>

                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-space-800 border border-neon-green/30 rounded-lg text-neon-green shadow-[0_0_15px_rgba(0,255,148,0.2)]">
                            <BookOpen size={32} />
                        </div>
                        <h1 className="text-3xl font-display font-bold text-white neon-text">Materiais Didáticos</h1>
                    </div>
                </div>

                <div className="glass-panel rounded-xl overflow-hidden min-h-[300px]">
                    {materials.length === 0 ? (
                        <div className="p-12 text-center text-gray-400 flex flex-col items-center">
                            <FileText size={48} className="mb-4 text-space-600" />
                            <p>Nenhum material encontrado.</p>
                            <p className="text-sm mt-2">Os materiais adicionados pelo professor aparecerão aqui.</p>
                        </div>
                    ) : (
                        materials.map((item, idx) => (
                            <div key={item.id} className={`p-6 flex items-center justify-between hover:bg-white/5 transition-colors ${idx !== materials.length - 1 ? 'border-b border-white/10' : ''}`}>
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-space-800 rounded-lg text-neon-blue">
                                        <FileText size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-200">{item.title}</h3>
                                        <p className="text-sm text-gray-400 font-mono">{item.type} • {item.size}</p>
                                    </div>
                                </div>
                                <a
                                    href={item.path.startsWith('http') ? item.path : `${API_BASE_URL}${item.path}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-neon-green font-medium hover:text-white hover:bg-neon-green/20 border border-transparent hover:border-neon-green/50 px-4 py-2 rounded-lg transition-all"
                                >
                                    <Download size={18} />
                                    {item.type === 'LINK' ? 'Acessar Link' : 'Download'}
                                </a>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
