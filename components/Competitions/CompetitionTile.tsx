import clsx from 'clsx';
import { Competition } from 'lib/interfaces';
import Link from 'next/link';
import { NumeralForm, convertNumberToNumeralForm } from 'numerals';
import style from 'styles/components/competitions.competitiontile.module.css';

export type CompetitionTileProps = {
    competition: Competition;
    className?: string;
};

export function CompetitionTile({
    competition,
    className,
}: CompetitionTileProps) {
    const getStatus = () => {
        if (!competition) return;
        switch (competition.status) {
            case 'in_progress':
                return 'In Corso';
            case 'ended':
                return 'Termitata';
            case 'not_started':
                return 'Non ancora iniziata';
            default:
                return 'Non definito';
        }
    };

    return (
        <Link
            href={{
                pathname: '/competizioni/[id]',
                query: {
                    id: competition.id,
                },
            }}
            passHref
        >
            <div className={clsx(style.wrapper, className)}>
                <h3>{competition.name}</h3>
                <p>
                    Edizione{' '}
                    {convertNumberToNumeralForm(
                        competition?.edition,
                        NumeralForm.Roman
                    )}{' '}
                    - Stato: {getStatus()}
                </p>
            </div>
        </Link>
    );
}
