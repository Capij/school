import { StudenModel } from './studen.model';

export interface UsersModel{
    id ?:string
    name:string,
    email:string,
    deleted:boolean,
    password: string,
    pass:boolean,
    uid:string,
    students: Array<string>
}