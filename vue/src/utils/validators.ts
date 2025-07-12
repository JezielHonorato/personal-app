export function validarPreencimento(entrada: any): boolean {
    if (typeof entrada === 'string') {
        return entrada.trim().length > 0;
    }

    if (typeof entrada === 'number') {
        return !isNaN(entrada);
    }

    return !!entrada;
}

export function validarNome(string: string): boolean {
    const nameRegex = /^(?=.*[a-zA-Z])[a-zA-Z .]+$/;
    return nameRegex.test(string);
}
