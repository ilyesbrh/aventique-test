import { HttpClient } from "@angular/common/http";
import {
  Component,
  ElementRef,
  HostListener,
  Injectable,
  OnInit,
  ViewChild,
} from "@angular/core";
import { Observable, of } from "rxjs";
import { ProductService } from "../product.service";

interface Info {
  quantite: number;
  title: string;
  data?: any;
}

@Component({
  selector: 'app-display-products',
  templateUrl: './display-products.component.html',
  styleUrls: ['./display-products.component.scss']
})
export class DisplayProductsComponent implements OnInit {

  @ViewChild("relance") relanceEl!: ElementRef;
  a$: Observable<Info[]>;
  infos: any;

  constructor(private http: HttpClient, public service: ProductService) {
    this.a$ = http.get<Info[]>("https://api-privee/info");
  }

  ngOnInit(): void {
    this.a$.subscribe((info) => (this.infos = info));
  }

  getInfoData(info: Info) {
    return info.data !== null;
  }

  @HostListener("mouseenter") mouseenter() {
    this.relanceEl.nativeElement.style.backgroundColor = "red";
  }

  @HostListener("mouseleave") mouseleave() {
    this.relanceEl.nativeElement.style.backgroundColor = "transparent";
  }

  // @HostListener('mouseexit') mouseexit() {
  //     if(this.relanceEl) {
  //         this.relanceEl.nativeElement.style.backgroundColor = 'yellow';
  //     }
  // }

  command(info: Info) {
    this.http.post("https://api-privee/envoyer-commande", info);
  }

  cancel(info: Info) {
    this.http.post("https://api-privee/cancel-commande", info);
  }

  // permet de faire une relance
  revival(info: Info) {
    this.actionDeVerification();
    this.http.post("https://api-privee/relance", info);
  }

  public actionDeVerification() {
    //.....
    return true;
  }
}
