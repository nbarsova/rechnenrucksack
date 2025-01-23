export const EQUATIONS_PARAMETER_NAME = 'equations';
export const TARGETS_PARAMETER_NAME = 'targets';
export const NUMBER_RANGE_PARAMETER_NAME = 'numberRange';
export const CURRENT_TARGET_PARAMETER_NAME = 'currentTarget';
export const LOCALE_PARAMETER_NAME = 'locale';
export const NAME_DATE_PARAMETER = 'nameDate';
export const LETTER_CODES_PARAMETER_NAME = 'letterCodes';
export const SECRET_MESSAGE_PARAMETER_NAME = 'secretMessage';
export const MONSTERS_AMOUNT_PARAMETER_NAME = 'monstersAMOUNT';
export const DIRECTIONS_PARAMETER_NAME = 'mapDirections';

export const setInStorage = (parameterName: string, value: string): void => {
    window.localStorage.setItem(parameterName, value);
};

export const getFromStorage = (parameterName: string): string | null => {
    const paramValue = window.localStorage.getItem(parameterName);
    // window.localStorage.removeItem(parameterName);
    return paramValue;
};

export const removeFromStorage = (parameterName: string): void => {
    window.localStorage.removeItem(parameterName);
}
