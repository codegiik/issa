import { Loader } from 'components';
import supabase from 'lib/supabase';
import { useEffect, useState } from 'react';
import { message } from 'react-message-popup';
import style from 'styles/components/competitions.podium.module.css';

export function Podium({ data }) {
    const [placements, setPlacements] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await supabase
                .from('competition_entries')
                .select()
                .eq('competition', data.id)
                .eq('category', data.category)
                .order('score', { ascending: false });

            if (response.error) return message.error(response.error.message);
            console.log(response.data);
            return setPlacements(response.data);
        };

        if (data) fetchData();
    }, []);

    return placements ? (
        <div className={style.wrapper}>
            <table className="table-auto">
                <thead>
                    <tr>
                        <th>Scuola</th>
                        <th>Classe</th>
                        <th>Autore/i</th>
                        <th>Referente</th>
                        <th>Codice</th>
                        <th>Voto</th>
                    </tr>
                </thead>
                <tbody>
                    {placements.map((v, i) => (
                        <tr key={i}>
                            <td>{v.school_name}</td>
                            <td>{v.class_name}</td>
                            <td>{v.author}</td>
                            <td>{v.referee}</td>
                            <td
                                className={[
                                    style.smCell,
                                    'uppercase font-bold',
                                ].join(' ')}
                            >
                                {v.id}
                            </td>
                            <td className={style.smCell}>{v.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    ) : (
        <Loader />
    );
}
