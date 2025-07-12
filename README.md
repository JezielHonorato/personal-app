## Backend
Ativar o Backend

### Django
Testando o django

```bash
python manage.py runserver
```
Banco de dados
```bash
python manage.py makemigrations
python manage.py migrate
```

### Laravel
Usando o laravel como api.

Necessário ter o php e o composer instalado.
Baixar o laravel pelo composer.
Iniciar aplicação laravel.

```bash
composer global require laravel/installer
laravel new laravel
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
