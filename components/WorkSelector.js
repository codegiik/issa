import { Heading } from 'components';

import style from 'styles/components/workselector.module.css';

export function WorkSelector({ onNext, onPrev, active, entries, switchTo }) {
    const getCroppedTitle = (title) =>
        title?.length > 20 ? title.substr(0, 15) + '...' : title;

    const getSchoolsList = () => {
        if (!entries) return [];
        const schools = [];
        entries.forEach((v) =>
            schools.includes(v.school_name) ? null : schools.push(v.school_name)
        );
        return schools;
    };

    const getWorksBySchool = (school) => {
        return entries.filter((v) => v.school_name == school);
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
                            {v}
                        </Heading>
                        {getWorksBySchool(v).map((va, ix) => (
                            <p
                                className={style.schoolProject}
                                onClick={() => switchTo(va.id)}
                                key={ix}
                            ></p>
                        ))}
                    </div>
                );
            })}
        </div>
    );
}
