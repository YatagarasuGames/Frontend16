$('#body-wrapper').load('about-me.html');
$('#page-style').attr('href', 'style_about-me_page.css'); 
const HTML_navLinks = $('.nav-link');
$('#about-me').toggleClass('nav-clicked');

$('#about-me').on('click', function() {
    $('#body-wrapper').load('about-me.html');
    $('#page-style').attr('href', 'style_about-me_page.css'); 
    removeNavClass();
    console.log('removed classes');
    $(this).toggleClass('nav-clicked');
    console.log('added class');
});

$('#first-semester').on('click', function() {
    $('#body-wrapper').load('first-semester.html');
    $('#page-style').attr('href', 'style_first-semester_page.css');
    removeNavClass();
    $(this).toggleClass('nav-clicked');
});

$('#projects').on('click', function() {
    $('#body-wrapper').load('projects.html');
    $('#page-style').attr('href', 'style_projects_page.css');
    removeNavClass();
    $(this).toggleClass('nav-clicked');
});

function removeNavClass(){
    HTML_navLinks.each(function() {
        $(this).removeClass('nav-clicked');
    });
}

const nav = document.querySelector('nav');
const bodyWrapper = document.querySelector('#body-wrapper'); 

window.addEventListener('scroll', function() {
    if (window.innerWidth > 768) {
        return;
      } 
    
    if (window.scrollY >= 200) {
        nav.style.position = 'fixed';
        bodyWrapper.style.marginTop = nav.offsetHeight + 'px'; // Получаем высоту элемента с помощью offsetHeight
      } else {
        nav.style.position = 'sticky';
        bodyWrapper.style.marginTop = '0';
      }
  });

  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      nav.style.position = 'sticky';
      bodyWrapper.style.marginTop = '0';
    }
  });