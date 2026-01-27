
import { useNavigate } from 'react-router-dom';
import { PORT } from '../../helpers/API';
import Button from '../Button/Button';
import styles from './Card.module.css';
import type { CardList } from '../../helpers/interfaces/Card.props';

const Card = ({cards}: CardList) => {
    const navigate = useNavigate();
    return(
        <div className={styles['card']}>
            {cards.map(card => (
                <div key={card.id} className={styles['card__content']}>
                    <div className={styles['card__header']}>
                        <img src={`${PORT}/${card.img}`} alt="картинка фильма" width={298.67} height={300} className={styles['card__img']}/>
                        <div className={styles['card__moreInfo']}>
                            <p className={styles['card__text--bold']}>{card.genres[0]}</p>
                            <p className={styles['card__text']}>{card.country.name}, {card.releaseDate.split(' ')[2]}</p>
                        </div>
                    </div>
                    <div className={styles['card__footer']}>
                        <h3 className={styles['card__name']}>{card.name}</h3>
                        <p className={styles['card__info']}>Фильм</p>
                        <img src="/Ratings.png" alt="Рейтинг" width={120} height={24} className={styles['card__stars']}/>
                        <p className={styles['card__rating']}>Kinopoisk - {card.userRatings.kinopoisk}</p>
                        <Button className={styles['card__button']} onClick={() => navigate(`/cinema/${card.id}`)}>Подробнее</Button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Card;