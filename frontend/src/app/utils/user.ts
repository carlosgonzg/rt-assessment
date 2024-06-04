import { UserDetail } from "./userDetail";

export interface User {
    id: number,
    name: string,
    age: number,
    details: UserDetail[]
}

function createData(
    id: number,
    name: string,
): User {
    return {
        id,
        name,
        age: Math.ceil(Math.random() * 10) + 20,
        details: new Array(Math.ceil(Math.random() * 10)).fill(0).map((_, i: number) => {
            return {
                id: i,
                created: new Date(new Date().getFullYear(), new Date().getMonth() + i, 15, Math.ceil(Math.random() * 24), Math.ceil(Math.random() * 60), Math.ceil(Math.random() * 60)),
                calories: Math.floor(Math.random() * 20),
                fat: Math.floor(Math.random() * 20),
                carbs: Math.floor(Math.random() * 20),
                protein: Math.floor(Math.random() * 20),
            } as UserDetail
        })
    }
}

export function getData() {
    return [
        createData(1, 'Carlos Gonzalez'),
        createData(2, 'Maria Becerra'),
        createData(3, 'Mariana Montclair'),
        createData(4, 'Kira Akibahara'),
        createData(5, 'Paula Barrera'),
    ];
}