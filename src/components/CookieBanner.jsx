import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, X, Cookie } from "lucide-react";
import Cookies from "js-cookie";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Verifica se o usuário já aceitou os cookies
    const consent = Cookies.get("wego_cookie_consent");
    if (!consent) {
      // Mostra o banner após um pequeno delay para não atrapalhar o carregamento inicial
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    // Define o cookie de consentimento por 30 dias
    Cookies.set("wego_cookie_consent", "true", { expires: 30 });
    setIsVisible(false);
  };

  const handleDecline = () => {
    // Se recusar, também escondemos, mas poderíamos desativar analytics aqui
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed bottom-6 left-6 right-6 z-[100] md:left-auto md:max-w-md"
        >
          <div className="glass-panel p-6 md:p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-light/10 relative overflow-hidden group">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-colors duration-500"></div>
            
            <div className="relative z-10">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                  <Cookie className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-offwhite font-display text-lg font-bold mb-1">Privacidade & Cookies</h4>
                  <p className="text-light/70 text-sm leading-relaxed">
                    Utilizamos cookies para melhorar sua experiência e analisar o tráfego do site. Ao continuar, você concorda com nossa política.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  onClick={handleAccept}
                  className="flex-1 bg-primary text-dark font-bold py-3 px-6 rounded-xl shadow-[0_4px_16px_rgba(4,243,251,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-sm"
                >
                  Aceitar Tudo
                </button>
                <button
                  onClick={handleDecline}
                  className="flex-1 bg-dark/40 backdrop-blur-md text-offwhite border border-light/10 font-medium py-3 px-6 rounded-xl hover:bg-light/5 transition-all duration-300 text-sm"
                >
                  Recusar
                </button>
              </div>
            </div>

            {/* Close Button */}
            <button 
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 text-light/40 hover:text-offwhite transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
