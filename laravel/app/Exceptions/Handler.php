<?php

namespace App\Exceptions;

use App\Helpers\ApiResponse;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Throwable;

class Handler extends ExceptionHandler
{
	protected $levels = [
		//
	];

	protected $dontReport = [
		//
	];

	protected $dontFlash = [
		'current_password',
		'password',
		'password_confirmation',
	];

	public function register(): void
	{
		//
	}

	public function render($request, Throwable $exception)
	{
		if ($exception instanceof ValidationException) {
			return ApiResponse::error(
				'Falha na validação dos dados.',
				422,
				$exception->errors()
			);
		}

		return ApiResponse::error(
			'Erro interno no servidor.',
			500,
			null,
			app()->environment(['local', 'staging']) ? $exception : null
		);
	}
}
