export class Menu {
  id: number = 0;
  nombre: string = '';
  icono?: string = '';
  menuPadreId?: number = 0;
  link: string | null = null;
  posicion: number = 0;
  createdAt: string = '';
  updatedAt: string = '';
  deletedAt?: string = '';
  file?: File;
}
