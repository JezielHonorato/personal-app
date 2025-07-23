<?php

namespace App\DatabaseLivros\Http\Controllers;

use App\Helpers\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class PaisController
{
	public function index()
	{
		$paises = DB::table('pais')->get();
		return ApiResponse::success($paises, 200);
	}

	public function show(int $id)
	{
		$pais = DB::table('pais')
			->where('id', $id)
			->first();

		return ApiResponse::success($pais, 200);
	}


	public function store(Request $request)
	{
		$validated = $request->validate([
			'nome' => ['required', 'string', 'max:50', 'regex:/^(?=.*\p{L})[\p{L} .]+$/u',  'unique:pais,nome'],
		]);

		DB::table('pais')->insert($validated);

		return ApiResponse::success(null, 201);
	}


	public function update(Request $request, int $id)
	{
		$validated = $request->validate([
			'nome' => ['required', 'string', 'max:50', 'regex:/^(?=.*\p{L})[\p{L} .]+$/u', Rule::unique('pais')->ignore($id)],
		]);

		DB::table('pais')
			->where('id', $id)
			->update($validated);

		return ApiResponse::success(null, 201);
	}

	public function destroy(int $id)
	{
		DB::table('pais')
			->where('id', $id)
			->delete();

		return ApiResponse::success(null, 204);
	}
}
