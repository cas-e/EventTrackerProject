export class Quote {
  id : number;
  content: string;
  author: string;

  constructor(
    id : number = 0,
    content: string = '',
    author: string = ''
  ) {
    this.id = id;
    this.content = content;
    this.author = author;
  }
}
