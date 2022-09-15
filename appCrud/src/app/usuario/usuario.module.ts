import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { FormularioComponent } from './formulario/formulario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'


@NgModule({
  declarations: [
    FormularioComponent
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class UsuarioModule { }
