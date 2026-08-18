# AUTOSAP San Isidro — sitio + panel de carga

Sitio público (landing con el stock real de autos) + panel `/admin` para cargar,
editar y eliminar vehículos, con fotos. Hecho con **Next.js 14** + **Supabase**
(base de datos, fotos y login) y pensado para desplegarse en **Vercel**.

El proyecto de Supabase (`autosap-san-isidro`) ya está creado y con el esquema
de base de datos, el storage de fotos y las políticas de seguridad (RLS)
aplicados. Solo faltan estos pasos para dejarlo online.

---

## 1. Crear tu usuario admin en Supabase

Vos vas a ser la única persona que puede entrar a `/admin` a cargar autos.

1. Entrá a [supabase.com/dashboard](https://supabase.com/dashboard) → proyecto **autosap-san-isidro**.
2. Andá a **Authentication → Users → Add user → Create new user**.
3. Cargá tu email y una contraseña. Marcá **Auto Confirm User** (para no
   depender de un mail de confirmación).
4. Copiá el **UUID** del usuario que se acaba de crear (columna `UID` en la
   tabla de usuarios).
5. Andá a **SQL Editor** y corré (reemplazando el UUID):

   ```sql
   insert into public.admin_users (id) values ('PEGÁ-ACÁ-EL-UUID');
   ```

Sin este último paso el login funciona pero no vas a poder cargar ni editar
autos (las políticas de seguridad solo dejan escribir a los usuarios que
están en `admin_users`).

## 2. Subir el código a GitHub

Dentro de esta carpeta:

```bash
git init
git add .
git commit -m "Sitio AUTOSAP San Isidro"
```

Creá un repositorio nuevo y vacío en GitHub (sin README, sin .gitignore) y
después:

```bash
git remote add origin https://github.com/TU-USUARIO/autosap-san-isidro.git
git branch -M main
git push -u origin main
```

## 3. Conectar en Vercel

1. Entrá a [vercel.com/new](https://vercel.com/new) e importá el repo que
   acabás de crear.
2. En **Environment Variables** cargá estas dos (están en `.env.example`):

   | Nombre | Valor |
   |---|---|
   | `NEXT_PUBLIC_SUPABASE_URL` | `https://cobnhchpdvaxvrxsbmin.supabase.co` |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `sb_publishable_dASrTeEXIohTf7V-oB8yLg_sJo865hu` |

3. Deploy. En 1-2 minutos vas a tener la URL pública (algo como
   `autosap-san-isidro.vercel.app`).
4. Opcional: en **Settings → Domains** podés conectar un dominio propio
   (ej. `autosapsanisidro.com.ar`) si lo compran más adelante.

## 4. Usar el panel

- Página pública: `https://tu-dominio/`
- Panel de carga: `https://tu-dominio/admin` (pide login)

Desde el panel podés: cargar un vehículo nuevo con fotos (la primera foto
que subís queda como portada), editar cualquier campo, pausar un aviso
(no se muestra en la web pero queda guardado) o marcarlo como vendido, y
eliminarlo.

## Datos que todavía están en placeholder

Buscá estos textos en el código y reemplazalos por los reales:

- **WhatsApp**: `app/page.tsx` y `components/SiteNav.tsx` — número
  `5491100000000` y el texto `+54 9 11 XXXX-XXXX (a confirmar)`.
- **Horario de atención**: `app/page.tsx`, constante `HOURS`.
- **Años de trayectoria**: `app/page.tsx`, el bloque `+X años en San Isidro`.
- **Link de MercadoLibre**: `app/page.tsx`, constante `MERCADOLIBRE_LINK`
  (hoy apunta a una búsqueda genérica, no a la tienda real).

## Notas técnicas

- Auth: Supabase Auth (email + contraseña), una sola cuenta admin. La tabla
  `admin_users` es la lista blanca real — aunque alguien creara una cuenta
  por su cuenta contra la API de Supabase, no podría escribir vehículos si
  no está en esa tabla.
- Fotos: se suben directo desde el navegador al bucket público
  `vehicle-photos` de Supabase Storage.
- El build local se probó en este entorno con `npm run build` (compila y
  tipa OK). El login y la carga de fotos no se pudieron probar en vivo desde
  acá porque este entorno de trabajo no tiene salida de red hacia
  `*.supabase.co` — sí se validó el esquema y las políticas de seguridad
  directamente contra la base de datos real (insert como admin, lectura
  pública, bloqueo de escritura anónima). En Vercel no hay esa restricción,
  así que debería funcionar sin cambios; avisame si algo no anda.
- Hay 2 vulnerabilidades "high" reportadas por `npm audit` en `postcss`
  (dependencia interna de Next.js, solo relevante en build, no en runtime).
  No ameritan saltar a Next 15/16 todavía; se puede revisar más adelante.
