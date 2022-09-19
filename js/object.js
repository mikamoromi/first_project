'use strict';

const menuButton = document.querySelector('.menu');
const menuList = document.querySelector('.header__menu');
const bodyElement = document.querySelector('body');
const certificateImg = document.querySelector('.main__certificate-wrap-img');
const invisibility = document.querySelector('.button-bottom');


menuButton.addEventListener('click', function() {
  menuButton.classList.toggle('active');
  menuList.classList.toggle('active');
  bodyElement.classList.toggle('display-block');
});

window.addEventListener('scroll', function() {
  const scrollNow = window.pageYOffset;
  if (scrollNow > 1000) {
    invisibility.classList.add('invisibility');
  }else {
    invisibility.classList.remove('invisibility');
  }
});

invisibility.addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
  menuLinks.forEach(menuLink => {
    menuLink.addEventListener('click', onMenuLinkClick);

    function onMenuLinkClick(e) {
      const menulink = e.target;
      if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
        const gotoBlock = document.querySelector(menuLink.dataset.goto);
        const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset;

        if (menuButton.classList.contains('active')) {
          menuButton.classList.remove('active');
          menuList.classList.remove('active');
          bodyElement.classList.remove('display-block');
        }

        window.scrollTo({
          top: gotoBlockValue,
          behavior: "smooth",
        });
      }
    }
  });
}


let swiper = new Swiper(".swiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form');
  form.addEventListener('submit', formSend);
  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    let formData = new FormData(form);

    if (error === 0){
      let response = await fatch('sendmail.php', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        let result = await response.json();
        alert(result.message);
        formPreview.innerHTML = '';
        form.reset();
      }else {
        alert('Ошибка!');
      }
    }else {
      alert("Заполните обязательные поля");
    }

    function formValidate(form) {
      let error = 0;
      let formReq = document.querySelectorAll('._req');

      for(let index = 0; index < formReq.length; index++) {
        const input = formReq[index];
        formRemoveError(input);
        if (input.classList.contains('_email')) {
          if (emailTest(input)) {
            formAddError(input);
            error++;
          }
        }else {
          if (input.value === '') {
            formAddError(input);
            error++;
          }
        }
      }
      return error;
    }
    function formAddError(input) {
      input.parentElement.classList.add('_error');
      input.classList.add('_error');
    }
    function formRemoveError(input) {
      input.parentElement.classList.remove('_error');
      input.classList.remove('_error');
    }
    function emailTest (input) {
      return !/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/.test(input.value);
    }

  }
});
