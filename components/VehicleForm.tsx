'use client';

import { useRef, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import type { Fuel, Transmission, Vehicle, VehicleStatus } from '@/lib/types';

type Props = {
  mode: 'create' | 'edit';
  vehicle?: Vehicle;
};

export default function VehicleForm({ mode, vehicle }: Props) {
  const router = useRouter();
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [brand, setBrand] = useState(vehicle?.brand ?? '');
  const [model, setModel] = useState(vehicle?.model ?? '');
  const [version, setVersion] = useState(vehicle?.version ?? '');
  const [year, setYear] = useState(vehicle?.year?.toString() ?? '');
  const [km, setKm] = useState(vehicle?.km?.toString() ?? '');
  const [price, setPrice] = useState(vehicle?.price?.toString() ?? '');
  const [currency, setCurrency] = useState(vehicle?.currency ?? 'ARS');
  const [transmission, setTransmission] = useState<Transmission | ''>(vehicle?.transmission ?? '');
  const [fuel, setFuel] = useState<Fuel | ''>(vehicle?.fuel ?? '');
  const [color, setColor] = useState(vehicle?.color ?? '');
  const [description, setDescription] = useState(vehicle?.description ?? '');
  const [status, setStatus] = useState<VehicleStatus>(vehicle?.status ?? 'published');
  const [featured, setFeatured] = useState(vehicle?.featured ?? false);
  const [mercadolibreUrl, setMercadolibreUrl] = useState(vehicle?.mercadolibre_url ?? '');
  const [photos, setPhotos] = useState<string[]>(vehicle?.photos ?? []);

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const vehicleIdRef = useRef<string>(vehicle?.id ?? crypto.randomUUID());

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError(null);
    try {
      const uploaded: string[] = [];
      for (const file of Array.from(files)) {
        const ext = file.name.split('.').pop() || 'jpg';
        const path = `${vehicleIdRef.current}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from('vehicle-photos')
          .upload(path, file, { cacheControl: '3600', upsert: false });
        if (uploadError) throw uploadError;
        const { data } = supabase.storage.from('vehicle-photos').getPublicUrl(path);
        uploaded.push(data.publicUrl);
      }
      setPhotos((prev) => [...prev, ...uploaded]);
    } catch (err: any) {
      setError(err.message || 'No se pudieron subir las fotos.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  function removePhoto(url: string) {
    setPhotos((prev) => prev.filter((p) => p !== url));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!brand.trim() || !model.trim()) {
      setError('Marca y modelo son obligatorios.');
      return;
    }

    setSaving(true);
    const payload = {
      brand: brand.trim(),
      model: model.trim(),
      version: version.trim() || null,
      year: year ? parseInt(year, 10) : null,
      km: km ? parseInt(km, 10) : null,
      price: price ? parseFloat(price) : null,
      currency,
      transmission: transmission || null,
      fuel: fuel || null,
      color: color.trim() || null,
      description: description.trim() || null,
      status,
      featured,
      mercadolibre_url: mercadolibreUrl.trim() || null,
      photos,
    };

    let saveError;
    if (mode === 'create') {
      ({ error: saveError } = await supabase
        .from('vehicles')
        .insert({ id: vehicleIdRef.current, ...payload }));
    } else {
      ({ error: saveError } = await supabase
        .from('vehicles')
        .update(payload)
        .eq('id', vehicleIdRef.current));
    }

    setSaving(false);

    if (saveError) {
      setError(saveError.message);
      return;
    }

    router.push('/admin');
    router.refresh();
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      {error && <div className="form-error">{error}</div>}

      <div className="field">
        <label>Fotos</label>
        {photos.length > 0 && (
          <div className="photo-grid">
            {photos.map((url, i) => (
              <div className="photo-tile" key={url}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt={`Foto ${i + 1}`} />
                {i === 0 && <span className="cover-badge">Portada</span>}
                <button type="button" onClick={() => removePhoto(url)} aria-label="Quitar foto">
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
        <label className="upload-dropzone">
          {uploading ? 'Subiendo…' : 'Tocá para elegir fotos (la primera queda como portada)'}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleFiles(e.target.files)}
            disabled={uploading}
          />
        </label>
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="brand">Marca *</label>
          <input id="brand" type="text" value={brand} onChange={(e) => setBrand(e.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="model">Modelo *</label>
          <input id="model" type="text" value={model} onChange={(e) => setModel(e.target.value)} required />
        </div>
      </div>

      <div className="field">
        <label htmlFor="version">Versión</label>
        <input id="version" type="text" placeholder="Ej: 1.6 GLS Automática" value={version} onChange={(e) => setVersion(e.target.value)} />
      </div>

      <div className="field-row-3">
        <div className="field">
          <label htmlFor="year">Año</label>
          <input id="year" type="number" value={year} onChange={(e) => setYear(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="km">Kilometraje</label>
          <input id="km" type="number" value={km} onChange={(e) => setKm(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="color">Color</label>
          <input id="color" type="text" value={color} onChange={(e) => setColor(e.target.value)} />
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="price">Precio</label>
          <input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="currency">Moneda</label>
          <select id="currency" value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <option value="ARS">ARS — Pesos</option>
            <option value="USD">USD — Dólares</option>
          </select>
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="transmission">Transmisión</label>
          <select id="transmission" value={transmission} onChange={(e) => setTransmission(e.target.value as Transmission)}>
            <option value="">Sin especificar</option>
            <option value="manual">Manual</option>
            <option value="automatica">Automática</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="fuel">Combustible</label>
          <select id="fuel" value={fuel} onChange={(e) => setFuel(e.target.value as Fuel)}>
            <option value="">Sin especificar</option>
            <option value="nafta">Nafta</option>
            <option value="diesel">Diésel</option>
            <option value="gnc">GNC</option>
            <option value="hibrido">Híbrido</option>
            <option value="electrico">Eléctrico</option>
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="description">Descripción</label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Detalles del vehículo, estado, equipamiento…" />
      </div>

      <div className="field">
        <label htmlFor="ml">Link del aviso en MercadoLibre</label>
        <input id="ml" type="url" placeholder="https://auto.mercadolibre.com.ar/..." value={mercadolibreUrl} onChange={(e) => setMercadolibreUrl(e.target.value)} />
      </div>

      <div className="field">
        <label htmlFor="status">Estado</label>
        <select id="status" value={status} onChange={(e) => setStatus(e.target.value as VehicleStatus)}>
          <option value="published">Publicado (visible en la web)</option>
          <option value="paused">Pausado (oculto, no aparece en la web)</option>
          <option value="sold">Vendido</option>
        </select>
      </div>

      <div className="checkbox-row">
        <input id="featured" type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
        <label htmlFor="featured">Destacar este vehículo primero en la portada</label>
      </div>

      <div className="form-actions">
        <button className="btn-primary" type="submit" disabled={saving || uploading}>
          {saving ? 'Guardando…' : mode === 'create' ? 'Publicar vehículo' : 'Guardar cambios'}
        </button>
        <button
          className="btn-outline"
          type="button"
          onClick={() => router.push('/admin')}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
