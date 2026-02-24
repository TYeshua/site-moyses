# TIC Digital Educação - FísicA

Este é o repositório do projeto **TIC Digital Educação**, um laboratório virtual de Física desenvolvido para o ensino médio. O projeto utiliza React (Frontend) e Express (Backend).

## 🚀 Tecnologias

-   **Frontend:** React, TypeScript, Tailwind CSS, Vite
-   **Backend:** Node.js, Express, Multer (Upload de arquivos)
-   **Armazenamento:** Arquivos JSON locais (`db.json`, `videos.json`, `materials.json`)

## 🛠️ Como rodar o projeto

### 1. Pré-requisitos
Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina.

### 2. Instalação

Abra o terminal na pasta raiz do projeto e instale as dependências do Frontend:
```bash
npm install
```

Em seguida, entre na pasta do servidor e instale as dependências do Backend:
```bash
cd server
npm install
cd ..
```

### 3. Rodando a Aplicação

Você precisará de **dois terminais** abertos.

**Terminal 1 (Backend):**
```bash
cd server
npm start
```
*O servidor rodará na porta 3001.*

**Terminal 2 (Frontend):**
```bash
npm run dev
```
*O site estará disponível em `http://localhost:5173`.*

## 🔐 Acesso Professor (Admin)

Para acessar a **Área do Professor**, crie uma conta com:
-   **Role:** Sou Professor
-   **Código de Acesso:** `TIC2024`

---
Desenvolvido por [Seu Nome]
