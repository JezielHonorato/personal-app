import { API_URL } from '@/config/api';
import { createApi } from './apiService';

import { tableLivro } from './databaseLivro/tableLivro';
import { tableAutor } from './databaseLivro/tableAutor';
import { tablePais } from './databaseLivro/tablePais';
import { tableGenero } from './databaseLivro/tableGenero';

let services;

const apiService = createApi(API_URL);

services = {
    livros: tableLivro(apiService),
    autores: tableAutor(apiService),
    generos: tableGenero(apiService),
    paises: tablePais(apiService),
};

export const api = services;
