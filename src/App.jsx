import { useState, useEffect, useRef } from "react";
import { 
  Sparkles, ArrowRight, Layers, Palette, BrainCircuit, Activity, BarChart3, TrendingUp, AlertTriangle,
  PieChart, Bot, Cpu, Code, Target, ShieldCheck, Clock, CheckCircle2, ChevronRight, Search, Network, Braces, Rocket, RefreshCw, Telescope, Quote, Star, Menu, X
} from "lucide-react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import AnimatedCounter from "./components/AnimatedCounter";
import GlowCard from "./components/GlowCard";
import logoCompleta from "./assets/completa_h_1.png";
import videoInsights from "./assets/video_of_insights_optimized.mp4";
import bgSolucoes from "./assets/BI_Data_Analytics.jpeg";
import logoIcone from "./assets/icone_1.png";
import "./index.css";

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Framer Motion Scroll Progress
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  
  // Animation refs
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const methodologyRef = useRef(null);
  const sobreRef = useRef(null);
  const targetTime = useRef(0);
  const currentTime = useRef(0);
  const carouselRef = useRef(null);

  // Scrolling line for Methodology
  const { scrollYProgress: methodologyProgress } = useScroll({
    target: methodologyRef,
    offset: ["start center", "end center"]
  });
  const scaleY = useTransform(methodologyProgress, [0, 1], [0, 1]);

  // Parallax for 'Sobre' Section Icon
  const { scrollYProgress: sobreProgress } = useScroll({
    target: sobreRef,
    offset: ["start end", "end start"]
  });
  const iconY = useTransform(sobreProgress, [0, 1], ["-15%", "15%"]);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth Video Scrubbing Logic
  useEffect(() => {
    let animationFrameId;

    const smoothScrollVideo = () => {
      if (videoRef.current && videoRef.current.duration) {
        // Velocidade de lerp ideal para vídeos otimizados All-Intra (keyint=1)
        currentTime.current += (targetTime.current - currentTime.current) * 0.25;
        
        // Atualiza a cada mínima variação já que o vídeo está otimizado para seek rápido a 60fps
        if (Math.abs(currentTime.current - videoRef.current.currentTime) > 0.005) {
          videoRef.current.currentTime = currentTime.current;
        }
      }
      animationFrameId = requestAnimationFrame(smoothScrollVideo);
    };

    // Garante que o vídeo nunca auto reproduza por si mesmo, para focar só no "scrub"
    if (videoRef.current) videoRef.current.pause();

    animationFrameId = requestAnimationFrame(smoothScrollVideo);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Calculate strict scroll progress ONLY within the hero section
  useEffect(() => {
    const handleScrollTime = () => {
      if (!videoRef.current || Number.isNaN(videoRef.current.duration) || !sectionRef.current) return;
      
      const top = sectionRef.current.offsetTop;
      const height = sectionRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      
      let fraction = (scrollPosition - top) / (height - windowHeight);
      fraction = Math.max(0, Math.min(fraction, 1));
      
      targetTime.current = fraction * videoRef.current.duration;
    };

    window.addEventListener("scroll", handleScrollTime, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollTime);
  }, []);

  const [parallaxY, setParallaxY] = useState(0);

  // Parallax Scroll Tracking
  useEffect(() => {
    const handleScroll = () => {
      setParallaxY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for Reveal Animations (Removing in favor of Framer Motion)
  /* 
  useEffect(() => {
    const observer = new IntersectionObserver(...)
    ...
  }, []); 
  */

  // Auto-scroll Carousel
  useEffect(() => {
    let animationFrameId;
    let isHovered = false;
    let currentScroll = 0;

    const scrollCarousel = () => {
      if (carouselRef.current) {
        if (!isHovered) {
          currentScroll += 0.7; // Scrolling speed
          
          // Auto-loop reset
          if (currentScroll >= carouselRef.current.scrollWidth - carouselRef.current.clientWidth - 1) {
            currentScroll = 0;
          }
          carouselRef.current.scrollLeft = currentScroll;
        } else {
          // Sync internal state with user's manual scrolling
          currentScroll = carouselRef.current.scrollLeft;
        }
      }
      animationFrameId = requestAnimationFrame(scrollCarousel);
    };

    const handleMouseEnter = () => (isHovered = true);
    const handleMouseLeave = () => (isHovered = false);
    const handleTouchStart = () => (isHovered = true);
    const handleTouchEnd = () => (isHovered = false);

    if (carouselRef.current) {
      carouselRef.current.addEventListener("mouseenter", handleMouseEnter);
      carouselRef.current.addEventListener("mouseleave", handleMouseLeave);
      carouselRef.current.addEventListener("touchstart", handleTouchStart, { passive: true });
      carouselRef.current.addEventListener("touchend", handleTouchEnd);
      // Initialize current scroll matching DOM
      currentScroll = carouselRef.current.scrollLeft;
      animationFrameId = requestAnimationFrame(scrollCarousel);
    }
    
    return () => {
      if (carouselRef.current) {
         carouselRef.current.removeEventListener("mouseenter", handleMouseEnter);
         carouselRef.current.removeEventListener("mouseleave", handleMouseLeave);
         carouselRef.current.removeEventListener("touchstart", handleTouchStart);
         carouselRef.current.removeEventListener("touchend", handleTouchEnd);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="antialiased selection:bg-primary selection:text-dark relative min-h-screen bg-dark w-full">
      {/* Fixed UI Backgrounds */}
      <div className="fixed inset-0 z-0 technical-grid pointer-events-none opacity-40"></div>
      
      {/* Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full px-6 md:px-12 flex justify-between items-center transition-all duration-300 ${
          scrolled ? "py-4 bg-dark/85 backdrop-blur-md border-b border-light/5 shadow-lg" : "py-6"
        }`}
      >
        <div className="flex items-center gap-3">
          <img src={logoCompleta} alt="Wego Smart Business" className="h-8 md:h-10 object-contain cursor-pointer" />
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#solucoes" className="font-sans text-sm font-medium text-light hover:text-primary transition-colors">
            Soluções
          </a>
          <a href="#diferenciais" className="font-sans text-sm font-medium text-light hover:text-primary transition-colors">
            Diferencial
          </a>
          <a href="#sobre" className="font-sans text-sm font-medium text-light hover:text-primary transition-colors">
            A Wego
          </a>
          <a href="#cases" className="font-sans text-sm font-medium text-light hover:text-primary transition-colors">
            Cases
          </a>
        </nav>

        <div className="flex items-center gap-5">
          <button className="hidden md:flex group relative isolate overflow-hidden bg-primary text-dark font-semibold px-6 py-2.5 rounded-lg shadow-[0_4px_16px_rgba(4,243,251,0.2)] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:scale-[1.03] hover:shadow-[0_8px_24px_rgba(4,243,251,0.4)] active:scale-[0.98]">
            <div className="shimmer-layer absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent z-10"></div>
            <span className="relative z-20 flex items-center gap-2 text-sm">
              Falar com Especialista
            </span>
          </button>
          
          <button className="md:hidden text-offwhite focus:outline-none" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-dark/98 backdrop-blur-2xl transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col pt-32 px-6 pb-8 md:hidden ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <nav className="flex flex-col gap-6 text-center mt-10">
          <a href="#solucoes" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-display font-medium text-offwhite border-b border-light/5 pb-4">Soluções</a>
          <a href="#diferenciais" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-display font-medium text-offwhite border-b border-light/5 pb-4">Diferencial</a>
          <a href="#sobre" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-display font-medium text-offwhite border-b border-light/5 pb-4">A We.Go</a>
          <a href="#cases" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-display font-medium text-offwhite border-b border-light/5 pb-4">Cases</a>
        </nav>
        
        <div className="mt-auto pt-10">
          <button onClick={() => setMobileMenuOpen(false)} className="w-full bg-primary text-dark font-bold text-lg py-5 rounded-2xl shadow-[0_4px_24px_rgba(4,243,251,0.3)]">
            Falar com Especialista
          </button>
        </div>
      </div>

      {/* 1. HERO COM SCROLLYTELLING */}
      <section ref={sectionRef} className="relative h-[200vh] w-full z-10 bg-dark">
        {/* Container que fica "preso" na tela enquanto rolamos os 350vh */}
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center px-6 overflow-hidden text-center">
          
          {/* Dynamic Video Background scrubbing on scroll */}
          <div className="absolute inset-0 z-[-2] overflow-hidden bg-dark">
            <video 
              ref={videoRef}
              src={videoInsights}
              muted 
              playsInline 
              preload="auto"
              className="w-full h-full object-cover opacity-50 scale-105"
            ></video>
            {/* Gradient Overlay for visual blending */}
            <div className="absolute inset-0 bg-gradient-to-b from-dark/40 via-transparent to-dark"></div>
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-dark/80"></div>
          </div>

          {/* Existing Glows */}
          <div className="hero-glow-1 opacity-10"></div>
          <div className="hero-glow-2 opacity-15"></div>

          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-panel mb-8 animate-title-intro border-primary/30 shadow-[0_0_30px_rgba(4,243,251,0.2)] mt-12 bg-dark/40 backdrop-blur-lg">
            <BrainCircuit className="w-4 h-4 text-primary animate-pulse" />
            <span className="font-sans text-xs font-semibold text-primary uppercase tracking-widest">
              Wego Smart Business
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-offwhite to-light mb-6 animate-title-intro max-w-5xl leading-[1.1] drop-shadow-2xl">
            Transforme dados em <br className="hidden md:block"/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              decisões inteligentes
            </span> com IA
          </h1>

          <p className="font-sans text-base md:text-xl text-light max-w-3xl mx-auto mb-12 animate-subtitle-intro leading-relaxed drop-shadow-lg">
            Desenvolvemos soluções em BI, inteligência artificial e softwares sob medida para empresas que querem crescer com <span className="text-offwhite font-medium">previsibilidade</span>, <span className="text-offwhite font-medium">eficiência</span> e <span className="text-offwhite font-medium">escala</span>.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-btn-intro w-full max-w-2xl px-4 mb-24">
            <a
              href="#diagnostico"
              className="w-full sm:w-auto group relative isolate overflow-hidden bg-primary text-dark font-semibold px-8 py-4 rounded-xl shadow-[0_4px_24px_rgba(4,243,251,0.25)] transition-all duration-500 hover:scale-[1.05] hover:shadow-[0_12px_32px_rgba(4,243,251,0.4)]"
            >
              <div className="shimmer-layer absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent z-10"></div>
              <span className="relative z-20 flex items-center justify-center gap-2">
                Agendar diagnóstico gratuito
              </span>
            </a>
            <a
              href="#solucoes"
              className="w-full sm:w-auto px-8 py-4 bg-dark/60 backdrop-blur-xl text-offwhite border border-light/20 font-medium rounded-xl transition-all duration-300 hover:bg-light/20 hover:border-primary/50 flex items-center justify-center gap-2 shadow-xl"
            >
              Conhecer soluções
            </a>
          </div>
          
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-subtitle-intro opacity-70">
            <span className="text-[10px] uppercase tracking-widest text-light font-sans drop-shadow-md">
               Continue Rolando
            </span>
            <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* 2. DOR + QUEBRA DE PADRÃO */}
      <section className="relative py-24 md:py-32 px-6 z-20 bg-[#0a0d14] border-t border-light/5 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" style={{ transform: `translateY(${parallaxY * -0.1}px)` }}></div>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
          
          {/* Left: Pain Points */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-muted/20 border border-muted/30 mb-6">
              <AlertTriangle className="w-4 h-4 text-primary" />
              <span className="font-sans text-[11px] font-semibold text-light uppercase tracking-widest">O Cenário Atual</span>
            </div>
            
            <h2 className="font-display text-4xl md:text-5xl font-bold text-offwhite mb-6 leading-tight">
              Sua empresa está tomando decisões ou <span className="text-transparent bg-clip-text bg-gradient-to-r from-light to-muted italic">apenas reagindo?</span>
            </h2>
            
            <p className="font-sans text-lg text-light leading-relaxed mb-10">
              Muitas empresas ainda operam com dados desconectados, processos manuais e decisões baseadas em intuição. Isso gera:
            </p>
            
            <motion.div 
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 }
                }
              }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {[
                { icon: <Activity className="w-5 h-5 text-secondary" />, title: "Retrabalho constante", desc: "Esforço duplicado nas equipes." },
                { icon: <BarChart3 className="w-5 h-5 text-secondary" />, title: "Falta de previsibilidade", desc: "Caixa e operação no escuro." },
                { icon: <AlertTriangle className="w-5 h-5 text-secondary" />, title: "Perda de oportunidades", desc: "Lentidão em um mercado ágil." },
                { icon: <TrendingUp className="w-5 h-5 text-secondary" />, title: "Crescimento desorganizado", desc: "Escala corroendo todas as margens." }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                >
                  <GlowCard className="p-5 rounded-xl flex items-start gap-4 h-full" glowColor="rgba(247, 181, 0, 0.1)">
                    <div className="w-10 h-10 rounded-lg bg-black/60 flex items-center justify-center shrink-0 border border-light/5">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-offwhite text-sm">{item.title}</h4>
                      <p className="text-xs text-muted mt-1">{item.desc}</p>
                    </div>
                  </GlowCard>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: The Break (Quebra) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-[45%]"
          >
            <div className="glass-panel-light p-10 md:p-14 rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.5)] relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:bg-primary/20 transition-colors duration-500"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 group-hover:bg-secondary/20 transition-colors duration-500"></div>
              
              <div className="relative z-10 flex flex-col h-full justify-center text-dark">
                <h3 className="font-display text-4xl md:text-5xl font-black leading-tight relative mt-2">
                  O problema não é <br/><span className="text-muted/60 line-through decoration-dark/40 decoration-4">falta de dados.</span>
                </h3>
                
                <div className="mt-8 border-l-4 border-primary pl-6 py-2 bg-gradient-to-r from-primary/5 to-transparent">
                  <p className="font-sans text-2xl md:text-3xl font-medium leading-snug">
                    É falta de <span className="font-bold text-offwhite bg-dark px-3 py-1 rounded-md inline-block mt-2 shadow-[0_4px_12px_rgba(52,55,91,0.5)]">inteligência</span> sobre eles.
                  </p>
                </div>
                
                <p className="mt-8 text-dark/80 font-sans text-sm leading-relaxed max-w-sm">
                  Nós construímos a ponte tecnológica entre planilhas soltas e a <span className="font-bold">sala de comando interativa</span> que sua empresa precisa para vencer.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 3. SOLUÇÃO (POSICIONAMENTO) */}
      <section ref={sobreRef} id="sobre" className="relative py-32 px-6 z-10 bg-gradient-to-b from-[#0a0d14] to-[#121521] overflow-hidden border-t border-light/5">
        {/* Background Icon Decorator */}
        <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none">
          <motion.img 
            src={logoIcone} 
            alt="" 
            className="w-[120%] h-auto max-w-none opacity-5 grayscale brightness-0 invert"
            style={{ 
              translateY: iconY,
              rotate: 15
            }}
          />
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" style={{ transform: `translate(-50%, -50%) translateY(${parallaxY * 0.15}px)` }}></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <h2 className="font-display text-4xl md:text-6xl font-black text-offwhite mb-8 leading-tight">
            Nós transformamos dados em <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">inteligência acionável</span>
          </h2>
          <p className="font-sans text-xl md:text-2xl text-light leading-relaxed mb-6 font-medium italic">
            A We.Go vai além de dashboards.
          </p>
          <p className="font-sans text-lg text-muted/90 max-w-2xl mx-auto leading-relaxed">
            Criamos soluções completas que conectam dados, automatizam processos e utilizam inteligência artificial para gerar decisões mais rápidas, seguras e estratégicas.
          </p>
        </motion.div>
      </section>

      {/* 4. PILARES DE SOLUÇÃO */}
      <section id="solucoes" className="relative py-24 px-6 z-10 border-t border-light/5 overflow-hidden">
        {/* Imagem de Fundo com Tratamento de Leitura */}
        <div className="absolute inset-0 z-0">
          <img 
            src={bgSolucoes} 
            alt="Data Analytics Wego" 
            className="w-full h-full object-cover opacity-40 mix-blend-luminosity" 
            style={{ transform: `translateY(${parallaxY * 0.05}px) scale(1.1)` }}
          />
          {/* Degradê dark sobre a imagem parecendo que ela emerge das sombras */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#121521] via-dark/80 to-[#0a0d14]"></div>
          {/* Máscara extra pro meio onde ficam os cards */}
          <div className="absolute inset-0 bg-dark/50"></div>
        </div>

        <div className="absolute top-20 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none z-0" style={{ transform: `translateY(${parallaxY * -0.05}px)` }}></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 relative z-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-muted/20 border border-muted/30 mb-4">
              <Layers className="w-4 h-4 text-primary" />
              <span className="font-sans text-[11px] font-semibold text-light uppercase tracking-widest">Nossos Serviços</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-offwhite">
              Soluções completas para empresas <br className="hidden md:block"/><span className="italic text-transparent bg-clip-text bg-gradient-to-r from-light to-muted">orientadas a dados</span>
            </h2>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.15 }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10"
          >
            {[
              { 
                icon: <PieChart className="w-7 h-7 text-primary" />, 
                title: "BI & Data Analytics", 
                subtitle: "Visualize o que realmente importa.",
                features: ["dashboards interativos", "integração de dados", "indicadores estratégicos"],
                color: "rgba(4, 243, 251, 0.15)"
              },
              { 
                icon: <Bot className="w-7 h-7 text-primary" />, 
                title: "Inteligência Artificial", 
                subtitle: "Automatize e potencialize decisões.",
                features: ["IA aplicada a processos", "copilotos e assistentes inteligentes", "automação com aprendizado contínuo"],
                color: "rgba(247, 181, 0, 0.15)"
              },
              { 
                icon: <Code className="w-7 h-7 text-primary" />, 
                title: "Softwares Sob Medida", 
                subtitle: "Sistemas criados para sua operação.",
                features: ["plataformas personalizadas", "automação de fluxos internos", "soluções escaláveis"],
                color: "rgba(4, 243, 251, 0.15)"
              },
              { 
                icon: <Telescope className="w-7 h-7 text-primary" />, 
                title: "IA Preditiva", 
                subtitle: "Antecipe o futuro do seu negócio.",
                features: ["previsão de vendas", "análise de comportamento", "redução de riscos"],
                color: "rgba(247, 181, 0, 0.15)"
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
              >
                <GlowCard className="p-8 md:p-10 rounded-2xl h-full" glowColor={item.color}>
                   <div className="w-14 h-14 rounded-xl bg-dark border border-light/10 flex items-center justify-center mb-6 shadow-inner relative z-10">
                     {item.icon}
                   </div>
                   <h3 className="font-display text-2xl font-bold text-offwhite mb-3 tracking-wide relative z-10">{item.title}</h3>
                   <p className="font-sans text-sm text-secondary mb-6 font-semibold relative z-10">{item.subtitle}</p>
                   <ul className="space-y-4 relative z-10">
                     {item.features.map((f, i) => (
                       <li key={i} className="flex items-center gap-3 text-light text-sm"><ChevronRight className="w-4 h-4 text-primary opacity-80"/> {f}</li>
                     ))}
                   </ul>
                </GlowCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. COMO FUNCIONA (METODOLOGIA) */}
      <section ref={methodologyRef} className="relative py-24 px-6 z-10 bg-[#BCC4CC] overflow-hidden border-y border-dark/5">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20 relative z-10"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-dark mb-4">
              Da análise ao resultado: <span className="text-secondary italic">um processo estruturado</span>
            </h2>
          </motion.div>

          <div className="relative border-l border-dark/10 pl-10 ml-4 md:ml-20 md:pl-16 space-y-16 py-4">
            {/* Animated Progress Line */}
            <motion.div 
              style={{ scaleY, originY: 0 }}
              className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-secondary via-primary to-secondary shadow-[0_0_15px_rgba(13,98,127,0.3)] z-0"
            />

            {[
              { icon: <Search className="w-5 h-5" />, title: "Diagnóstico estratégico", desc: "Entendemos seu negócio, dados e desafios para criar a base sólida do projeto." },
              { icon: <Network className="w-5 h-5" />, title: "Mapeamento de dados e processos", desc: "Identificamos as oportunidades reais de ganho mapeando a fundo sua estrutura." },
              { icon: <Braces className="w-5 h-5" />, title: "Desenvolvimento da solução", desc: "Criamos plataformas robustas utilizando metodologias ágeis (BI, IA, ou Software)." },
              { icon: <Rocket className="w-5 h-5" />, title: "Implementação e integração", desc: "Colocamos tudo para rodar com eficiência adaptando à realidade da sua empresa." },
              { icon: <RefreshCw className="w-5 h-5" />, title: "Evolução contínua", desc: "Ajustamos, melhoramos e escalamos seu produto com inteligência de mercado." }
            ].map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative group z-10"
              >
                <div className="absolute -left-[58px] md:-left-[82px] w-10 h-10 bg-offwhite border border-dark/10 text-secondary rounded-full flex items-center justify-center group-hover:border-secondary group-hover:scale-110 group-hover:bg-secondary group-hover:text-offwhite transition-all duration-300 shadow-lg">
                  {step.icon}
                </div>
                <h3 className="font-display text-2xl font-bold text-dark mb-2 group-hover:text-secondary transition-colors">{step.title}</h3>
                <p className="font-sans text-muted font-medium">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. RESULTADOS (PROVA) */}
      <section id="cases" className="relative py-24 px-6 z-10 bg-gradient-to-b from-[#0a0d14] to-dark border-y border-light/5">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-16"
          >
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-muted/20 border border-muted/30 mb-4">
                <Target className="w-4 h-4 text-primary" />
                <span className="font-sans text-[11px] font-semibold text-light uppercase tracking-widest">Geração de Valor</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-offwhite mb-4">
                Resultados que vão além dos relatórios
              </h2>
              <p className="font-sans text-lg text-light">
                Nossos projetos impactam diretamente a performance sistêmica e financeira das empresas.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
             {[
               { icon: <Clock className="w-8 h-8 text-primary mx-auto mb-4" />, value: 200, suffix: "h+", label: "De eficiência mensal p/ equipe" },
               { icon: <Target className="w-8 h-8 text-primary mx-auto mb-4" />, value: 45, suffix: "+", label: "Projetos entregues no 1º ano" },
               { icon: <Network className="w-8 h-8 text-primary mx-auto mb-4" />, value: 12, suffix: "", label: "Segmentos de mercado atendidos" },
               { icon: <ShieldCheck className="w-8 h-8 text-primary mx-auto mb-4" />, value: 98, suffix: "%", label: "De retenção e satisfação ativa" }
             ].map((stat, idx) => (
               <motion.div
                 key={idx}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: idx * 0.1 }}
               >
                 <GlowCard className="p-8 rounded-2xl flex flex-col justify-center text-center h-full">
                    {stat.icon}
                    <div className="text-4xl font-display font-black text-offwhite mb-2 tracking-tighter">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="text-muted font-medium text-sm leading-snug">{stat.label}</p>
                 </GlowCard>
               </motion.div>
             ))}
          </div>
          
          {/* Citações / Cases (Carrossel Horizontal) */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-20 relative w-full overflow-hidden"
          >
            <style>{`
              .hide-scrollbar::-webkit-scrollbar { display: none; }
              .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
            
            <div ref={carouselRef} className="flex overflow-x-auto gap-6 pb-8 hide-scrollbar px-4 w-full cursor-grab active:cursor-grabbing">
              {/* Review 1 */}
              <div className="shrink-0 w-[85vw] sm:w-[380px] glass-panel-light p-8 rounded-3xl relative flex flex-col justify-between">
                 <Quote className="w-12 h-12 text-primary opacity-10 absolute top-6 right-6" />
                 <div>
                   <div className="flex gap-1 mb-6">
                     <Star className="w-4 h-4 text-primary fill-primary" />
                     <Star className="w-4 h-4 text-primary fill-primary" />
                     <Star className="w-4 h-4 text-primary fill-primary" />
                     <Star className="w-4 h-4 text-primary fill-primary" />
                     <Star className="w-4 h-4 text-primary fill-primary" />
                   </div>
                   <p className="font-sans text-dark/80 text-lg mb-8 font-medium italic leading-relaxed relative z-10">
                     "A implementação da sala de comando interativa reduziu nossas perdas operacionais em 42% num período crítico do ano."
                   </p>
                 </div>
                 <div>
                   <p className="font-bold text-dark font-display text-lg">João Pereira</p>
                   <p className="text-sm text-dark/60 font-sans">Diretor de Logística, LogCorp</p>
                 </div>
              </div>
              
              {/* Review 2 */}
              <div className="shrink-0 w-[85vw] sm:w-[380px] glass-panel p-8 rounded-3xl relative flex flex-col justify-between border-light/10">
                 <Quote className="w-12 h-12 text-secondary opacity-10 absolute top-6 right-6" />
                 <div>
                   <div className="flex gap-1 mb-6">
                     <Star className="w-4 h-4 text-secondary fill-secondary" />
                     <Star className="w-4 h-4 text-secondary fill-secondary" />
                     <Star className="w-4 h-4 text-secondary fill-secondary" />
                     <Star className="w-4 h-4 text-secondary fill-secondary" />
                     <Star className="w-4 h-4 text-secondary fill-secondary" />
                   </div>
                   <p className="font-sans text-light text-lg mb-8 font-medium italic leading-relaxed relative z-10">
                     "Pela primeira vez temos previsibilidade real do fluxo e conseguimos antecipar o mercado nos piores cenários macroeconômicos."
                   </p>
                 </div>
                 <div>
                   <p className="font-bold text-offwhite font-display text-lg">Mariana Santos</p>
                   <p className="text-sm text-muted font-sans">CFO, FinTech Sul</p>
                 </div>
              </div>

              {/* Review 3 */}
              <div className="shrink-0 w-[85vw] sm:w-[380px] glass-panel-light p-8 rounded-3xl relative flex flex-col justify-between">
                 <Quote className="w-12 h-12 text-primary opacity-10 absolute top-6 right-6" />
                 <div>
                   <div className="flex gap-1 mb-6">
                     <Star className="w-4 h-4 text-primary fill-primary" />
                     <Star className="w-4 h-4 text-primary fill-primary" />
                     <Star className="w-4 h-4 text-primary fill-primary" />
                     <Star className="w-4 h-4 text-primary fill-primary" />
                     <Star className="w-4 h-4 text-primary fill-primary" />
                   </div>
                   <p className="font-sans text-dark/80 text-lg mb-8 font-medium italic leading-relaxed relative z-10">
                     "A IA preditiva da We.Go mudou as nossas vendas. Prevemos os picos do varejo com precisão de estoque milimétrica."
                   </p>
                 </div>
                 <div>
                   <p className="font-bold text-dark font-display text-lg">Roberto Ferraz</p>
                   <p className="text-sm text-dark/60 font-sans">Growth Manager, RetailMax</p>
                 </div>
              </div>

              {/* Review 4 */}
              <div className="shrink-0 w-[85vw] sm:w-[380px] glass-panel p-8 rounded-3xl relative flex flex-col justify-between border-light/10">
                 <Quote className="w-12 h-12 text-secondary opacity-10 absolute top-6 right-6" />
                 <div>
                   <div className="flex gap-1 mb-6">
                     <Star className="w-4 h-4 text-secondary fill-secondary" />
                     <Star className="w-4 h-4 text-secondary fill-secondary" />
                     <Star className="w-4 h-4 text-secondary fill-secondary" />
                     <Star className="w-4 h-4 text-secondary fill-secondary" />
                     <Star className="w-4 h-4 text-secondary fill-secondary" />
                   </div>
                   <p className="font-sans text-light text-lg mb-8 font-medium italic leading-relaxed relative z-10">
                     "A Automação de fluxos economizou mais de 200 horas mensais da equipe. Uma eficiência irreal sem engessar a empresa."
                   </p>
                 </div>
                 <div>
                   <p className="font-bold text-offwhite font-display text-lg">Carla Telles</p>
                   <p className="text-sm text-muted font-sans">Diretora de Operações, AgroSolutions</p>
                 </div>
              </div>
              
              <div className="snap-center shrink-0 w-[4vw] sm:w-[10px]"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7. DIFERENCIAIS */}
      <section id="diferenciais" className="relative py-24 px-6 z-10 bg-dark overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" style={{ transform: `translateY(${parallaxY * -0.05}px)` }}></div>
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-offwhite mb-8">
              Por que empresas escolhem a <span className="text-primary italic">We.Go</span>
            </h2>
            <p className="font-sans text-lg text-light mb-8 max-w-lg">
              Nossa abordagem une a profundidade estratégica à excelência na execução técnica, garantindo que nenhum projeto termine na gaveta.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2"
          >
            <GlowCard className="p-8 md:p-12 rounded-3xl shadow-2xl overflow-hidden border-light/10" glowColor="rgba(4, 243, 251, 0.1)">
               <ul className="space-y-6 relative z-10">
                 {[
                   "Foco em resultado, não apenas análise",
                   "Soluções 100% personalizadas (sem modelos limitantes pré-prontos)",
                   "Integração nativa entre dados, IA e a sua operação atual",
                   "Combinação de visão estratégica com a melhor execução técnica",
                   "Evolução contínua atrelada ao sucesso das soluções"
                 ].map((text, idx) => (
                   <motion.li 
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + (idx * 0.1) }}
                      className="flex items-start gap-4"
                   >
                     <div className="shrink-0 mt-1"><CheckCircle2 className="w-6 h-6 text-primary" /></div>
                     <p className="text-offwhite font-medium text-lg leading-tight">{text}</p>
                   </motion.li>
                 ))}
               </ul>
            </GlowCard>
          </motion.div>
        </div>
      </section>

      {/* 8. CTA FINAL */}
      <section className="relative py-32 px-6 z-10 bg-gradient-to-b from-dark to-[#0a0d14] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" style={{ transform: `translate(-50%, -50%) translateY(${parallaxY * 0.2}px)` }}></div>
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-6xl mx-auto"
        >
          <div className="glass-panel-light p-10 md:p-20 rounded-[3rem] shadow-[0_30px_100px_rgba(4,243,251,0.15)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/5 to-secondary/10 opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 relative z-10">
              {/* Logo Area */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, type: "spring", bounce: 0.4 }}
                className="w-full lg:w-1/3 flex justify-center lg:justify-start"
              >
                <img 
                  src={logoCompleta} 
                  alt="Wego Logo" 
                  className="h-20 md:h-28 lg:h-36 w-auto object-contain drop-shadow-2xl brightness-[0.1] opacity-90 group-hover:brightness-0 group-hover:scale-105 transition-all duration-700"
                />
              </motion.div>

              {/* Text & Action Area */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="w-full lg:w-2/3 text-center lg:text-left"
              >
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-dark mb-6 leading-tight">
                  Pronto para tomar decisões <br className="hidden md:block"/><span className="text-secondary italic">mais inteligentes?</span>
                </h2>
                <p className="font-sans text-lg text-dark/70 mb-10 max-w-xl mx-auto lg:mx-0 font-medium">
                  Descubra como sua empresa pode evoluir com dados de forma conectada, automação e inteligência artificial a seu favor.
                </p>
                
                <div className="flex flex-col lg:flex-row items-center gap-6">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative isolate overflow-hidden bg-secondary text-offwhite font-black px-10 py-5 rounded-2xl shadow-[0_8px_30px_rgba(13,98,127,0.3)] transition-all duration-500 w-full md:w-auto"
                  >
                    <div className="shimmer-layer absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent z-10"></div>
                    <span className="relative z-20 flex items-center justify-center gap-2 text-lg uppercase tracking-wide">
                      Agendar diagnóstico gratuito
                    </span>
                  </motion.button>
                  <div className="text-center lg:text-left">
                    <p className="text-sm text-dark/60 font-sans max-w-[200px]">
                      Sem compromisso. Entenda onde você está hoje.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FOOTER BASICO PARA FINALIZAR A PAGINA */}
      <footer className="relative py-8 bg-black z-10 border-t border-light/5 text-center">
         <p className="font-sans text-xs text-muted">© {new Date().getFullYear()} We.Go Smart Business. Todos os direitos reservados.</p>
      </footer>

    </div>
  );
}

export default App;
