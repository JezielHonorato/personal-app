<?php

namespace App\DatabaseLivros\Http\Controllers;

use App\DatabaseLivros\Http\Requests\StoreLivroRequest;
use App\DatabaseLivros\Http\Requests\UpdateLivroRequest;
use App\DatabaseLivros\Models\Livro;
use App\Helpers\ApiResponse;

class LivroController
{
    public function index()
    {
        $livros = Livro::with(['autor', 'genero'])
            ->get();

        return ApiResponse::success($livros, 201);
    }

    public function show($id)
    {
        $livro = Livro::with(['autor', 'genero'])
            ->findOrFail($id);

        return ApiResponse::success($livro, 201);
    }

    public function store(StoreLivroRequest $request)
    {
        $validated = $request->validated();

        if ($request->hasFile('arquivo')) {
            $validated['arquivo'] = $request->file('arquivo')->store('livros/arquivos', 'assets_externo');
        }

        if ($request->hasFile('capa')) {
            $validated['capa'] = $request->file('capa')->store('livros/capas', 'assets_externo');
        }

        Livro::create($validated);

        return ApiResponse::success(null, 201);
    }

    public function update(UpdateLivroRequest $request, int $id)
    {
        $validated = $request->validated();

        if ($request->hasFile('arquivo')) {
            $validated['arquivo'] = $request->file('arquivo')->store('livros/arquivos', 'assets_externo');
        }

        if ($request->hasFile('capa')) {
            $validated['capa'] = $request->file('capa')->store('livros/capas', 'assets_externo');
        }

        Livro::findOrFail($id)
            ->update($validated);

        return ApiResponse::success(null, 201);
    }

    public function destroy(int $id)
    {
        Livro::findOrFail($id)
            ->delete();

        return ApiResponse::success(null, 204);
    }
}
