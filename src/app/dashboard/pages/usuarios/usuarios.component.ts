import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsuariosService } from './services/usuarios.service';
import { CrearUsuarioPayload, Usuario } from 'src/app/auth/models';
import { MatTableDataSource } from '@angular/material/table';
import { AddNewUsuarioDialogComponent } from './components/dialog/add-new-usuario-dialog/add-new-usuario-dialog.component';
import { ConfirmationDialogComponent } from './components/dialog/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {
  constructor(
    private matDialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private usuariosService: UsuariosService
    ) {}

  usuarios: Usuario[] = []

  ngOnInit(): void {
    this.usuariosService.getAllUsuarios()
    .subscribe((usuarios) => {
      this.dataSource.data = usuarios
    });
  }

  displayedColumns: string[] = ['id', 'nombre', 'email', 'rol', 'accion'];
  dataSource = new MatTableDataSource<Usuario>();

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  usuario: Usuario = {id: this.usuarios.length + 1, nombre: "", email: "", rol: "", token: "", password: ""}

  openAddUsuarioDialog(){
    const dialog = this.matDialog.open(AddNewUsuarioDialogComponent)

    dialog.afterClosed().subscribe((response) => {
      this.onAdd(response);
    });
  }

  openConfirmationDialog(usuario:Usuario): void{
    const dialog = this.matDialog.open(ConfirmationDialogComponent, {
      data: usuario
    })

    dialog.disableClose = true;
    dialog.afterClosed().subscribe((response) =>{
      if(response == 1){
        this.onDelete(usuario);
      }
    });
  }

  openEditUsuarioDialog(usuario:Usuario){
    const dialog = this.matDialog.open(AddNewUsuarioDialogComponent, {
      data: usuario
    })

    dialog.afterClosed().subscribe((response) => {
      this.onModify(usuario.id, response);
    });
  }

  onAdd(usuarioPayload: CrearUsuarioPayload) {
    if(usuarioPayload){
      usuarioPayload.token = this.generateToken();
      this.usuariosService.addNewUsuario(usuarioPayload).subscribe((usuariosUpdated) => {
        this.dataSource.data = usuariosUpdated;
      })
    }
  }


  onModify(usuarioId: number, usuario: Usuario){
    this.usuariosService.modifyUsuario(usuarioId, usuario).subscribe((usuariosUpdated) => {
      this.dataSource.data = usuariosUpdated;
    });
  }


  onDelete(usuario:Usuario): void {
    this.usuariosService.deleteUsuario(usuario.id).subscribe((usuariosUpdated) => {
      this.dataSource.data = usuariosUpdated;
    });
  }

  generateToken(){
    let token = "";
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return token;
  }
}
