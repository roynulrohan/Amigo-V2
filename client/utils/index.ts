import { rejects } from 'assert';

export const doesImageExist = (url: string) =>
    new Promise((resolve, reject) => {
        const img = new Image();

        img.src = url;

        img.onload = () => resolve(true);
        img.onerror = () => reject(true);
    });
