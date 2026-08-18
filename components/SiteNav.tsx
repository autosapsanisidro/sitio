import { IconMenu } from './icons';

const WHATSAPP_LINK =
  'https://wa.me/5491100000000?text=Hola%2C%20quiero%20consultar%20por%20un%20auto';

export default function SiteNav() {
  return (
    <nav className="site-nav">
      <input type="checkbox" id="navToggle" className="nav-toggle-checkbox" />
      <div className="wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-white.svg" alt="AUTOSAP" />
        <div className="links">
          <a href="#stock">Stock</a>
          <a href="#nosotros">Nosotros</a>
          <a href="#beneficios">Beneficios</a>
          <a href="#contacto">Ubicación</a>
        </div>
        <div className="right">
          <a className="cta-pill" href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          <label htmlFor="navToggle" className="nav-toggle-btn" aria-label="Abrir menú">
            <IconMenu />
          </label>
        </div>
      </div>
      <div className="mobile-menu">
        <a href="#stock">Stock</a>
        <a href="#nosotros">Nosotros</a>
        <a href="#beneficios">Beneficios</a>
        <a href="#contacto">Ubicación</a>
      </div>
    </nav>
  );
}
