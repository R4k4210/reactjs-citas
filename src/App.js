import React, {  Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {

  //Citas en LocalStorage,
  //LocalStorage solamente guarda string, por lo cual se debe parsear a JSON.
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales){
    citasIniciales = [];
  }

  //Arreglo de citas
  const [citas, guardarCitas] = useState(citasIniciales);
  
  //Use effect para realizar ciertas operaciones cuando el state cambia
  //useEffect siempre es un arrow function y se ejecuta cuando el componente
  //está listo, o cuando hay cambios en el. Si queremos que solamente se ejecute una vez
  //debemos pasarle un arreglo vacío.
  //El array que se le pasa, se le conoce como dependencias, ahí podemos pasarle
  //por ej: el hook citas, y cada vez que este cambie, se vuelve a ejecutar.
  useEffect(() => {
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas));
    }else{
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas, citasIniciales] );
  
  //Funcion que tome las citas actualies y agregue la nueva
  const crearCita = cita => {
    guardarCitas([
      ...citas,
      cita
    ]);
  }

  //Función que elimina una cita por su id
  const eliminarCita = id => {
    const nueviasCitas = citas.filter(cita => cita.id !== id);
    guardarCitas(nueviasCitas);
  }

  //Mensaje condicional
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas';

  return (
    <Fragment>
      <div className="App">
        <h1>Administrador de Citas</h1>

        <div className="container">
          <div className="row">
            <div className="one-half column">
              <Formulario
                crearCita={crearCita}
              />
            </div>
            <div className="one-half column">          
              <h2>{titulo}</h2>

              {citas.map(cita => (
                <Cita
                  key={cita.id}
                  cita={cita}
                  eliminarCita={eliminarCita}
                />
              ))}

            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
