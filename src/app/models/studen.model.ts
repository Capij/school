import { GroupsModel } from './groups.model';

export interface StudenModel{
    id ?:string,
    groupID: GroupsModel,
    usersID: Array<string>
    name: string,
    last_name: string,
    money: number,
    groupsID: Array<string>,
    timestap?: number
}
