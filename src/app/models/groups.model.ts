import { TeacherModel } from './teacher.model';

export interface GroupsModel{
    id ?: string,
    name ?: string,
    teacher ?: TeacherModel,
    studens ?: number,
    archived ?: boolean,
    grade ?: number,
    week ?: DaysModel,
    timestap ?: number

}

export interface DaysModel{
    monday:Array<SubjectsModel>,
    tuesday:Array<SubjectsModel>,
    wednesday:Array<SubjectsModel>,
    thursday:Array<SubjectsModel>,
    friday:Array<SubjectsModel>,
    saturday:Array<SubjectsModel>

}

export interface SubjectsModel{
    teacherID: string,
    teacherName: string,
    subjectID: string,
    subjectName: string,
    hourInit: number,
    hourEnd: number,
    break: boolean
}