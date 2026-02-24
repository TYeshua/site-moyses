import React, { useState } from 'react';
import { API_BASE_URL } from '../config/api';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, User, Mail, Lock, Atom } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function Register() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [isProfessor, setIsProfessor] = useState(false);
    const [secretKey, setSecretKey] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('As senhas não coincidem.');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    secretKey: isProfessor ? secretKey : undefined
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Erro ao registrar');
            }

            // Login automático após registro
            login('dummy-token', data.user);
            navigate('/dashboard');

        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="glass-panel p-8 rounded-2xl w-full max-w-md text-center relative overflow-hidden">

                {/* Decorative Elements */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-neon-green/20 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-neon-blue/20 rounded-full blur-2xl"></div>

                <div className="flex justify-center mb-6 relative z-10">
                    <div className="bg-space-800 p-4 rounded-full border border-neon-green/30 shadow-[0_0_15px_rgba(0,255,148,0.3)]">
                        <Atom size={48} className="text-neon-green animate-spin-slow" />
                    </div>
                </div>

                <h1 className="text-3xl font-display font-bold text-white mb-2 tracking-wide neon-text">Criar Conta</h1>
                <p className="text-gray-400 mb-8 font-light">Inicie sua missão educacional</p>

                {error && (
                    <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg relative mb-6 backdrop-blur-sm" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 text-left relative z-10">
                    <div>
                        <label className="block text-xs font-semibold text-neon-blue uppercase tracking-wider mb-2 ml-1">Nome Completo</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-neon-blue transition-colors">
                                <User size={20} />
                            </div>
                            <input
                                type="text"
                                required
                                className="w-full pl-10 pr-3 py-3 bg-space-900/50 border border-space-700 text-white rounded-xl focus:ring-2 focus:ring-neon-blue focus:border-transparent focus:outline-none placeholder-gray-600 transition-all"
                                placeholder="Seu Nome"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-neon-blue uppercase tracking-wider mb-2 ml-1">Email</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-neon-blue transition-colors">
                                <Mail size={20} />
                            </div>
                            <input
                                type="email"
                                required
                                className="w-full pl-10 pr-3 py-3 bg-space-900/50 border border-space-700 text-white rounded-xl focus:ring-2 focus:ring-neon-blue focus:border-transparent focus:outline-none placeholder-gray-600 transition-all"
                                placeholder="seu@email.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-neon-purple uppercase tracking-wider mb-2 ml-1">Senha</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-neon-purple transition-colors">
                                <Lock size={20} />
                            </div>
                            <input
                                type="password"
                                required
                                className="w-full pl-10 pr-3 py-3 bg-space-900/50 border border-space-700 text-white rounded-xl focus:ring-2 focus:ring-neon-purple focus:border-transparent focus:outline-none placeholder-gray-600 transition-all"
                                placeholder="********"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-neon-purple uppercase tracking-wider mb-2 ml-1">Confirmar Senha</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-neon-purple transition-colors">
                                <Lock size={20} />
                            </div>
                            <input
                                type="password"
                                required
                                className="w-full pl-10 pr-3 py-3 bg-space-900/50 border border-space-700 text-white rounded-xl focus:ring-2 focus:ring-neon-purple focus:border-transparent focus:outline-none placeholder-gray-600 transition-all"
                                placeholder="********"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="pt-2">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={isProfessor}
                                    onChange={(e) => setIsProfessor(e.target.checked)}
                                />
                                <div className="w-10 h-6 bg-space-700 rounded-full peer-checked:bg-neon-pink transition-colors"></div>
                                <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4"></div>
                            </div>
                            <span className="text-sm text-gray-300 group-hover:text-white transition-colors select-none">Sou Professor</span>
                        </label>
                    </div>

                    {isProfessor && (
                        <div className="animate-fade-in-down">
                            <label className="block text-xs font-semibold text-neon-pink uppercase tracking-wider mb-2 ml-1">Código de Acesso</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-neon-pink transition-colors">
                                    <Lock size={20} />
                                </div>
                                <input
                                    type="text"
                                    className="w-full pl-10 pr-3 py-3 bg-space-900/50 border border-neon-pink/30 text-white rounded-xl focus:ring-2 focus:ring-neon-pink focus:border-transparent focus:outline-none placeholder-gray-600 transition-all"
                                    placeholder="Código secreto da instituição"
                                    value={secretKey}
                                    onChange={(e) => setSecretKey(e.target.value)}
                                />
                            </div>
                            <p className="text-xs text-neon-pink/70 mt-1 ml-1">* Necessário para contas de professor</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-neon-green to-neon-blue text-space-900 font-bold py-3.5 rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,148,0.4)] hover:scale-[1.02] active:scale-[0.98] mt-6 flex items-center justify-center gap-2 uppercase tracking-wider"
                    >
                        <UserPlus size={20} />
                        Confirmar Cadastro
                    </button>
                </form>

                <div className="mt-8 text-sm text-gray-400">
                    Já tem uma conta?{' '}
                    <Link to="/" className="text-neon-green hover:text-neon-blue transition-colors font-medium border-b border-transparent hover:border-neon-blue">
                        Acessar Sistema
                    </Link>
                </div>
            </div>
        </div>
    );
}
