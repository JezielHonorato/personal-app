<?php

use App\DatabaseLivros\Http\Controllers\AutorController;
use App\DatabaseLivros\Http\Controllers\GeneroController;
use App\DatabaseLivros\Http\Controllers\LivroController;
use App\DatabaseLivros\Http\Controllers\PaisController;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Route;

Route::apiResource('paises', PaisController::class);
Route::apiResource('autores', AutorController::class);
Route::apiResource('generos', GeneroController::class);
Route::apiResource('livros', LivroController::class);

Route::get('/livros/capa/{nomeArquivo}', function ($nomeArquivo) {
    $caminho = base_path('../assets/livros/capas/'.$nomeArquivo);

    if (! File::exists($caminho)) {
        abort(404, 'Capa não encontrada.');
    }

    return Response::file($caminho, [
        'Content-Type' => File::mimeType($caminho),
        'Cache-Control' => 'max-age=86400, public',
    ]);
})->where('nomeArquivo', '.*');

Route::get('/livros/{id}/conteudo', [LivroController::class, 'conteudo'])->name('livros.conteudo');
Route::get('/livros/{id}/download', [LivroController::class, 'download'])->name('livros.download');
