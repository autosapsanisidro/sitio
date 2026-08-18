import type { Vehicle } from '@/lib/types';
import { IconCar } from './icons';

function formatPrice(v: Vehicle) {
  if (v.price == null) return 'Consultar precio';
  const n = new Intl.NumberFormat('es-AR').format(v.price);
  return `${v.currency === 'USD' ? 'US$' : '$'} ${n}`;
}

export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const cover = vehicle.photos?.[0];
  const title = [vehicle.brand, vehicle.model].filter(Boolean).join(' ');
  const href = vehicle.mercadolibre_url || '#contacto';

  return (
    <div className="vcard">
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
          <a className="vlink" href={href} target={vehicle.mercadolibre_url ? '_blank' : undefined} rel="noreferrer">
            Ver aviso ↗
          </a>
        </div>
      </div>
    </div>
  );
}
