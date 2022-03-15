import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from '@ngrx/effects'
import { of } from "rxjs";
import { mergeMap, tap, map, catchError} from "rxjs/operators";
import { UsuarioService } from "src/app/services/usuario.service";
import *  as usuariosActions from "../actions/usuarios.actions";

@Injectable()
export class UsuarioEffects {

	constructor(
		//$ es un observable, convenio:
		private actions$: Actions,
		private usuarioService: UsuarioService
	) { }

	cargarUsuarios$ = createEffect(
		//filtro por el 'Pipe' y 'ofType' para filtrar la accion que quiero escuchar, en este caso 'cargarUsuarios
		// el operador 'tap' derxjs me permite evaluar efectos secundarios.
		// nos ayuda a disparar un nuevo observable y mergear esta acción con el resto. 
		() => this.actions$.pipe(
			ofType(usuariosActions.cargarUsuarios),
			//Con este tap a continuación sabré la data que fluye por esta acción. comentaremos una vez comprobada:
			// tap(data => console.log("effect tap", data)),
			mergeMap(
				() => this.usuarioService.getUsers() //disparamos el servicio!
				//con Este 'pipe' a continuación es para ver la información y saber cómo va fluyendo por este lado:
					.pipe(
						map( users => usuariosActions.cargarUsuariosSuccess({usuarios: users})),
						// tap(data => console.log("data getUsers del effects:", data) )
						//con 'of' creo un observable.
						catchError(err=> of (usuariosActions.cargarUsuariosError({payload: err})))
					)
			)
		)
	);

}