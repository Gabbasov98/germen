(function () {
  // Инициализация бегущей строки. Закрытие по иконке "Крест"
  function initMarquee() {
    let SwiperTop = new Swiper('.swiper--top', {
      spaceBetween: 0,
      centeredSlides: true,
      speed: 10000,
      autoplay: {
        delay: 1,
      },
      loop: true,
      slidesPerView: 'auto',
      allowTouchMove: false,
      disableOnInteraction: true
    });

    $('.info-banner__close').on('click', function () {
      $('.info-banner').removeClass('info-banner--active');
    });
  }

  // Инициализация селектов в обложке
  function initSelect() {
    // Куда
    $('.cover__parameters-item--city').select2({
      minimumResultsForSearch: -1,
      placeholder: 'Куда',
      selectionCssClass: 'cover__button cover__button--city'
    });
    // Когда
    $('.cover__parameters-item--time').select2({
      minimumResultsForSearch: -1,
      placeholder: 'Когда',
      selectionCssClass: 'cover__button cover__button--time'
    });
  }

  // Инициализация слайдера
  function initSlider() {
    // Обложка
    const swiperCover = new Swiper('.cover .swiper', {
      loop: true,
      touchStartPreventDefault: false,
      speed: 2000,
      pagination: {
        el: '.cover .swiper-pagination',
      },
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
    });
    // Отзывы
    const swiperReviews = new Swiper('.reviews .swiper', {
      loop: true,
      touchStartPreventDefault: false,
      speed: 1000,
      navigation: {
        nextEl: '.reviews .reviews__button--prev',
        prevEl: '.reviews .reviews__button--next',
      },
      pagination: {
        el: '.reviews .swiper-pagination',
      },
    });
    // Чат
    const swiperChat = new Swiper('.chat .swiper', {
      loop: true,
      touchStartPreventDefault: false,
      speed: 1000,
      pagination: {
        el: '.chat .swiper-pagination',
      },
      autoplay: {
        delay: 15000,
        disableOnInteraction: false,
      },
    });
    // Подробная информация о товаре (левая колонка)
    const swiperProductInfoColLeft = new Swiper('.product-info__product-photos', {
      slidesPerView: 1.3,
      loop: true,
      touchStartPreventDefault: false,
      speed: 1000,
      pagination: {
        el: '.product-info__product-photos .swiper-pagination',
      },
      autoplay: {
        delay: 15000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: '.product-info__product-photos .product-info__slider-controls--next',
        prevEl: '.product-info__product-photos .product-info__slider-controls--prev',
      },
      breakpoints: {
        1170: {
          loop: true,
          slidesPerView: 1,
          touchStartPreventDefault: false,
          speed: 1000,
        }
      }
    });
    // Подробная информация о товаре (правая колонка) : начало
    $('.product-info__additions-slider').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      variableWidth: true,
      infinite: false,
      arrows: true,
      appendArrows: $('.your-class-arrow'),
      nextArrow: $('.product-info__additions-control--next')
    });

    // Докручиваем этот же слайдер, если дошли до последнего слайда
    function replaseSlider(indent) {
      $('.product-info__additions-slider').on('afterChange', function (event, slick, currentSlide) {
        if (slick.currentSlide >= slick.slideCount - slick.options.slidesToShow) {
          $('.product-info__additions-slider').css({"transform": "translate3d(" + -indent + "px" + ",0,0)"});
        } else {
          $('.product-info__additions-slider').css({"transform": "translate3d(0px,0,0)"});
        }
      });
    }

    // Подробная информация о товаре (правая колонка) : конец

    let windowWidth = $(window).outerWidth();
    $(window).on('resize', function () {
      windowWidth = $(window).outerWidth();
      if (windowWidth > 1170) {
        replaseSlider(40);
      } else if (windowWidth < 768) {
        replaseSlider(170);
      }
    });

    if (windowWidth > 1170) {
      replaseSlider(40);
    } else if (windowWidth < 768) {
      replaseSlider(170);
    }

  }

  // Отслеживание положения вертикального скролла на странице
  function initCheckScrollPosition() {
    let $window = $(window);
    let $header = $('.header');
    let $filters = $('.filters');

    $window.scroll(function () {
      // Если скролл больше нуля, то уменьшаем высоту шапку; если нет, то убираем модификатор
      if ($window.scrollTop() > 100) {
        $header.addClass('header--height-small');
      } else {
        $header.removeClass('header--height-small');
      }

      // Если скролл равен положению блока фильтров, то красим бэкграунд; если нет, то убираем модификатор
      if (($window.scrollTop() + $header.outerHeight()) >= $filters.offset().top) {
        $filters.addClass('filters--bg-gray');
      } else {
        $filters.removeClass('filters--bg-gray');
      }
    });
  }

  // Показ/скрытие сортировки в блоке фильтров
  function showHideSort() {
    let windowWidth = $(window).outerWidth();

    if (windowWidth > 768) {
      $('.filters__item--sort').on('click', function () {
        $('.filters__sort').toggleClass('filters__sort--active');
        $(this).toggleClass('filters__item--active');
      });

      // Клик на документе кроме кнопки и окна сортировки (для закрытия окна сортировки)
      $(document).mouseup(function (e) {
        let sort = $('.filters__sort');
        let btn = $('.filters__item--sort');
        if (!sort.is(e.target) && sort.has(e.target).length === 0 && !btn.is(e.target) && btn.has(e.target).length === 0) {
          $(sort).removeClass('filters__sort--active');
          $(btn).removeClass('filters__item--active');
        }
      });
    } else {
      $('.filters__item--sort').on('click', function () {
        $('.filters__sort').addClass('filters__sort--active');
        $('.filters__overlay').addClass('filters__overlay--active');
        $(this).addClass('filters__item--active');
        $(this).addClass('filters__item--active');
      });
      $('.filters__overlay, .filters__btn-close').on('click', function () {
        $('.filters__sort').removeClass('filters__sort--active');
        $('.filters__overlay').removeClass('filters__overlay--active');
        $(this).removeClass('filters__item--active');
        $('.filters__item--sort').removeClass('filters__item--active');
      });
    }
  }

  // Вывод данных из селектов обложки в блоке фильтров
  function setDataSelectToFilters() {
    $('.cover__parameters-item--city').on('select2:select', function (e) {
      let data = e.params.data.text;
      $('.filters__data.filters__data--city .filters__data-text').text(data);
    });
    $('.cover__parameters-item--time').on('select2:select', function (e) {
      let data = e.params.data.text;
      $('.filters__data.filters__data--time .filters__data-text').text(data);
    });
  }

  // Переход из фильтров к обложке
  function scrollToCover() {
    $('.filters__col--right').click(function () {
      $('html, body').animate({
        scrollTop: $('.cover').offset().top
      }, 2000);
    });
  }

  // Добавление/удаление в избранное
  function addRemoveToFavorite() {
    $('.product-card__favorite').on('click', function (event) {
      event.preventDefault();

      // fly animation
      if (!($(this).hasClass('product-card__favorite--active'))) {
        let offset = $(this).offset();
        console.log(offset.top - $(window).scrollTop());
        $(this).clone().addClass('product-card__favorite product-card__favorite--active product-card__favorite--clone').css({
          'left': offset.left + 'px',
          'top': offset.top - $(window).scrollTop() + 'px',
        }).prependTo('body');

        let cart = $('.header__control--heart').offset();
        $('.product-card__favorite.product-card__favorite--clone').animate({
          top: parseInt(cart.top - $(window).scrollTop()) + 'px',
          left: cart.left + 'px',
          height: '0',
          width: '0',
          opacity: '0'
        }, 800, function () {
          $(this).remove();
        });
      }

      // toggle active class
      $(this).toggleClass('product-card__favorite--active');
    });
  }

  // Универсальный прелоадер
  function initUniversalPreloader () {
    $('.product-card__btn').on('click', function (event) {
      event.preventDefault();
      $('.preloader').addClass('preloader--active');

      setTimeout(function() {
        $('.preloader').removeClass('preloader--active');
      }, 800);
    });
  }


  // Показ/скрытие моб. меню
  function showHideNav() {
    // Обработка кликов на иконках "бургер" и "закрыть"
    $('.header__burger').on('click', function (event) {
      $('.nav--mobile').addClass('nav--active');
    });
    $('.nav__btn-close').on('click', function (event) {
      $('.nav--mobile').removeClass('nav--active');
    });

    // Клик на документе моб. меню (для закрытия моб. меню)
    $(document).mouseup(function (e) {
      let nav = $('.nav--mobile');
      if (!nav.is(e.target) && nav.has(e.target).length === 0) {
        $('.nav--mobile').removeClass('nav--active');
      }
    });
  }

  // Показ/скрытие полной информации о продукте
  function showHideProductInfo() {
    // $('.product-card__img-link, product-card__title').on('click', function () {
    //   $('.product-info').addClass('product-info--active');
    // });

    $('.product-info__close, .product-info__overlay, .product-info__line').on('click', function () {
      $('.product-info').removeClass('product-info--active');
    });
  }

  // Показ полного описания в информации о продукте
  function showProductInfoDescr() {
    $('.product-info__descr').on('click', function (event) {
      $('.product-info__descr').addClass('product-info__descr--active');
    });
  }

  // Изменение количества единиц товара в информации о продукте
  function changingNumberOfProduct() {
    $('.product-info__payment-amount-input-btn').on('click', function (event) {
      let btn = $(this).attr('id');
      let $inputText = $('.product-info__payment-amount-input-text')
      let number = +($inputText.val());

      if (btn === 'plus') {
        number += 1;
        $('.product-info__payment-amount-input-text').attr('value', number);
      } else {
        number -= 1;
        if (number >= 1) {
          $('.product-info__payment-amount-input-text').attr('value', number);
        }
      }
    });
  }

  // Добавление/удаление в избранное в информации о продукте
  function addRemoveToFavoriteProductInfo() {
    $('.product-info__favorite').on('click', function (event) {
      event.preventDefault();
      $(this).toggleClass('product-info__favorite--active');
    })
  }

  // Добавление стоимости допа к основной цене товара в подробной карточки товара
  function addingValueToTheBasicPrice() {
    $('.product-info__additions-checkbox').on('click', function () {
      let sum = 0;
      let $btn = $('.product-info__payment-amount-input-button-text');
      let sumCurrent = $btn.data('sum');

      $('.product-info__additions-checkbox:checked').each(function (index, value) {
        sum += parseInt($(this).data('cost'));
      });

      let sumNew = numberWithSpaces((sumCurrent + sum));

      $btn.find('span').text(sumNew);
    });

    function numberWithSpaces(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
  }

  // Вызовы
  initMarquee();
  initSelect();
  initSlider();
  initCheckScrollPosition();
  showHideSort();
  setDataSelectToFilters();
  scrollToCover();
  addRemoveToFavorite();
  initUniversalPreloader();
  showHideNav();
  showHideProductInfo();
  showProductInfoDescr();
  changingNumberOfProduct();
  addRemoveToFavoriteProductInfo();
  addingValueToTheBasicPrice();
})();
