/*
  Separating models and DTO's from component can help reduce code's complexcity
*/

export interface ProductDTO {
  title: string,
  quantity: number,
  comment?: string,
  color?: string,
  compotition: Array<String>
}

export class Product implements ProductDTO {

  title: string;
  quantity: number;
  comment?: string;
  color?: string;
  compotition: String[];

  constructor(p: ProductDTO) {
    this.title = p.title;
    this.quantity = p.quantity;
    this.comment = p?.comment;
    this.compotition = p.compotition;
    this.color = p?.color;
  }

  /* Create some mocks to display cause endpoints are not working */
  static mockProducts() {
    return [...Array(50)].map((_, i) => {
      return {
        quantity: i,
        title: 'title' + i,
        comment: i + i + i + i + i + '',
        color: 'color' + i,
        compotition: [...Array(5)].map((_, j) => `material ${j}`)
      }
    })
  }
}
