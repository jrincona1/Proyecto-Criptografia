import { Component } from '@angular/core';
import { CargarClavesService } from 'src/app/services/cargar-claves.service';

@Component({
  selector: 'app-distribuidor',
  templateUrl: './distribuidor.component.html',
  styleUrls: ['./distribuidor.component.sass']
})
export class DistribuidorComponent {

  array = [1, 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997, 1009, 1013, 1019, 1021, 1031, 1033, 1039, 1049, 1051, 1061, 1063, 1069, 1087, 1091, 1093, 1097, 1103, 1109, 1117, 1123, 1129, 1151, 1153, 1163]
  valor_c: number = 0
  numero_1: number = 0
  numero_2: number = 0
  hash_1: string = ""
  hash_2: string = ""
  cargar_claves: boolean = false

  constructor(
    public CargarClaves: CargarClavesService
  ){}

  set_c(valor: number) {
    console.log(valor)
    this.valor_c = valor
  }

  cargar() {
    let num_1 = this.seleccionarAlAzar()
    let num_2 = this.seleccionarAlAzar()

    this.CargarClaves.set_numeros_ejercicio_1(num_1, num_2, this.valor_c)

    this.numero_1 = Math.pow(num_1 + this.valor_c, 2)
    this.numero_2 = Math.pow(num_2 + this.valor_c, 2)
  }

  seleccionarAlAzar(){
    return this.array[Math.floor(Math.random()* this.array.length)]
  }

  generarHash(){
    this.hash_1 = this.hashString(this.numero_1)
    this.hash_2 = this.hashString(this.numero_2)
    if(this.cargar_claves){
      this.CargarClaves.set_hashes_ejercicio_1(this.hash_1, this.hash_2)
    }
  }

  toggle_check() {
    this.cargar_claves = !this.cargar_claves
  }

  guardarArchivoDeTexto() {
    const a = document.createElement("a");
    const archivo = new Blob([this.valor_c.toString()], { type: 'text/plain' });
    const url = URL.createObjectURL(archivo);
    a.href = url;
    a.download = "Valor_C.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  hashString(str: number): string {
    const sha256 = require('crypto-js/sha256');
    return sha256(str.toString()).toString();
  }

}
