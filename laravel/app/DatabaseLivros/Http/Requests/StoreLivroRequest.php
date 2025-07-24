<?php

namespace App\DatabaseLivros\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\DB;

class StoreLivroRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'titulo' => ['required', 'string', 'max:255'],
            'titulo_original' => ['nullable', 'string', 'max:255'],
            'autor_id' => ['nullable', 'integer', 'exists:autor,id'],
            'genero_id' => ['nullable', 'integer', 'exists:genero,id'],
            'ano_publicacao' => [
                'nullable',
                'integer',
                'max:'.date('Y'),
                function ($attribute, $value, $fail) {
                    $autorId = $this->input('autor_id');

                    if (empty($autorId)) {
                        return;
                    }

                    $autor = DB::table('autor')
                        ->where('id', $autorId)
                        ->first();

                    if (! $autor || empty($autor->ano_nascimento)) {
                        return;
                    }

                    if ($value < $autor->ano_nascimento) {
                        $fail("O :attribute não pode ser menor queo ano de nascimento do autor ({$autor->ano_nascimento}).");
                    }
                },
            ],
            'lido' => ['required', 'boolean'],
            'arquivo' => ['nullable', 'file', 'mimes:pdf,md,txt', 'max:10240'],
            'capa' => ['nullable', 'file', 'mimes:jpeg,png,jpg,gif,webp', 'max:2048'],
        ];
    }
}
