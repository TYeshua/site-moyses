
import { useNavigate } from 'react-router-dom';
import {
    GraduationCap, Home, BookOpen, Share2, Gamepad2, Atom, Volume2, LogOut,
    Target, HeartHandshake, Sparkles, Users, Lightbulb, UserCheck,
    Upload
} from 'lucide-react';

export function About() {
    const navigate = useNavigate();

    // Dados para a seção "Nossos Objetivos" (Imagem 5)
    const objectives = [
        {
            icon: <Target className="w-6 h-6 text-sky-500" />,
            title: "Educação de Qualidade",
            desc: "Promover ensino de excelência através de recursos digitais modernos, materiais didáticos estruturados e conteúdo científico validado."
        },
        {
            icon: <HeartHandshake className="w-6 h-6 text-sky-500" />,
            title: "Acessibilidade Total",
            desc: "Garantir que todos os estudantes, incluindo pessoas com deficiência visual ou auditiva, possam acessar e aprender com nossos recursos educacionais."
        },
        {
            icon: <Sparkles className="w-6 h-6 text-sky-500" />,
            title: "Aprendizado Dinâmico",
            desc: "Tornar o aprendizado mais envolvente através de jogos pedagógicos, simulações interativas e recursos multimídia."
        },
        {
            icon: <Users className="w-6 h-6 text-sky-500" />,
            title: "Educação Integradora",
            desc: "Criar um ambiente inclusivo que valoriza a diversidade e promove a colaboração entre educadores e estudantes."
        },
        {
            icon: <Lightbulb className="w-6 h-6 text-sky-500" />,
            title: "Inovação Pedagógica",
            desc: "Utilizar metodologias modernas de ensino apoiadas por tecnologia para melhorar a retenção e compreensão dos conteúdos."
        },
        {
            icon: <UserCheck className="w-6 h-6 text-sky-500" />,
            title: "Empoderamento do Educador",
            desc: "Fornecer ferramentas poderosas para que educadores possam criar, compartilhar e gerenciar conteúdo educacional de alta qualidade."
        }
    ];

    // Dados para a seção "Como TICs Digital Ajuda" (Imagens 3 e 2)
    const features = [
        {
            id: 1,
            title: "Acessibilidade Completa para Todos",
            desc: "Nossa plataforma foi desenvolvida com acessibilidade total para pessoas com deficiência. Implementamos narração de áudio em português para pessoas cegas, navegação completa por teclado, compatibilidade com leitores de tela (NVDA, JAWS), labels ARIA descritivos e estrutura HTML semântica. Todos os recursos visuais têm alternativas acessíveis, garantindo que nenhum estudante seja deixado para trás."
        },
        {
            id: 2,
            title: "Conteúdo Educacional Organizado",
            desc: "Centralizamos aulas gravadas, materiais didáticos e artigos científicos em um único lugar. Educadores podem facilmente adicionar e organizar conteúdos, enquanto estudantes encontram tudo que precisam para seus estudos de forma intuitiva e estruturada."
        },
        {
            id: 3,
            title: "Gamificação do Aprendizado",
            desc: "Através de jogos pedagógicos cuidadosamente selecionados, transformamos o aprendizado em uma experiência divertida e engajadora. Os jogos cobrem diversas disciplinas e ajudam a desenvolver habilidades cognitivas enquanto mantêm os alunos motivados e interessados."
        },
        {
            id: 4,
            title: "Simulações Interativas de Física",
            desc: "Conceitos abstratos de física ganham vida através de simulações interativas que demonstram fenômenos como movimento pendular, lançamento de projéteis, propagação de ondas e queda livre. Estudantes podem ajustar parâmetros e observar os resultados em tempo real, facilitando a compreensão profunda dos princípios físicos."
        },
        {
            id: 5,
            title: "Interface Intuitiva e Responsiva",
            desc: "Com design moderno em tons de azul claro água e branco, nossa interface é limpa, profissional e fácil de usar. A plataforma funciona perfeitamente em computadores, tablets e smartphones, permitindo que o aprendizado aconteça em qualquer lugar e a qualquer momento."
        }
    ];

    return (
        <div className="min-h-screen bg-space-900 text-gray-100 flex flex-col font-sans selection:bg-neon-pink selection:text-white">
            {/* Header (Reutilizado para consistência) */}
            <header className="bg-surface-dark backdrop-blur-md border-b border-white/10 py-4 px-4 md:px-8 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div
                        className="flex items-center gap-2 text-xl md:text-2xl font-bold cursor-pointer group"
                        onClick={() => navigate('/dashboard')}
                    >
                        <div className="bg-gradient-to-br from-neon-blue to-neon-purple p-2 rounded-lg shadow-[0_0_15px_rgba(0,240,255,0.3)] group-hover:shadow-[0_0_25px_rgba(0,240,255,0.5)] transition-all">
                            <Atom size={24} className="text-white animate-spin-slow" />
                        </div>
                        <span className="font-display tracking-wide neon-text">TIC FÍSICA</span>
                    </div>

                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
                        <button onClick={() => navigate('/dashboard')} className="flex items-center gap-1 hover:text-neon-blue transition-colors"><Home size={18} /> Início</button>
                        <button className="flex items-center gap-1 text-neon-blue font-bold border-b-2 border-neon-blue pb-0.5"><BookOpen size={18} /> Sobre</button>
                        <button className="flex items-center gap-1 hover:text-neon-blue transition-colors"><Share2 size={18} /> Conteúdos</button>
                        <button className="flex items-center gap-1 hover:text-neon-blue transition-colors"><Gamepad2 size={18} /> Jogos</button>
                        <button className="flex items-center gap-1 hover:text-neon-blue transition-colors"><Atom size={18} /> Simulações</button>
                        <button className="flex items-center gap-1 hover:text-neon-blue transition-colors"><Volume2 size={18} /> Áudio</button>
                        <button onClick={() => navigate('/')} className="flex items-center gap-1 hover:text-neon-pink ml-4 border border-white/20 hover:border-neon-pink px-3 py-1 rounded transition-all">
                            <LogOut size={18} /> Sair
                        </button>
                    </nav>
                </div>
            </header>

            <main className="flex-1 max-w-6xl mx-auto px-4 md:px-8 py-12 w-full relative">
                {/* Decorative Elements */}
                <div className="fixed top-32 left-10 w-64 h-64 bg-neon-blue/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
                <div className="fixed bottom-32 right-10 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: '1s' }}></div>

                {/* Seção Hero - Imagem 1 */}
                <section className="text-center mb-16 relative">
                    <div className="flex justify-center mb-6">
                        <div className="bg-space-800 p-8 rounded-full border border-neon-blue/50 shadow-[0_0_30px_rgba(0,240,255,0.3)] relative group">
                            <div className="absolute inset-0 bg-neon-blue/20 rounded-full blur-xl group-hover:bg-neon-blue/30 transition-all"></div>
                            <GraduationCap size={64} className="text-neon-blue relative z-10" />
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-white to-neon-purple mb-6 neon-text-subtle">
                        Sobre TIC FÍSICA
                    </h1>
                    <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
                        Uma plataforma revolucionária que integra Tecnologias de Informação e Comunicações Digitais
                        ao ensino de Física, promovendo acessibilidade total e educação de qualidade para todos.
                    </p>
                </section>

                {/* O que são TICs - Imagem 1 */}
                <section className="mb-16">
                    <div className="glass-panel p-8 rounded-2xl border-l-4 border-neon-blue relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Atom size={120} className="text-neon-blue" />
                        </div>
                        <h2 className="text-2xl font-bold text-neon-blue mb-4 relative z-10">O que são TICs Digitais?</h2>
                        <div className="text-gray-300 space-y-4 leading-relaxed relative z-10">
                            <p>
                                As <strong className="text-white">Tecnologias de Informação e Comunicações Digitais (TICs)</strong> são ferramentas tecnológicas
                                utilizadas para criar, processar, armazenar e compartilhar informação de forma digital. Na educação,
                                as TICs transformam a maneira como ensinamos e aprendemos.
                            </p>
                            <p>
                                Nossa plataforma integra essas tecnologias para criar um ambiente educacional moderno, acessível e eficiente,
                                onde educadores podem compartilhar conhecimento e estudantes podem aprender de forma dinâmica e interativa.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Nossos Objetivos - Imagem 5 */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold text-white mb-8 text-center flex items-center justify-center gap-2">
                        <Target className="text-neon-pink" /> Nossos Objetivos
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {objectives.map((obj, index) => (
                            <div key={index} className="glass-panel p-8 rounded-xl hover:border-neon-blue/50 transition-all hover:-translate-y-1 group">
                                <div className="w-12 h-12 bg-space-800 rounded-lg flex items-center justify-center mb-4 border border-white/10 group-hover:border-neon-blue/50 group-hover:shadow-[0_0_10px_rgba(0,240,255,0.2)] transition-all">
                                    {/* Clone element to change color on hover? Or just style parent */}
                                    <div className="text-neon-blue group-hover:text-white transition-colors">
                                        {obj.icon}
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-neon-blue transition-colors">{obj.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{obj.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Como TICs Ajuda - Imagens 2 e 3 */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold text-white mb-8 text-center">Como TICs Digital Ajuda na Educação</h2>
                    <div className="space-y-6">
                        {features.map((item) => (
                            <div key={item.id} className="glass-panel p-6 rounded-xl flex flex-col md:flex-row gap-6 items-start hover:bg-white/5 transition-colors">
                                <div className="flex-shrink-0 bg-space-800 text-neon-green font-bold font-display text-xl w-12 h-12 rounded-lg flex items-center justify-center border border-neon-green/30 shadow-[0_0_10px_rgba(0,255,148,0.2)]">
                                    {item.id}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-neon-green mb-2">{item.title}</h3>
                                    <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Nosso Compromisso e CTA - Imagem 4 */}
                <section className="relative overflow-hidden rounded-2xl p-8 md:p-12 text-center border border-neon-purple/50 shadow-[0_0_30px_rgba(176,38,255,0.1)]">
                    <div className="absolute inset-0 bg-gradient-to-br from-space-800 to-space-900 z-0"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-neon-purple/20 to-transparent opacity-50 z-0"></div>

                    <div className="relative z-10">
                        <h2 className="text-3xl font-display font-bold text-white mb-6">Nosso Compromisso com a Educação</h2>
                        <div className="max-w-4xl mx-auto space-y-6 text-gray-300 leading-relaxed mb-10">
                            <p>
                                TIC FÍSICA não é apenas uma plataforma tecnológica – é um <strong className="text-neon-blue">compromisso com a democratização do conhecimento</strong>.
                                Acreditamos que educação de qualidade é um direito de todos, e a tecnologia é a ponte que torna isso possível.
                            </p>
                            <p>
                                Ao combinar <strong className="text-neon-green">acessibilidade total</strong>, <strong className="text-neon-pink">recursos dinâmicos</strong> e <strong className="text-neon-purple">metodologias inovadoras</strong>,
                                estamos construindo o futuro da educação – um futuro onde cada estudante, independente de suas capacidades ou limitações,
                                pode alcançar seu pleno potencial.
                            </p>
                        </div>

                        <p className="text-gray-400 mb-8 font-mono text-sm">Explore nossa plataforma e descubra como as TICs podem transformar sua experiência educacional</p>

                        <div className="flex flex-col md:flex-row justify-center gap-4">
                            <button className="flex items-center justify-center gap-2 bg-space-800 hover:bg-neon-blue hover:text-space-900 border border-neon-blue/50 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                                <Upload size={20} /> Adicionar Conteúdos
                            </button>
                            <button className="flex items-center justify-center gap-2 bg-space-800 hover:bg-neon-green hover:text-space-900 border border-neon-green/50 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-[0_0_20px_rgba(0,255,148,0.4)]">
                                <Gamepad2 size={20} /> Explorar Jogos
                            </button>
                            <button className="flex items-center justify-center gap-2 bg-space-800 hover:bg-neon-purple hover:text-space-900 border border-neon-purple/50 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-[0_0_20px_rgba(176,38,255,0.4)]">
                                <Atom size={20} /> Ver Simulações
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer simples */}
            <footer className="bg-space-950 py-6 text-center text-gray-500 text-sm border-t border-white/5 relative z-10">
                <p>&copy; 2026 TIC Digital Educação - Campus Salinópolis</p>
                <p className="text-xs mt-1 text-gray-600">Desenvolvido com <span className="text-neon-pink">❤</span> para o ensino de Física</p>
            </footer>
        </div>
    );
}
