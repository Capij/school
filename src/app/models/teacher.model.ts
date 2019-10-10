export interface TeacherModel{
    id ?: string,
    name: string,
    last_name: string,
    email: string,
    deleted: boolean,
    password: string,
    pass:boolean,
    admin: boolean,
    uid: string,
    subjects:Array<string>
    timestap:number
    
}