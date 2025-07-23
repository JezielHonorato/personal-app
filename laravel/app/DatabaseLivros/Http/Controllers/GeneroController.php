<?php

namespace App\DatabaseLivros\Http\Controllers;

use App\Helpers\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class GeneroController
{
	public function index()
	{
		$generos = DB::table('genero')->get();
		return ApiResponse::success($generos, 200);
	}

	public function show(int $id)
	{
		$genero = DB::table('genero')
			->where('id', $id)
			->first();

		return ApiResponse::success($genero, 200);
	}


	public function store(Request $request)
	{
		$validated = $request->validate([
			'nome' => ['required', 'string', 'max:50', 'regex:/^(?=.*[a-zA-Z])[a-zA-Z .]+$/',  'unique:genero,nome'],
		]);

		DB::table('genero')->insert($validated);

		return ApiResponse::success(null, 201);
	}


	public function update(Request $request, int $id)
	{
		$validated = $request->validate([
			'nome' => ['required', 'string', 'max:50', 'regex:/^(?=.*[a-zA-Z])[a-zA-Z .]+$/', Rule::unique('genero')->ignore($id)],
		]);

		DB::table('genero')
			->where('id', $id)
			->update($validated);

		return ApiResponse::success(null, 201);
	}

	public function destroy(int $id)
	{
		DB::table('genero')
			->where('id', $id)
			->delete();

		return ApiResponse::success(null, 204);
	}
}
