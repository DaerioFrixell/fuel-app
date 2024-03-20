"use strict";

/**
 * Объект формы.
 */
const form = document.forms.onlyForm;
const elements = form.elements;

/**
 * Узел, где отображаются данные
 */
const content = document.getElementById('content');

/**
 * Данные из localStorage.
 * 
 * @type Array
 */
const locStorData = JSON.parse(localStorage.getItem('form'));

/**
 * Отправляет данные на сервер и добавляет в localStorage.
 */
const toSubmit = (e) => {
  e.preventDefault();

  /**
   * Массив с данными, который отправиться на бэк и localStorage.
   * 
   * @type Array
   */
  let requestData = [];
  /**
   * Преобразованная HTMLCollection форма к Array.
   */
  const arrayForm = Array.from(form);
  /**
   * Начальный пустой объект, в который добавятся данные с формы.
   */
  const initObjectForm = {
    day: null,
    fuelCount: null,
    price: null,
    mileage: null,
  };


  const initObjectFormKeys = Object.keys(initObjectForm)

  for (let i = 0; i < initObjectFormKeys.length; i++) {
    initObjectForm[initObjectFormKeys[i]] = arrayForm[i].value
  }

  if (locStorData) {
    requestData = [...locStorData, initObjectForm]
  } else {
    requestData.push(initObjectForm)
  }

  localStorage.setItem('form', JSON.stringify(requestData));

  location.reload();
}

/**
 * Кнопка, которая сабмитит форму.
 */
const submitButton = document.getElementById("btn");
submitButton.addEventListener("click", toSubmit);

if (locStorData) {
  locStorData.forEach(el => {
    /** 
     * Узел для одного объекта с данными.
     */
    const itemWrapper = document.createElement("div");
    content.append(itemWrapper);

    const objKeys = Object.keys(el);
    const objVal = Object.values(el);

    for (let i = 0; i < objKeys.length; i++) {
      const fieldKey = document.createElement('span');
      const fieldValue = document.createElement('span');

      fieldKey.innerHTML = objKeys[i] + ": ";
      fieldValue.innerHTML = objVal[i] + " ";

      if (objKeys[i] === "fuelCount") fieldValue.innerHTML = objVal[i] + "л ";
      if (objKeys[i] === "price") fieldValue.innerHTML = objVal[i] + "р ";
      if (objKeys[i] === "mileage") fieldValue.innerHTML = objVal[i] + "км ";

      itemWrapper.append(fieldKey);
      itemWrapper.append(fieldValue);
    }
  });
}

// сколько проехал
// кол топлива на 100км
// кол топлива на 1км