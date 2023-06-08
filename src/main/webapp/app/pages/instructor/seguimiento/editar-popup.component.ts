import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'jhi-editar-popup',
  templateUrl: './editar-popup.component.html',
  styleUrls: ['./editar-popup.component.scss'],
})
export class EditarPopupComponent implements OnInit {
  mostrarPopup = true;
  editarForm!: FormGroup;
  horaInicio: Date = new Date(); // Ejemplo de valor inicial
  horaFin: Date = new Date(); // Ejemplo de valor inicial
  notaValues: number[] = []; // Valores de nota disponibles
  estadoValues: string[] = ['NO_ASISTIO', 'APROBO', 'DESAPROBO', 'OBSERVADO'];
  inicioSeleccionado = false;
  finSeleccionado = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.editarForm = this.formBuilder.group({
      nota: [''],
      observaciones: [''],
      estado: [''],
    });

    // Inicializar los valores de nota
    for (let i = 0; i <= 100; i++) {
      this.notaValues.push(i);
    }
  }

  cerrarPopup(): void {
    this.mostrarPopup = false;
  }

  guardarInformacion(): void {
    // Lógica para guardar la información del formulario
    const nota = this.editarForm.value.nota;
    const observaciones = this.editarForm.value.observaciones;
    const estado = this.editarForm.value.estado;
    // Realizar las acciones necesarias con la nota, observaciones y estado
  }

  seleccionarFechaHoraFinal(): void {
    // Lógica para seleccionar la fecha y hora final
  }

  alternarInicioSeleccionado(): void {
    this.inicioSeleccionado = !this.inicioSeleccionado;
  }

  alternarFinSeleccionado(): void {
    this.finSeleccionado = !this.finSeleccionado;
  }

  public formatDate(date: Date | null): string {
    if (date) {
      const addZeroPadding = (value: number): string => (value < 10 ? `0${value}` : `${value}`);

      // Obtener los componentes de la fecha
      const year = date.getFullYear();
      const month = addZeroPadding(date.getMonth() + 1); // Los meses comienzan en 0
      const day = addZeroPadding(date.getDate());
      const hours = addZeroPadding(date.getHours());
      const minutes = addZeroPadding(date.getMinutes());
      const seconds = addZeroPadding(date.getSeconds());

      // Formatear la fecha en el formato deseado
      const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

      return formattedDate;
    }
    return '';
  }
}
