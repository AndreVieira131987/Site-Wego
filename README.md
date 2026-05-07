# Wego Smart Business - Landing Page

Bem-vindo ao repositório frontend da **Wego Smart Business**! Esta é uma Landing Page de altíssimo padrão com foco em conversão e experiência de usuário interativa, construída para apresentar os diferenciais e soluções da Wego (BI, Data Analytics, IA Preditiva e Softwares sob medida).

## 🚀 Tecnologias Utilizadas

Este projeto foi construído sobre uma arquitetura moderna e de alta performance:

- **React.js** (+ Vite): Para construção ágil de componentes e renderização super rápida.
- **Tailwind CSS v4**: O novo motor do Tailwind sem a necessidade do antigo `tailwind.config.js`, gerenciado via PostCSS (`@tailwindcss/vite`).
- **Framer Motion**: Engine principal de animações para transições físicas, staggered reveals e interatividade avançada.
- **Lucide React**: Biblioteca de ícones elegantes, profissionais e vetoriais de baixo peso.

## 🌟 Principais Features (Design System Premium)

1. **Scrollytelling "Hero" Section**: A dobra inicial do site prende o usuário ao rolar a página enquanto a reprodução de um vídeo (`All-Intra MP4`) de "Insights" avança fluída no background, garantindo total imersão e retenção.
2. **Interatividade "Living System" (Framer Motion)**: O site reage dinamicamente ao scroll e à entrada em tela, com animações escalonadas (staggered) que trazem a sensação de um software vivo e inteligente.
3. **GlowCards (Efeito Mouse-Follow)**: Cards premium que utilizam gradientes radiais dinâmicos para seguir o cursor do mouse, adicionando uma camada de feedback visual futurista.
4. **Métricas Vivas (Animated Counters)**: Contadores numéricos que animam automaticamente a partir do zero ao entrarem no campo de visão, reforçando a prova social de forma dinâmica.
5. **Methodology Progress Line**: Uma linha neon de preenchimento via scroll na seção de metodologia, guiando visualmente o usuário pelo processo de entrega da Wego.
6. **Glassmorphism Premium**: Transparências com desfoque de fundo (`backdrop-filter`) que reagem a camadas de parallax profundo, criando uma percepção tridimensional de alta tecnologia.
7. **Mobile-First & Performance**: Navegação otimizada para dispositivos móveis com menu hamburger e transições fluidas que não comprometem o FPS.

## 📁 Estrutura de Arquivos

```
/
├── public/                 // Assets públicos normais
├── src/
│   ├── assets/             // Imagens JPG, PNG, Ícones de sistema e o Vídeo mp4 de Scrollytelling
│   ├── App.jsx             // Componente Monolítico de Alta performance (A view principal e hooks)
│   ├── index.css           // Classes de estilo utilitárias avançadas e CSS nativo complementar
│   └── main.jsx            // Root bootstrap (ponto de entrada) do React
├── index.html              // Head DOM, Title e configuração de Favicon dinâmico
├── package.json            // Dependências NPM/Vite e Scripts
└── vite.config.js          // Configurações do Bundle com suporte ao Plugin do Tailwind V4
```

## 💻 Instalação e Uso Local

**Pré-requisitos**: Node.js v18+.

1. Clone ou abra este repositório no seu computador local.
2. Abra o terminal raiz do projeto e instale as dependências:
   ```bash
   npm install
   ```
3. Rode o servidor de visualização para desenvolvimento em localhost:
   ```bash
   npm run dev
   ```

A página será aberta no endereço `http://localhost:5173`. Todos os módulos suportam Hot Reloading.

## 🚀 Deploy de Produção (Vercel ou Netlify)

O projeto está pronto para ir ao ar em ambientes Edge como Netlify / Vercel.

**Local build (Gerar pacote estático)**
```bash
npm run build
```
Uma pasta chamada `/dist` será gerada na raiz. Todo o conteúdo presente dentro dela deve ser publicado como a versão de produção nos servidores da wego.

**Para Deploy no Github + Netlify**:
1. Commit o projeto no Github atual;
2. Conecte sua conta do Github no Netlify;
3. Indique como build command a flag: `npm run build`;
4. Diretório de Build (`Publish directory`): `dist`.

