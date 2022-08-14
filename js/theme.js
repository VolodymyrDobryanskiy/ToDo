const checkbox = document.getElementById('checkbox');
const switcher = document.querySelector('.switcher');
const themesBody = document.querySelector('#body');


switcher.addEventListener('click', () => {
    checkbox.checked ?
        switcher.setAttribute('data-themes', 'night') :
        switcher.setAttribute('data-themes', 'day');

    checkbox.checked ?
        themesBody.classList.add('darkBody') :
        themesBody.classList.remove('darkBody');
})

