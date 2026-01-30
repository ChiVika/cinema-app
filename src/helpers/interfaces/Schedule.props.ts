
export interface ScheduleProps{
    date: string,
    seances: ScheduleSeans[]
}

export interface ScheduleSeans{
    time: string,
    hall: ScheduleHall
}

export interface ScheduleHall{
    name: string,
    places: SchedulePlaces[][]
}

export interface SchedulePlaces{
    price: number,
    type: string
}