

export interface CardProps{
    id: string,
    img: string,
    name: string,
    userRatings : userRatings,
    country: Country, 
    ageRating: string,
    genres: string,
    releaseDate: string,
    description?: string
}

export interface userRatings{
    kinopoisk: string,
    imdb: string
}

export interface Country{
    id: number,
    code: string,
    code2: string,
    name: string
}

export interface CardList{
    cards: CardProps[]
}
export type CardLists = CardProps[];