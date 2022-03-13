import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: [
  ]
})
export class ListaComponent implements OnInit {

  usuarios: Usuario[] = [];

  constructor(public usuarioService: UsuarioService) { }

  ngOnInit() {

    this.usuarioService.getUsers()
      .subscribe(users => {
        console.log("data", users);
        this.usuarios = users;
      });
  }

}
