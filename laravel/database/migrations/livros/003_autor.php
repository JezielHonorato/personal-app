<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('autor', function (Blueprint $table) {
            $table->id();
            $table->string('nome', 255);
            $table->integer('ano_nascimento')->nullable();
            $table->integer('ano_obito')->nullable();
            $table->foreignId('pais_id')->nullable()->constrained('pais')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('autor');
    }
};
