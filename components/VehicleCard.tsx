'use client';

import { useState } from 'react';
import type { Vehicle } from '@/lib/types';
import { IconCar } from './icons';
import VehicleModal from './VehicleModal';

function formatPrice(v: Vehicle) {
  if (v.price == null) return 'Consultar precio';
  const n = new Intl.NumberFormat('es-AR').format(v.price);
  return `${v.currency === 'USD' ? 'US$' : '$'} ${n}`;
}

export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const [open, setOpen] = useState(false);
  const cover = vehicle.photos?.[0];
  const title = [vehicle.brand, vehicle.model].filter(Boolean).join(' ');

  return (
    <>
      <div className="vcard">
        <button type="button" className="vphoto-btn" onClick={() => setOpen(true)} aria-label={`Ver ficha de ${title || 'vehículo'}`}>
          <div className="vphoto">
            {vehicle.status === 'sold' && <div className="vbadge">VENDIDO</div>}
            {cover ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={cover} alt={title} />
            ) : (
              <>
                <IconCar />
                <div className="lbl">FOTO DEL VEHÍCULO</div>
              </>
            )}
          </div>
        </button>
        <div className="vinfo">
          <h3>
            {title || 'Vehículo'} {vehicle.version ? <span style={{ opacity: 0.7 }}>{vehicle.version}</span> : null}
          </h3>
          <div className="vspecs">
            {vehicle.year && <span>Año {vehicle.year}</span>}
            {vehicle.km != null && <span>{new Intl.NumberFormat('es-AR').format(vehicle.km)} km</span>}
          </div>
          <div className="vrow">
            <div className="vprice">{formatPrice(vehicle)}</div>
            <button type="button" className="vlink" onClick={() => setOpen(true)}>
              Ver aviso ↗
            </button>
          </div>
        </div>
      </div>
      {open && <VehicleModal vehicle={vehicle} onClose={() => setOpen(false)} />}
    </>
  );
}
