<?php

namespace App\DatabaseLivros\Models;

use Illuminate\Database\Eloquent\Model;

class Autor extends Model
{
    protected $table = 'autor';

    protected $fillable = [
        'nome',
        'ano_nascimento',
        'ano_obito',
        'pais_id',
    ];

    public function pais()
    {
        return $this->belongsTo(Pais::class);
    }

    public function livrosDoAutor()
    {
        return $this->hasMany(Livro::class, 'autor_id');
    }

    public $timestamps = false;
}
