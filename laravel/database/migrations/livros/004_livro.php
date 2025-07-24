<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('livro', function (Blueprint $table) {
            $table->id();
            $table->string('titulo', 255);
            $table->string('titulo_original', 255)->nullable();
            $table->foreignId('autor_id')->nullable()->constrained('autor')->nullOnDelete();
            $table->foreignId('genero_id')->nullable()->constrained('genero')->nullOnDelete();
            $table->integer('ano_publicacao')->nullable();
            $table->boolean('lido')->default(false);
            $table->string('arquivo')->nullable();
            $table->string('capa')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('livro');
    }
};
