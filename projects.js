$(document).ready(function() {
    const HTML_btnsBuy = document.querySelectorAll('.btn-buy');
    const HTML_formBuy = document.getElementById('form-buy');
    const HTML_blur = document.getElementById('blur');

    const HTML_btn_formClose = document.getElementById('form-close');
    const HTML_input_name = document.getElementById('name');
    const HTML_input_email = document.getElementById('email');
    const HTML_input_phone = document.getElementById('phone');
    const HTML_input_country = document.getElementById('country');
    const HTML_input_date = document.getElementById('date');
    const HTML_input_comment = document.getElementById('comment');
    const HTML_input_agree = document.getElementById('agree');
    const HTML_input_submit = document.getElementById('form-buy-submit');

    showForm(false);
    disableSubmitBtn();

    HTML_btn_formClose.addEventListener("click", () => {
        showForm(false);
    });

    //checkbox change
    HTML_input_agree.addEventListener("change", function() {
        if(this.checked) disableSubmitBtn(false);
        else disableSubmitBtn();
    });

    //submit form
    HTML_input_submit.addEventListener("click", async (event) => {
        event.preventDefault();
        if(!HTML_input_agree.checked) return;
        if(!checkFormValid()) return;
        clearInputs();
        await showForm(false);
        setTimeout(() => alert("Письмо отправлено!"), 1000);
    });

    //show form
    HTML_btnsBuy.forEach(el => {
        el.addEventListener("click", (event) => {
            event.preventDefault();
            showForm();
        })
    });

    //---Functions---

    async function showForm(show=true){
        if (show){
            const fadein = () => {
                HTML_blur.style.display = "block";
                HTML_formBuy.style.display = "flex";

                HTML_blur.classList.add('fadeInAnimation');
                HTML_formBuy.classList.add('fadeInAnimation');
                setTimeout(() => {
                    HTML_blur.classList.remove('fadeInAnimation');
                    HTML_formBuy.classList.remove('fadeInAnimation');
                    return;
                }, 500);
            };
            fadein();
        }
        else{
            const fadeout = () => {
                HTML_blur.classList.add('fadeOutAnimation');
                HTML_formBuy.classList.add('fadeOutAnimation');
                setTimeout(() => {
                    HTML_blur.style.display = "none";
                    HTML_formBuy.style.display = "none";

                    HTML_blur.classList.remove('fadeOutAnimation');
                    HTML_formBuy.classList.remove('fadeOutAnimation');
                    return;
                }, 500);
            };
            fadeout();
        }
        return;
    }

    function disableSubmitBtn(disable=true){
        HTML_input_submit.disabled = disable;
    }

    function checkFormValid(){
        if(HTML_input_name.value.length === 0 || HTML_input_name.value.split(' ').length < 3){
            showErrorInput(HTML_input_name);
            return false;
        }
        if(!checkEmailValid(HTML_input_email.value)){
            showErrorInput(HTML_input_email);
            return false;
        }
        if(!checkPhoneValid(HTML_input_phone.value)){
            showErrorInput(HTML_input_phone);
            return false;
        }
        if(!Date.parse(HTML_input_date.value)){
            showErrorInput(HTML_input_date);
            return false;
        }
        return true;
    }

    async function showErrorInput(HTML_input){
        console.log(HTML_input);
        HTML_input.classList.add('error-input');
        setTimeout(() => {HTML_input.classList.remove('error-input');}, 2000);
    }

    function checkEmailValid(email){
        return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    }

    function checkPhoneValid(phone){
        phone = phone.replaceAll(' ', '');
        if(phone.length <= 10 || phone.length >= 14) return false;
        const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
        for (let i = 0; i < phone.length; i++){
            if(i === 0 && phone[i] === '+') continue;
            if(!(phone[i] in digits))return false;
        }
        return true;
    }

    function clearInputs(){
        HTML_input_name.value = '';
        HTML_input_email.value = '';
        HTML_input_phone.value = '';
        HTML_input_country.selectedIndex = 0;
        HTML_input_date.value = '';
        HTML_input_comment.value = '';
        HTML_input_agree.checked = false;
        HTML_input_agree.dispatchEvent(new Event('change'));
    }
});