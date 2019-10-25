export interface StudenModel{
    id ?:string,
    groupID:string,
    usersID: Array<string>
    name: string,
    last_name: string,
    money: number,
    groupsID: Array<string>,
    timestap?: number
}