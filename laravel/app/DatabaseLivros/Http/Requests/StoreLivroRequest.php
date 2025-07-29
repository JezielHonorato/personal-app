<?php

namespace App\DatabaseLivros\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

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
            'autor_id' => ['nullable', 'integer', Rule::exists('autor', 'id')],
            'genero_id' => ['nullable', 'integer', Rule::exists('genero', 'id')],
            'ano_publicacao' => [
                'nullable',
                'integer',
                'max:'.date('Y'),
                function ($attribute, $value, $fail) {
                    $autorId = $this->input('autor_id');

                    if (! $autorId) {
                        return;
                    }

                    $autor = DB::table('autor')
                        ->where('id', $autorId)
                        ->first();

                    if (! $autor || ! $autor->ano_nascimento) {
                        return;
                    }

                    if ($value < $autor->ano_nascimento) {
                        $fail("O ano de publicação não pode ser anterior ao ano de nascimento do autor ({$autor->ano_nascimento}).");
                    }
                },
            ],
            'lido' => ['required', 'boolean'],
            'arquivo' => ['nullable', 'file', 'mimes:pdf,md,txt', 'max:10240'],
            'capa' => ['nullable', 'file', 'mimes:jpeg,png,jpg,gif,webp', 'max:2048'],
        ];
    }

    public function messages(): array
    {
        return [
            'titulo.required' => 'O título é obrigatório.',
            'titulo.string' => 'O título deve ser um texto.',
            'titulo.max' => 'O título não pode ter mais que 255 caracteres.',

            'titulo_original.string' => 'O título original deve ser um texto.',
            'titulo_original.max' => 'O título original não pode ter mais que 255 caracteres.',

            'autor_id.integer' => 'O autor deve ser um número inteiro.',
            'autor_id.exists' => 'O autor selecionado não existe.',

            'genero_id.integer' => 'O gênero deve ser um número inteiro.',
            'genero_id.exists' => 'O gênero selecionado não existe.',

            'ano_publicacao.integer' => 'O ano de publicação deve ser um número inteiro.',
            'ano_publicacao.max' => 'O ano de publicação não pode ser maior que o ano atual.',

            'lido.required' => 'É necessário informar se o livro foi lido.',
            'lido.boolean' => 'O campo lido deve ser verdadeiro ou falso.',

            'arquivo.file' => 'O arquivo enviado não é válido.',
            'arquivo.mimes' => 'O arquivo deve estar nos formatos: pdf, md ou txt.',
            'arquivo.max' => 'O arquivo não pode ter mais que 10MB.',

            'capa.file' => 'A capa enviada não é válida.',
            'capa.mimes' => 'A capa deve estar nos formatos: jpeg, png, jpg, gif ou webp.',
            'capa.max' => 'A capa não pode ter mais que 2MB.',
        ];
    }
}
