import clsx from 'clsx';
import { CompetitionsRecord } from 'lib/interfaces';
import Link from 'next/link';
import { NumeralForm, convertNumberToNumeralForm } from 'numerals';
import style from 'styles/components/competitions.competitiontile.module.css';

export type CompetitionTileProps = {
    competition: CompetitionsRecord;
    className?: string;
};

export function CompetitionTile({
    competition,
    className,
}: CompetitionTileProps) {
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
                    )}
                </p>
            </div>
        </Link>
    );
}
