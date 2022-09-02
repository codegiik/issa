import { CompetitionsRecord } from 'lib/interfaces';

export type CompetitonProps = {
    competition: CompetitionsRecord;
};

export function Competition({ competition }: CompetitonProps) {
    return <div>Ciao</div>;
}
