var sc = {
    init: function () {
        this.fixEmptyHyperLink();
        this.stringFormat();
        this.addAsteriskForRequiredFields();
        //if (this.isTrue(document.querySelector("#IsAuthenticated").value)) {
        //  this.activateNotificationBarRefreshing(2);
        //}
        this.preventFromSubmittingPageByPressingEnter();
        this.registerReplaceGlobal();
        this.registerToMoneyFloat();
        this.registerToFloat();
        this.registerToTurkishMoneyString();
        /*this.extendPrintFunction();*/
        /*this.bindDynamicAjaxPage();*/
        /*this.bindExcelButton();*/
        /*this.bindLanguageSelect();*/
        /*this.ieWarning();*/

        var ia = document.querySelector("#IsAuthenticated");
        if (ia) {
            if (this.isTrue(ia.value)) {
                this.configureIdleLogout();
                this.activateSelectFocus();
            }
        }
        this.activateTooltip();
        this.activatePopover();
        this.initScrollToTopButton();
        /*this.handleFeedbackForm();*/
    },
    /** @description Is null or empty*/
    ine: function (text) {
        if (text === null || text === undefined || text === "undefined" || text === "") {
            return true;
        }
        return false;
    },
    /** @description Is null or empty or whitespace,*/
    inew: function (text) {
        if (this.ine(text) || text === " ") {
            return true;
        }
        return false;
    },
    /** @description Is null or empty or zero*/
    inez: function (text) {
        if (this.ine(text) || text === 0 || text === "0") {
            return true;
        }
        return false;
    },
    /** @description Is input object string*/
    isString: function (obj) {
        return Object.prototype.toString.call(obj) == '[object String]';
    },
    /** @description Is input object int or float*/
    isNumber: function (obj) {
        return (!isNaN(parseFloat(obj)));//&& parseFloat(obj.replace(",", ".")) == obj.replace(",", "."));
    },
    /** @description Is input a object*/
    isObject: function (obj) {
        return typeof obj == 'object';
    },
    /** @description Is input value true*/
    isTrue: function (value) {
        if (!this.ine(value)) {
            const isString = this.isString(value);
            if (isString) {
                if (value.toLowerCase() === "true")
                    return true;
            }
            else if (value === true) {
                return true;
            }
        }
        return false;
    },
    /** @description Is input value false*/
    isFalse: function (value) {
        if (!this.ine(value)) {
            const isString = this.isString(value);
            if (isString) {
                if (value.toLowerCase() === "false")
                    return true;
            }
            else if (value === false) {
                return true;
            }
        }
        return false;
    },
    /** @description Is input value integer */
    isInt: function (value) {
        return value === parseInt(value, 10);
    },
    /** @description Shows warning/info message on screen */
    noty: function (message, isSuccess = null, autoHide = true) {
        let icon;
        switch (isSuccess) {
            case true:
                icon = '<i class="ri-check-line text-success me-2 fs-5"></i>';
                break;
            case false:
                icon = '<i class="ri-error-warning-line text-danger me-2 fs-5"></i>';
                break;
            default:
                icon = '<i class="ri-information-line text-info me-2 fs-5"></i>';
        }
        let html = '<div class="toast align-items-center" role="alert" aria-live="assertive" aria-atomic="true"  data-bs-autohide="' + (autoHide ? "true" : "false") + '" data-bs-delay="7000">' +
            '  <div class="d-flex">                                                                                                                                                   ' +
            '    <div class="toast-body">                                                                                                                                             ' +
            '      <span class="me-auto">' + icon + message + '</strong>                                                                                                               ' +
            '    </div>                                                                                                                                                               ' +
            '    <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>                                                             ' +
            '  </div>                                                                                                                                                                 ' +
            '</div>';
        const element = document.getElementById('ToastContainer')
        element.insertAdjacentHTML('beforeend', html);

        let myAlert = document.querySelector('.toast:last-child');
        let bsAlert = new bootstrap.Toast(myAlert);
        bsAlert.show();
        //const toastElList = document.querySelectorAll('.toast')
        //const toastList = [...toastElList].map(toastEl => new bootstrap.Toast(toastEl))


        //var option = {
        //  type: 'primary',
        //  icon: '<i class="far fa-check-circle fa-lg me-2"></i>',
        //  title: 'Notification!',
        //  subtitle: '23 secs ago',
        //  content: 'Hello World!',
        //}
        //const toastElList = document.querySelectorAll('.toast')
        //const toastList = [...toastElList].map(toastEl => new bootstrap.Toast(toastEl, option))
        //var title = "";
        //var status = "info";
        //if (this.isTrue(isSuccess))
        //  status = "success";
        //else if (this.isFalse(isSuccess))
        //  status = "error";
        //var timeout = 5000;
        //if (this.isNumber(isPermanent)) {
        //  timeout = isPermanent * 1000;
        //}
        //toastr.options = {
        //  "closeButton": true,
        //  "debug": false,
        //  "positionClass": "toast-top-left",//toast-top-full-width
        //  "onclick": null,
        //  "showDuration": "8000",
        //  "hideDuration": "500",
        //  "timeOut": this.isTrue(isPermanent) ? "0" : timeout,
        //  "extendedTimeOut": "1000",
        //  "showEasing": "swing",
        //  "hideEasing": "linear",
        //  "showMethod": "fadeIn",
        //  "hideMethod": "fadeOut"
        //}
        //toastr[status](message, title)
    },

    block: function (target) {
        if (blockerscb) {
            blockerscb.block(target);
        } else {
            this.logError("blockerscb module hasn't been initialized!");
        }
    },
    // wrApper function to  un-block element(finish loading)
    unblock: function (target) {
        if (blockerscb) {
            blockerscb.unblock(target);
        } else {
            this.logError("blockerscb module hasn't been initialized!");
        }
    },

    sendDataToController: function () {
        // Define the parameters to send
        const params = {
            param1: 'value1',
            param2: 'value2'
        };

        // Make a POST request to the controller method
        fetch('/ControllerName/MethodName', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response from the controller
                console.log(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    },

    postData: function (url, data = {}, divSelectorForNewContent, divSelectorForLoading, additionalSuccessFunction) {
        this.getData(url, data, divSelectorForNewContent, divSelectorForLoading, additionalSuccessFunction, "POST");
    },
    /** @description Custom fetch function.
  * @param {string} url /Controller/Action formatted Url must be defined.
  * @param {Object} data Data object.
  * @param {string} divSelectorForNewContent content div can be selected like #DivId.
  * @param {string} divSelectorForLoading loading div can be selected like #DivId.If null, divSelectorForNewContent will be blocked
  * @param {function} additionalSuccessFunction Extra function.
  * @param {string} method method is "GET", if you want to post, use postData() function.
  */
    getData: function (url, data = null, divSelectorForNewContent, divSelectorForLoading, additionalSuccessFunction, method = "GET") {
        let xsrfEl = document.querySelector('input[name="__RequestVerificationToken"][type="hidden"]');
        if (divSelectorForNewContent) {
            divSelectorForLoading = divSelectorForNewContent;
        }
        this.block(divSelectorForLoading);
        var completion = function () {
            this.unblock(divSelectorForLoading);
        }
        let isFormData = (data instanceof FormData);

        //if (data && data instanceof FormData) {
        //  for (const value of data.values()) {
        //    if (typeof (value) == 'object') { // ya da value.constructor.prototype.constructor.name == "File"
        //      hasFile = true;
        //      break;
        //    }
        //  }
        //}
        var headers = {
            'Accept': 'application/json',
            'XSRF-TOKEN': xsrfEl != null ? xsrfEl.value : ""
        }
        if (!isFormData) {
            headers['Content-Type'] = 'application/json';//'Content-Type': 'application/json', //'Content-Type': 'application/x-www-form-urlencoded',
        }

        fetch(url, {
            method: method, //GET , POST
            mode: "cors", // no-cors, (default value)cors, same-origin
            cache: "no-cache", // (default value)default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, (default value)same-origin, omit
            headers: headers,
            redirect: "follow", // manual, (default value)follow, error
            referrerPolicy: "no-referrer", // no-referrer, (default value)no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: (data == null ? null : (isFormData ? data : JSON.stringify(data)))
        })
            .then((response) => {
                completion();
                if (response.ok) {
                    return response.json();
                }
                throw Error(response.statusText);
                //throw new Error('Something went wrong');
            })
            .then(responseJson => {
                /*console.log(responseJson);*/
                if (responseJson.ok) { //success
                    var newContentDiv = document.querySelector(divSelectorForNewContent);
                    if (newContentDiv) {
                        newContentDiv.innerHTML = responseJson.object;
                        this.addAsteriskForRequiredFields();
                        this.activateTooltip();
                        this.activatePopover();
                    }
                    if (typeof additionalSuccessFunction === "function") {
                        additionalSuccessFunction(responseJson);
                    }
                    if (!this.inew(responseJson.message)) {
                        this.noty(responseJson.message, true);
                    }
                } else {
                    this.noty(responseJson.message, false);
                }

            })
            .catch(error => {
                completion();
                console.error('Fetch error : ', error)
            });

    },

     
    //registers replaceGlobal extension function
    registerReplaceGlobal: function () {
        // First, checks if it isn't implemented yet.
        if (!String.prototype.replaceGlobal) {
            String.prototype.replaceGlobal = function (search, replacement) {
                var target = this;
                var myString = target.split(search).join(replacement);
                return myString;
                //return target.replace(new RegExp(search, 'g'), replacement);
            };
        }
    },
    //format string
    stringFormat: function () {
        // First, checks if it isn't implemented yet.
        if (!String.prototype.format) {
            String.prototype.format = function () {
                var args = arguments;
                return this.replace(/{(\d+)}/g, function (match, number) {
                    return typeof args[number] != 'undefined' ? args[number] : match;
                });
            };
        }
    },
    //registers toMoneyFloat function this function turns string or number to float 
    registerToMoneyFloat: function () {
        // to use => "22,32".toMoneyFormat()
        if (!String.prototype.toMoneyFloat) {
            String.prototype.toMoneyFloat = function () {
                if (this.ine(this) || this.length === 0)
                    return this;
                return (Math.round(parseFloat(this.replaceGlobal(".", "").replaceGlobal(",", ".").replaceGlobal("₺", "")) * 100) / 100).toFixed(2).toString().replaceGlobal(".", ",");
            };
        }
        if (!Number.prototype.toMoneyFloat) {
            Number.prototype.toMoneyFloat = function () {
                if (this.ine(this) || this.length === 0)
                    return this;
                return (Math.round(this * 100) / 100).toFixed(2).replaceGlobal(".", ",");
            };
        }
    },
    //registers toTurkishMoneyString function this function turns string or number to Turkish money string with TL symbol
    registerToTurkishMoneyString: function () {
        if (!String.prototype.toTurkishMoneyString) {
            String.prototype.toTurkishMoneyString = function () {
                return (Math.round(parseFloat(this.replaceGlobal(",", ".")) * 100) / 100).toFixed(2).replaceGlobal(".", ",") + " ₺";
            };
        }
        if (!Number.prototype.toTurkishMoneyString) {
            Number.prototype.toTurkishMoneyString = function () {
                return (Math.round(this * 100) / 100).toFixed(2).replaceGlobal(".", ",") + " ₺";
            };
        }
    },
    //registers toFloat function this function turns string to float
    registerToFloat: function () {
        if (!String.prototype.toFloat) {
            String.prototype.toFloat = function () {
                return parseFloat(this.replaceGlobal(",", ".").replaceGlobal("₺", "").trim());
            };
        }
        if (!Number.prototype.toFloat) {
            Number.prototype.toFloat = function () {
                return this;
            };
        }
    },
    extractNumberFromString: function (text) {
        return text.replace(/[^0-9]/g, '');
    },
    showMessage: function (message, isSuccess) {
        let myClassNames = "";
        if (isSuccess == null) {
            myClassNames += "info"
        } else {
            myClassNames += isSuccess ? "success" : "error";
        }
        if(this.polipop != null){
            this.polipop.add({
        
                content: message,
                /*title: 'Message',*/
                type: myClassNames, //default, info, success, warning or error
            });
        }
    },
    /**
     * @description Evaluates form, shows warning if need, returns true if form is valid
     * @returns  {boolean}
     * @param {string} formSelector The string like #MyForm
    */
    isFormValid: function (formId) {
        let isValidResult = true;
    
        const form = document.getElementById(formId);
        if (!form) {
            this.showMessage("Form is not valid!", false);
            return false;
        }
    
        const inputList = form.querySelectorAll('input[required]:not([type="hidden"]):not([hidden]), select[required]:not([hidden]), textarea[required]:not([hidden])');
    
        inputList.forEach(input => {
            const inputType = input.type;
            const tagName = input.tagName;
            const id = input.id;
            let labelText = "";
    
            if (inputType === "radio") {
                const radioElements = document.querySelectorAll(`input[type="radio"][name="${input.name}"]`);
                const isChecked = Array.from(radioElements).some(radio => radio.checked);
    
                if (!isChecked) {
                    isValidResult = false;
                    const labelElement = document.querySelector(`label[for="${input.name}"]`);
                    labelText = labelElement ? labelElement.textContent : input.name;
                    labelText = labelText.replace("*", "").trim() || input.name;
                    return;
                }
            } else if (!input.value) {
                isValidResult = false;
                const labelElement = document.querySelector(`label[for="${id}"]`);
                labelText = labelElement ? labelElement.textContent : id;
                labelText = labelText.replace("*", "").trim() || input.placeholder || id;
    
                let warningText = "Please fill required fields";
                if (tagName === "INPUT" || tagName === "TEXTAREA") {
                    warningText = `Please fill ${labelText} field`;
                } else if (tagName === "SELECT") {
                    warningText = `Please select an item from ${labelText} field`;
                }
    
                const inputElement = document.getElementById(id);
                if (!inputElement.classList.contains("border-danger")) {
                    inputElement.classList.add("border-danger");
                    const warningHtml = `<div class="oopsError text-danger form-text">${warningText}</div>`;
                    const parentElement = inputElement.parentElement;
                    const itemToAddWarning = parentElement.classList.contains("input-group") ? parentElement : inputElement;
                    itemToAddWarning.insertAdjacentHTML("afterend", warningHtml);
    
                    setTimeout(() => {
                        inputElement.classList.remove("border-danger");
                        document.querySelectorAll(".oopsError").forEach(errorElement => {
                            errorElement.remove();
                        });
                    }, 10000);
                }
            }
        });
    
        return isValidResult;
    },
    logError: function (errorText) {
        console.log('%c' + errorText, 'background: #ff8888; color: #fff');
    },
    /**
     * Searches upward from a given element to find a `label` element within a specified number of levels.
     *
     * @param {HTMLElement} element - The starting element for the search.
     * @param {number} levels - The number of parent levels to traverse up.
     * @returns {HTMLElement|null} - The first `label` element found, or `null` if none is found.
     *
     * @example
     * let inputElement = document.getElementById('input1');
     * let labelElement = findLabelUp(inputElement, 3); // Finds and returns the label element
     */
    findLabelUp: function (element, levels) {
        for (let i = 0; i < levels; i++) {
            element = element.parentElement;
            let label = element.querySelector('label');
            if (label) {
                return label;
            }
        }
        return null;
    },
    
    /** @description adds asterisk * to input labels which have required property */
    addAsteriskForRequiredFields: function (formSelector) {
        formSelector = !this.ine(formSelector) ? formSelector : "body";
        var formElement = document.querySelector(formSelector);
        let inputList = formElement.querySelectorAll('input[required], select[required], textarea[required]');
        inputList.forEach((input) => {
            var label;
            var id = input.id;
            var name = input.name;

            if (!this.inew(id) && document.querySelector("label[for='" + id + "']")) {
                label = document.querySelector("label[for='" + id + "']");
            } else if (!this.inew(name) && document.querySelector("label[for='" + name + "']")) {
                label = document.querySelector("label[for='" + name + "']");
            }
            if (!label) {
                // 3 level up and search label in its children
                label = findLabelUp(input, 3);
            }

            if (label) {
                var labelHtml = label.innerHTML;
                if (labelHtml.indexOf("*") === -1) {
                    labelHtml = labelHtml.trim() + "<span class='text-danger'>*</span>";
                    label.innerHTML = labelHtml;
                }
            } else {
                // this.giveError('Error: Label Not found for asterisks!');
            }
        });
    },
    isAlphaNumeric: function (str) {
        var code, i, len; for (i = 0, len = str.length; i < len; i++) {
            code = str.charCodeAt(i);
            if (!(code > 47 && code < 58) && // numeric (0-9)
                !(code > 64 && code < 91) && // upper alpha (A-Z)
                !(code > 96 && code < 123)) { // lower alpha (a-z)
                return false;
            }
        }
        return true;
    },
    getFileNameFromPath: function (path) {
        var arr = path.split("\\");
        var fileName = arr[arr.length - 1];
        return fileName;
    },
    getFileNameFromUrl: function (path) {
        var arr = path.split("/");
        var fileName = arr[arr.length - 1];
        return fileName;
    },
    splitUrlBySlash: function (url) {
        return url.replace(/\/\s*$/, '').split('/');
    },
    isJsonString: function (str) {
        try {
            JSON.parse(str);
        } catch (e) {
            //console.log(e)
            return false;
        }
        return true;
    },
    isHtmlString: function (str) {
        var a = document.createElement('div');
        a.innerHTML = str;

        for (var c = a.childNodes, i = c.length; i--;) {
            if (c[i].nodeType == 1) return true;
        }
        return false;
        //Another solution as one-liner 
        //var isHTML = RegExp.prototype.test.bind(/(<([^>]+)>)/i);
    },
    contains: function (item, arr) {
        return arr.indexOf(item) > -1;
    },
    getRandomNum: function (min, max) {
        return Math.random() * (max - min) + min;
    },

    /**
    * @deprecated because it hurts checkboxlist values
    */
    setChecboxValueOnChange: function () {
        // Add event listener to all checkboxes to update their values on change
        var checkboxes = document.querySelectorAll("input[type=checkbox]");
        checkboxes.forEach(function (checkbox) {
            checkbox.addEventListener("change", function () {
                checkbox.value = checkbox.checked ? "true" : "false";
            });
        });

        // Update initial values for all checkboxes
        checkboxes.forEach(function (checkbox) {
            checkbox.value = checkbox.checked ? "true" : "false";
        });

    },
    showMessage: function (message, isSuccess) {
        let myClassNames = "";
        if (isSuccess == null) {
            myClassNames += "info"
        } else {
            myClassNames += isSuccess ? "success" : "error";
        }
        if (this.polipop != null) {
            this.polipop.add({

                content: message,
                /*title: 'Message',*/
                type: myClassNames, //default, info, success, warning or error
            });
        }
    },
    /** @description Compiles form data as json form data in default but with isFormData parameter it generates a FormData for XMLHttpRequest.
     * @param {boolean} isFormData It is used for file upload beacuse we post FormData to backend side
     * @return {jsonForm or formdata}
    */
     
    getFormData: function (formId) {
        const jsonForm = {};
        let isFormData = false; 
        let form = document.getElementById(formId);
        
        if (!formId && document.forms.length === 1) {
            form = document.forms[0];
        }
        
        if (!form) {
            return null; // Return null if the form is not found
        }
        
        const elements = form.querySelectorAll("input, select, textarea, ul.dynamicList");
    
        elements.forEach(element => {
            const id = element.id || element.name;
            if (!this.ine(id)) {
                if (id === "__RequestVerificationToken") { return; }
                switch (element.type) {
                    case "checkbox":
                        jsonForm[id] = element.checked;
                        break;
                    case "radio":
                        const checkedOne = form.querySelector(`input[name='${element.name}']:checked`);
                        if (checkedOne) jsonForm[element.name] = checkedOne.value;
                        break;
                    case "file":
                        isFormData = true;
                        jsonForm[id] = element.files.length > 0 ? element.files[0] : null;
                        break;
                    case "date":
                        jsonForm[id] = element.value || null;
                        break;
                    case "ul":
                        jsonForm[id] = getDynamicListVal(id);
                        break;
                    default:
                        jsonForm[id] = element.value || null;
                        if (element.dataset.texttype === "Money") {
                            jsonForm[id] = parseFloat(element.value.replace(/,/g, "")) || 0;
                        }
                        break;
                    }
                }
        });
    
        if (isFormData) {
            const formData = new FormData();
            for (const key in jsonForm) {
                formData.append(key, jsonForm[key]);
            }
            return formData;
        }
        return jsonForm;
    },
    fixEmptyHyperLink: function () {
        var links = document.querySelectorAll("a");
        links.forEach(function (link) {
            if (!link.getAttribute("href")) {
                link.setAttribute("href", "javascript:void(0)");
            }
        });
    },
    formatBytes: function (a, b) {
        if (0 == a) return "0 Bytes";
        var c = 1024, d = b || 2, e = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], f = Math.floor(Math.log(a) / Math.log(c));
        return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f]
    },
    getGmt: function () {
        var a = new Date().getTimezoneOffset();
        var res = -Math.round(a / 60) + ':' + -(a % 60);
        res = res < 0 ? res : '+' + res;
        return res;
    },
    isUrl: function (str) {
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return pattern.test(str);
    },
    bindPasteCommand: function () {
        document.body.addEventListener('paste', function (e) {
            e.preventDefault();
            var clipboardData = (e.originalEvent || e).clipboardData;
            if (!clipboardData) {
                return;
            }
            var text = clipboardData.getData('text/plain');
            console.log("text " + text);
            if (!this.isUrl(text)) {
                this.noty("Not A Valid Url", false);
                return false;
            } else {
                this.UploadByUrl(text, "ShareArea", true);
            }
        });
    },
    //move toolbar to up direction
    goUp: function (elementId) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // You can change this to 'auto' for instant scrolling
        });
    },
    getRandomColor: function () {
        var letters = 'CDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 4)];
        }
        return color;
    },
    changeBg: function () {
        var w = Math.round(document.documentElement.clientWidth / 255);
        var h = Math.round(document.documentElement.clientHeight / 255);
        var body = document.body;

        document.addEventListener('mousemove', function (e) {
            var pageX = Math.round(e.pageX / w);
            var pageY = Math.round(e.pageY / h);

            console.log(w + '-' + h + '..' + pageX + '-' + pageY);

            body.style.backgroundColor = 'rgb(' + pageX + ',' + pageY + ',' + (pageX * 10 + 1) + ')';
        });
    },
    //doneTypingMethod must be defined before to be sent as parameter.
    bindSearchTimer: function (inputSelector, doneTypingMethod) {
        var typingTimer;
        var doneTypingInterval = 1000;
        var inputElement = document.querySelector(inputSelector);

        inputElement.addEventListener('keydown', function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
            }
        });

        inputElement.addEventListener('input', function () {
            clearTimeout(typingTimer);
            typingTimer = setTimeout(doneTypingMethod, doneTypingInterval);
        });
    },
    formatReturnObject: function (selectItem) {
        if (selectItem.loading) { return selectItem.text; }
        if (!selectItem.id) { return selectItem.text; }
        if (selectItem.type == "user") {
            var markup = "<span data-userid ='" + selectItem.id + "'><i class='ri-user-line'></i> " + selectItem.text + "</span>";
            if (selectItem.isActive == false) {
                markup += " <span class='label label-sm label-danger'> " + this.localizer("Blocked") + " </span>";
            }
            return markup;
        } else {
            return null;
        }

    },
    bindSelect2Ajax: function (selector, url, onChangeFunction, placeholder, hasSpecialMarkup) {
        var selectElement = document.querySelector(selector);
        var parentElement = selectElement.parentElement;

        if (selectElement.closest(".modal-content")) {
            parentElement = selectElement.closest(".modal-content");
        }

        var options = {
            theme: "bootstrap-5",
            placeholder: placeholder || "PleaseSelect",
            width: selectElement.dataset.width ? selectElement.dataset.width : selectElement.classList.contains('w-100') ? '100%' : 'style',
            language: document.querySelector("#Language").value,
            allowClear: true,
            ajax: {
                url: url,
                dataType: 'json',
                delay: 350,
                data: function (params) {
                    return {
                        searchText: params.term,
                    };
                },
                processResults: function (data) {
                    var returnObject = { results: [] };
                    if (data != null && data.isSuccess == true && data.object != null) {
                        returnObject.results = data.object;
                    }
                    return returnObject;
                },
                cache: true
            },
            dropdownParent: parentElement,
            minimumInputLength: 3,
        };

        if (hasSpecialMarkup) {
            options.escapeMarkup = function (result) {
                return result;
            };
            options.templateResult = formatReturnObject;
        }

        var select2 = new Select2(selectElement, options);

        selectElement.addEventListener("select2:open", function () {
            var hasClasses = parentElement.className.match(/has-.*/);
            if (hasClasses) {
                var classNames = hasClasses[0].split(" ");
                for (var i = 0; i < classNames.length; i++) {
                    if (classNames[i].startsWith("has-")) {
                        var select2Containers = document.querySelectorAll("body > .select2-container");
                        for (var j = 0; j < select2Containers.length; j++) {
                            select2Containers[j].classList.add(classNames[i]);
                        }
                    }
                }
            }
        });

        if (onChangeFunction) {
            selectElement.addEventListener("change", function () {
                onChangeFunction();
            });
        }
    },
    bindLiveSearch: function (searchInputSelector, tableId, showCounter) {
        if (showCounter) {
            var spanHtml = '<span id="CounterResult" class="form-text"></span>';
            var searchInputElement = document.querySelector(searchInputSelector);
            if (searchInputElement.nextElementSibling === null || searchInputElement.nextElementSibling.id !== "CounterResult") {
                searchInputElement.insertAdjacentHTML('afterend', spanHtml);
            }
        }

        var searchInput = document.querySelector(searchInputSelector);
        searchInput.addEventListener('input', function () {
            if (searchInput.value.length == 0) {
                document.getElementById("CounterResult").classList.add("hidden");
            } else {
                document.getElementById("CounterResult").classList.remove("hidden");
            }
            var value = this.value.toLowerCase().trim();
            var tableRows = document.querySelectorAll('#' + tableId + ' tr');

            tableRows.forEach(function (row, index) {
                if (index === 0) { return; }
                var cells = row.querySelectorAll('td');
                var notFound = true;

                cells.forEach(function (cell) {
                    var cellText = cell.textContent.toLowerCase().trim();
                    var matchedIndex = cellText.indexOf(value);

                    if (matchedIndex === 0) {
                        // Add highlighting logic here.
                    }

                    if (matchedIndex !== -1) {
                        notFound = false;
                    }
                });

                if (notFound) {
                    row.classList.add('hidden');
                } else {
                    row.classList.remove('hidden');
                }
            });

            if (document.getElementById("CounterResult") !== null) {
                var rowCount = document.querySelectorAll('#' + tableId + ' tr:not(thead tr):not(.hidden)').length;
                document.getElementById("CounterResult").textContent = rowCount + " kayıt filtrelendi";
            }
        });
        //searchInput.addEventListener("change", function () {
        //  console.log("change")
        //});
    },
    liveSearchTable: function (searchText, tableId) {
        var value = searchText.toLowerCase().trim();
        var tableRows = document.querySelectorAll('#' + tableId + ' tr');
        var counterResult = document.getElementById('CounterResult');

        tableRows.forEach(function (row, index) {
            if (index === 0) { return; }
            var cells = row.querySelectorAll('td');
            var notFound = true;

            cells.forEach(function (cell) {
                var cellText = cell.textContent.toLowerCase().trim();
                var matchedIndex = cellText.indexOf(value);

                if (matchedIndex === 0) {
                    // Add highlighting logic here.
                }

                if (matchedIndex !== -1) {
                    notFound = false;
                }
            });

            if (notFound) {
                row.classList.add('hidden');
            } else {
                row.classList.remove('hidden');
            }
        });

        var rowCount = document.querySelectorAll('#' + tableId + ' tr:visible:not(thead tr:visible)').length;
        counterResult.textContent = rowCount + " kayıt filtrelendi";

    },
    capitalize: function (string) {
        var returnText = string;
        if (this.isString(string)) {
            returnText = string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
        }
        return returnText;
    },
    preventFromSubmittingPageByPressingEnter: function () {
        document.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                var activeElement = document.activeElement;
                if (activeElement && activeElement.tagName === "INPUT" && activeElement.type !== "submit") {
                    event.preventDefault();
                }
            }
        });
    },

    getNow: function () {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
        return dateTime;
    },
    bindDynamicAjaxPage: function () {
        var divs = document.querySelectorAll('div[data-sdp]');

        divs.forEach(function (div) {
            var controllerAndAction = div.getAttribute('data-sdp');
            console.log("component found " + controllerAndAction);
            var selector = "div[data-sdp='" + controllerAndAction + "']";

            var success = function (r) {
                if (r.isSuccess === true) {
                    var reloadButtons = div.querySelectorAll('.portlet .reload');
                    reloadButtons.forEach(function (reloadButton) {
                        reloadButton.addEventListener('click', function () {
                            this.ajax("/" + controllerAndAction, { controllerAndAction: controllerAndAction }, selector, selector, success);
                        });
                    });
                }
            };

            this.ajax("/" + controllerAndAction, { controllerAndAction: controllerAndAction }, selector, selector, success);
        });
    },
    stringToFloat: function (text) {
        var fullcost = parseFloat(text.replace(/\./g, '').replace(',', '.'));
        return fullcost;
    },

    exportToExcel: function (tableSelector) {
        var htmls = "";
        var uri = 'data:application/vnd.ms-excel;base64,';
        var template = '<html xmlns:o="urn:schemas-microsoft-com:office:office"' +
            '   xmlns:x="urn:schemas-microsoft-com:office:excel"' +
            '   xmlns="http://www.w3.org/TR/REC-html40">' +
            '   <meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">' +
            '     <head>' +
            '     <!--[if gte mso 9]>' +
            '       <xml>' +
            '         <x:ExcelWorkbook>' +
            '           <x:ExcelWorksheets>' +
            '             <x:ExcelWorksheet>' +
            '               <x:Name>{worksheet}</x:Name> ' +
            '               <x:WorksheetOptions>' +
            '                 <x:DisplayGridlines/>' +
            '               </x:WorksheetOptions>' +
            '               </x:ExcelWorksheet>' +
            '             </x:ExcelWorksheets>' +
            '           </x:ExcelWorkbook>' +
            '       </xml>' +
            '     <![endif]-->' +
            '     </head>' +
            '     <body>' +
            '       <table>{table}</table>' +
            '     </body>' +
            ' </html>';
        var base64 = function (s) {
            return window.btoa(unescape(encodeURIComponent(s)))
        };
        var format = function (s, c) {
            return s.replace(/{(\w+)}/g, function (m, p) {
                return c[p];
            })
        };
        //Replacing img tags with its alt property value
        var tableElement = document.querySelector(tableSelector); // Replace 'tableSelector' with your actual selector

        if (tableElement) {
            var tableHtml = tableElement.innerHTML;

            var container = document.createElement('div');
            container.innerHTML = tableHtml;

            var images = container.querySelectorAll('img');

            images.forEach(function (img) {
                var altText = document.createTextNode(img.alt);
                img.parentNode.replaceChild(altText, img);
            });

            var cleanTableHtml = container.innerHTML;

            var ctx = {
                worksheet: 'Worksheet',
                table: cleanTableHtml
            }

            var link = document.createElement("a");
            var fileName = document.title + " " + this.getNow();
            //link.download = "export.xls";
            link.download = fileName.replaceGlobal(":", ".") + ".xls";
            link.href = uri + base64(format(template, ctx));
            link.click();
            // 'cleanTableHtml' now contains the modified HTML with 'img' elements replaced by their 'alt' attributes.
            console.log(cleanTableHtml);
        } else {
            console.error("Table element not found.");
        }

    },
    setButtonDisabledCountdown: function (buttonSelector) {
        var button = document.querySelector(buttonSelector);

        if (button) {
            var fewSeconds = 5;

            button.addEventListener('click', function () {
                button.disabled = true;

                setTimeout(function () {
                    button.disabled = false;
                }, fewSeconds * 1000);
            });
        }
    },
    isMobile: function () {
        var isMobile = false; //initiate as false
        // device detection
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
            || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
            isMobile = true;
        }
        return isMobile;
    },
    ieWarning: function () {
        if (this.isIeOrEdge()) {
            var html = "<div style='top:0;position:relative;background-color:red;color:white;font-weight:bold;text-align:center;line-height:30px;'>Internet Explorer ve Edge tarayıcıları desteklenmemektedir. <a href='https://www.google.com/chrome/'>Chrome</a> yüklemenizi tavsiye ederiz.</div >";
            document.body.insertAdjacentHTML('afterbegin', html);

        }
    },
    isIeOrEdge: function () {
        //var uA = window.navigator.userAgent,
        //  isIE = /msie\s|trident\/|edge\//i.test(uA) && !!(document.uniqueID || document.documentMode || window.ActiveXObject || window.MSInputMethodContext),
        //  checkVersion = (isIE && +(/(edge\/|rv:|msie\s)([\d.]+)/i.exec(uA)[2])) || NaN;
        var isIeOrEdge = false;
        if (/MSIE 10/i.test(navigator.userAgent)) {
            // This is internet explorer 10
            isIeOrEdge = true;
        }

        if (/MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent)) {
            // This is internet explorer 9 or 11
            isIeOrEdge = true;
        }

        if (/Edge\/\d./i.test(navigator.userAgent)) {
            // This is Microsoft Edge
            isIeOrEdge = true;

        }
        return isIeOrEdge;
    },
    getQueryString: function (key) {
        key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
        var match = location.search.match(new RegExp("[?&]" + key + "=([^&]+)(&|$)"));
        return match && decodeURIComponent(match[1].replace(/\+/g, " "));
    },
    disabledInputs: function (formSelector) {
        var form = document.querySelector(formSelector);
        if (form) {
            var elements = form.querySelectorAll("input, select, textarea");
            elements.forEach(function (element) {
                element.disabled = true;
            });
        }
    },

    startTimer: function () {
        // window.setTimeout returns an Id that can be used to start and stop a timer
        this.warningTimerID = window.setTimeout(this.warningInactive, this.warningTimeout);
    },
    warningInactive: function () {
        window.clearTimeout(this.warningTimerID);
        this.timeoutTimerID = window.setTimeout(this.IdleTimeout, this.timoutNow);
        let myModalEl = bootstrap.Modal.getOrCreateInstance(document.getElementById('#TimeoutModal')) // Returns a Bootstrap modal instance
        myModalEl.show();

        myModalEl.addEventListener('shown.bs.modal', event => {
            this.showBackwardCountDown();
        });
        myModalEl.addEventListener('hidden.bs.modal', event => {
            window.clearTimeout(this.interactionCounter);
        });

    },

    resetTimer: function () {
        window.clearTimeout(this.timeoutTimerID);
        window.clearTimeout(this.warningTimerID);
        //window.clearTimeout(this.interactionCounter);
        //document.getElementById('SecondsCounter').innerText = "";
        this.startTimer();

    },
    IdleTimeout: function () {
        window.location = "/Account/Logout";
    },

    setupTimers: function () {
        document.addEventListener("mousemove", this.resetTimer, false);
        document.addEventListener("mousedown", this.resetTimer, false);
        document.addEventListener("keypress", this.resetTimer, false);
        document.addEventListener("touchmove", this.resetTimer, false);
        document.addEventListener("onscroll", this.resetTimer, false);
        this.startTimer();
    },

    configureIdleLogout: function () {


        //PROD
        // Set timeout variables.
        this.warningTimeout = 840000;// Display warning in 14 Mins.   //60.000 = 1 minute
        this.timoutNow = 60000;// Warning has been shown, give the user 1 minute to interact


        this.warningTimerID = null;
        this.timeoutTimerID = null;

        // Click event for #BtnStayLoggedIn
        document.addEventListener('click', function (event) {
            if (event.target && event.target.id === 'BtnStayLoggedIn') {
                this.resetTimer();
                let myModalEl = bootstrap.Modal.getOrCreateInstance(document.getElementById('#TimeoutModal')) // Returns a Bootstrap modal instance

                var timeoutModal = document.querySelector('#TimeoutModal');
                if (timeoutModal) {
                    myModalEl.hide();
                }
            }
        });
        // Document ready
        document.addEventListener('DOMContentLoaded', function () {
            this.setupTimers();
        });
    },

    //countdown for interaction it appears on the "continue" button
    showBackwardCountDown: function () {
        window.clearTimeout(this.interactionCounter);
        document.getElementById('SecondsCounter').innerText = "";

        var seconds = this.timoutNow / 1000;
        var el = document.getElementById('SecondsCounter');

        function incrementSeconds() {
            seconds -= 1;
            el.innerText = seconds;
            if (seconds == 0) {
                window.location = "/Account/Logout";
            }
        }
        this.interactionCounter = setInterval(incrementSeconds, 1000);
    },
    //Application methods
    activateSelectFocus: function () {
        document.addEventListener('select2:open', function () {
            var select2SearchField = document.querySelector('.select2-search__field');
            if (select2SearchField) {
                select2SearchField.focus();
            }
        });
    },
    activateTooltip: function () {
        var tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));

        tooltipTriggerList.forEach(function (tooltipTriggerEl) {
            new bootstrap.Tooltip(tooltipTriggerEl);
        });
    },
    activatePopover: function () {
        const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
        const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
    },
    bindExcelButton: function (excelButtonSelector, tableSelector) {
        var excelSelector = !this.ine(excelButtonSelector) ? excelButtonSelector : "#ExcelButton";

        document.addEventListener("click", function (event) {
            if (event.target.matches(excelSelector)) {
                var targetTableId = event.target.dataset.targettableid;
                tableSelector = !this.ine(targetTableId) ? "#" + targetTableId : tableSelector;
                tableSelector = !this.ine(tableSelector) ? tableSelector : "#MainTable";

                if (document.querySelector(tableSelector)) {
                    this.exportToExcel(tableSelector);
                }
            }
        });
    },
    bindLanguageSelect: function () {
        document.addEventListener("click", function (event) {
            if (event.target.matches("#LanguageDropdownMenu a.dropdown-item")) {
                var val = event.target.dataset.value;
                var returnUrl = document.querySelector("#ReturnUrl").value;
                window.location.href = "/Home/SetLanguage?culture=" + val + "&returnUrl=" + returnUrl;
            }
        });
    },

    formatUserReturnObject: function (selectItem) {
        if (selectItem.loading) return selectItem.text;
        if (!selectItem.id) { return selectItem.text; }
        var iconClass = "ri-user-line";

        var markup = "<span data-userid ='" + selectItem.id + "'><i class='" + iconClass + "'></i> " + selectItem.text + "</span>";
        if (selectItem.isActive == false) {
            markup += " <span class='label label-sm label-danger'> " + this.localizer("Blocked") + " </span>";
        }
        return markup;
    },

    bindSelect2UserSearch: function (selector, onChangeFunction, modalSelectorIfOnModal, onlyActiveUsers) {
        var url = "/User/Search";
        var selectElement = document.querySelector(selector);

        if (!selectElement) {
            return false;
        }

        var parentElement = selectElement.parentElement;
        var options = {
            theme: "bootstrap-5",
            placeholder: this.localizer("SearchWithUserNoOrUsername"),
            width: selectElement.dataset.width || (selectElement.classList.contains('w-100') ? '100%' : 'style'),
            language: document.querySelector("#Language").value,
            allowClear: true,
            ajax: {
                url: url,
                dataType: 'json',
                delay: 300,
                data: function (params) {
                    var returnObject = {
                        searchText: params.term,
                        onlyActiveUsers: this.isTrue(onlyActiveUsers),
                    };
                    return returnObject;
                },
                processResults: function (data, page) {
                    if (!data.isSuccess && !this.ine(data.message)) {
                        this.noty(data.message, data.isSuccess);
                    }
                    var returnObject = {};
                    if (data != null && data.object != null) {
                        returnObject.results = data.object;
                    } else {
                        returnObject.results = [];
                    }
                    return returnObject;
                },
                cache: true,
            },
            escapeMarkup: function (markup) {
                return markup;
            },
            templateResult: this.formatUserReturnObject,
            templateSelection: this.formatUserReturnObject,
            minimumInputLength: 3,
            dropdownParent: parentElement,
        };

        // select2 has problems about getting focus if it is on a modal, so modalSelectorIfOnModal will be used
        if (!this.inew(modalSelectorIfOnModal)) {
            options.dropdownParent = document.querySelector(modalSelectorIfOnModal);
        }
        var select2Elements = document.querySelectorAll(".select2, .select2-multiple, .select2-allow-clear, .js-data-example-ajax");
        select2Elements.forEach(function (element) {
            element.addEventListener("select2:open", function () {
                var hasClassNames = false;
                var parentElements = element.closest("[class*='has-']");
                if (parentElements) {
                    var classNames = parentElements[0].className.split(/\s+/);
                    for (var i = 0; i < classNames.length; ++i) {
                        if (classNames[i].match("has-")) {
                            hasClassNames = true;
                            document.querySelector("body > .select2-container").classList.add(classNames[i]);
                        }
                    }
                }
            });
        });

        if (onChangeFunction) {
            selectElement.addEventListener("change", function () {
                onChangeFunction();
            });
        }

    },
    refreshNotificationBar: function () {

        if (true) { //code must understand if page interaction happens here
            var isAuthenticated = document.querySelector("#IsAuthenticated").value;
            if (this.isTrue(isAuthenticated)) {
                var s = function (r) {
                    if (r.isSuccess) {
                    }
                };
                //do ajax call here
                /*this.ajax("/Dashboard/RefreshNotificationBar", null, "#NotificationBar", "#NotificationBar", s);*/
            }
        } else {
            console.log("notification bar refresh is paused because of active page interaction");
        }
    },
    activateNotificationBarRefreshing: function (minute) {

        // Notification bar section
        document.addEventListener("click", function (event) {
            if (event.target && event.target.id === "RefreshNotificationBar") {
                refreshNotificationBar();
            }
        });

        var milisecond = 1000 * 60 * minute;
        refreshNotificationBar();

        // Start the process when the page loads
        if (!this.interval_id) {
            this.interval_id = setInterval(refreshNotificationBar, milisecond);
        }

        if (!this.isMobile) {
            // Stop the process when the page loses focus
            window.addEventListener("blur", function () {
                clearInterval(this.interval_id);
                this.interval_id = 0;
            });

            // Continue the process when the page gains focus
            window.addEventListener("focus", function () {
                setTimeout(function () {
                    refreshNotificationBar();
                    if (!this.interval_id) {
                        this.interval_id = setInterval(refreshNotificationBar, milisecond);
                    }
                }, 2000);
            });
        }

        document.body.addEventListener("click", function (event) {
            if (event.target && event.target.classList.contains("readButton")) {
                var btn = event.target;
                var notId = btn.dataset.id;
                var s = function (r) {
                    if (this.isTrue(r.isSuccess) && this.isTrue(r.object)) {
                        btn.classList.add("hidden");
                        btn.parentNode.insertAdjacentHTML(
                            "beforeend",
                            "<span class='float-end'><i class='ri-check-line text-success'></i></span>"
                        );

                        var unreadNotificationCounts = document.querySelectorAll(".unreadNotificationCount");
                        unreadNotificationCounts.forEach(function (countElement) {
                            var val = parseInt(countElement.textContent, 10) - 1;
                            countElement.textContent = val;
                            if (val === 0 && countElement.parentElement.id === "NotificationButton") {
                                countElement.classList.add("hidden");
                            }
                        });
                    }
                };
                this.ajax("/Dashboard/MarkNotificationAsRead", { notificationId: notId }, btn.closest(".notificationContent"), null, s);
            }
        });

    },

    getDatatableLanguage: function () {
        var tr = {
            "sDecimal": ",",
            "sEmptyTable": "Tabloda herhangi bir veri mevcut değil",
            "sInfo": "_TOTAL_ kayıttan _START_ - _END_ arasındaki kayıtlar gösteriliyor",
            "sInfoEmpty": "Kayıt yok",
            "sInfoFiltered": "(_MAX_ kayıt içerisinden bulunan)",
            "sInfoPostFix": "",
            "sInfoThousands": ".",
            "sLengthMenu": "Sayfada _MENU_ kayıt göster",
            "sLoadingRecords": "Yükleniyor...",
            "sProcessing": "İşleniyor...",
            "sSearch": "Ara:",
            "sZeroRecords": "Eşleşen kayıt bulunamadı",
            "oPaginate": {
                "sFirst": "İlk",
                "sLast": "Son",
                "sNext": "Sonraki",
                "sPrevious": "Önceki"
            },
            "oAria": {
                "sSortAscending": ": artan sütun sıralamasını aktifleştir",
                "sSortDescending": ": azalan sütun sıralamasını aktifleştir"
            },
            "select": {
                "rows": {
                    "_": "%d kayıt seçildi",
                    "0": "",
                    "1": "1 kayıt seçildi"
                }
            }
        };
        var ru = {
            "processing": "Подождите...",
            "search": "Поиск:",
            "lengthMenu": "Показать _MENU_ записей",
            "info": "Записи с _START_ до _END_ из _TOTAL_ записей",
            "infoEmpty": "Записи с 0 до 0 из 0 записей",
            "infoFiltered": "(отфильтровано из _MAX_ записей)",
            "loadingRecords": "Загрузка записей...",
            "zeroRecords": "Записи отсутствуют.",
            "emptyTable": "В таблице отсутствуют данные",
            "paginate": {
                "first": "Первая",
                "previous": "Предыдущая",
                "next": "Следующая",
                "last": "Последняя"
            },
            "aria": {
                "sortAscending": ": активировать для сортировки столбца по возрастанию",
                "sortDescending": ": активировать для сортировки столбца по убыванию"
            },
            "select": {
                "rows": {
                    "_": "Выбрано записей: %d",
                    "0": "Кликните по записи для выбора",
                    "1": "Выбрана одна запись"
                },
                "1": "%d ряд выбран",
                "_": "%d ряда(-ов) выбрано",
                "cells": {
                    "1": "1 ячейка выбрана",
                    "_": "Выбрано %d ячеек"
                },
                "columns": {
                    "1": "1 столбец выбран",
                    "_": "%d столбцов выбрано"
                }
            },
            "searchBuilder": {
                "conditions": {
                    "string": {
                        "notEmpty": "Не пусто",
                        "startsWith": "Начинается с",
                        "contains": "Содержит",
                        "empty": "Пусто",
                        "endsWith": "Заканчивается на",
                        "equals": "Равно",
                        "not": "Не"
                    },
                    "date": {
                        "after": "После",
                        "before": "До",
                        "between": "Между",
                        "empty": "Пусто",
                        "equals": "Равно",
                        "not": "Не",
                        "notBetween": "Не между",
                        "notEmpty": "Не пусто"
                    },
                    "moment": {
                        "after": "После",
                        "before": "До",
                        "between": "Между",
                        "empty": "Не пусто",
                        "equals": "Между",
                        "not": "Не",
                        "notBetween": "Не между",
                        "notEmpty": "Не пусто"
                    },
                    "number": {
                        "between": "В промежутке от",
                        "empty": "Пусто",
                        "equals": "Равно",
                        "gt": "Больше чем",
                        "gte": "Больше, чем равно",
                        "lt": "Меньше чем",
                        "lte": "Меньше, чем равно",
                        "not": "Не",
                        "notBetween": "Не в промежутке от",
                        "notEmpty": "Не пусто"
                    }
                },
                "data": "Данные",
                "deleteTitle": "Удалить условие фильтрации",
                "logicAnd": "И",
                "logicOr": "Или",
                "title": {
                    "0": "Конструктор поиска",
                    "_": "Конструктор поиска (%d)"
                },
                "value": "Значение",
                "add": "Добавить условие",
                "button": {
                    "0": "Конструктор поиска",
                    "_": "Конструктор поиска (%d)"
                },
                "clearAll": "Очистить всё",
                "condition": "Условие"
            },
            "searchPanes": {
                "clearMessage": "Очистить всё",
                "collapse": {
                    "0": "Панели поиска",
                    "_": "Панели поиска (%d)"
                },
                "count": "{total}",
                "countFiltered": "{shown} ({total})",
                "emptyPanes": "Нет панелей поиска",
                "loadMessage": "Загрузка панелей поиска",
                "title": "Фильтры активны - %d"
            },
            "thousands": ",",
            "buttons": {
                "pageLength": {
                    "_": "Показать 10 строк",
                    "-1": "Показать все ряды",
                    "1": "Показать 1 ряд"
                },
                "pdf": "PDF",
                "print": "Печать",
                "collection": "Коллекция <span class=\"ui-button-icon-primary ui-icon ui-icon-triangle-1-s\"><\/span>",
                "colvis": "Видимость столбцов",
                "colvisRestore": "Восстановить видимость",
                "copy": "Копировать",
                "copyKeys": "Нажмите ctrl or u2318 + C, чтобы скопировать данные таблицы в буфер обмена.  Для отмены, щелкните по сообщению или нажмите escape.",
                "copySuccess": {
                    "1": "Скопирована 1 ряд в буфер обмена",
                    "_": "Скопировано %ds рядов в буфер обмена"
                },
                "copyTitle": "Скопировать в буфер обмена",
                "csv": "CSV",
                "excel": "Excel"
            },
            "decimal": ".",
            "infoThousands": ",",
            "autoFill": {
                "cancel": "Отменить",
                "fill": "Заполнить все ячейки <i>%d<i><\/i><\/i>",
                "fillHorizontal": "Заполнить ячейки по горизонтали",
                "fillVertical": "Заполнить ячейки по вертикали",
                "info": "Пример автозаполнения"
            }
        };
        var lang = document.getElementById("Language").value;
        var langObject = null;
        switch (lang) {
            case 'tr':
                langObject = tr;
                break;
            case 'en':
                //
                break;
            case 'ru':
                langObject = ru;
                break;

            default:

        }
        return langObject;
    },
    getDatatableButtonArray: function () {
        var a = [
            { extend: 'copy', text: '<i class="ri-file-copy-line"></i> ' + this.localizer("Copy"), className: 'btn-sm btn-info', exportOptions: { modifier: { page: 'all', search: 'applied' } } },
            { extend: 'csv', text: '<i class="ri-file-excel-2-line"></i> Csv', className: 'btn-sm btn-success', exportOptions: { modifier: { page: 'all', search: 'applied' } } },
            {
                extend: 'excel', text: '<i class="ri-file-excel-2-line"></i> Excel', className: 'btn-sm btn-success', exportOptions: {
                    columns: ':visible',
                    modifier: { page: 'all', search: 'applied' }, format: {
                        body: function (data, row, column, node) {
                            // Create a temporary element (a <p> element)
                            var tempElement = document.createElement('p');

                            // Set the HTML content of the temporary element to the 'data' string
                            tempElement.innerHTML = data;

                            // Get the plain text content of the temporary element
                            data = tempElement.textContent || tempElement.innerText;

                            // Check if the data is numeric (contains digits and an optional decimal separator)
                            if (!isNaN(data.replace(',', '.'))) {
                                // Replace commas with dots if necessary
                                data = data.replace(',', '.');
                            }

                            // Return the formatted data
                            return data;
                            //data = $('<p>' + data + '</p>').text();
                            //return $.isNumeric(data.replace(',', '.')) ? data.replace(',', '.') : data;
                        }
                    }
                }
            },
            { extend: 'pdf', text: '<i class="ri-file-pdf-line"></i> Pdf', className: 'btn-sm btn-danger', exportOptions: { modifier: { page: 'all', search: 'applied' } }, orientation: 'landscape' },
            { extend: 'print', text: '<i class="ri-printer-line"></i> ' + this.localizer("Print"), className: 'btn-sm btn-dark', exportOptions: { modifier: { page: 'all', search: 'applied' } } },
        ];
        return a;
    },
    bindDatatable: function (selector, isResponsive = false, addButtonFunction = null, isBigTable = false) {
        var table = new DataTable(selector, {
            paging: true,
            order: [],
            pagingType: "full_numbers",
            lengthMenu: [[20, 50, 100, -1], [20, 50, 100, "Hepsi"]],
            pageLength: 50,
            dom: 'lBfrtip',
            buttons: getDatatableButtonArray(),
            responsive: isResponsive,
            language: getDatatableLanguage(),
            fixedHeader: true,
            initComplete: function (settings, json) {
                // Initialization complete callback
            }
        });

        table.fixedHeader.headerOffset(60);

        if (isBigTable) {
            table.scrollX = true;
            table.scrollY = 500;
            table.deferRender = true;
            table.scroller = true;
            table.paging = false;
        }

        // Add a custom refresh button
        table.button().add(0, {
            action: function (e, dt, button, config) {
                refreshTable();
            },
            text: '\u{1F504} Refresh', // Unicode symbol for refresh
            className: 'btn-sm'
        });

        // Event listeners for select and deselect events
        table.on('select', function (e, dt, type, indexes) {
            // Handle select event
        }).on('deselect', function (e, dt, type, indexes) {
            // Handle deselect event
        });

        // Add custom button if addButtonFunction is provided
        if (addButtonFunction != null) {
            table.button().add(0, {
                action: function (e, dt, button, config) {
                    if (typeof addButtonFunction === 'function') {
                        addButtonFunction();
                    } else {
                        openAddEditModal(0);
                    }
                },
                text: '\u{2795} Add Record', // Unicode symbol for heavy plus sign
                className: 'btn-light btn-sm'
            });
        }

        return table;
    },
    localizer: function (localizerFieldId) {
        var translatedText = "TranslatedText";
        var field = document.querySelector("[data-localizerfieldid='" + localizerFieldId + "']");
        if (field !== null) {
            translatedText = field.value;
        }
    },
    jsonToList: function (data) {
        if (typeof data === 'object') {
            var ul = document.createElement('ul');
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    var li = document.createElement('li');
                    li.textContent = key;
                    li.appendChild(jsonToList(data[key]));
                    ul.appendChild(li);
                }
            }
            return ul;
        } else {
            var textNode = document.createTextNode(' : ' + data);
            return textNode;
        }
    },
    jsonToTable: function (data) {

        var myNestedTable = document.createElement('table');
        myNestedTable.classList.add('table', 'nestedTable', 'mb-0');

        var keys = Object.keys(data);
        var tableContent = '';

        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var value = data[key];
            tableContent += '<tr><td>' + key + '</td><td>' + value + '</td></tr>';
        }

        myNestedTable.innerHTML = tableContent;
        return myNestedTable;
    },

    getStartDate: function (selector) {
        var element = document.querySelector(selector);

        if (!element) {
            console.error("getStartDate selector error!");
            return false;
        }

        var startDate = element.value.split(" - ")[0];
        return startDate;
    },
    getEndDate: function (selector) {
        var element = document.querySelector(selector);

        if (!element) {
            console.error("getEndDate selector error!");
            return false;
        }

        var endDate = element.value.split(" - ")[1];
        return endDate;
    },
    block: function (target) {
        if (blockerscb) {
            blockerscb.block(target);
        } else {
            this.logError("blockerscb module hasn't been initialized!");
        }
    },
    unblock: function (target) {
        if (blockerscb) {
            blockerscb.unblock(target);
        } else {
            this.logError("blockerscb module hasn't been initialized!");
        }
    },
    /**
    * Sends a form to a specified URL using either POST or GET method. Wrapper method for fetchData() to handle forms automatically
    * 
    * @param {string} url - The URL to send the form data to.
    * @param {string} formId - The ID of the form element.
    * @param {boolean} [isMethodPost=true] - Determines if the request method is POST. Defaults to true.
    * @param {function} [successFunction=null] - Optional. A function to be called upon successful response.
    * @param {string} [containerDivId=null] - Optional. The ID of the container div to update with the response data.
    * 
    * This function performs the following steps:
    * 1. Checks if the form element exists. If not, it displays an error message and returns.
    * 2. Retrieves the form data.
    * 3. Sends the form data to the specified URL using the fetchData() function.
    */
    sendForm: function (url,formId,isMethodPost = true,successFunction = null,containerDivId = null) {
        let myForm = document.getElementById(formId);
        if(this.ine(myForm)){
            this.showMessage("Form not found!",false);
            return;
        }
        let data = this.getFormData(formId);
        let wrapperSuccessFunction = function (r) {
            if (r.ok) {
                if (containerDivId)
                    document.getElementById(containerDivId).innerHTML = r.object;
                if (successFunction)
                    successFunction(r);
            }
            
        }
        this.fetchData(url,data,isMethodPost,wrapperSuccessFunction,"#"+formId);
    },
    /**
     * Fetches data from a specified URL using either POST or GET method.
     * 
     * @param {string} url - The URL to fetch the data from.
     * @param {object} [data=null] - Optional. The data to be sent with the request.
     * @param {boolean} [isMethodPost=true] - Determines if the request method is POST. Defaults to true.
     * @param {function} [successFunction=null] - Optional. A function to be called upon successful response.
     * @param {string} [loadingSelector=null] - Optional. The selector to block while the request is being processed.
     * 
     * This function performs the following steps:
     * 1. Retrieves the anti-forgery token.
     * 2. Determines if the provided data is an instance of FormData.
     * 3. Blocks the UI element specified by the loadingSelector to indicate loading.
     * 4. Prepares the request body based on the data and request method.
     * 5. Sets up the request headers, including the anti-forgery token and Content-Type if the data is not FormData.
     * 6. Sends the request to the specified URL using the fetch API.
     * 7. Handles the response:
     *    - If the response is redirected, it navigates to the redirected URL.
     *    - If the response is successful, it calls the success function (if provided).
     *    - If there is a message in the response, it displays the message.
     * 8. Handles errors by displaying an error message.
     * 9. Unblocks the UI element specified by the loadingSelector after the request is completed.
     */
    fetchData: function (url, data = null, isMethodPost = true, successFunction = null, loadingSelector = null) {
        //anti-forgery token
        let token = document.querySelector('input[name="__RequestVerificationToken"]').value;
        let isFormData = (data instanceof FormData);
        this.block(loadingSelector);
        let body = null;
        if (data != null && isMethodPost) {
            if (isFormData) {
                body = data;
            } else {
                body = JSON.stringify(data);
            }
        }
        let headers = {
            'Accept': 'application/json',
            'XSRF-TOKEN': token || ""
        }
        if (!isFormData) {
            headers['Content-Type'] = 'application/json';//'Content-Type': 'application/json', //'Content-Type': 'application/x-www-form-urlencoded',
        }
        fetch(url, {
            method: isMethodPost ? "POST" : "GET",
            headers: headers,
            body: body,
        }).then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`); //we move to catch() from here
            }
            if (response.redirected) {
                window.location = response.url;
                return;
            }
            return response.json();
        }).then(r => {
            if (r && !this.ine(r.message))
                this.showMessage(r.message, r.isSuccess);
            if (r != null && r.isSuccess) {
                if (successFunction != null)
                    successFunction(r);
            }
        }).catch((error) => {
            this.showMessage(`An error occurred: ${error.message}`, false);
            console.error('Fetch error:', error.message);
        }).finally(() => {

            this.unblock(loadingSelector);
            /*console.log("end");*/
        });;
    },
    animateButton: function (id) {
        const button = document.getElementById(id);
        button.style.transform = 'scale(1.1)';
        button.classList.add('pulse');
        setTimeout(() => {
            button.classList.remove('pulse');
            button.style.transform = 'scale(1)';
        }, 2500);
    },
    initPolipop: function () {
        this.polipop = new Polipop('mypolipop', {
            layout: 'popups',
            insert: 'before',
            pool: 5,
            sticky: false,
            /*position: 'bottom-right',*/
            closer: false,
            life: 55000,
            appendTo: "main"
        });
    },
    //injectScript(componentName) {
    //  let myScript = document.createElement("script");
    //  switch (componentName) {
    //    case "DynamicList":
    //      myScript.setAttribute("src", "/js/reusable/DynamicList.js");
    //      break;
    //    case y:
    //      // code block
    //      break;
    //    default:
    //    // code block
    //  }
    //  document.body.appendChild(myScript);
    //}

    //Enums
    animateElement: function (id) {
        item = document.getElementById(id);
        if (item) {
            // item.animate(...) returns an Animation (refer to https://developer.mozilla.org/en-US/docs/Web/API/Element/animate)
            item.animate([
                // keyframes
                { transform: 'translateX(-15px)', opacity: '0.3' },
                { transform: 'translateX(-10px)', opacity: '0.5' },
                { transform: 'translateX(-6px)', opacity: '0.7' },
                { transform: 'translateX(-3px)', opacity: '0.9' },
                { transform: 'translateX(0px)', opacity: '1' }

            ], {
                duration: 500,
            });
        }
    },
    openModal: function (contentUrl, id, modalSize, headerText, data, successFunction, hasCloseButton) {
        if (document.getElementById(id)) {
            document.getElementById(id).remove();
        }
        let closeButtonHtml =
            '      <div class="modal-footer">' +
            '        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>' +
            '      </div>';
        let skeleton =
            '<div class="modal fade"  id="' + id + '" tabindex="-1">' +
            '  <div class="modal-dialog ' + modalSize + '">' +
            '    <div class="modal-content">' +
            '      <div class="modal-header">' +
            '          <h5 class="modal-title">' + headerText + '</h4>' +
            '          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>' +
            '      </div>' +
            '      <div class="modal-body">' +
            '        <div class="d-flex justify-content-center align-items-center">' +
            '          <div class="spinner-border ms-auto" role="status" aria-hidden="true"></div><span class="mx-3 my-auto">Loading...</span>' +
            '        </div>' +
            '      </div>' + (hasCloseButton ? closeButtonHtml : '') +
            '    </div>' +
            '  </div>' +
            '</div>';
        window.document.body.insertAdjacentHTML('beforeend', skeleton);
        let self = this;
        let s = function (resp) {
            if (resp.isSuccess) {
                document.querySelector("#" + id + " .modal-body").innerHTML = resp.object;
                let myModalEl = bootstrap.Modal.getOrCreateInstance(document.getElementById(id)) // Returns a Bootstrap modal instance
                // Show or hide:
                myModalEl.show();

                //myModalEl.dispose();
                //myModalEl.addEventListener('shown.bs.modal', event => {
                //})
                //myModalEl.addEventListener('hidden.bs.modal', event => {
                //})
                if (!self.ine(successFunction)) {
                    successFunction(resp);
                }
            }
        };
        //let modalBodies = document.querySelectorAll(".modal-body");
        //let lastModalBody = modalBodies[modalBodies.length - 1];
        this.fetchData(contentUrl, data, true, s);
    },
    modalSize: {
        S: "modal-sm",
        M: "",
        L: "modal-lg",
        XL: "modal-xl",
        FULL: "modal-fullscreen",
    },
    identityType: {
        TcKimlik: 1,
        Pasaport: 2,
        YabanciKimlik: 3
    },
    color: {
        'white': '#ffffff',
        'red-50': '#ffebee',
        'red-100': '#ffcdd2',
        'red-200': '#ef9a9a',
        'red-300': '#e57373',
        'red-400': '#ef5350',
        'red-500': '#f44336',
        'red-600': '#e53935',
        'red-700': '#d32f2f',
        'red-800': '#c62828',
        'red-900': '#b71c1c',
        'red-a100': '#ff8a80',
        'red-a200': '#ff5252',
        'red-a400': '#ff1744',
        'red-a700': '#d50000',
        'pink-50': '#fce4ec',
        'pink-100': '#f8bbd0',
        'pink-200': '#f48fb1',
        'pink-300': '#f06292',
        'pink-400': '#ec407a',
        'pink-500': '#e91e63',
        'pink-600': '#d81b60',
        'pink-700': '#c2185b',
        'pink-800': '#ad1457',
        'pink-900': '#880e4f',
        'pink-a100': '#ff80ab',
        'pink-a200': '#ff4081',
        'pink-a400': '#f50057',
        'pink-a700': '#c51162',
        'purple-50': '#f3e5f5',
        'purple-100': '#e1bee7',
        'purple-200': '#ce93d8',
        'purple-300': '#ba68c8',
        'purple-400': '#ab47bc',
        'purple-500': '#9c27b0',
        'purple-600': '#8e24aa',
        'purple-700': '#7b1fa2',
        'purple-800': '#6a1b9a',
        'purple-900': '#4a148c',
        'purple-a100': '#ea80fc',
        'purple-a200': '#e040fb',
        'purple-a400': '#d500f9',
        'purple-a700': '#aa00ff',
        'deep-purple-50': '#ede7f6',
        'deep-purple-100': '#d1c4e9',
        'deep-purple-200': '#b39ddb',
        'deep-purple-300': '#9575cd',
        'deep-purple-400': '#7e57c2',
        'deep-purple-500': '#673ab7',
        'deep-purple-600': '#5e35b1',
        'deep-purple-700': '#512da8',
        'deep-purple-800': '#4527a0',
        'deep-purple-900': '#311b92',
        'deep-purple-a100': '#b388ff',
        'deep-purple-a200': '#7c4dff',
        'deep-purple-a400': '#651fff',
        'deep-purple-a700': '#6200ea',
        'indigo-50': '#e8eaf6',
        'indigo-100': '#c5cae9',
        'indigo-200': '#9fa8da',
        'indigo-300': '#7986cb',
        'indigo-400': '#5c6bc0',
        'indigo-500': '#3f51b5',
        'indigo-600': '#3949ab',
        'indigo-700': '#303f9f',
        'indigo-800': '#283593',
        'indigo-900': '#1a237e',
        'indigo-a100': '#8c9eff',
        'indigo-a200': '#536dfe',
        'indigo-a400': '#3d5afe',
        'indigo-a700': '#304ffe',
        'blue-50': '#e3f2fd',
        'blue-100': '#bbdefb',
        'blue-200': '#90caf9',
        'blue-300': '#64b5f6',
        'blue-400': '#42a5f5',
        'blue-500': '#2196f3',
        'blue-600': '#1e88e5',
        'blue-700': '#1976d2',
        'blue-800': '#1565c0',
        'blue-900': '#0d47a1',
        'blue-a100': '#82b1ff',
        'blue-a200': '#448aff',
        'blue-a400': '#2979ff',
        'blue-a700': '#2962ff',
        'light-blue-50': '#e1f5fe',
        'light-blue-100': '#b3e5fc',
        'light-blue-200': '#81d4fa',
        'light-blue-300': '#4fc3f7',
        'light-blue-400': '#29b6f6',
        'light-blue-500': '#03a9f4',
        'light-blue-600': '#039be5',
        'light-blue-700': '#0288d1',
        'light-blue-800': '#0277bd',
        'light-blue-900': '#01579b',
        'light-blue-a100': '#80d8ff',
        'light-blue-a200': '#40c4ff',
        'light-blue-a400': '#00b0ff',
        'light-blue-a700': '#0091ea',
        'cyan-50': '#e0f7fa',
        'cyan-100': '#b2ebf2',
        'cyan-200': '#80deea',
        'cyan-300': '#4dd0e1',
        'cyan-400': '#26c6da',
        'cyan-500': '#00bcd4',
        'cyan-600': '#00acc1',
        'cyan-700': '#0097a7',
        'cyan-800': '#00838f',
        'cyan-900': '#006064',
        'cyan-a100': '#84ffff',
        'cyan-a200': '#18ffff',
        'cyan-a400': '#00e5ff',
        'cyan-a700': '#00b8d4',
        'teal-50': '#e0f2f1',
        'teal-100': '#b2dfdb',
        'teal-200': '#80cbc4',
        'teal-300': '#4db6ac',
        'teal-400': '#26a69a',
        'teal-500': '#009688',
        'teal-600': '#00897b',
        'teal-700': '#00796b',
        'teal-800': '#00695c',
        'teal-900': '#004d40',
        'teal-a100': '#a7ffeb',
        'teal-a200': '#64ffda',
        'teal-a400': '#1de9b6',
        'teal-a700': '#00bfa5',
        'green-50': '#e8f5e9',
        'green-100': '#c8e6c9',
        'green-200': '#a5d6a7',
        'green-300': '#81c784',
        'green-400': '#66bb6a',
        'green-500': '#4caf50',
        'green-600': '#43a047',
        'green-700': '#388e3c',
        'green-800': '#2e7d32',
        'green-900': '#1b5e20',
        'green-a100': '#b9f6ca',
        'green-a200': '#69f0ae',
        'green-a400': '#00e676',
        'green-a700': '#00c853',
        'light-green-50': '#f1f8e9',
        'light-green-100': '#dcedc8',
        'light-green-200': '#c5e1a5',
        'light-green-300': '#aed581',
        'light-green-400': '#9ccc65',
        'light-green-500': '#8bc34a',
        'light-green-600': '#7cb342',
        'light-green-700': '#689f38',
        'light-green-800': '#558b2f',
        'light-green-900': '#33691e',
        'light-green-a100': '#ccff90',
        'light-green-a200': '#b2ff59',
        'light-green-a400': '#76ff03',
        'light-green-a700': '#64dd17',
        'lime-50': '#f9fbe7',
        'lime-100': '#f0f4c3',
        'lime-200': '#e6ee9c',
        'lime-300': '#dce775',
        'lime-400': '#d4e157',
        'lime-500': '#cddc39',
        'lime-600': '#c0ca33',
        'lime-700': '#afb42b',
        'lime-800': '#9e9d24',
        'lime-900': '#827717',
        'lime-a100': '#f4ff81',
        'lime-a200': '#eeff41',
        'lime-a400': '#c6ff00',
        'lime-a700': '#aeea00',
        'yellow-50': '#fffde7',
        'yellow-100': '#fff9c4',
        'yellow-200': '#fff59d',
        'yellow-300': '#fff176',
        'yellow-400': '#ffee58',
        'yellow-500': '#ffeb3b',
        'yellow-600': '#fdd835',
        'yellow-700': '#fbc02d',
        'yellow-800': '#f9a825',
        'yellow-900': '#f57f17',
        'yellow-a100': '#ffff8d',
        'yellow-a200': '#ffff00',
        'yellow-a400': '#ffea00',
        'yellow-a700': '#ffd600',
        'amber-50': '#fff8e1',
        'amber-100': '#ffecb3',
        'amber-200': '#ffe082',
        'amber-300': '#ffd54f',
        'amber-400': '#ffca28',
        'amber-500': '#ffc107',
        'amber-600': '#ffb300',
        'amber-700': '#ffa000',
        'amber-800': '#ff8f00',
        'amber-900': '#ff6f00',
        'amber-a100': '#ffe57f',
        'amber-a200': '#ffd740',
        'amber-a400': '#ffc400',
        'amber-a700': '#ffab00',
        'orange-50': '#fff3e0',
        'orange-100': '#ffe0b2',
        'orange-200': '#ffcc80',
        'orange-300': '#ffb74d',
        'orange-400': '#ffa726',
        'orange-500': '#ff9800',
        'orange-600': '#fb8c00',
        'orange-700': '#f57c00',
        'orange-800': '#ef6c00',
        'orange-900': '#e65100',
        'orange-a100': '#ffd180',
        'orange-a200': '#ffab40',
        'orange-a400': '#ff9100',
        'orange-a700': '#ff6d00',
        'deep-orange-50': '#fbe9e7',
        'deep-orange-100': '#ffccbc',
        'deep-orange-200': '#ffab91',
        'deep-orange-300': '#ff8a65',
        'deep-orange-400': '#ff7043',
        'deep-orange-500': '#ff5722',
        'deep-orange-600': '#f4511e',
        'deep-orange-700': '#e64a19',
        'deep-orange-800': '#d84315',
        'deep-orange-900': '#bf360c',
        'deep-orange-a100': '#ff9e80',
        'deep-orange-a200': '#ff6e40',
        'deep-orange-a400': '#ff3d00',
        'deep-orange-a700': '#dd2c00',
        'brown-50': '#efebe9',
        'brown-100': '#d7ccc8',
        'brown-200': '#bcaaa4',
        'brown-300': '#a1887f',
        'brown-400': '#8d6e63',
        'brown-500': '#795548',
        'brown-600': '#6d4c41',
        'brown-700': '#5d4037',
        'brown-800': '#4e342e',
        'brown-900': '#3e2723',
        'grey-50': '#fafafa',
        'grey-100': '#f5f5f5',
        'grey-200': '#eeeeee',
        'grey-300': '#e0e0e0',
        'grey-400': '#bdbdbd',
        'grey-500': '#9e9e9e',
        'grey-600': '#757575',
        'grey-700': '#616161',
        'grey-800': '#424242',
        'grey-900': '#212121',
        'blue-grey-50': '#eceff1',
        'blue-grey-100': '#cfd8dc',
        'blue-grey-200': '#b0bec5',
        'blue-grey-300': '#90a4ae',
        'blue-grey-400': '#78909c',
        'blue-grey-500': '#607d8b',
        'blue-grey-600': '#546e7a',
        'blue-grey-700': '#455a64',
        'blue-grey-800': '#37474f',
        'blue-grey-900': '#263238'
    },
    initScrollToTopButton: function () {
        // Create button element
        let button = document.createElement("button");
        button.type = "button";
        button.className = "btn btn-danger btn-floating btn-lg";
        button.id = "btn-back-to-top";
        button.title = "Go to top";
    
        // Apply CSS styles directly to the button object
        button.style.position = "fixed";
        button.style.bottom = "90px";
        button.style.right = "20px";
        button.style.display = "none";
    
        // Create icon element
        let icon = document.createElement("i");
        icon.className = "ph ph-caret-double-up";
    
        // Append icon to button
        button.appendChild(icon);
    
        // Append button to body
        document.body.appendChild(button);
    
        // Optional: Add functionality to show/hide button based on scroll position
        window.addEventListener("scroll", function () {
            if (document.documentElement.scrollTop > 200) {
                button.style.display = "block";
            } else {
                button.style.display = "none";
            }
        });
    
        // Optional: Add functionality to scroll to top when button is clicked
        button.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        let handleButtonVisibility = function () {
            //Display or hide "Back to top" button
            let currentPos = document.body.scrollTop || document.documentElement.scrollTop;
            // When the user scrolls down 20px from the top of the document, show the button
            if (currentPos > 20) {
                button.style.display = "block";
            } else {
                button.style.display = "none";
            }
        }
        window.addEventListener('scroll', handleButtonVisibility);
    }
}
document.addEventListener("DOMContentLoaded", function () {
    sc.init();
});
