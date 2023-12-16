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