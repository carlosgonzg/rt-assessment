import { UserDetail } from "./userDetail";

export interface User {
    id: number,
    name: string,
    age: number,
    details: UserDetail[]
}