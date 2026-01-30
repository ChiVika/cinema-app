import { makeAutoObservable } from 'mobx';


class SeanceStore{
  currentFilm: string = '';
  currentDate: string = '';
  currentTime: string = '';
  currentHall: string = '';



  constructor() {
    makeAutoObservable(this);
  }

  setCurrentFilm(id: string){
    this.currentFilm = id;
  }
  setCurrentDate(date: string){
    this.currentDate = date;
  }
  setCurrentTime(time: string){
    this.currentTime = time;
  }
  setCurrentHall(hall: string){
    this.currentHall = hall;
  }

  readySeanceData = () => {
    return !!(
      this.currentFilm && 
      this.currentDate && 
      this.currentTime && 
      this.currentHall
    );
  };

  

}
export default new SeanceStore;