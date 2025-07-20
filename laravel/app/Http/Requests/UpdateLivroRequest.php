<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateLivroRequest extends FormRequest
{
	public function authorize()
	{
		return true;
	}

	public function rules()
	{
		return [
			'titulo' => 'sometimes|required|string|max:255',
			'titulo_original' => 'nullable|string|max:255',
			'autor_id' => 'nullable|exists:autors,id',
			'genero_id' => 'nullable|exists:generos,id',
			'ano_publicacao' => 'nullable|integer|max:' . date('Y'),
			'lido' => 'boolean',
			'arquivo' => 'nullable|file|mimes:pdf',
			'capa' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp',
		];
	}
}
