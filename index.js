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
    initObjectForm[initObjectFormKeys[i]] = arrayForm[i].value;

    if (locStorData) {
      const isMileageField = initObjectFormKeys[i] === "mileage";
      const isSmallerValue = Number(arrayForm[i].value) < Number(locStorData[locStorData.length - 1].mileage);

      if (isMileageField && isSmallerValue) {
        alert("ввел слишком маленький пробег");
        return;
      }
    }
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
  let currentMileage = [];

  locStorData.forEach((el, index) => {
    /** 
     * Узел для одного объекта с данными.
     */
    const itemWrapper = document.createElement("div");
    itemWrapper.className = "item-wrapper";
    content.append(itemWrapper);



    const objKeys = Object.keys(el);
    const objVal = Object.values(el);

    if (index === 0) {
      currentMileage.push(0)
    } else {
      currentMileage.push(locStorData[index].mileage - locStorData[index - 1].mileage);
    }

    for (let i = 0; i < objKeys.length; i++) {
      const fieldKey = document.createElement('span');
      const fieldValue = document.createElement('span');

      fieldKey.innerHTML = objKeys[i] + ": ";
      fieldValue.innerHTML = objVal[i] + " ";

      fieldKey.className = "item-key"
      fieldValue.className = "item-value"

      const fieldMileageCalc = document.createElement('span');
      const fieldCountVbyMil = document.createElement('span');

      if (objKeys[i] === "day") {
        const item = document.createElement("div");
        item.className = "item";
        itemWrapper.append(item);

        item.append(fieldKey);
        item.append(fieldValue);
      }

      if (objKeys[i] === "fuelCount") {
        const item = document.createElement("div");
        item.className = "item";
        itemWrapper.append(item);

        let calcLitr = currentMileage[index] / objVal[i];

        fieldCountVbyMil.innerHTML = "На 1 литр: " + Math.round(calcLitr) + "км ";
        itemWrapper.append(fieldCountVbyMil);

        fieldValue.innerHTML = objVal[i] + "л ";

        item.append(fieldKey);
        item.append(fieldValue);
      }

      if (objKeys[i] === "price") {
        const item = document.createElement("div");
        item.className = "item";
        itemWrapper.append(item);

        fieldValue.innerHTML = objVal[i] + "р ";
        item.append(fieldKey);
        item.append(fieldValue);
      }

      if (objKeys[i] === "mileage") {
        const item = document.createElement("div");
        item.className = "item";
        itemWrapper.append(item);

        fieldValue.innerHTML = objVal[i] + "км ";
        fieldMileageCalc.innerHTML = "проехал: " + currentMileage[index] + "км";

        itemWrapper.append(fieldMileageCalc);

        item.append(fieldKey);
        item.append(fieldValue);
      }

    }
  });
}

// сколько проехал
// кол топлива на 100км
// кол топлива на 1км