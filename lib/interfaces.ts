export type Record<T> = {
    id: number;
    attributes: T & {
        updatedAt: string;
        createdAt: string;
        publishedAt?: string;
    };
};

export type StrapiElement = {
    id: number;
    updatedAt: string;
    createdAt: string;
    publishedAt?: string;
    [key: string]: any;
};

export type FileRecordField = string;

export type NewsItem = {
    cover: any;
    href: string;
    post: FileRecordField;
    title: string;
    visible: boolean;
} & StrapiElement;

export enum CourseTypes {
    A = 'a',
    B = 'b',
    C = 'c',
}

export type Seminar = {
    attachments: any;
    description: string;
    date: string;
    title: string;
} & StrapiElement;

export type Course = {
    attachment: string;
    description: string;
    name: string;
    prof: string;
    type: CourseTypes;
    submodule: FileRecordField;
} & StrapiElement;

export enum CompetitionStatus {
    NOT_STARTED = 'not_started',
    IN_PROGRESS = 'in_progress',
    ENDED = 'ended',
}

export type Competition = {
    attachments: any;
    edition: number;
    name: string;
    description: string;
    status: CompetitionStatus;
    sponsors: any;
    type: 'gallery' | 'test';
    url?: string;
} & StrapiElement;

export type CompetitionEntry = {
    referee: string;
    id: number;
    name?: string;
    class: string;
    students: string;
    type: string;
    score?: number;
    competition: Competition;
    attachment?: FileRecordField;
    attachment_url?: string;
    school: School;
    preview?: FileRecordField;
} & StrapiElement;

export type School = {
    name: string;
    logo?: FileRecordField;
    motto?: string;
    competition_entries: CompetitionEntry[];
} & StrapiElement;

export type Sponsor = {
    name: string;
    logo: FileRecordField;
} & StrapiElement;

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

export type AuthProvider = {
    authUrl: string;
    codeChallenge: string;
    codeChallengeMethod: string;
    codeVerifier: string;
    name: string;
    state: string;
};

export type FooterLink = {
    text: string;
    href: string;
    section?: string;
} & StrapiElement;

export type AboutInfo = {
    about_content: string;
} & StrapiElement;

export type CoursesInfo = {
    description: string;
    attachments: any;
} & StrapiElement;

export type SeminarsInfo = {
    description: string;
} & StrapiElement;

export type Initiatives = {
    title: string;
    description: string;
    href: string;
} & StrapiElement;

export type Post = {
    id: number;
    title: string;
    body: string;
    cover: FileRecordField;
    author: any;
};
