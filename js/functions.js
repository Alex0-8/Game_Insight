//--- elementos del modal
const modal = document.getElementById('modal')
const openModal = document.getElementById('modal-open')
const closeModalIcon = document.getElementById('modal-close')
//--- elementos del fromulario
const form = document.getElementById('subscriptionForm')
const nameInput = document.getElementById('name')
const emailInput = document.getElementById('email')
const nameIcon = document.getElementById('name-icon')
const emailIcon = document.getElementById('email-icon')
const nameError = document.getElementById('name-error')
const emailError = document.getElementById('email-error')
const succesMessage = document.getElementById('succes-message')


// seccion del modal
const closeModal = () => {
    modal.style.display = 'none'
    document.body.classList.remove('no-scroll')
}

openModal.addEventListener('click', () => {
    modal.style.display = 'flex';
    document.body.classList.add('no-scroll')
});

closeModalIcon.addEventListener('click', () => {
    closeModal()
})

document.addEventListener('keyup', (e) => {
    if(e.key === 'Escape'){
        closeModal()
    }
})

window.addEventListener('click', (e) => {
    if(e.target === modal){
        closeModal()
    }
})

//---- seccion del formulario
const validateForm = (event) => {
    event.preventDefault()

    //limpia el formulario
    emailIcon.innerHTML = '';
    nameIcon.innerHTML = '';
    
    let valid = true;
    const userNameTrimmed = nameInput.value.trim();

    //valida el campo del nombre de usuario
    if(userNameTrimmed === '' || userNameTrimmed.length < 3){
        nameError.innerHTML = 'El nombre es demasiado corto'

        const checkIcon = document.createElement('img')
        checkIcon.src = 'img/iconos/x-circle-red.svg'
        nameIcon.appendChild(checkIcon)
        valid = false;
    }else {
        nameError.innerHTML = ''

        const checkIcon = document.createElement('img')
        checkIcon.src = 'img/iconos/check-circle-green.svg'
        nameIcon.appendChild(checkIcon)
    }

    // valida el campo del correo electronico
    const emailCaracters = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailCaracters.test(emailInput.value.trim())){
        emailError.innerHTML = 'El correo electronico no es valido'

        const checkIcon = document.createElement('img')
        checkIcon.src = 'img/iconos/x-circle-red.svg'
        emailIcon.appendChild(checkIcon)
        valid = false;        
    }else{
        emailError.innerHTML = '';

        const checkIcon = document.createElement('img')
        checkIcon.src = 'img/iconos/check-circle-green.svg'
        emailIcon.appendChild(checkIcon)
    }

    // maneja el mensaje de error y exito
    if(valid){
        succesMessage.classList.remove('error-message')
        succesMessage.classList.add('succes-message')
        succesMessage.innerHTML = '¡Subscripcion completada!'

        //limpia el formulario despues de 4 segundos
        setTimeout(() => {
            succesMessage.classList.remove('succes-message')
            succesMessage.innerHTML = ''
            nameIcon.innerHTML = ''
            emailIcon.innerHTML = ''
            nameInput.value = ''
            emailInput.value = ''
        }, 3000)
    }else{
        succesMessage.classList.remove('succes-message')
        succesMessage.classList.add('error-message')
        succesMessage.innerHTML = 'Completa los campos para continuar'
    }
}

document.addEventListener('DOMContentLoaded', () => {
    form.addEventListener('submit', validateForm)
})

// seccion para evitar que se seleccionen los objetos del fondo cuendo se abre el modal con tab
    const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    let focusableElements;
    let firstFocusable;
    let lastFocusable;

    openModal.addEventListener('click', () => {
        modal.style.display = 'flex';
        document.body.classList.add('no-scroll');

        // se obtienen lo elementos enfocables
        focusableElements = modal.querySelectorAll(focusableSelectors);
        if (focusableElements.length > 0) {
            firstFocusable = focusableElements[0];
            lastFocusable = focusableElements[focusableElements.length - 1];
            firstFocusable.focus(); // enfoca el primer elemento del modal
        }
    });

    // se captura tabulaciones para limitar el foco dentro del modal
    document.addEventListener('keydown', (e) => {
        if (modal.style.display !== 'flex') return;

        if (e.key === 'Tab') {
            if (!focusableElements) return;

            if (e.shiftKey) {
                // Shift + Tab
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                // Tab
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        }
    });