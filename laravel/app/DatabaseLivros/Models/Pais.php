<?php

namespace App\DatabaseLivros\Models;

use Illuminate\Database\Eloquent\Model;

class Pais extends Model
{
    protected $table = 'pais';

    protected $fillable = [
        'nome',
    ];

    public function autores()
    {
        return $this->hasMany(Autor::class);
    }
}
