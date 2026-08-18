'use client';

import { useEffect, useState } from 'react';
import type { Vehicle } from '@/lib/types';
import { FUEL_LABELS, TRANSMISSION_LABELS } from '@/lib/types';
import { whatsappLink } from '@/lib/site';
import { IconCar, IconChat, IconExternal } from './icons';

const AUTO_ADVANCE_MS = 4000;

function formatPrice(v: Vehicle) {
  if (v.price == null) return 'Consultar precio';
  const n = new Intl.NumberFormat('es-AR').format(v.price);
  return `${v.currency === 'USD' ? 'US$' : '$'} ${n}`;
}

export default function VehicleModal({
  vehicle,
  onClose,
}: {
  vehicle: Vehicle;
  onClose: () => void;
}) {
  const photos = vehicle.photos ?? [];
  const [index, setIndex] = useState(0);
  const title = [vehicle.brand, vehicle.model].filter(Boolean).join(' ');

  // Cerrar con Escape, navegar con flechas, y bloquear el scroll de fondo mientras está abierto.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && photos.length > 1) setIndex((i) => (i + 1) % photos.length);
      if (e.key === 'ArrowLeft' && photos.length > 1) setIndex((i) => (i - 1 + photos.length) % photos.length);
    }
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, photos.length]);

  // Carrusel automático.
  useEffect(() => {
    if (photos.length < 2) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % photos.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [photos.length]);

  const waMessage = `Hola, quiero consultar por el ${title || 'vehículo'}${vehicle.year ? ` (${vehicle.year})` : ''}`;

  return (
    <div className="vmodal-backdrop" onClick={onClose}>
      <div className="vmodal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={title || 'Ficha del vehículo'}>
        <button type="button" className="vmodal-close" onClick={onClose} aria-label="Cerrar">
          ✕
        </button>

        <div className="vmodal-carousel">
          {vehicle.status === 'sold' && <div className="vbadge">VENDIDO</div>}
          {photos.length > 0 ? (
            <>
              {photos.map((url, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={url} src={url} alt={`${title || 'Vehículo'} — foto ${i + 1}`} className={i === index ? 'active' : ''} />
              ))}
              {photos.length > 1 && (
                <>
                  <button
                    type="button"
                    className="vmodal-arrow prev"
                    onClick={() => setIndex((i) => (i - 1 + photos.length) % photos.length)}
                    aria-label="Foto anterior"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    className="vmodal-arrow next"
                    onClick={() => setIndex((i) => (i + 1) % photos.length)}
                    aria-label="Foto siguiente"
                  >
                    ›
                  </button>
                  <div className="vmodal-dots">
                    {photos.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        className={`vmodal-dot${i === index ? ' active' : ''}`}
                        onClick={() => setIndex(i)}
                        aria-label={`Ir a foto ${i + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="vmodal-noimg">
              <IconCar />
              <div className="lbl">SIN FOTOS CARGADAS</div>
            </div>
          )}
        </div>

        <div className="vmodal-body">
          <h2>
            {title || 'Vehículo'}{' '}
            {vehicle.version ? <span className="vmodal-version">{vehicle.version}</span> : null}
          </h2>
          <div className="vmodal-price">{formatPrice(vehicle)}</div>

          <div className="vmodal-specs">
            {vehicle.year && (
              <div className="spec">
                <span className="k">Año</span>
                <span className="v">{vehicle.year}</span>
              </div>
            )}
            {vehicle.km != null && (
              <div className="spec">
                <span className="k">Kilometraje</span>
                <span className="v">{new Intl.NumberFormat('es-AR').format(vehicle.km)} km</span>
              </div>
            )}
            {vehicle.transmission && (
              <div className="spec">
                <span className="k">Transmisión</span>
                <span className="v">{TRANSMISSION_LABELS[vehicle.transmission]}</span>
              </div>
            )}
            {vehicle.fuel && (
              <div className="spec">
                <span className="k">Combustible</span>
                <span className="v">{FUEL_LABELS[vehicle.fuel]}</span>
              </div>
            )}
            {vehicle.color && (
              <div className="spec">
                <span className="k">Color</span>
                <span className="v">{vehicle.color}</span>
              </div>
            )}
          </div>

          {vehicle.description && <p className="vmodal-desc">{vehicle.description}</p>}

          <div className="vmodal-actions">
            <a className="btn primary" href={whatsappLink(waMessage)} target="_blank" rel="noreferrer">
              <IconChat /> Consultar por WhatsApp
            </a>
            {vehicle.mercadolibre_url && (
              <a className="btn outline" href={vehicle.mercadolibre_url} target="_blank" rel="noreferrer">
                <IconExternal /> Ver aviso en MercadoLibre
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
