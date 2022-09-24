import { Heading } from 'components';
import { CompetitionEntry, School } from 'lib/interfaces';

import style from 'styles/components/workselector.module.css';

export type WorkSelectorProps = {
    active: boolean;
    entries: CompetitionEntry[];
    switchTo: Function;
    onNext: Function;
    onPrev: Function;
};

export function WorkSelector({
    onNext,
    onPrev,
    active,
    entries,
    switchTo,
}: WorkSelectorProps) {
    const _getCroppedTitle = (title: string) =>
        title.length > 20 ? title.slice(0, 15) + '...' : title;

    const getSchoolsList = () => {
        if (!entries) return [];
        const schools: School[] = [];
        const schoolNames = schools.map((s) => s.name);
        entries.forEach((entry) => {
            if (!entry.school) return;
            schoolNames.includes(entry.school.name)
                ? null
                : schools.push(entry.school);
        });
        return schools;
    };

    const getSchoolEntries = (s: School) => {
        return entries.filter((e) => e.school?.name === s.name);
    };

    return (
        <div
            className={[style.workSelector, active ? style.active : null].join(
                ' '
            )}
        >
            <Heading className="mt-5">Seleziona un Progetto</Heading>
            {getSchoolsList().map((v, i) => {
                return (
                    <div key={i} className={style.schoolWrapper}>
                        <Heading
                            lineBefore={false}
                            type="h4"
                            className={style.schoolHeading}
                        >
                            {v.name}
                        </Heading>
                        {getSchoolEntries(v).map((va, ix) => (
                            <p
                                className={style.schoolProject}
                                onClick={() => switchTo(va.id)}
                                key={ix}
                            >
                                {va.name}
                            </p>
                        ))}
                    </div>
                );
            })}
        </div>
    );
}
