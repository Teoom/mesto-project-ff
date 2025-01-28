const validation = {
  validationConfig: {},
  enableValidation(validationConfig) {
    validation.validationConfig = validationConfig;
    const formList = [...document.querySelectorAll(validation.validationConfig.formSelector)];


    formList.forEach(form => {
      const inputList = [...form.querySelectorAll(validation.validationConfig.inputSelector)];


      validation.toggleButtonState(form, inputList);

      inputList.forEach(input => {
        input.addEventListener('input', () => {
          validation.toggleButtonState(form, inputList);
          validation.checkInputValidity(form, input);
        })
      })
    })
  },
  toggleButtonState(form, inputList) {
    const submitButton = form.querySelector(validation.validationConfig.submitButtonSelector);

    if (validation.hasInvalidInput(inputList)) {
      submitButton.classList.add(validation.validationConfig.inactiveButtonClass);
      submitButton.disabled = true;
    } else {
      submitButton.classList.remove(validation.validationConfig.inactiveButtonClass);
      submitButton.disabled = false;
    }
  },
  hasInvalidInput(inputList) {
    return inputList.some(input => !input.validity.valid)
  },
  checkInputValidity(formElement, inputElement) {

    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage || "");
    } else {
      inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
      validation.showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      validation.hideInputError(formElement, inputElement);
    }
  },
  showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validation.validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validation.validationConfig.errorClass);
  },
  hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validation.validationConfig.inputErrorClass);
    errorElement.classList.remove(validation.validationConfig.errorClass);
    errorElement.textContent = '';
  },
  clearValidation(formElement) {
    const inputList = [...formElement.querySelectorAll(validation.validationConfig.inputSelector)];

    inputList.forEach(input => {
      input.setCustomValidity("");
      validation.hideInputError(formElement, input);
    })

    validation.toggleButtonState(formElement, inputList);
  }



}


export { validation as default };

