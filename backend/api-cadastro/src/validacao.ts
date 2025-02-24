export function validarCNPJ(cnpj: string): boolean {
    cnpj = cnpj.replace(/[^\d]+/g, ""); // Remove caracteres não numéricos
  
    if (cnpj.length !== 14) return false;
  
    // Elimina CNPJs com todos os dígitos iguais (ex: "00000000000000")
    if (/^(\d)\1{13}$/.test(cnpj)) return false;
  
    // Cálculo dos dígitos verificadores
    const calcularDigito = (cnpj: string, pos: number): number => {
      const pesos = pos === 12 ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2] : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
      const soma = cnpj.slice(0, pos).split("").reduce((acc, num, i) => acc + parseInt(num) * pesos[i], 0);
      const resto = soma % 11;
      return resto < 2 ? 0 : 11 - resto;
    };
  
    return calcularDigito(cnpj, 12) === parseInt(cnpj[12]) && calcularDigito(cnpj, 13) === parseInt(cnpj[13]);
  }
  