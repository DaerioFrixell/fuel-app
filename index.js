"use strict";

const allMonthes = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "june",
  "july",
  "aug",
  "sept",
  "oct",
  "nov",
  "dec",
];

/**
 * Объект формы.
 */
const form = document.forms.onlyForm;
const elements = form.elements;

/**
 * Узел, где отображаются данные
 */
const content = document.getElementById("content");

/**
 * Данные из localStorage.
 * 
 * @type Array
 */
const locStorData = JSON.parse(localStorage.getItem("form"));

/**
 * Отправляет данные на сервер и добавляет в localStorage.
 */
const toSubmit = (e) => {
  e.preventDefault();

  /**
   * Массив с данными, который отправиться на бэк и localStorage.
   * 
   * @type Array
   * @todo LEGASY Исправить на const.
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
    requestData = [...locStorData, initObjectForm];
  } else {
    requestData.push(initObjectForm);;
  }

  localStorage.setItem("form", JSON.stringify(requestData));

  location.reload();
}

/**
 * Кнопка, которая сабмитит форму.
 */
const submitButton = document.getElementById("btn");
submitButton.addEventListener("click", toSubmit);

if (locStorData) {
  /**
   * Разница по киллометражу между каждыми объектами.
   */
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
      currentMileage.push(0);
    } else {
      currentMileage.push(locStorData[index].mileage - locStorData[index - 1].mileage);
    }

    for (let i = 0; i < objKeys.length; i++) {
      const fieldKey = document.createElement("span");
      const fieldValue = document.createElement("span");

      fieldKey.innerHTML = objKeys[i] + ": ";
      fieldValue.innerHTML = objVal[i] + " ";

      fieldKey.className = "item-key";
      fieldValue.className = "item-value";

      const fieldMileageCalc = document.createElement("span");
      /**
       * Поле с количеством километров на 1 литр.
       */
      const countKmPerLiterField = document.createElement("span");

      /**
       * Нода для элемента вида <key: value>.
       */
      const item = document.createElement("div");
      item.className = "item";
      itemWrapper.append(item);

      item.append(fieldKey);
      item.append(fieldValue);

      // Настройка поля с датой.
      if (objKeys[i] === "day") {
        const date = new Date(objVal[i]);

        const day = date.getDate();

        const monthNumber = date.getMonth();
        const month = allMonthes[monthNumber];

        const fullYear = date.getFullYear();
        const year = String(fullYear).slice(2);

        const finallyDate = `${day} ${month} ${year}`;

        fieldValue.innerHTML = finallyDate;
      }

      // Настройка поля с количеством заправленного топлива.
      if (objKeys[i] === "fuelCount") {
        fieldValue.innerHTML = objVal[i] + "л";

        let calcLiters = currentMileage[index] / objVal[i];
        countKmPerLiterField.innerHTML = "На 1 литр: " + Math.round(calcLiters) + "км";

        itemWrapper.append(countKmPerLiterField);
      }

      // Настройка поля с ценой за заправку.
      if (objKeys[i] === "price") {
        fieldValue.innerHTML = objVal[i] + "руб";
      }

      // Настройка поля с киламетражем.
      if (objKeys[i] === "mileage") {
        fieldValue.innerHTML = objVal[i] + "км";

        fieldMileageCalc.innerHTML = "проехал: " + currentMileage[index] + "км";

        itemWrapper.append(fieldMileageCalc);
      }
    }
  });
}