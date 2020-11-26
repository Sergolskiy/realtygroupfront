import React from 'react'

{/*<TelephoneInput phoneId={i} value={item.value} unique={i + 1}*/}
{/*onChange={onChangePhone}/>*/}

export class TelephoneInput extends React.Component {
    componentDidMount() {
        const unique = this.props.unique, // Уникальное значение для идентификации элемента DOM
            // input = document.querySelector("input[name='phone" + unique + "']"),
            input = document.getElementById("phone" + unique),
            errorMsg = document.getElementById("error-msg" + unique),
            validMsg = document.getElementById("valid-msg" + unique),
            errorMap = ["Неправильный номер", "Неправильный код страны", "Слишком короткий", "Слишком длинный", "Неправильный номер"],
            iti = window.intlTelInput(input, {
                nationalMode: false,
                preferredCountries: ["ua", "ru", "pl"],
                // autoHideDialCode: false,
                autoPlaceholder: 'aggressive',
                utilsScript: "/library/intlTelInput/js/utils.js"
            }),
            reset = function () {
                input.classList.remove("error");
                // errorMsg.innerHTML = "";
                errorMsg.classList.add("d-none");
                validMsg.classList.add("d-none");
            };

        // on blur: validate
        input.addEventListener('blur', function() {
            reset();
            if (input.value.trim()) {
                if (iti.isValidNumber()) {
                    validMsg.classList.remove("d-none");
                }
                else {
                    input.classList.add("error");
                    const errorCode = iti.getValidationError();
                    errorMsg.title = errorMap[errorCode];
                    errorMsg.classList.remove("d-none");
                }
            }
        });

        // on keyup / change flag: reset
        input.addEventListener('change', reset);
        input.addEventListener('keyup', reset);


        // intlTelInput создает новый input, которому не хватает span в классе inputGroup, значит создаем вручную
        $(input).after("<span/>");
    }


    render() {
        const {defaultValue, value, unique, phoneId, onChange = () => {}} = this.props;

        return (
            <div className="inputGroup flex-between">
                <input type="tel" name="phone" id={"phone" + unique} defaultValue={defaultValue} value={value} onChange={onChange} data-phone-id={phoneId}/>
                <span/>
                <i id={"valid-msg" + unique} className="mdi mdi-check d-none color-green"/>
                <i id={"error-msg" + unique} className="mdi mdi-window-close d-none color-red" data-toggle="tooltip"/>
            </div>
        )
    }
}