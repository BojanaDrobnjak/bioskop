export class Movie {
  constructor(id, title, year, imgUrl) {
    this.id = id;
    this.title = title;
    this.year = year;
    this.imgUrl = imgUrl;
  }
  id: string;
  title: string;
  year: number;
  imgUrl: string;
}
