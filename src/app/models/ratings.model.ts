export interface RatingsModel{
    studenID: string,
    teacherID: string,
    ratings: Array<rating>,
    average: number,
    gradeID: string
}

export interface rating{
    exam1: string,
    exam2: string,
    exam3: string,
    exam4: string
}