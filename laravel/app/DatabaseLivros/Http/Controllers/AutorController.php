<?php

namespace App\DatabaseLivros\Http\Controllers;

use App\Helpers\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class AutorController
{
	public function index()
	{
		$autores = DB::table('autor')->get();
		return ApiResponse::success($autores, 200);
	}

	public function show(int $id)
	{
		$autor = DB::table('autor')
			->where('id', $id)
			->first();

		return ApiResponse::success($autor, 200);
	}


	public function store(Request $request)
	{
		$validated = $request->validate([
			'nome' => ['required', 'string', 'max:50', 'regex:/^(?=.*\p{L})[\p{L} .]+$/u', 'unique:autor,nome'],
			'ano_nascimento' => ['nullable', 'integer', 'max:' . date('Y')],
			'ano_obito' => ['nullable', 'integer', 'max:' . date('Y')],
			'pais_id' => ['nullable', 'integer', 'exists:pais,id'],
		]);

		DB::table('autor')->insert($validated);

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

		DB::table('autor')
			->where('id', $id)
			->update($validated);

		return ApiResponse::success(null, 201);
	}

	public function destroy($id)
	{
		DB::table('autor')
			->where('id', $id)
			->delete();

		return ApiResponse::success(null, 204);
	}
}
