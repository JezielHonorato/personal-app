<?php

namespace App\DatabaseLivros\Http\Controllers;

use App\DatabaseLivros\Models\Autor;
use App\Helpers\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AutorController
{
    public function index()
    {
        $autores = Autor::with(['pais'])
            ->get();

        return ApiResponse::success($autores, 200);
    }

    public function show(int $id)
    {
        $autor = Autor::with(['pais'])
            ->findOrFail($id);

        return ApiResponse::success($autor, 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nome' => ['required', 'string', 'max:50', 'regex:/^(?=.*\p{L})[\p{L} .]+$/u', 'unique:autor,nome'],
            'ano_nascimento' => ['nullable', 'integer', 'max:'.date('Y')],
            'ano_obito' => ['nullable', 'integer', 'min:'.($request->input('ano_nascimento') ?? -9999), 'max:'.date('Y')],
            'pais_id' => ['nullable', 'integer', 'exists:pais,id'],
        ]);

        Autor::create($validated);

        ApiResponse::success(null, 201);
    }

    public function update(Request $request, int $id)
    {
        $validated = $request->validate([
            'nome' => ['required', 'string', 'max:50', 'regex:/^(?=.*\p{L})[\p{L} .]+$/u', Rule::unique('autor')->ignore($id)],
            'ano_nascimento' => ['nullable', 'integer'],
            'ano_obito' => ['nullable', 'integer'],
            'pais_id' => ['nullable', 'integer'],
        ]);

        Autor::findOrFail($id)
            ->update($validated);

        return ApiResponse::success(null, 201);
    }

    public function destroy($id)
    {
        Autor::findOrFail($id)
            ->delete();

        return ApiResponse::success(null, 204);
    }
}
