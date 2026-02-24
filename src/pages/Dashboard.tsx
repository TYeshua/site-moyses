import {
    Video, BookOpen, FileText, Gamepad2, Atom,
    LogOut, Home, Volume2, ClipboardCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function Dashboard() {
    const navigate = useNavigate();
    const { user } = useAuth();


    const resources = [
        {
            title: "Aulas Gravadas",
            icon: <Video size={32} className="text-sky-400" />,
            desc: "Acesse e adicione videoaulas sobre diversos temas de TIC aplicadas à educação.",
            bgIcon: "bg-sky-100",
            path: "/lessons"
        },
        {
            title: "Materiais Didáticos",
            icon: <BookOpen size={32} className="text-sky-400" />,
            desc: "Explore apostilas, guias e recursos educacionais desenvolvidos por educadores.",
            bgIcon: "bg-sky-100",
            path: "/materials"
        },
        {
            title: "Artigos Científicos",
            icon: <FileText size={32} className="text-sky-400" />,
            desc: "Leia pesquisas e publicações acadêmicas sobre tecnologia na educação.",
            bgIcon: "bg-sky-100",
            path: "/articles"
        },
        {
            title: "Jogos Pedagógicos",
            icon: <Gamepad2 size={32} className="text-sky-400" />,
            desc: "Descubra jogos educacionais interativos para tornar o aprendizado mais divertido.",
            bgIcon: "bg-sky-100",
            path: "/games"
        },
        {
            title: "Simulações de Física",
            icon: <Atom size={32} className="text-sky-400" />,
            desc: "Experimente fenômenos físicos através de simulações interativas em tempo real.",
            bgIcon: "bg-sky-100",
            path: "/simulations"
        },
        {
            title: "Avaliações",
            icon: <ClipboardCheck size={32} className="text-sky-400" />,
            desc: "Acesse provas, testes e atividades avaliativas atribuídas pelo professor.",
            bgIcon: "bg-sky-100",
            path: "/evaluations"
        }
    ];

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="relative border-b border-white/10 z-50 transition-all duration-500 hover:border-neon-blue/50 group/header">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <img
                        src="/src/assets/header_bg.png"
                        alt="Physics Header"
                        className="w-full h-full object-cover opacity-80 scale-105 group-hover/header:scale-100 transition-transform duration-[2s] ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-space-950 via-space-900/60 to-space-950"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-space-950/20 to-space-950"></div>
                </div>

                <div className="max-w-7xl mx-auto flex justify-between items-center py-10 px-8 relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="bg-gradient-to-br from-neon-blue to-neon-purple p-3 rounded-xl shadow-[0_0_25px_rgba(0,240,255,0.4)] border border-white/20 backdrop-blur-sm">
                            <Atom size={32} className="text-white animate-spin-slow" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-3xl font-display font-bold text-white tracking-widest leading-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                                TIC FÍSICA
                            </span>
                            <span className="text-[0.65rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple uppercase tracking-[0.2em] leading-tight mt-1">
                                Laboratório Virtual de Ensino
                            </span>
                            {user?.role === 'admin' && (
                                <span className="text-[0.6rem] font-bold text-neon-pink uppercase tracking-widest leading-none mt-1 bg-neon-pink/10 px-2 py-0.5 rounded-full w-fit border border-neon-pink/30">
                                    Modo Professor
                                </span>
                            )}
                        </div>
                    </div>

                    <nav className="hidden md:flex items-center gap-2 text-sm font-medium">
                        {user?.role === 'admin' && (
                            <button
                                onClick={() => navigate('/teacher-panel')}
                                className="mr-4 bg-neon-green/10 hover:bg-neon-green/20 border border-neon-green/50 text-neon-green px-5 py-2.5 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(0,255,148,0.15)] transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
                            >
                                <BookOpen size={18} /> Painel do Professor
                            </button>
                        )}
                        <div className="flex bg-space-900/50 backdrop-blur-md rounded-xl p-1.5 border border-white/5">
                            <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-all group">
                                <Home size={16} className="text-neon-blue group-hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] transition-all" /> Início
                            </button>
                            <button onClick={() => navigate('/about')} className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-all group">
                                <BookOpen size={16} className="text-neon-purple group-hover:drop-shadow-[0_0_8px_rgba(176,38,255,0.8)] transition-all" /> Sobre
                            </button>
                        </div>

                        <div className="h-8 w-px bg-white/10 mx-2"></div>

                        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-red-300 hover:text-white hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/50 px-4 py-2.5 rounded-xl transition-all group">
                            <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" /> Sair
                        </button>
                    </nav>
                </div>
            </header>

            <main className="flex-1 max-w-7xl mx-auto px-8 py-10 w-full relative">
                {/* Decorative Background Elements */}
                <div className="fixed top-20 left-10 w-64 h-64 bg-neon-blue/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
                <div className="fixed bottom-20 right-10 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: '1s' }}></div>

                {/* Welcome Section */}
                <section className="mb-12 text-center">
                    <h2 className="text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-neon-blue to-neon-purple mb-4">
                        Bem-vindo ao Laboratório Virtual
                    </h2>
                    <p className="text-gray-300 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                        Explore o universo da física através da tecnologia. Acesse simulações, materiais didáticos e jogos interativos desenvolvidos para expandir seu conhecimento.
                    </p>
                </section>

                {/* Resources Grid */}
                <section className="mb-12">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent flex-1"></div>
                        <h3 className="text-xl font-bold text-neon-blue uppercase tracking-widest">Painel de Controle</h3>
                        <div className="h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent flex-1"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {resources.map((res, idx) => (
                            <div
                                key={idx}
                                onClick={() => navigate(res.path)}
                                className="glass-panel p-6 rounded-xl hover-glow cursor-pointer group relative overflow-hidden"
                            >
                                <div className={`absolute top-0 right-0 p-20 bg-gradient-to-bl ${idx % 3 === 0 ? 'from-neon-blue/10' : idx % 3 === 1 ? 'from-neon-purple/10' : 'from-neon-green/10'
                                    } to-transparent rounded-bl-full -mr-10 -mt-10 transition-all group-hover:scale-110`}></div>

                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-space-800 border border-white/10 shadow-inner group-hover:border-${idx % 3 === 0 ? 'neon-blue' : idx % 3 === 1 ? 'neon-purple' : 'neon-green'
                                    }/50 transition-colors`}>
                                    {res.icon}
                                </div>
                                <h4 className="text-xl font-bold text-white mb-2 group-hover:text-neon-blue transition-colors">{res.title}</h4>
                                <p className="text-gray-400 text-sm leading-relaxed">{res.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Accessibility Section */}
                <section className="bg-surface-dark border border-neon-green/20 rounded-xl p-6 mb-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-neon-green"></div>
                    <h3 className="text-lg font-bold text-neon-green mb-4 flex items-center gap-2">
                        <Volume2 size={20} />
                        Sistemas de Acessibilidade Ativos
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ul className="space-y-2 text-gray-300 text-sm">
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-neon-green"></div> Navegação por teclado otimizada</li>
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-neon-green"></div> Compatibilidade com leitores de tela</li>
                        </ul>
                        <ul className="space-y-2 text-gray-300 text-sm">
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-neon-green"></div> Alto contraste e legibilidade</li>
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-neon-green"></div> Narração de áudio disponível</li>
                        </ul>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="py-6 text-center text-gray-600 text-sm relative z-10">
                <p>&copy; 2026 TIC Digital Educação. Desenvolvido para o ensino de Física.</p>
            </footer>
        </div>
    );
}

export default Dashboard;
