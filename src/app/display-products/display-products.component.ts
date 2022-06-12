import { HttpClient } from "@angular/common/http";
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { Product, ProductDTO } from "../product";

@Component({
  selector: 'app-display-products',
  templateUrl: './display-products.component.html',
  styleUrls: ['./display-products.component.scss']
})
export class DisplayProductsComponent implements OnInit {

  products: Promise<ProductDTO[]>;

  constructor(private http: HttpClient) {
    this.products = this.http.get<ProductDTO[]>("https://api-privee/product").toPromise().catch(_ => Product.mockProducts());
  }

  async ngOnInit() {
  }

  async command(product: ProductDTO) {
    await this.http.post("https://api-privee/envoyer-commande", product).toPromise();
  }

  async cancel(product: ProductDTO) {
    await this.http.post("https://api-privee/cancel-commande", product).toPromise();
  }

  async claim(product: ProductDTO) {
    const canClaim = await this.verification(product);
    if (!canClaim) { alert('Réclamation deja en attente'); return };

    await this.http.post("https://api-privee/relance", product).toPromise();
  }

  async verification(product: ProductDTO) {
    const result = await this.http.post<any>("https://api-privee/relance/check", product).toPromise().catch(_ => null);
    return !result ? false : result.canClaim;
  }
}
