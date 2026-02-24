const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const multer = require('multer');

const app = express();
const PORT = 3001;
const DB_FILE = path.join(__dirname, 'db.json');
const MATERIALS_FILE = path.join(__dirname, 'materials.json');
const UPLOADS_DIR = path.join(__dirname, 'uploads');

// Ensure uploads dir exists
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR);
}

// Multer Config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOADS_DIR)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});
const upload = multer({ storage: storage });

// Initialize materials.json if not exists
if (!fs.existsSync(MATERIALS_FILE)) {
    fs.writeFileSync(MATERIALS_FILE, JSON.stringify({ materials: [] }));
}

app.use(cors({
    origin: '*', // Allow all origins for tunnel access
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'bypass-tunnel-reminder']
}));
app.use(bodyParser.json());
// Serve uploaded files statically
app.use('/uploads', express.static(UPLOADS_DIR));

// Helper for users db
const readDb = () => {
    try {
        const data = fs.readFileSync(DB_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return { users: [] };
    }
};

const writeDb = (data) => {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// Helper for materials db
const readMaterials = () => {
    try {
        const data = fs.readFileSync(MATERIALS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return { materials: [] };
    }
};

const writeMaterials = (data) => {
    fs.writeFileSync(MATERIALS_FILE, JSON.stringify(data, null, 2));
};

// Rota de Upload
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('Nenhum arquivo enviado.');
    }

    const db = readMaterials();
    const newMaterial = {
        id: Date.now(),
        title: req.body.title || req.file.originalname,
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: (req.file.size / 1024 / 1024).toFixed(2) + ' MB',
        type: path.extname(req.file.originalname).toUpperCase().replace('.', ''),
        path: `/uploads/${req.file.filename}`
    };

    db.materials.push(newMaterial);
    writeMaterials(db);

    res.json(newMaterial);
});

// Rota GET Materiais
app.get('/materials', (req, res) => {
    const db = readMaterials();
    res.json(db.materials);
});

// Rota de Registro
app.post('/register', (req, res) => {
    const { name, email, password, secretKey } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const db = readDb();

    if (db.users.find(u => u.email === email)) {
        return res.status(400).json({ message: 'Email já cadastrado.' });
    }

    // Lógica simples de Roles
    // Se a secretKey for 'TIC2024', o usuário é admin (professor)
    const role = (secretKey === 'TIC2024') ? 'admin' : 'student';

    const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        role // Adicionado role
    };

    db.users.push(newUser);
    writeDb(db);

    res.status(201).json({
        message: 'Usuário cadastrado com sucesso!',
        user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role
        }
    });
});

// Rota de Login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const db = readDb();
    const user = db.users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    res.json({
        message: 'Login realizado com sucesso!',
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role || 'student' // Fallback para usuários antigos
        }
    });
});

// Configuração de Vídeos
const VIDEOS_FILE = path.join(__dirname, 'videos.json');

// Initialize videos.json if not exists
if (!fs.existsSync(VIDEOS_FILE)) {
    const initialVideos = [
        { id: 1, title: "Introdução à Cinemática", duration: "10:30", thumb: "bg-blue-200", url: "https://www.youtube.com/embed/sample1" },
        { id: 2, title: "Movimento Retilíneo Uniforme", duration: "15:45", thumb: "bg-green-200", url: "https://www.youtube.com/embed/sample2" },
        { id: 3, title: "Leis de Newton: Inércia", duration: "12:20", thumb: "bg-purple-200", url: "https://www.youtube.com/embed/sample3" },
        { id: 4, title: "Força e Movimento", duration: "18:10", thumb: "bg-orange-200", url: "https://www.youtube.com/embed/sample4" },
        { id: 5, title: "Trabalho e Energia", duration: "14:00", thumb: "bg-red-200", url: "https://www.youtube.com/embed/sample5" },
        { id: 6, title: "Conservação da Quantidade de Movimento", duration: "20:15", thumb: "bg-indigo-200", url: "https://www.youtube.com/embed/sample6" },
    ];
    fs.writeFileSync(VIDEOS_FILE, JSON.stringify({ videos: initialVideos }));
}

