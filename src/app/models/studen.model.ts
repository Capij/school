export interface StudenModel{
    id ?:string,
    groupID:string,
    usersID: Array<string>
    name: string,
    lastName: string,
    money: number,
    groupsID: Array<string>,
    timestap: number
}