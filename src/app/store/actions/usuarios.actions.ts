import { createAction, props } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';

export const cargarUsuarios = createAction('[Usuarios] Cargar Usuarios');

export const cargarUsuariosSuccess = createAction(
	'[Usuarios] Cargar Usuarios success',
	//recibio 'usuarios de tipo Usuario
	props<{ usuarios: Usuario[] }>()
);

export const cargarUsuariosError = createAction(
	'[Usuarios] Cargar Usuarios Error',
	//recibio 'payload de tipo any
	props<{ payload: any }>()
);