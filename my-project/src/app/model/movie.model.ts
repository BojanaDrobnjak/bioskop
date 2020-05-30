export class MovieModel {
  constructor(title, year, imgUrl) {
    this.title = title;
    this.year = year;
    this.imgUrl = imgUrl;
  }
  title: string;
  year: number;
  imgUrl: string;
}
