import React, { Fragment, useState } from 'react';
import {v4 as uuid} from 'uuid';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

    //Crear State de Citas
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });

    //Creamos el State para el manejo de Errores
    const [error, actualizarError] = useState(false);

    //Función que se ejecuta al escribir en un input, usamos destructuring con los nombre de los campos
    //Esto puede hacerse porque los name de los input son iguales a los del state.
    const actualizarState = e => {
        actualizarCita({
            ...cita,
            [e.target.name] : e.target.value
        });
    }

    //Extraer valores
    const { mascota, propietario, fecha, hora, sintomas } = cita;

    const submitCita = e => {
        e.preventDefault();

        //Validamos los datos
        if( mascota.trim() === '' || 
            propietario.trim() === '' || 
            fecha.trim() === '' || 
            hora.trim() === '' || 
            sintomas.trim() === ''){

            actualizarError(true);
            return;
        }
        //Eliminar el mensaje previo
        actualizarError(false);
        //Asignar un ID
        cita.id = uuid();
        //Crear la cita, colocarla en el state principal
        crearCita(cita);
        //Limpiar el formulario
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        });
    }

    return ( 
        <Fragment>
            <h2>Crear Cita</h2>

            {error ? 
                <p className="alerta-error">Todos los campos son obligatorios</p>
                :
                null
            }

            <form
                onSubmit={submitCita}
            >
                <label>Nombre de mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={actualizarState}
                    value={mascota}
                />
                <label>Nombre del dueño</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre dueño de la mascota"
                    onChange={actualizarState}
                    value={propietario}
                />
                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />
                <label>Hora</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />
                <label>Síntomas</label>
                <textarea
                    type="time"
                    name="sintomas"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={sintomas}
                ></textarea>
                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar Cita</button>
            </form>
        </Fragment>
     );
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}

export default Formulario;