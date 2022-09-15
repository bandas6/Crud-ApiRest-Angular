import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from '../services/data.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  edad: number = 0;
  fecha = new Date();
  totalCosto: number = 0;

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    edad: ['', [Validators.required, Validators.minLength(3)]],
    nacimiento: ['', [Validators.required]],
    inscripcion: ['', [Validators.required]],
    costo: [this.totalCosto, [Validators.required]]
  });

  constructor(private fb: FormBuilder,
    private dataService: ServicesService) { }

  ngOnInit(): void {
  }


  campoEsValido(campo: string) {
    return this.miFormulario.controls[campo].errors
      && this.miFormulario.controls[campo].touched;
  }

  agregar() {
    const { nombre, edad, nacimiento, inscripcion, costo } = this.miFormulario.value;
    //Mayor de 18
    if (parseInt(edad) <= 18) {
      this.edad = edad;
      console.log('Tiene que ser mayor de 18')
      return;
    }

    //Comprobar edad
    if (edad) {
      const continuar = this.comprobarEdad(edad, nacimiento);
      if (continuar) {
        return
      }
    }

    //Calcular Costo

    this.totalCosto = this.calcularCosto(inscripcion);
    console.log(this.totalCosto)


    //Comprobar ingreso dos nombres
    if (nombre) {
      const continuar = this.comprobarNombres(nombre)
      console.log(continuar)
      if (!continuar) {
        return
      }
    }

    //Comprobar Fechas
    if ( inscripcion && nacimiento ) {
      const continuar = this.comprobarFechas(nacimiento, inscripcion)
      if (!continuar) {
        return
      }
    }


    this.dataService.agregarUsuario(this.miFormulario.value)
      .subscribe(r => console.log(r))
  }



  comprobarEdad(edad: number, nacimiento: string): Boolean {

    let ano = this.fecha.getFullYear();
    const anoNacimiento = nacimiento.split('-')[0];
    let anoSegunNacimiento = parseInt(anoNacimiento) + edad;

    if (anoSegunNacimiento != ano) {
      console.log(`edad ${edad} no coincide con fecha de nacimiento ${nacimiento}`)
      return true;
    }
    return false;
  }

  calcularCosto(inscripcion: string): number {

    let fechaInscripcion = parseInt(inscripcion.split('-')[0]);
    let ano = this.fecha.getFullYear();
    let totalCosto = 0;

    for (fechaInscripcion; fechaInscripcion <= ano; fechaInscripcion++) {
      totalCosto += 100;
    }

    return totalCosto;
  }

  comprobarNombres(nombres: string): Boolean {
    const nombreC = nombres.split(' ');

    if (nombreC.length < 2 || nombreC[0].length < 4 || nombreC[1].length < 4) {
      return false;
    }

    return true;
  }


  comprobarFechas(nacimiento: string, inscripcion: string): Boolean {

    const arrayNacimiento = nacimiento.split('-');
    const arrayInscripcion = inscripcion.split('-');
    console.log(arrayInscripcion)
    if (arrayNacimiento[0] <= arrayInscripcion[0] && arrayNacimiento[1] <= arrayInscripcion[1]) {
      return true;
    }
    return false;
  }

}
