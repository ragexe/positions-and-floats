document.addEventListener('DOMContentLoaded', function () {
    addFormValidation(document.getElementById('contact-form'));
});

function addFormValidation(theForm) {

    if (theForm === null || theForm.tagName.toUpperCase() !== 'FORM') {
        throw new Error("expected first parameter to addFormValidation to be a FORM.");
    }

    theForm.noValidate = true;

    theForm.addEventListener('blur', function(evt) {
        console.log(evt);
    }, true);

    theForm.addEventListener('submit', function (evt) {
        var isError = false;
        var elements = this.elements;
        for (var i = 0; i < elements.length - 1; i += 1) {
            if (!isFieldValid(elements[i])) {
                isError = true;
            }
        }

        if (isError) {
            evt.preventDefault();
        }
    });

    function isFieldValid(field) {
        var errorMessage = "";
        field.classList.remove('invalid');
        var errorSpan = document.querySelector('#' + field.id + '-error');
        if (errorSpan === null) {
            console.error("error: ", field);
            throw new Error("could not find the '#" + field.id + "-error' element. It's needed for error messages if #" + field.id + " is ever invalid.");
        }
        errorSpan.classList.remove('danger');
        errorSpan.innerHTML = "";

        if (field.minLength > 0 && field.value.length < field.minLength) {
            errorMessage = "Must be " + field.minLength + " or more characters long.";
        }

        if (field.type === "email" && !isEmail(field.value)) {
            errorMessage = "This should be a valid email address.";
        }

        if (field.required && field.value.trim() === "") {
            errorMessage = "This  field is required.";
        }

        if (errorMessage !== "") {
            field.classList.add('invalid');

            errorSpan.classList.add('danger');
            errorSpan.innerHTML = errorMessage;
            return false;
        }

        return true;
    }

    function isEmail(input) {
        return input.match(/^([a-z0-9_.\-+]+)@([\da-z.\-]+)\.([a-z\.]{2,})$/);
    }
}