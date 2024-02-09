import Swal from "sweetalert2";
import axios from "axios";

export function alerta(titulo, icono, foco='') {
    if (foco != '') {
        document.getElementById(foco).focus();
    }

    Swal.fire({
        title: titulo,
        icon:icono,
        customClass: {confirmButton: 'btn btn-primary', popup:'animated zoomIn'},
        buttonsStyling:false
    });
}

export function confirmar(urlSlash, id, titulo, mensaje) {
    let url = urlSlash+id;
    const swalButton = Swal.mixin({
        customClass:{confirmButton: 'btn btn-success', cancelButton: 'btn btn-danger'}
    });

    swalButton.fire({
        title: titulo,
        text: mensaje,
        icon: 'question', 
        showCancelButton: true,
        confirmButtonText: '<i class="fa fa-solid fa-check"></i> Si, eliminar',
        cancelButtonText: '<i class="fa fa-solid fa-ban"></i> Cancelar'}).then((res) =>{
            if (res.isConfirmed) {
                enviarSolicitud('DELETE', {id:id}, url, 'Eliminado exitosamente');
            } else {
                alerta('Operación cancelada','info')
            }
        });

   
}

export function enviarSolicitud(metodo, parametros, url, mensaje) {
    axios({method:metodo, data:parametros ,url:url}).then(function (res) {
        let estado = res.status;
        if (estado == 200 || estado==201) {
            alerta(mensaje, 'success');
            window.setTimeout(function () {
                window.location.reload(true)
            }, 1000);
        } else{
            alerta('No se pudo recuperar la respuesta', 'error');
        }
    }).catch( function (error) {
        alerta('Error de servidor', 'error');
    });
}