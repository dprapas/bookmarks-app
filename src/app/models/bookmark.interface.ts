export interface IBookmark {
    name: string;
    url: string;
    group: string;
  }

  export class Bookmark implements IBookmark {
    constructor(
      public name: string,
      public url: string,
      public group: string
    ) {}
  }