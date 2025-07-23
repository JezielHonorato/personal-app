<?php

namespace App\Helpers;

use Throwable;

class ApiResponse
{
	public static function success($data = null, int $code = 200)
	{
		return response()->json($data, $code);
	}

	public static function error(string $mensagem = 'Falha na Requisição', int $code = 400, ?array $errors = null, ?Throwable $exception = null)
	{
		$response = [
			'message' => $mensagem,
		];

		if (!empty($errors)) {
			$response['errors']['details'] = $errors;
		}

		if ($exception instanceof Throwable) {
			$response['errors']['internal_message'] = $exception->getMessage();

			if (app()->environment('local', 'staging')) {
				$response['errors']['trace'] = collect($exception->getTrace())
					->map(function ($item) {
						return [
							'file'     => $item['file'] ?? 'N/A',
							'line'     => $item['line'] ?? 'N/A',
							'function' => $item['function'] ?? 'N/A',
							'class'    => $item['class'] ?? 'N/A',
							'type'     => $item['type'] ?? 'N/A',
						];
					})
					->take(5)
					->toArray();
			}
		}

		return response()->json($response, $code);
	}
}
