<?php

namespace App\DatabaseLivros\Http\Controllers;

use App\DatabaseLivros\Http\Requests\StoreLivroRequest;
use App\DatabaseLivros\Http\Requests\UpdateLivroRequest;
use App\Helpers\ApiResponse;
use Illuminate\Support\Facades\DB;

class LivroController
{
	public function index()
	{
		$livros = DB::table('livro')->get();

		return ApiResponse::success($livros, 201);
	}

	public function show($id)
	{
		$livro = DB::table('livro')
			->where('id', $id)
			->first();

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

		DB::table('livro')->insert($validated);

		return ApiResponse::success(null, 201);
	}

	public function update(UpdateLivroRequest $request, int $id)
	{
		$validated = $request->validated();

		if ($request->hasFile('arquivo')) {
			$validated['arquivo'] = $request->file('arquivo')->store('arquivos', 'livros_externo');
		}

		if ($request->hasFile('capa')) {
			$validated['capa'] = $request->file('capa')->store('capas', 'livros_externo');
		}

		DB::table('livro')
			->where('id', $id)
			->update($validated);

		return ApiResponse::success(null, 201);
	}

	public function destroy(int $id)
	{
		DB::table('livro')
			->where('id', $id)
			->delete();

		return ApiResponse::success(null, 204);
	}
}
