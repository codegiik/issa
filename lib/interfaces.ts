import { Record, User } from 'pocketbase';

export type FileRecordField = string;

export type NewsItem = {
    cover: any;
    href: string;
    post: FileRecordField;
    title: string;
} & Record;

export enum CourseTypes {
    A = 'a',
    B = 'b',
    C = 'c',
}

export type CoursesRecord = {
    description: string;
    name: string;
    prof: string;
    type: CourseTypes;
    submodule: FileRecordField;
} & Record;

export type CompetitionsRecord = {
    name: string;
    description: string;
    status: string;
    sponsors: string;
    type: string;
} & Record;

export type CompetitionEntriesRecord = {
    name: string;
    class: string;
    students: string;
    type: string;
    score: number;
    competition: string;
    school: string;
    attachment: FileRecordField;
    attachment_url: string;
    local_attachment: boolean;
} & Record;

export const CompetitionJsonSchema = {
    title: 'Person',
    type: 'object',
    properties: {
        name: {
            type: 'string',
            title: 'Nome Progetto',
        },
        students: {
            type: 'string',
            title: 'Studente/i',
            description:
                'Gli studenti che hanno organizzato il progetto. Separare i nomi con una virgola.',
        },
        class: {
            type: 'string',
            title: 'Classe',
            description:
                'La classe degli studneti che hanno consegnato il progetto.',
        },
        type: {
            type: 'string',
            enum: ['ptt', 'video', 'image', 'test'],
        },
    },
    required: ['name'],
};

export type UserRecord = {
    type: string;
} & User;

export type AuthProvider = {
    authUrl: string;
    codeChallenge: string;
    codeChallengeMethod: string;
    codeVerifier: string;
    name: string;
    state: string;
};
