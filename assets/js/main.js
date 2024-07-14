
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Initiate  glightbox 
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  } 

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });
  
      let portfolioFilters = select('#portfolio-flters li', true);
  
      // Function to apply a specific filter
      function applyFilter(filterValue) {
        portfolioIsotope.arrange({
          filter: filterValue
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh();
        });
      }
  
      // Apply the "All" filter on startup
      applyFilter('.filter-app, .filter-card');
  
      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');
  
        let filterValue = this.getAttribute('data-filter');
  
        // Exclude .filter-web items when "All" is selected
        if (filterValue === '*') {
          filterValue = '.filter-app, .filter-card';
        }
  
        // Apply the selected filter
        applyFilter(filterValue);
      }, true);
    }
  });
  
  
  




  // window.addEventListener('load', () => {
  //   let portfolioContainer = select('.portfolio-container');
  //   if (portfolioContainer) {
  //     let portfolioIsotope = new Isotope(portfolioContainer, {
  //       itemSelector: '.portfolio-item'
  //     });

  //     let portfolioFilters = select('#portfolio-flters li', true);

  //     on('click', '#portfolio-flters li', function(e) {
  //       e.preventDefault();
  //       portfolioFilters.forEach(function(el) {
  //         el.classList.remove('filter-active');
  //       });
  //       this.classList.add('filter-active');

  //       portfolioIsotope.arrange({
  //         filter: this.getAttribute('data-filter')
  //       });
  //       portfolioIsotope.on('arrangeComplete', function() {
  //         AOS.refresh()
  //       });
  //     }, true);
  //   }

  // });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  });

})()




//FILTER
document.addEventListener("DOMContentLoaded", function() {
  // Show only Informative Website on startup
  showCategory("info-website");

  // Add event listeners to all buttons for filtering
  var btnContainer = document.getElementById("myBtnContainer");
  var btns = btnContainer.getElementsByClassName("btn");
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
      var filterValue = this.getAttribute("data-filter");
      filterSelection(filterValue);
    });
  }

  // Function to show elements of a specific category
  function showCategory(category) {
    var x, i;
    x = document.getElementsByClassName("filterDiv");
    for (i = 0; i < x.length; i++) {
      if (x[i].classList.contains(category)) {
        x[i].style.display = "block"; // Show the element
      } else {
        x[i].style.display = "none"; // Hide the element
      }
    }
  }

  // Function to filter elements based on the selected category
  function filterSelection(c) {
    if (c === "all") {
      showCategory("info-website"); // Show Informative Website on "All" click
    } else {
      showCategory(c); // Show selected category
    }
  }
});

//clicked
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        buttons.forEach(b => {
            b.style.backgroundColor = ''; // Reset background color for all buttons
        });

        button.style.backgroundColor = '#23a3df'; // Set background color for the clicked button
    });
});





//REDIRECT

document.addEventListener("DOMContentLoaded", function() {
  function handleAnchorClick(event) {
    event.preventDefault();

    const redirectLink = "contactUS.html"; // Replace with your desired link
    window.location.href = redirectLink;
  }

  // Handle anchor clicks in the main document
  const mainAnchorTags = document.querySelectorAll("a");
  mainAnchorTags.forEach(function(anchor) {
    if (anchor.textContent === "CHOOSE A PLAN") {
      anchor.addEventListener("click", handleAnchorClick);
    }
  });

  // Handle anchor clicks inside iframes
  const iframes = document.querySelectorAll("iframe");
  iframes.forEach(function(iframe) {
    iframe.addEventListener("load", function() {
      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
      const iframeAnchorTags = iframeDoc.querySelectorAll("a");
      iframeAnchorTags.forEach(function(anchor) {
        if (anchor.textContent === "CHOOSE A PLAN") {
          anchor.addEventListener("click", handleAnchorClick);
        }
      });
    });
  });
});



//nav-scroll

document.addEventListener("DOMContentLoaded", function() {
  // Get all navigation links with the "scrollto" class
  const scrollLinks = document.querySelectorAll(".scrollto");

  // Add a click event listener to each link
  scrollLinks.forEach(link => {
    link.addEventListener("click", function(event) {
      event.preventDefault();

      const target = this.getAttribute("href");

      // Redirect to index.html and scroll to the target section
      window.location.href = `index.html${target}`;
    });
  });
});
