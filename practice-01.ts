//  1. Functions
function saludar(name: string){
    console.log(`Hola ${name}`);
}
saludar('Mario')

// 2. Tipar funciones
function saludar2({name,age}: {name: string,age: number}){
    console.log(`hola ${name}, tienes ${age} anios`);
}

saludar2({name:'',age:2})

// 3. Tipar las funciones que pasamos como parametros...
const sayHiFromFunction = (fn: (name:string) => void) => {
    fn('Mario')
}

const sayHi = (name: string) =>{
    console.log(`Hola ${name}`)
}

sayHiFromFunction(sayHi)


// 4. Tipar Arrow Function
// Se tipan los parametros y luego el tipo de funcion que regresa
const sumar = (a:number, b:number):number => {
    return a + b
}

// 5. Type Alias


// Crear el Alias
// Template Union Type, es un string en este caso debe tener cadenas de texto separada por guion 
type HeroId = `${string}-${string}-${string}-${string}-${string}`
// Union Types, es como elegir cual de esas opciones
type HeroPowerScale = 'local' | 'planetary' | 'galactic' | 'universal' | 'multiversal'
type HeroBasicInfo = {
    name:string
    age:number
}
type HeroProperties = {
    readonly id?:HeroId //Asignamos tipo HeroId    
    isActive?:boolean //Se indica que la propiedad es opcional con el simbolo de '?'
}

// Usamos el Intersecion Type
type Hero = HeroBasicInfo & HeroProperties

// Usar el Alias en un Objeto
let hero: Hero ={
    name:'Thor',
    age: 23
}

// Usar Alias en una function, con el tipado decimos que las propiedades definida en el Type Alias sean las que tome como parametros
function createHero(input: HeroBasicInfo): Hero{
    // hero es un objeto contiene las propiedades y utilizamos la destructuracion de arreglos pa
    const {name,age} = input
    // retornamos el objeto, ya con el tipado superior le indicamos que sea de tipo Hero
    return {
        id: crypto.randomUUID() ,
        name,
        age, 
        isActive:true}
}

const thor = createHero({name:'Thor',age:12})  

// Esto nos ayuda a mantener fuertemente tipado

// 6. Template Union Type
type hexadecimalColor = `#${string}`

// const color: hexadecimalColor = '0033f' // Este se queja porque no tiene el hash
const color2: hexadecimalColor = '#0033f'

// 7. Union Types
type tipo = 's'| 'a'
const example: boolean | number = true

//8. Intersection Types


// El Union Types es un OR(|) y el Intersection Type es un AND(&)


// Tipar arrays
const array: string[] = []
const lenaguages: (string| number | boolean)[] =  []
lenaguages.push('JavaScript')
lenaguages.push('JavaScript')
lenaguages.push('JavaScript')
lenaguages.push('JavaScript')
lenaguages.push(2)
lenaguages.push(true)
// Se puede hacer una array de datos con los tipos de datos creados


/*
    Matrices y Tuplas
    Las tuplas es un array que tiene un numero de longitud fijado
    []
*/
type CellValue ='X'|'O'|''
type GameBoard = [
    [CellValue,CellValue,CellValue],
    [CellValue,CellValue,CellValue],
    [CellValue,CellValue,CellValue]
]

const gameBoard: GameBoard =[
    ['X','',''],
    ['','X',''],
    ['','','X']
]


// Enums

const enum ERROR_TYPES {
    NOT_FOUND,
    UNAUTHORIZED,
    FORBIDDEN
}

function mostrarMensaje (tipoDeError: ERROR_TYPES) {
    if(tipoDeError === ERROR_TYPES.NOT_FOUND){
        console.log('No se encuentra el recurso')
    }else if(tipoDeError === ERROR_TYPES.UNAUTHORIZED){
        console.log('No tienes permisos para acceder')
    }else if(tipoDeError === ERROR_TYPES.FORBIDDEN){
        console.log('No tienes permisos para acceder')
    }
}



// Obtenemos el elemento canvas por su id
const canvas = document.getElementById('canvas')
// Trae Null si no lo encuentra o HTMLElement si lo encuentra
// Como sabe typeScript que realmente esta recuperando un elemento <canvas /> ?
// Verificamos si el elemento canvas es una instancia de HTMLCanvasElement
if(canvas instanceof HTMLCanvasElement){
    // Si es así, creamos un contexto 2D para el canvas
    const ctx = canvas.getContext('2d')
}


// Interfaces
// 🌟 Declaración de la interfaz Producto 🌟
interface Producto {
    id: number
    nombre:string
    precio:number
    quantity:number
}

// 🌟 Declaración de la interfaz Zapatilla que extiende la interfaz Producto 🌟
interface Zapatilla extends Producto{
    talla:number
}

// 🌟 Declaración de la interfaz CarritoDeCompras 🌟
interface CarritoDeCompras {
    totalPrice:number
    productos:(Producto | Zapatilla)[]
}

// Indicar funciones en las interfaces
interface CarritoOps{
    add: (product: Producto) => void,
    remove: (id: number) => void,
    clear: () => void
}

/*
O de esta otra forma
 interface CarritoOps{
    add(product: Producto): void,
    remove(id: number): void,
    clear(): void
}
 */



// 🌟 Declaración del objeto carrito, que sigue la estructura de la interfaz CarritoDeCompras 🌟
const carrito: CarritoDeCompras ={
    totalPrice:100,
    productos:[
        {
            id:1,
            nombre:'',
            precio:21,
            quantity:1
        }
    ]
}

interface Mario {
    nombre:string
    saltar (): void
}

interface Sonic {
    nombre:string
    correr (): void
}

type Personaje = Mario | Sonic


// Type Guard, Validar que el persona es sonic, para discrimiar el tipo
function CheckIsSonic (personaje: Personaje):personaje is Sonic{
    return (personaje as Sonic).correr !== undefined
}

// HAY QUE EVITAR LOS TYPE GUARDS
function jugar(personaje: Personaje){
    if(CheckIsSonic(personaje)){
        return personaje.correr
    }
    return personaje.saltar
}