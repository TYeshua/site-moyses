import { useState } from 'react';
import { API_BASE_URL } from '../config/api';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Video, BookOpen, Upload, FileText, Gamepad2, Atom, ClipboardCheck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function TeacherPanel() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState<'videos' | 'materials' | 'articles' | 'games' | 'simulations' | 'evaluations'>('videos');

    // Video State
    const [videoUploadType, setVideoUploadType] = useState<'link' | 'file'>('link');
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [newLesson, setNewLesson] = useState({ title: '', duration: '', url: '' });

    // Material State
    const [materialUploadType, setMaterialUploadType] = useState<'file' | 'link'>('file');
    const [materialFile, setMaterialFile] = useState<File | null>(null);
    const [materialTitle, setMaterialTitle] = useState('');
    const [materialLinkUrl, setMaterialLinkUrl] = useState('');

    // Article State
    const [articleForm, setArticleForm] = useState({ title: '', author: '', abstract: '', url: '' });

    // Game State
    const [gameForm, setGameForm] = useState({ name: '', category: '', url: '' });

    // Simulation State
    const [simForm, setSimForm] = useState({ title: '', description: '', url: '' });

    // Evaluation State
    const [evalForm, setEvalForm] = useState({ title: '', description: '', url: '', deadline: '' });

    // Feedback State
    const [status, setStatus] = useState<{ type: 'success' | 'error' | '', message: string }>({ type: '', message: '' });
    const [uploading, setUploading] = useState(false);

    const resetFeedback = () => setStatus({ type: '', message: '' });

    const handleAddVideo = async (e: React.FormEvent) => {
        e.preventDefault();
        resetFeedback();
        setUploading(true);

        try {
            let res;
            if (videoUploadType === 'link') {
                res = await fetch(`${API_BASE_URL}/videos`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newLesson)
                });
            } else {
                if (!videoFile) throw new Error('Selecione um arquivo de vídeo.');
                const formData = new FormData();
                formData.append('file', videoFile);
                formData.append('title', newLesson.title);
                formData.append('duration', newLesson.duration);
                res = await fetch(`${API_BASE_URL}/upload-video`, { method: 'POST', body: formData });
            }

            if (res.ok) {
                setStatus({ type: 'success', message: 'Vídeo adicionado com sucesso!' });
                setNewLesson({ title: '', duration: '', url: '' });
                setVideoFile(null);
            } else throw new Error();
        } catch (error: any) {
            setStatus({ type: 'error', message: error.message || 'Erro ao adicionar vídeo.' });
        } finally { setUploading(false); }
    };

    const handleUploadMaterial = async (e: React.FormEvent) => {
        e.preventDefault();
        resetFeedback();
        setUploading(true);

        try {
            let res;
            if (materialUploadType === 'file') {
                if (!materialFile) throw new Error('Selecione um arquivo.');
                const formData = new FormData();
                formData.append('file', materialFile);
                formData.append('title', materialTitle);
                res = await fetch(`${API_BASE_URL}/upload`, { method: 'POST', body: formData });
            } else {
                if (!materialLinkUrl) throw new Error('Insira a URL.');
                res = await fetch(`${API_BASE_URL}/materials-link`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title: materialTitle, url: materialLinkUrl })
                });
            }

            if (res.ok) {
                setStatus({ type: 'success', message: 'Material salvo com sucesso!' });
                setMaterialTitle('');
                setMaterialFile(null);
                setMaterialLinkUrl('');
            } else throw new Error();
        } catch (error: any) {
            setStatus({ type: 'error', message: error.message || 'Erro ao salvar material.' });
        } finally { setUploading(false); }
    };

    const handleAddArticle = async (e: React.FormEvent) => {
        e.preventDefault();
        resetFeedback();
        setUploading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/articles`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(articleForm)
            });
            if (res.ok) {
                setStatus({ type: 'success', message: 'Artigo adicionado!' });
                setArticleForm({ title: '', author: '', abstract: '', url: '' });
            } else throw new Error();
        } catch { setStatus({ type: 'error', message: 'Erro ao adicionar artigo.' }); }
        finally { setUploading(false); }
    };

    const handleAddGame = async (e: React.FormEvent) => {
        e.preventDefault();
        resetFeedback();
        setUploading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/games`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(gameForm)
            });
            if (res.ok) {
                setStatus({ type: 'success', message: 'Jogo adicionado!' });
                setGameForm({ name: '', category: '', url: '' });
            } else throw new Error();
        } catch { setStatus({ type: 'error', message: 'Erro ao adicionar jogo.' }); }
        finally { setUploading(false); }
    };

    const handleAddSimulation = async (e: React.FormEvent) => {
        e.preventDefault();
        resetFeedback();
        setUploading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/simulations`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(simForm)
            });
            if (res.ok) {
                setStatus({ type: 'success', message: 'Simulação adicionada!' });
                setSimForm({ title: '', description: '', url: '' });
            } else throw new Error();
        } catch { setStatus({ type: 'error', message: 'Erro ao adicionar simulação.' }); }
        finally { setUploading(false); }
    };

    const handleAddEvaluation = async (e: React.FormEvent) => {
        e.preventDefault();
        resetFeedback();
        setUploading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/evaluations`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(evalForm)
            });
            if (res.ok) {
                setStatus({ type: 'success', message: 'Avaliação publicada!' });
                setEvalForm({ title: '', description: '', url: '', deadline: '' });
            } else throw new Error();
        } catch { setStatus({ type: 'error', message: 'Erro ao publicar avaliação.' }); }
        finally { setUploading(false); }
    };

    if (user?.role !== 'admin') {
        return <div className="min-h-screen flex items-center justify-center text-white"><p>Acesso restrito.</p></div>;
    }

    const TabButton = ({ id, icon: Icon, label, color }: any) => (
        <button
            onClick={() => { setActiveTab(id); resetFeedback(); }}
            className={`px-4 py-3 font-bold rounded-t-lg transition-all flex items-center gap-2 border-t border-x ${activeTab === id ? `bg-space-800 text-${color} border-space-700` : 'border-transparent text-gray-500 hover:text-gray-300'}`}
        >
            <Icon size={18} /> <span className="hidden md:inline">{label}</span>
        </button>
    );

    return (
        <div className="min-h-screen p-8 bg-space-950">
            <div className="max-w-5xl mx-auto">
                <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-gray-400 hover:text-neon-blue mb-6 transition-colors group">
                    <ArrowLeft size={20} className="group-hover:-translate-x-1" /> Voltar ao Dashboard
                </button>

                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-space-800 border border-neon-pink/30 rounded-lg text-neon-pink shadow-glow">
                        <Upload size={32} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-display font-bold text-white neon-text">Área do Professor</h1>
                        <p className="text-gray-400">Gerencie todo o conteúdo do portal</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex overflow-x-auto gap-2 mb-0 border-b border-space-800 pb-0">
                    <TabButton id="videos" icon={Video} label="Vídeos" color="neon-blue" />
                    <TabButton id="materials" icon={BookOpen} label="Materiais" color="neon-green" />
                    <TabButton id="articles" icon={FileText} label="Artigos" color="neon-purple" />
                    <TabButton id="games" icon={Gamepad2} label="Jogos" color="neon-blue" />
                    <TabButton id="simulations" icon={Atom} label="Simulações" color="neon-pink" />
                    <TabButton id="evaluations" icon={ClipboardCheck} label="Avaliações" color="neon-green" />
                </div>

                <div className="glass-panel p-8 rounded-b-xl rounded-tr-xl border border-space-700 animate-fade-in-up min-h-[400px]">

                    {/* Feedback Message */}
                    {status.message && (
                        <div className={`p-4 rounded-lg mb-6 text-center ${status.type === 'success' ? 'bg-green-500/20 text-green-200' : 'bg-red-500/20 text-red-200'}`}>
                            {status.message}
                        </div>
                    )}

                    {/* VIDEOS */}
                    {activeTab === 'videos' && (
                        <div className="max-w-2xl mx-auto space-y-4">
                            <h2 className="text-xl font-bold text-white mb-4 flex gap-2"><Video className="text-neon-blue" /> Adicionar Aula</h2>
                            <div className="flex gap-4 mb-4 justify-center">
                                <button onClick={() => setVideoUploadType('link')} className={`px-4 py-2 rounded-lg font-bold ${videoUploadType === 'link' ? 'bg-neon-blue text-space-900' : 'bg-space-900 text-gray-400'}`}>Link YouTube</button>
                                <button onClick={() => setVideoUploadType('file')} className={`px-4 py-2 rounded-lg font-bold ${videoUploadType === 'file' ? 'bg-neon-blue text-space-900' : 'bg-space-900 text-gray-400'}`}>Upload Arquivo</button>
                            </div>
                            <form onSubmit={handleAddVideo} className="space-y-4">
                                <input type="text" placeholder="Título" required className="input-primary w-full" value={newLesson.title} onChange={e => setNewLesson({ ...newLesson, title: e.target.value })} />
                                <input type="text" placeholder="Duração (10:00)" className="input-primary w-full" value={newLesson.duration} onChange={e => setNewLesson({ ...newLesson, duration: e.target.value })} />
                                {videoUploadType === 'link' ?
                                    <input type="url" placeholder="URL YouTube Embed" className="input-primary w-full" value={newLesson.url} onChange={e => setNewLesson({ ...newLesson, url: e.target.value })} /> :
                                    <input type="file" accept="video/*" className="input-primary w-full" onChange={e => setVideoFile(e.target.files?.[0] || null)} />
                                }
                                <button type="submit" disabled={uploading} className="btn-primary w-full bg-neon-blue text-space-900">{uploading ? 'Enviando...' : 'Adicionar Vídeo'}</button>
                            </form>
                        </div>
                    )}

                    {/* MATERIAIS */}
                    {activeTab === 'materials' && (
                        <div className="max-w-2xl mx-auto space-y-4">
                            <h2 className="text-xl font-bold text-white mb-4 flex gap-2"><BookOpen className="text-neon-green" /> Adicionar Material</h2>
                            <div className="flex gap-4 mb-4 justify-center">
                                <button onClick={() => setMaterialUploadType('file')} className={`px-4 py-2 rounded-lg font-bold ${materialUploadType === 'file' ? 'bg-neon-green text-space-900' : 'bg-space-900 text-gray-400'}`}>Arquivo</button>
                                <button onClick={() => setMaterialUploadType('link')} className={`px-4 py-2 rounded-lg font-bold ${materialUploadType === 'link' ? 'bg-neon-green text-space-900' : 'bg-space-900 text-gray-400'}`}>Link</button>
                            </div>
                            <form onSubmit={handleUploadMaterial} className="space-y-4">
                                <input type="text" placeholder="Título" required className="input-primary w-full focus:border-neon-green" value={materialTitle} onChange={e => setMaterialTitle(e.target.value)} />
                                {materialUploadType === 'file' ?
                                    <input type="file" required className="input-primary w-full focus:border-neon-green" onChange={e => setMaterialFile(e.target.files?.[0] || null)} /> :
                                    <input type="url" placeholder="URL" required className="input-primary w-full focus:border-neon-green" value={materialLinkUrl} onChange={e => setMaterialLinkUrl(e.target.value)} />
                                }
                                <button type="submit" disabled={uploading} className="btn-primary w-full bg-neon-green text-space-900">{uploading ? 'Salvando...' : 'Salvar Material'}</button>
                            </form>
                        </div>
                    )}

                    {/* ARTIGOS */}
                    {activeTab === 'articles' && (
                        <div className="max-w-2xl mx-auto space-y-4">
                            <h2 className="text-xl font-bold text-white mb-4 flex gap-2"><FileText className="text-neon-purple" /> Adicionar Artigo</h2>
                            <form onSubmit={handleAddArticle} className="space-y-4">
                                <input type="text" placeholder="Título do Artigo" required className="input-primary w-full focus:border-neon-purple" value={articleForm.title} onChange={e => setArticleForm({ ...articleForm, title: e.target.value })} />
                                <input type="text" placeholder="Autor" required className="input-primary w-full focus:border-neon-purple" value={articleForm.author} onChange={e => setArticleForm({ ...articleForm, author: e.target.value })} />
                                <textarea placeholder="Resumo / Abstract" className="input-primary w-full h-24 focus:border-neon-purple" value={articleForm.abstract} onChange={e => setArticleForm({ ...articleForm, abstract: e.target.value })} />
                                <input type="url" placeholder="Link Completo (PDF/Site)" required className="input-primary w-full focus:border-neon-purple" value={articleForm.url} onChange={e => setArticleForm({ ...articleForm, url: e.target.value })} />
                                <button type="submit" disabled={uploading} className="btn-primary w-full bg-neon-purple text-white">{uploading ? 'Salvando...' : 'Adicionar Artigo'}</button>
                            </form>
                        </div>
                    )}

                    {/* JOGOS */}
                    {activeTab === 'games' && (
                        <div className="max-w-2xl mx-auto space-y-4">
                            <h2 className="text-xl font-bold text-white mb-4 flex gap-2"><Gamepad2 className="text-neon-blue" /> Adicionar Jogo</h2>
                            <form onSubmit={handleAddGame} className="space-y-4">
                                <input type="text" placeholder="Nome do Jogo" required className="input-primary w-full" value={gameForm.name} onChange={e => setGameForm({ ...gameForm, name: e.target.value })} />
                                <select className="input-primary w-full bg-space-900 text-gray-300" value={gameForm.category} onChange={e => setGameForm({ ...gameForm, category: e.target.value })}>
                                    <option value="">Selecione a Categoria</option>
                                    <option value="Cinemática">Cinemática</option>
                                    <option value="Dinâmica">Dinâmica</option>
                                    <option value="Energia">Energia</option>
                                    <option value="Astronáutica">Astronáutica</option>
                                </select>
                                <input type="url" placeholder="URL do Jogo" required className="input-primary w-full" value={gameForm.url} onChange={e => setGameForm({ ...gameForm, url: e.target.value })} />
                                <button type="submit" disabled={uploading} className="btn-primary w-full bg-neon-blue text-space-900">{uploading ? 'Salvando...' : 'Adicionar Jogo'}</button>
                            </form>
                        </div>
                    )}

                    {/* SIMULAÇÕES */}
                    {activeTab === 'simulations' && (
                        <div className="max-w-2xl mx-auto space-y-4">
                            <h2 className="text-xl font-bold text-white mb-4 flex gap-2"><Atom className="text-neon-pink" /> Adicionar Simulação</h2>
                            <div className="bg-blue-900/20 p-4 rounded-lg text-sm text-blue-200 mb-4">
                                Recomendação: Use links "Embed" do <strong>PhET Simulations</strong> ou similares.
                            </div>
                            <form onSubmit={handleAddSimulation} className="space-y-4">
                                <input type="text" placeholder="Título da Simulação" required className="input-primary w-full focus:border-neon-pink" value={simForm.title} onChange={e => setSimForm({ ...simForm, title: e.target.value })} />
                                <input type="text" placeholder="Descrição Curta" className="input-primary w-full focus:border-neon-pink" value={simForm.description} onChange={e => setSimForm({ ...simForm, description: e.target.value })} />
                                <input type="url" placeholder="URL Embed" required className="input-primary w-full focus:border-neon-pink" value={simForm.url} onChange={e => setSimForm({ ...simForm, url: e.target.value })} />
                                <button type="submit" disabled={uploading} className="btn-primary w-full bg-neon-pink text-white">{uploading ? 'Salvando...' : 'Adicionar Simulação'}</button>
                            </form>
                        </div>
                    )}

                    {/* AVALIAÇÕES */}
                    {activeTab === 'evaluations' && (
                        <div className="max-w-2xl mx-auto space-y-4">
                            <h2 className="text-xl font-bold text-white mb-4 flex gap-2"><ClipboardCheck className="text-neon-green" /> Nova Avaliação</h2>
                            <form onSubmit={handleAddEvaluation} className="space-y-4">
                                <input type="text" placeholder="Título da Avaliação" required className="input-primary w-full focus:border-neon-green" value={evalForm.title} onChange={e => setEvalForm({ ...evalForm, title: e.target.value })} />
                                <textarea placeholder="Instruções / Descrição" className="input-primary w-full h-24 focus:border-neon-green" value={evalForm.description} onChange={e => setEvalForm({ ...evalForm, description: e.target.value })} />
                                <input type="url" placeholder="Link do Formulário (Google Forms, etc)" required className="input-primary w-full focus:border-neon-green" value={evalForm.url} onChange={e => setEvalForm({ ...evalForm, url: e.target.value })} />
                                <input type="text" placeholder="Prazo (Ex: 20/02/2026)" className="input-primary w-full focus:border-neon-green" value={evalForm.deadline} onChange={e => setEvalForm({ ...evalForm, deadline: e.target.value })} />
                                <button type="submit" disabled={uploading} className="btn-primary w-full bg-neon-green text-space-900">{uploading ? 'Publicando...' : 'Publicar Avaliação'}</button>
                            </form>
                        </div>
                    )}

                </div>
            </div>
            {/* CSS Helper for inputs to avoid repetition in JSX */}
            <style>{`
                .input-primary { @apply bg-space-900/50 border border-space-700 text-white rounded-lg px-4 py-3 outline-none transition-all; }
                .input-primary:focus { @apply border-neon-blue ring-1 ring-neon-blue/20; }
                .btn-primary { @apply font-bold py-3 rounded-lg hover:shadow-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed; }
            `}</style>
        </div>
    );
}
