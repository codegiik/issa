import Link from 'next/link';
import { NumeralForm, convertNumberToNumeralForm } from 'numerals';
import style from 'styles/components/competitions.competitiontile.module.css';

export function CompetitionTile({ data, className }) {
    return (
        <Link
            href={{
                pathname: '/competitions/[id]',
                query: {
                    id: data.id,
                },
            }}
            passHref
        >
            <div className={[style.wrapper, className].join(' ')}>
                <h3>{data.name}</h3>
                <p>
                    Edizione{' '}
                    {convertNumberToNumeralForm(
                        data?.id,
                        NumeralForm.Roman,
                        NumeralForm.English
                    )}
                </p>
            </div>
        </Link>
    );
}
