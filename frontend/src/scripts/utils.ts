export const calculateCategoryFromDOB = (birthDate: Date): `U${number}` => {
    const diff_ms = Date.now() - birthDate.getTime();
    const age_dt = new Date(diff_ms); 
    return `U${Math.abs(age_dt.getUTCFullYear() - 1970)}`
}

export const range = (max: number) : number[] => {
    return Array.from({length: max}, (_, i) => i);
}


export const parseStringToFormat = (str: string): string => {
    let val = str.trim().replace(' ', '');
    if (val[0] !== '+' && val[0] !== '-') {
        val = `-${val}`;
    }
    if (val.includes('kg')) return val;
    return `${val}kg`;
};


export const arrStringToArr = (str: string): string[] => {
    try {
        return JSON.parse(str) as string[];
    } catch (err) {
        return [];
    }
};
