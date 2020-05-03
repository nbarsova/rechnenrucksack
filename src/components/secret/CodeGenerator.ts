

export const countMessageSymbols = (secretMessage: string) => {
    let symbols = [];
    for (let i = 0; i < secretMessage.length; i++) {
        let symbol = secretMessage.charAt(i);

        if (isLetter(symbol) && symbols.indexOf(symbol.toUpperCase()) === -1)
            symbols.push(symbol.toUpperCase());
    }
    return symbols;
};

export const isLetter = (symbol: string) => {
    return (symbol.toUpperCase() != symbol.toLowerCase());
};
