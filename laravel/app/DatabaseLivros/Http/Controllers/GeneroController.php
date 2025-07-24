<?php

use App\DatabaseLivros\Models\Genero;
use App\Helpers\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class GeneroController
{
    public function index()
    {
        $generos = Genero::all();

        return ApiResponse::success($generos, 200);
    }

    public function show(int $id)
    {
        $genero = Genero::findOrFail($id);

        return ApiResponse::success($genero, 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nome' => ['required', 'string', 'max:50', 'regex:/^(?=.*[a-zA-Z])[a-zA-Z .]+$/', 'unique:genero,nome'],
        ]);

        Genero::create($validated);

        return ApiResponse::success(null, 201);
    }

    public function update(Request $request, int $id)
    {
        $validated = $request->validate([
            'nome' => ['required', 'string', 'max:50', 'regex:/^(?=.*[a-zA-Z])[a-zA-Z .]+$/', Rule::unique('genero')->ignore($id)],
        ]);

        Genero::findOrFail($id)
            ->update($validated);

        return ApiResponse::success(null, 201);
    }

    public function destroy(int $id)
    {
        Genero::findOrFail($id)
            ->delete();

        return ApiResponse::success(null, 204);
    }
}
