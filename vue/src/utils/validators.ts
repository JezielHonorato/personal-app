export function validarPreenchimento(entrada: any): boolean {
    if (typeof entrada === 'string') {
        return entrada.trim().length > 0;
    }

    if (typeof entrada === 'number') {
        return !isNaN(entrada);
    }

    return !!entrada;
}

export function validarNome(string: string): boolean {
    const nameRegex: RegExp = /^(?=.*[a-zA-Z])[a-zA-Z .]+$/;
    return nameRegex.test(string);
}
