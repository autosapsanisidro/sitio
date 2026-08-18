import { createClient } from '@/lib/supabase/server';
import type { Vehicle } from '@/lib/types';
import SiteNav from '@/components/SiteNav';
import VehicleCard from '@/components/VehicleCard';
import { IconChat, IconCheck, IconCard, IconFolder, IconPin, IconClock, IconCamera, IconExternal } from '@/components/icons';

const WHATSAPP_LINK =
  'https://wa.me/5491100000000?text=Hola%2C%20quiero%20consultar%20por%20un%20auto';
const WHATSAPP_DISPLAY = '+54 9 11 XXXX-XXXX (a confirmar)';
const INSTAGRAM_LINK = 'https://www.instagram.com/autosapsanisidro';
const MERCADOLIBRE_LINK = 'https://listado.mercadolibre.com.ar/autosap-san-isidro';
const HOURS = 'Lun a Vie 9 a 18 hs (a confirmar)';

export const revalidate = 60; // refresh stock at most once a minute

export default async function HomePage() {
  const supabase = createClient();
  const { data: vehicles } = await supabase
    .from('vehicles')
    .select('*')
    .eq('status', 'published')
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(9)
    .returns<Vehicle[]>();

  const stock = vehicles ?? [];

  return (
    <>
      <SiteNav />

      <header className="hero">
        <div className="bgimg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/storefront.jpg" alt="Local de AUTOSAP en Av. Centenario 1494, Beccar" />
        </div>
        <div className="overlay" />
        <div className="wrap">
          <div className="eyebrow">
            <IconPin /> Av. Centenario 1494, Beccar — San Isidro
          </div>
          <h1>
            Tu próximo auto,
            <br />
            <span>seleccionado con criterio.</span>
          </h1>
          <p className="lead">
            Usados revisados, con financiación y gestoría incluida. Sin vueltas, con la confianza
            de un concesionario del barrio.
          </p>
          <div className="btns">
            <a className="btn primary" href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
              <IconChat /> Consultar por WhatsApp
            </a>
            <a className="btn ghost" href={INSTAGRAM_LINK} target="_blank" rel="noreferrer">
              Ver stock en Instagram →
            </a>
          </div>
        </div>
      </header>

      <div className="value-strip">
        <div className="wrap">
          <div className="item">
            <div className="n">+X</div>
            <div className="l">años en San Isidro</div>
          </div>
          <div className="item">
            <div className="n">100%</div>
            <div className="l">unidades revisadas</div>
          </div>
          <div className="item">
            <div className="n">Financiación</div>
            <div className="l">propia y bancaria</div>
          </div>
          <div className="item">
            <div className="n">Gestoría</div>
            <div className="l">incluida en la compra</div>
          </div>
        </div>
      </div>

      <section className="stock" id="stock">
        <div className="wrap">
          <div className="stock-top">
            <div>
              <div className="eyebrow-sm">Stock disponible</div>
              <h2>Elegí entre nuestras unidades</h2>
              <p>Fotos, precios y kilometraje reales — actualizado en MercadoLibre.</p>
            </div>
            <a className="ml-btn" href={MERCADOLIBRE_LINK} target="_blank" rel="noreferrer">
              <IconExternal /> Ver todo en MercadoLibre
            </a>
          </div>

          {stock.length > 0 ? (
            <div className="stock-grid">
              {stock.map((v) => (
                <VehicleCard key={v.id} vehicle={v} />
              ))}
            </div>
          ) : (
            <div className="stock-empty">
              Todavía no hay unidades cargadas. Muy pronto vas a ver acá el stock real, con fotos,
              precio y kilometraje.
            </div>
          )}
        </div>
      </section>

      <section id="beneficios">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow-sm">Por qué elegirnos</div>
            <h2>Comprar un usado, sin el dolor de cabeza</h2>
            <p>Nos ocupamos de la parte difícil para que vos solo elijas el auto.</p>
          </div>
          <div className="why-grid">
            <div className="why-card">
              <div className="ic">
                <IconCheck style={{ color: '#FF6A13' }} />
              </div>
              <h3>Revisión mecánica</h3>
              <p>Cada unidad pasa control mecánico antes de salir a la venta.</p>
            </div>
            <div className="why-card">
              <div className="ic">
                <IconCard style={{ color: '#FF6A13' }} />
              </div>
              <h3>Financiación a medida</h3>
              <p>Planes propios y acuerdos bancarios para que pagues como puedas.</p>
            </div>
            <div className="why-card">
              <div className="ic">
                <IconFolder style={{ color: '#FF6A13' }} />
              </div>
              <h3>Gestoría incluida</h3>
              <p>Transferencia y trámites resueltos por nosotros, de punta a punta.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about" id="nosotros">
        <div className="wrap">
          <div className="grid">
            <div className="photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/storefront.jpg" alt="Local de AUTOSAP" />
            </div>
            <div className="copy">
              <div className="eyebrow-sm">Quiénes somos</div>
              <h2>El concesionario del barrio, en Beccar</h2>
              <p>
                AUTOSAP San Isidro es un concesionario de usados ubicado sobre Av. Centenario, en
                Beccar. Trabajamos con vehículos de todas las marcas, revisados y listos para
                transferir.
              </p>
              <p>
                Atención directa y personalizada — acá hablás con quien te vende el auto, no con
                un call center.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="contact" id="contacto">
        <div className="wrap">
          <div className="grid">
            <div>
              <div className="eyebrow-sm">Visitanos</div>
              <h2>Te esperamos en el local</h2>
              <div className="info-row">
                <div className="ic">
                  <IconPin />
                </div>
                <div>
                  <b>Av. Centenario 1494, Beccar</b>
                  <span>San Isidro, Buenos Aires</span>
                </div>
              </div>
              <div className="info-row">
                <div className="ic">
                  <IconClock />
                </div>
                <div>
                  <b>{HOURS}</b>
                  <span>Horario de atención</span>
                </div>
              </div>
              <div className="info-row">
                <div className="ic">
                  <IconChat />
                </div>
                <div>
                  <b>{WHATSAPP_DISPLAY}</b>
                  <span>WhatsApp / consultas</span>
                </div>
              </div>
              <div className="info-row">
                <div className="ic">
                  <IconCamera />
                </div>
                <div>
                  <b>@autosapsanisidro</b>
                  <span>Seguinos en Instagram</span>
                </div>
              </div>
            </div>
            <div className="map-holder">
              <iframe
                src="https://www.google.com/maps?q=Av.+Centenario+1494,+Beccar,+San+Isidro&output=embed"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-white.svg" alt="AUTOSAP" />
        <div>AUTOSAP San Isidro · Av. Centenario 1494, Beccar · {new Date().getFullYear()}</div>
      </footer>
    </>
  );
}
