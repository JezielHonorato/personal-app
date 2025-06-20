## Backend
Ativar o Backend

```bash
python manage.py runserver
```

## Frontend
Ativar o Frontend

```bash
npm run dev
```

### Tailwind
instalar o taiwlind
```bash
npm install tailwindcss @tailwindcss/vite
```

No vite.config.ts
```bash
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
```

No style.css
```bash
@import "tailwindcss";
```
