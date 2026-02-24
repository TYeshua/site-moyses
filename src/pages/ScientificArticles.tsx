import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config/api';
import { FileText, ArrowLeft, ExternalLink, Calendar, User, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Article {
    id: number;
    title: string;
    author: string;
    date: string;
    abstract: string;
    url: string;
}

export function ScientificArticles() {
    const navigate = useNavigate();
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_BASE_URL}/articles`)
            .then(res => res.json())
            .then(data => {
                setArticles(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Erro ao buscar artigos:", err);
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
                    <div className="p-3 bg-space-800 border border-neon-purple/30 rounded-lg text-neon-purple shadow-[0_0_15px_rgba(176,38,255,0.2)]">
                        <FileText size={32} />
                    </div>
                    <h1 className="text-3xl font-display font-bold text-white neon-text">Artigos Científicos</h1>
                </div>

                {loading ? (
                    <div className="text-center text-gray-400 py-12">Carregando biblioteca...</div>
                ) : articles.length === 0 ? (
                    <div className="text-center text-gray-500 py-12 glass-panel rounded-xl">
                        <Search size={48} className="mx-auto mb-4 opacity-50" />
                        <p>Nenhum artigo disponível no momento.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {articles.map((article) => (
                            <div key={article.id} className="glass-panel p-8 rounded-xl hover:border-neon-purple/50 transition-all hover:-translate-y-1">
                                <h2 className="text-xl font-bold text-white mb-2">{article.title}</h2>
                                <div className="flex gap-4 text-sm text-gray-400 mb-4">
                                    <span className="flex items-center gap-1"><User size={14} className="text-neon-purple" /> {article.author}</span>
                                    <span className="flex items-center gap-1"><Calendar size={14} className="text-neon-purple" /> {article.date}</span>
                                </div>
                                <p className="text-gray-300 leading-relaxed mb-6">
                                    {article.abstract}
                                </p>
                                <a
                                    href={article.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-neon-blue font-medium hover:text-white flex items-center gap-2 group w-fit"
                                >
                                    Ler artigo completo <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