// Helper for videos db
const readVideos = () => {
    try {
        const data = fs.readFileSync(VIDEOS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return { videos: [] };
    }
};

const writeVideos = (data) => {
    fs.writeFileSync(VIDEOS_FILE, JSON.stringify(data, null, 2));
};

// Rota GET Vídeos
app.get('/videos', (req, res) => {
    const db = readVideos();
    res.json(db.videos);
});

// Rota POST Vídeos
app.post('/videos', (req, res) => {
    const { title, duration, url } = req.body;

    if (!title || !url) {
        return res.status(400).json({ message: 'Título e URL são obrigatórios.' });
    }

    const db = readVideos();
    const newVideo = {
        id: Date.now(),
        title,
        duration: duration || "00:00",
        thumb: "bg-space-800", // Default thumb
        url
    };

    db.videos.push(newVideo);
    writeVideos(db);

    res.status(201).json(newVideo);
});

// --- ARTIGOS CIENTÍFICOS ---
const ARTICLES_FILE = path.join(__dirname, 'articles.json');
if (!fs.existsSync(ARTICLES_FILE)) {
    const initialArticles = [
        {
            id: 1,
            title: "Ensino de Cinemática com Vídeoanálise",
            author: "Prof. Carlos Mendes",
            date: "15 Jan 2024",
            abstract: "Como o uso de softwares de rastreamento de vídeo (como Tracker) auxilia na compreensão...",
            url: "https://example.com/article1"
        }
    ];
    fs.writeFileSync(ARTICLES_FILE, JSON.stringify({ articles: initialArticles }));
}
const readArticles = () => {
    try { return JSON.parse(fs.readFileSync(ARTICLES_FILE, 'utf8')); } catch { return { articles: [] }; }
};
const writeArticles = (data) => fs.writeFileSync(ARTICLES_FILE, JSON.stringify(data, null, 2));

app.get('/articles', (req, res) => res.json(readArticles().articles));
app.post('/articles', (req, res) => {
    const { title, author, abstract, url } = req.body;
    if (!title || !url) return res.status(400).json({ message: 'Campos obrigatórios faltando.' });
    const db = readArticles();
    const newArticle = {
        id: Date.now(),
        title, author: author || "Autor Desconhecido",
        date: new Date().toLocaleDateString('pt-BR'),
        abstract: abstract || "", url
    };
    db.articles.push(newArticle);
    writeArticles(db);
    res.status(201).json(newArticle);
});

// --- JOGOS PEDAGÓGICOS ---
const GAMES_FILE = path.join(__dirname, 'games.json');
if (!fs.existsSync(GAMES_FILE)) {
    const initialGames = [
        { id: 1, name: "Corrida de Vetores", category: "Cinemática", rating: 4.8, url: "https://example.com/game1" }
    ];
    fs.writeFileSync(GAMES_FILE, JSON.stringify({ games: initialGames }));
}
const readGames = () => {
    try { return JSON.parse(fs.readFileSync(GAMES_FILE, 'utf8')); } catch { return { games: [] }; }
};
const writeGames = (data) => fs.writeFileSync(GAMES_FILE, JSON.stringify(data, null, 2));

app.get('/games', (req, res) => res.json(readGames().games));
app.post('/games', (req, res) => {
    const { name, category, url } = req.body;
    if (!name || !url) return res.status(400).json({ message: 'Nome e URL obrigatórios.' });
    const db = readGames();
    const newGame = {
        id: Date.now(),
        name, category: category || "Geral",
        rating: 5.0, url,
        color: "bg-space-700" // Default color
    };
    db.games.push(newGame);
    writeGames(db);
    res.status(201).json(newGame);
});

// --- SIMULAÇÕES ---
const SIMULATIONS_FILE = path.join(__dirname, 'simulations.json');
if (!fs.existsSync(SIMULATIONS_FILE)) {
    fs.writeFileSync(SIMULATIONS_FILE, JSON.stringify({ simulations: [] }));
}
const readSimulations = () => {
    try { return JSON.parse(fs.readFileSync(SIMULATIONS_FILE, 'utf8')); } catch { return { simulations: [] }; }
};
const writeSimulations = (data) => fs.writeFileSync(SIMULATIONS_FILE, JSON.stringify(data, null, 2));

app.get('/simulations', (req, res) => res.json(readSimulations().simulations));
app.post('/simulations', (req, res) => {
    const { title, url, description } = req.body;
    if (!title || !url) return res.status(400).json({ message: 'Título e URL obrigatórios.' });
    const db = readSimulations();
    const newSim = { id: Date.now(), title, url, description };
    db.simulations.push(newSim);
    writeSimulations(db);
    res.status(201).json(newSim);
});

// --- AVALIAÇÕES ---
const EVALUATIONS_FILE = path.join(__dirname, 'evaluations.json');
if (!fs.existsSync(EVALUATIONS_FILE)) {
    fs.writeFileSync(EVALUATIONS_FILE, JSON.stringify({ evaluations: [] }));
}
const readEvaluations = () => {
    try { return JSON.parse(fs.readFileSync(EVALUATIONS_FILE, 'utf8')); } catch { return { evaluations: [] }; }
};
const writeEvaluations = (data) => fs.writeFileSync(EVALUATIONS_FILE, JSON.stringify(data, null, 2));

app.get('/evaluations', (req, res) => res.json(readEvaluations().evaluations));
app.post('/evaluations', (req, res) => {
    const { title, description, url, deadline } = req.body;
    if (!title) return res.status(400).json({ message: 'Título obrigatório.' });
    const db = readEvaluations();
    const newEval = {
        id: Date.now(),
        title,
        description: description || "",
        url: url || "",
        deadline: deadline || "",
        createdAt: new Date().toISOString()
    };
    db.evaluations.push(newEval);
    writeEvaluations(db);
    res.status(201).json(newEval);
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
