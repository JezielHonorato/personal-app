export function validar(value: any): boolean {
    return !value || (typeof value === 'string' && value.trim() === '') ? false : true;
}

export function validarNome(string: string): boolean {
    const nameRegex = /^(?=.*[a-zA-Z])[a-zA-Z .]+$/;
    return nameRegex.test(string);
}