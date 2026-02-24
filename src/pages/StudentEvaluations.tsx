import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config/api';
import { ClipboardCheck, ArrowLeft, ExternalLink, Calendar, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Evaluation {
    id: number;
    title: string;
    description: string;
    url: string;
    deadline: string;
}

export function StudentEvaluations() {
    const navigate = useNavigate();
    const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_BASE_URL}/evaluations`)
            .then(res => res.json())
            .then(data => {
                setEvaluations(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Erro ao buscar avaliações:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center gap-2 text-gray-400 hover:text-neon-blue mb-6 transition-colors group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Voltar ao Dashboard
                </button>

                <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-space-800 border border-neon-green/30 rounded-lg text-neon-green shadow-[0_0_15px_rgba(0,255,148,0.2)]">
                        <ClipboardCheck size={32} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-display font-bold text-white neon-text">Avaliações</h1>
                        <p className="text-gray-400 text-sm">Provas, Testes e Atividades Avaliativas</p>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center text-gray-400 py-12">Carregando avaliações...</div>
                ) : evaluations.length === 0 ? (
                    <div className="text-center text-gray-500 py-12 glass-panel rounded-xl">
                        <Search size={48} className="mx-auto mb-4 opacity-50" />
                        <p>Nenhuma avaliação disponível no momento.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {evaluations.map((evalItem) => (
                            <div key={evalItem.id} className="glass-panel p-8 rounded-xl hover:border-neon-green/50 transition-all hover:-translate-y-1 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <ClipboardCheck size={100} />
                                </div>

                                <h2 className="text-xl font-bold text-white mb-2 relative z-10">{evalItem.title}</h2>
                                {evalItem.deadline && (
                                    <div className="flex items-center gap-2 text-sm text-yellow-400 mb-4 font-mono relative z-10">
                                        <Calendar size={14} /> Prazo: {evalItem.deadline}
                                    </div>
                                )}

                                <p className="text-gray-300 leading-relaxed mb-6 relative z-10">
                                    {evalItem.description}
                                </p>

                                <a
                                    href={evalItem.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-neon-green/10 text-neon-green border border-neon-green/50 hover:bg-neon-green hover:text-space-900 font-bold py-2 px-6 rounded-lg transition-all relative z-10"
                                >
                                    Acessar Avaliação <ExternalLink size={18} />
                                </a>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
