<?php

use Illuminate\Support\Facades\Route;

use App\DatabaseLivros\Http\Controllers\PaisController;
use App\DatabaseLivros\Http\Controllers\AutorController;
use App\DatabaseLivros\Http\Controllers\GeneroController;
use App\DatabaseLivros\Http\Controllers\LivroController;

Route::apiResource('paises', PaisController::class);
Route::apiResource('autores', AutorController::class);
Route::apiResource('generos', GeneroController::class);
Route::apiResource('livros', LivroController::class);
