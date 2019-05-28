import { IRight } from './right';

export interface IRole {
    _id: string,
    roleName: string,
    roleCode: string,
    description: string,
    rights: IRight[],
    dateAdded: string,
    dateUpdated: string
}