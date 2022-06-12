import { ProductDTO } from './../product';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayInfos'
})
export class DisplayInfosPipe implements PipeTransform {

  // pipes are better for data transformations inside template
  transform(product: ProductDTO, type: string): unknown {

    switch (type) {
      case 'data':
        return this.getProductData(product);
      case 'header':
        return this.getQuantityInfo(product);
      case 'exists':
        return !!product.color || !!product.comment || product.compotition.length == 0
      default:
        throw new Error();
    }

  }

  getProductData(product: ProductDTO) {
    return (product.color ? ' couleur: ' + product.color : '')
      + (product.comment ? ' ,Commentaire: ' + product.comment : '')
      + (product.compotition ? ' ,Materiaux: ' + product.compotition.join(',') : '')
  }
  getQuantityInfo(product: ProductDTO) {
    return product.quantity >= 10
      ? product.quantity + " " + product.title
      : "commander des " + product.title;
  };

}
