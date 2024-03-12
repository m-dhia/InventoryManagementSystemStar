import { Component, OnInit } from '@angular/core';
import { Serveur } from 'src/app/models/serveur.model';
import { ServeurService } from 'src/app/services/serveur.service';

@Component({
  selector: 'app-serveurs-list',
  templateUrl: './serveur-list.component.html',
  styleUrls: ['./serveur-list.component.css']
})
export class ServeurListComponent implements OnInit {

  serveurs?: Serveur[];
  currentServeur: Serveur = {};
  currentIndex = -1;
  id = '';

  constructor(private serveurService: ServeurService) { }

  ngOnInit(): void {
    this.retrieveServeurs();
  }

  retrieveServeurs(): void {
    this.serveurService.getAll()
      .subscribe({
        next: (data) => {
          this.serveurs = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveServeurs();
    this.currentServeur = {};
    this.currentIndex = -1;
  }

  setActiveServeur(serveur: Serveur, index: number): void {
    this.currentServeur = serveur;
    this.currentIndex = index;
  }

  removeAllServeurs(): void {
    this.serveurService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchID(): void {
    this.currentServeur = {};
    this.currentIndex = -1;

    this.serveurService.findById(this.id)
      .subscribe({
        next: (data: Serveur[] | undefined) => {
          this.serveurs = data;
          console.log(data);
        },
        error: (e: any) => console.error(e)
      });
  }

}
