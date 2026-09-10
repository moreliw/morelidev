import { Header } from "./Header";
import { SmoothScroll } from "./motion/SmoothScroll";
import { CustomCursor } from "./motion/CustomCursor";

/**
 * Cabeçalho + infraestrutura de motion do site público (scroll suave,
 * cursor customizado). Usado no lugar de <Header /> nas páginas públicas
 * — nunca no /admin, que precisa do cursor e do scroll padrão do sistema.
 */
export function SiteChrome() {
  return (
    <>
      <Header />
      <SmoothScroll />
      <CustomCursor />
    </>
  );
}
