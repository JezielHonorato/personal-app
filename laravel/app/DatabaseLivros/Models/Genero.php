<?php

namespace App\DatabaseLivros\Models;

use Illuminate\Database\Eloquent\Model;

class Genero extends Model
{
    protected $table = 'genero';

    protected $fillable = [
        'nome',
    ];

    public function livrosDoGenero()
    {
        return $this->hasMany(Livro::class, 'genero_id');
    }

    public $timestamps = false;
}
