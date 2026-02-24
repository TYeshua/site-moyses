import React, { useState } from 'react';
import { API_BASE_URL } from '../config/api';
import { useNavigate, Link } from 'react-router-dom';
import { Volume2, Eye, EyeOff, Lock, User, LogIn, Atom } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Erro ao fazer login');
            }

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
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-neon-purple/20 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-neon-blue/20 rounded-full blur-2xl"></div>

                {/* Logo Icon */}
                <div className="flex justify-center mb-6 relative z-10">
                    <div className="bg-space-800 p-4 rounded-full border border-neon-blue/30 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                        <Atom size={48} className="text-neon-blue animate-spin-slow" />
                    </div>
                </div>

                <h1 className="text-3xl font-display font-bold text-white mb-2 tracking-wide neon-text">TIC FÍSICA</h1>
                <p className="text-gray-400 mb-8 font-light">Explore o universo da física digital</p>

                {error && (
                    <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg relative mb-6 backdrop-blur-sm" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                {/* Botão de Áudio */}
                <div className="absolute top-4 right-4">
                    <button className="text-neon-blue/70 hover:text-neon-blue transition-colors p-2 rounded-full hover:bg-white/5">
                        <Volume2 size={20} />
                    </button>
                </div>

                {/* Formulário */}
                <form onSubmit={handleLogin} className="space-y-5 text-left relative z-10">
                    <div>
                        <label className="block text-xs font-semibold text-neon-blue uppercase tracking-wider mb-2 ml-1">Email</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-neon-blue transition-colors">
                                <User size={20} />
                            </div>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="aluno@escola.com"
                                className="w-full pl-10 pr-3 py-3 bg-space-900/50 border border-space-700 text-white rounded-xl focus:ring-2 focus:ring-neon-blue focus:border-transparent focus:outline-none placeholder-gray-600 transition-all"
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
                                type={showPassword ? "text" : "password"}
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                placeholder="........"
                                className="w-full pl-10 pr-10 py-3 bg-space-900/50 border border-space-700 text-white rounded-xl focus:ring-2 focus:ring-neon-purple focus:border-transparent focus:outline-none placeholder-gray-600 transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-white transition-colors"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-neon-blue to-neon-purple text-white font-bold py-3.5 rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(176,38,255,0.4)] hover:scale-[1.02] active:scale-[0.98] mt-4 flex items-center justify-center gap-2 uppercase tracking-wider"
                    >
                        <LogIn size={20} />
                        Iniciar Jornada
                    </button>
                </form>

                <div className="mt-8 text-sm text-gray-400">
                    Ainda não tem acesso?{' '}
                    <Link to="/register" className="text-neon-blue hover:text-neon-purple transition-colors font-medium border-b border-transparent hover:border-neon-purple">
                        Criar Cadastro
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
