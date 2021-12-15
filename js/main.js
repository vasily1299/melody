$(document).ready(function () {
  var currentFloor = 2; // переменная, где хранится текущий этаж
  var floorPath = $(".home-image path"); // каждый отдельный этаж в SVG
  var counterUp = $(".counter-up"); /* кнопка увеличения этажа */
  var counterDown = $(".counter-down"); /* кнопка уменьшения этажа */
  var modal = $(".modal");
  var modalFeedback = $('.modal-feedback');
  var modalCloseButton = $(".modal-close-button");
  var modalFeedbackCloseButton = $(".modal-feedback-close-button");
  var viewFlatsButton = $(".view-flats");
  var order =$(".order");
  var flatPath = $(".flats path"); // каждая квартира на этаже в SVG
  var currentFlat = 41; // переменная, где хранится текущая квартира
  var currentLink = $(".flat-link");
  var delta = currentFlat - currentFloor * 10;

  let usCurrentFlat = 1;
  let flatLink = $(".flat-item a");

  // функция при наведении мышкой на квартиру
  flatPath.on("mouseover", function () {
    let currentFlatOrder = +$(this).attr("data-flat");
    $(`.flat-link:eq(${currentFlatOrder})`).addClass("hover");
  });

  flatPath.on("mouseout", function () {
    $(".flat-link").removeClass("hover");
  });

  flatLink.on("mouseover", function () {
    currentFlat = +$(this).attr("data-flat-link-current");
    /* let usCurrentFlat = currentFlat.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGroupping: false,
    }); */
    $(`[data-flat=${currentFlat}]`).addClass("flat-path-mouseover");
  });
  flatLink.on("mouseout", function () {
    flatPath.removeClass("flat-path-mouseover");
  });


// при клике на квартиру
  flatPath.on("click", toggleModalFeedback); // при клике на квартиру вызываем модальное окно с формой
  flatLink.on("click", toggleModalFeedback); // при клике на ссылку на квартиру вызываем модальное окно с формой
  modalFeedbackCloseButton.on("click", toggleModalFeedback); // при клике на крестик закрываем модальное окно
  order.on("click", toggleModalFeedback); // при клике на оформить заявку скрываем модальное окно с формой

  // функция при наведении мышкой на этаж
  floorPath.on("mouseover", function () {
    floorPath.removeClass("current-floor"); // удаляем активный класс у этажей
    currentFloor = $(this).attr("data-floor"); // получаем значение текущего этажа
    $(".counter").text(currentFloor); // записываем значение этажа в счётчик справа (или внизу на мобилке)
  });

  floorPath.on("click", toggleModal); // при клике на этаж вызываем модальное окно
  modalCloseButton.on("click", toggleModal); // при клике на крестик закрываем модальное окно
  viewFlatsButton.on("click", toggleModal); // при клике на большую кнопку показываем модальное окно

  // отслеживаем клик по кнопке "Вверх"
  counterUp.on("click", function () {
    // проверяем значение этажа, оно не должно быть больше 18
    if (currentFloor < 18) {
      currentFloor++; // прибавляем один этаж
      usCurrentFloor = currentFloor.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }); // форматируем переменную с этажом, чтобы было вида 02, а не 2
      $(".counter").text(usCurrentFloor); // записываем значение этажа в счётчик справа (или внизу на мобилке)
      floorPath.removeClass("current-floor"); // удаляем активный класс у этажей
      $(`[data-floor=${usCurrentFloor}]`).toggleClass("current-floor"); // подсвечиваем текущий этаж
    }
  });

  // отслеживаем клик по кнопке "Вниз"
  counterDown.on("click", function () {
    // проверяем значение этажа, оно не должно быть меньше 2
    if (currentFloor > 2) {
      currentFloor--; // отнимаем один этаж
      usCurrentFloor = currentFloor.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }); // форматируем переменную с этажом, чтобы было вида 02, а не 2
      $(".counter").text(usCurrentFloor); // записываем значение этажа в счётчик справа (или внизу на мобилке)
      floorPath.removeClass("current-floor"); // удаляем активный класс у этажей
      $(`[data-floor=${usCurrentFloor}]`).toggleClass("current-floor"); // подсвечиваем текущий этаж
    }
  });

  // функция открыть-закрыть модальное окно
  function toggleModal() {
    modal.toggleClass("is-open");
  }

  // функция открыть-закрыть модальное окно с формой
  function toggleModalFeedback() {
    modalFeedback.toggleClass("is-open");
  }
});

