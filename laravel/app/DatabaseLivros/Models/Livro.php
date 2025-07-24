<?php

namespace App\DatabaseLivros\Models;

use Illuminate\Database\Eloquent\Model;

class Livro extends Model
{
    protected $table = 'livro';

    protected $fillable = [
        'titulo',
        'titulo_original',
        'autor_id',
        'genero_id',
        'ano_publicacao',
        'lido',
        'arquivo',
        'capa',
    ];

    public function autor()
    {
        return $this->belongsTo(Autor::class);
    }

    public function genero()
    {
        return $this->belongsTo(Genero::class);
    }
}
