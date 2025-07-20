<?php

namespace App\Http\Controllers;

use App\Models\Livro;
use App\Http\Requests\StoreLivroRequest;
use App\Http\Requests\UpdateLivroRequest;

class LivroController extends Controller
{
	public function index()
	{
		return Livro::with(['autor', 'genero'])->orderBy('titulo')->get();
	}

	public function store(StoreLivroRequest $request)
	{
		$validated = $request->validated();

		if ($request->hasFile('arquivo')) {
			$validated['arquivo'] = $request->file('arquivo')->store('arquivos', 'livros_externo');
		}

		if ($request->hasFile('capa')) {
			$validated['capa'] = $request->file('capa')->store('capas', 'livros_externo');
		}

		$livro = Livro::create($validated);

		return response()->json($livro->load(['autor', 'genero']), 201);
	}

	public function update(UpdateLivroRequest $request, Livro $livro)
	{
		$validated = $request->validated();

		if ($request->hasFile('arquivo')) {
			$validated['arquivo'] = $request->file('arquivo')->store('arquivos', 'livros_externo');
		}

		if ($request->hasFile('capa')) {
			$validated['capa'] = $request->file('capa')->store('capas', 'livros_externo');
		}

		$livro->update($validated);

		return $livro->load(['autor', 'genero']);
	}

	public function destroy(Livro $livro)
	{
		$livro->delete();
		return response()->json(null, 204);
	}
}
