import { Heading, Loader } from 'components';
import supabase from 'lib/supabase';
import { lorempics } from 'lib/utils';
import { useRouter } from 'next/router';
import { PureComponent, useEffect, useState } from 'react';
import colors from 'styles/colors';
import style from 'styles/components/hero.module.css';

const MAX_NEWS_TO_SHOW = 4;

export function Tile({ article, active, setActive, unsetActive, index }) {
    const [gradientColor, setGradientColor] = useState('#00000044');
    const color =
        index % 2 == 0 ? colors['cedar']['500'] : colors['cedar']['600'];

    const getBackground = () => {
        return `linear-gradient(#00000000, ${gradientColor}), url(${article.image}) no-repeat center center / cover, ${color}`;
    };

    const onMouseEnter = () => {
        setActive();
    };

    const onMouseLeave = () => {
        unsetActive();
    };

    return (
        <div
            className={[
                style.carouselTile,
                active ? style.tileActive : null,
            ].join(' ')}
            style={{
                background: getBackground(),
            }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <h3 className={style.tileTitle}>{article.title}</h3>
            <div className={style.tileLine} />
        </div>
    );
}

export class Carousel extends PureComponent {
    state = {
        activeTile: 0,
        disableLoop: false,
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (!this.timer)
            this.timer = setInterval(() => {
                if (!this.state.disableLoop) {
                    this.setState({
                        ...this.state,
                        activeTile:
                            (this.state.activeTile + 1) %
                            (MAX_NEWS_TO_SHOW || this.props.news.length),
                    });
                }
            }, 10000);
    }

    setManualActiveTile(activeTile, disableLoop = false) {
        this.setState({
            disableLoop,
            activeTile,
        });
    }

    render() {
        if (!Array.isArray(this.props.news)) return null;
        return (
            <div id="heroCarousel" className={style.heroCarousel}>
                {this.props.news.slice(0, MAX_NEWS_TO_SHOW).map((v, i) => {
                    return (
                        <Tile
                            article={v}
                            key={i}
                            index={i}
                            active={this.state.activeTile == i}
                            setActive={() => this.setManualActiveTile(i, true)}
                            unsetActive={() => this.setManualActiveTile(i)}
                        />
                    );
                })}
            </div>
        );
    }
}

export function Hero({ className }) {
    const router = useRouter();
    const [news, setNews] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase
                .from('news')
                .select()
                .limit(5)
                .order('created_at', { ascending: false });
            if (error) return message.error(error.message);
            setNews(data);
        };

        fetchData();
    }, []);

    const openNews = (i) => {
        router.push(news[i].href, undefined, { shallow: true });
    };

    return news ? (
        <section
            className={[
                Array.isArray(className) ? className.join(' ') : className,
                style.hero,
            ].join(' ')}
            id="hero"
        >
            <div
                onClick={() => openNews(0)}
                style={{
                    '--bg-image': `url(${news[0].preview}) no-repeat center center / cover`,
                }}
                className={style.bigTile}
            >
                <div className={style.overlay} />
                <h3>{news[0].title}</h3>
            </div>
            <div className={style.otherNews}>
                <Heading>Ultime Notizie</Heading>
                {news.slice(1).map((v, i) => (
                    <h4
                        className={style.articleTitle}
                        key={i}
                        onClick={() => openNews(i)}
                    >
                        {v.title}
                    </h4>
                ))}
            </div>
        </section>
    ) : (
        <Loader space />
    );
}
