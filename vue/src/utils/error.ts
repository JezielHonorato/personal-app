type ErroInfo = {
    code: number;
    message: string;
};

const errorMessage: Record<number, ErroInfo> = {
    400: { code: 400, message: 'Requisição inválida. Por favor, verifique os dados enviados.' },
    401: { code: 401, message: 'Não autorizado. Por favor, faça login novamente.' },
    403: { code: 403, message: 'Acesso negado. Você não tem permissão para realizar esta ação.' },
    404: { code: 404, message: 'Recurso não encontrado. A página ou item que você procura não existe.' },
    405: { code: 405, message: 'Método não permitido. A ação solicitada não é suportada para este recurso.' },
    409: { code: 409, message: 'Conflito. O recurso que você está tentando criar já existe ou há um problema de concorrência.' },
    422: { code: 422, message: 'Dados inválidos. Erros de validação nos campos enviados.' },
    500: { code: 500, message: 'Erro interno do servidor. Por favor, tente novamente mais tarde.' },
    502: { code: 502, message: 'Gateway inválido. O servidor está fora do ar ou inacessível.' },
    503: { code: 503, message: 'Serviço indisponível. O servidor está temporariamente sobrecarregado ou em manutenção.' },
};

export function getMensagemErro(statusCode: number, defaultMessage: string = 'Ocorreu um erro inesperado.'): ErroInfo {
    const error = errorMessage[statusCode];

    if (!error) {
        if (import.meta.env.MODE === 'development') {
            console.warn(`Código de erro não tratado: ${statusCode}`);
        }

        return { code: statusCode, message: defaultMessage };
    }

    return error;
}

export function tratarErro(err: unknown, padrao: string): string[] {
    return Array.isArray(err) ? err : [padrao];
}
