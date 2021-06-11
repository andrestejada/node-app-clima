require('dotenv').config()
const { pausa, inquirerMenu, leerInput ,listadoLugares} = require("./helpers/inquirer");
const Busquedas = require("./models/Busquedas");

const main = async()=>{

   let opt;

   const busquedas = new Busquedas()

   do {
      opt = await inquirerMenu()
      switch (opt) {
         case 1:
            //mostrar el mesaje
            const termino =await leerInput('Cuidad:')
            //buscar los lugares
            const lugares = await busquedas.cuidad(termino)
            //seleccionar los lugares
            const id = await listadoLugares(lugares)
            if(id==='0') continue
            const lugarSel = lugares.find( l=> l.id === id)
            busquedas.agregarHistoria(lugarSel.nombre)
            //clima
            const clima = await busquedas.climaLugar(lugarSel.latitud,lugarSel.longitud)
            //mostartresultados
            console.clear()
            console.log('\nInformacion de la cuidad\n')
            console.log('Cuidad:',lugarSel.nombre.green)
            console.log('Latitud:',lugarSel.latitud)
            console.log('Longitud:',lugarSel.longitud)
            console.log('Temperatura:',clima.temp)
            console.log('Minina:',clima.min)
            console.log('Maxima:',clima.max)
            console.log('Descripcion:',clima.desc.green)
            break;
         case 2 :
            busquedas.historialCapitalizado.forEach( (lugar,i)=>{
               const idx = `${i+1}.`

               console.log(`${idx.green} ${lugar}`)
            })
      }          
      
      await pausa()    
   } while (opt !== 0);
}


main()