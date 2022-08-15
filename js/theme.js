const checkbox = document.getElementById('checkbox');
const switcher = document.querySelector('.switcher');
const themesBody = document.querySelector('#body');
const formColor = document.querySelector('#formColor');
const formColorDark = document.querySelector('.form-control');


switcher.addEventListener('click', () => {
    const allLi = document.querySelectorAll('li');
    if (checkbox.checked) {
        switcher.setAttribute('data-themes', 'night');
        themesBody.classList.add('darkBody');
        formColor.classList.add('darkLi');
        formColor.classList.remove('bg-light');
        allLi.forEach( (li) => li.classList.add('darkLi'));
        formColorDark.classList.add('darkBody');
    } else {
        switcher.setAttribute('data-themes', 'day');
        themesBody.classList.remove('darkBody');
        formColor.classList.remove('darkLi');
        formColor.classList.add('bg-light');
        allLi.forEach( (li) => li.classList.remove('darkLi'))
        formColorDark.classList.remove('darkBody');
    }
})
