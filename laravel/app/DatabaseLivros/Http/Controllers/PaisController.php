<?php

namespace App\DatabaseLivros\Http\Controllers;

use App\DatabaseLivros\Models\Pais;
use App\Helpers\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class PaisController
{
    public function index()
    {
        $paises = Pais::all();

        return ApiResponse::success($paises, 200);
    }

    public function show(int $id)
    {
        $pais = Pais::findOrFail($id);

        return ApiResponse::success($pais, 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nome' => ['required', 'string', 'max:50', 'regex:/^(?=.*\p{L})[\p{L} .]+$/u',  'unique:pais,nome'],
        ]);

        Pais::create($validated);

        return ApiResponse::success(null, 201);
    }

    public function update(Request $request, int $id)
    {
        $validated = $request->validate([
            'nome' => ['required', 'string', 'max:50', 'regex:/^(?=.*\p{L})[\p{L} .]+$/u', Rule::unique('pais')->ignore($id)],
        ]);

        Pais::findOrFail($id)
            ->update($validated);

        return ApiResponse::success(null, 201);
    }

    public function destroy(int $id)
    {
        Pais::findOrFail($id)
            ->delete();

        return ApiResponse::success(null, 204);
    }
}
