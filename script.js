
const menu = document.querySelector('.menu');
const menuList = document.querySelector('.menu__list');
const content = document.querySelector('.content');

const activeM = 'menu__item--active';
const activeT = 'block--active';

// добавления элементов в список:
for (let i = 1; i <= 25; i++) {
    // menu
    const li = document.createElement('li')
    li.classList.add('menu__item')
    li.dataset.contentId = `block_${i}`
    li.textContent = `Элемент ${i}`
    menuList.appendChild(li)

    // Content
    const textBox = document.createElement('div')
    textBox.classList.add('block')
    textBox.id = 'block_' + i
    const div = document.createElement('div')
    div.textContent = `${i} - Qui laboriosam, id odio deserunt perferendis architecto optio aperiam beatae at fuga eligendi blanditiis deleniti modi ad incidunt libero. Ad laboriosam asperiores fuga quae sunt dolorem natus temporibus impedit eius.
    Possimus delectus ducimus dolores deleniti voluptate, quaerat fuga, dicta dolorum a in ipsa itaque, unde culpa est tempora. Deserunt cupiditate officiis reiciendis suscipit beatae sit odit incidunt ad culpa vitae?
    Aliquam, nemo. Deserunt a sed sequi atque reprehenderit aperiam magnam nisi cumque, voluptatem deleniti quos cum officiis sapiente molestias aliquid rem omnis harum quia modi asperiores dignissimos sit repellendus ut!`
    textBox.appendChild(div)
    textBox.appendChild(document.createElement('span'))
    content.appendChild(textBox)
}

const menuItems = document.querySelectorAll('.menu__item')
const textBoxes = document.querySelectorAll('.block')

// padding bottom for content
const lastElemMenu = content.lastElementChild
content.style.paddingBottom = `${document.documentElement.clientHeight - lastElemMenu.offsetHeight}px`


// Horizontal Scroll Menu
function horizontalScrollMenu(elementMenu, position = 'left') {
    const menuListHalfWidht = document.querySelector('.menu').getBoundingClientRect().width / 2
    const elemHalfWidth = elementMenu.getBoundingClientRect().width / 2
    const posCenter = elementMenu.offsetLeft - menuListHalfWidht + elemHalfWidth
    const posLeft = elementMenu.offsetLeft - 14

    menuList.scrollTo({
        top: 0,
        left: position == 'center' ? posCenter : posLeft,
        behavior: 'smooth'
    }) 
}


menuItems.forEach(menuItem => {
    menuItem.addEventListener('click', function(e) {
        // clear all active class
        menuItems.forEach(m => m.classList.remove(activeM))
        textBoxes.forEach(m => m.classList.remove(activeT))

        // get id text box
        const textId = this.dataset.contentId
        // get text box by ID
        const textBox = document.getElementById(textId)

        // add active class
        this.classList.add(activeM)

        // scroll text box
        window.scrollTo({
            top: textBox.offsetTop,
            left: 0,
            behavior: "smooth"
        })

        horizontalScrollMenu(this, 'center')    
    })
})

let timeScroll = null;
const padding = 120; // margin: -120px
const offset = 100;
window.addEventListener('scroll', function(e) {
    if (timeScroll) {
        clearTimeout(timeScroll)
    }

    timeScroll = setTimeout(() => {
        const textActive = document.querySelector('.block.block--active')
        // document.querySelectorAll('.block.block--active').forEach(t => t.classList.remove(activeT))

        textBoxes.forEach(t => {
            const textTop = t.offsetTop
            const textBottom = t.offsetTop + t.getBoundingClientRect().height - padding
            const pageScroll = pageYOffset + offset
            const elemMenu = this.document.querySelector(`.menu__item[data-content-id="${t.id}"]`)

            if ( pageScroll > textTop && pageScroll < textBottom ) {
                t.classList.add(activeT)
                elemMenu.classList.add(activeM)
                horizontalScrollMenu(elemMenu, 'center') 
            } else {
                t.classList.remove(activeT)
                elemMenu.classList.remove(activeM)
            }
        })
    }, 100)
})
