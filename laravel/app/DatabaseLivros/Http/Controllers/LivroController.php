<?php

namespace App\DatabaseLivros\Http\Controllers;

use App\DatabaseLivros\Http\Requests\StoreLivroRequest;
use App\DatabaseLivros\Http\Requests\UpdateLivroRequest;
use App\DatabaseLivros\Models\Livro;
use App\Helpers\ApiResponse;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

class LivroController
{
    public function index()
    {
        $livros = Livro::with(['autor', 'genero'])->get();

        foreach ($livros as $livro) {
            if ($livro->capa) {
                $livro->capa = url('api/livros/capa/'.basename($livro->capa));
            }
        }

        return ApiResponse::success($livros, 201);
    }

    public function show($id)
    {
        $livro = Livro::with(['autor', 'genero'])
            ->findOrFail($id);

        return ApiResponse::success($livro, 201);
    }

    public function store(StoreLivroRequest $request)
    {
        $validated = $request->validated();

        if ($request->hasFile('arquivo')) {
            $validated['arquivo'] = $request->file('arquivo')->store('livros/arquivos', 'assets_externo');
        }

        if ($request->hasFile('capa')) {
            $validated['capa'] = $request->file('capa')->store('livros/capas', 'assets_externo');
        }

        Livro::create($validated);

        return ApiResponse::success(null, 201);
    }

    public function update(UpdateLivroRequest $request, int $id)
    {
        $livro = Livro::findOrFail($id);
        $validated = $request->validated();

        if ($request->hasFile('arquivo')) {
            if ($livro->arquivo && Storage::disk('assets_externo')->exists($livro->arquivo)) {
                Storage::disk('assets_externo')->delete($livro->arquivo);
            }
            $validated['arquivo'] = $request->file('arquivo')->store('livros/arquivos', 'assets_externo');
        } else {
            if (! isset($validated['arquivo'])) {
                $validated['arquivo'] = $livro->arquivo;
            }
        }

        if ($request->hasFile('capa')) {
            if ($livro->capa && Storage::disk('assets_externo')->exists($livro->capa)) {
                Storage::disk('assets_externo')->delete($livro->capa);
            }
            $validated['capa'] = $request->file('capa')->store('livros/capas', 'assets_externo');
        } else {
            if (! isset($validated['capa'])) {
                $validated['capa'] = $livro->capa;
            }
        }

        $livro->update($validated);

        return ApiResponse::success(null, 201);
    }

    public function destroy(int $id)
    {
        $livro = Livro::findOrFail($id);

        if ($livro->arquivo && Storage::disk('assets_externo')->exists($livro->arquivo)) {
            Storage::disk('assets_externo')->delete($livro->arquivo);
        }

        if ($livro->capa && Storage::disk('assets_externo')->exists($livro->capa)) {
            Storage::disk('assets_externo')->delete($livro->capa);
        }

        $livro->delete();

        return ApiResponse::success(null, 204);
    }

    public function conteudo(int $id)
    {
        $livro = Livro::findOrFail($id);

        if (empty($livro->arquivo)) {
            return ApiResponse::error('Este livro não possui um arquivo associado.', 404);
        }

        $filePath = $livro->arquivo;
        $disk = Storage::disk('assets_externo');

        if (! $disk->exists($filePath)) {
            return ApiResponse::error('Arquivo não encontrado no servidor.', 404);
        }

        $extension = pathinfo($filePath, PATHINFO_EXTENSION);

        try {
            switch (strtolower($extension)) {
                case 'txt':
                    $content = $disk->get($filePath);

                    return ApiResponse::success(['type' => 'txt', 'content' => $content]);
                case 'md':
                    $content = $disk->get($filePath);

                    return ApiResponse::success(['type' => 'md', 'content' => $content, 'content_html' => '<!-- Conteúdo Markdown para HTML seria gerado aqui -->']);
                case 'pdf':
                    $downloadUrl = route('livros.download', ['id' => $livro->id]);

                    return ApiResponse::success(['type' => 'pdf', 'url' => $downloadUrl]);
                default:
                    return ApiResponse::error('Formato de arquivo não suportado.', 400);
            }
        } catch (\Exception $e) {
            return ApiResponse::error($e->getMessage(), 500);
        }
    }

    public function download(int $id)
    {
        $livro = Livro::findOrFail($id);

        if (empty($livro->arquivo)) {
            return ApiResponse::error('Arquivo não encontrado para este livro.', 404);
        }

        $filePath = $livro->arquivo;
        $disk = Storage::disk('assets_externo');

        if (! $disk->exists($filePath) || strtolower(pathinfo($filePath, PATHINFO_EXTENSION)) !== 'pdf') {
            return ApiResponse::error('O arquivo não é um PDF ou não foi encontrado.', 404);
        }
        $fileName = basename($filePath);

        return new StreamedResponse(function () use ($disk, $filePath) {
            $stream = $disk->readStream($filePath);
            fpassthru($stream);
            if (is_resource($stream)) {
                fclose($stream);
            }
        }, 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'attachment; filename="'.$fileName.'"',
        ]);
    }
}
