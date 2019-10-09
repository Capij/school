export interface GroupsModel{
    id ?: string,
    name: string,
    studens: number,
    archived: boolean,
    grade: number,
    hour: string,
    subjects:Array<subjet>
    timestap:number,

}

export interface subjet{
    teacherID: string,
    subjet: string
}