<?php

use App\DatabaseLivros\Http\Controllers\AutorController;
use App\DatabaseLivros\Http\Controllers\GeneroController;
use App\DatabaseLivros\Http\Controllers\LivroController;
use App\DatabaseLivros\Http\Controllers\PaisController;
use Illuminate\Support\Facades\Route;

Route::apiResource('paises', PaisController::class);
Route::apiResource('autores', AutorController::class);
Route::apiResource('generos', GeneroController::class);
Route::apiResource('livros', LivroController::class);
