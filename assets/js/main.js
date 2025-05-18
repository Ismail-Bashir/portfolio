/* ----- NAVIGATION BAR FUNCTION ----- */
function myMenuFunction() {
    const navMenu = document.querySelector(".nav-menu");
    const menuBtn = document.querySelector(".nav-menu-btn i");
    
    navMenu.classList.toggle("responsive");
    
    if (navMenu.classList.contains("responsive")) {
        menuBtn.classList.replace("uil-bars", "uil-times");
    } else {
        menuBtn.classList.replace("uil-times", "uil-bars");
    }
}

/* ----- ADD SHADOW ON NAVIGATION BAR WHILE SCROLLING ----- */
window.addEventListener("scroll", function() {
    const header = document.getElementById("header");
    
    if (window.scrollY > 0) {
        header.classList.add("sticky");
        header.style.boxShadow = "0 1px 6px rgba(0, 0, 0, 0.1)";
    } else {
        header.classList.remove("sticky");
        header.style.boxShadow = "none";
    }
});

/* ----- TYPING EFFECT ----- */
var typingEffect = new Typed(".typedText",{
    strings : ["Software Engineer", "Data Scientist", "ML Developer", "AI Engineer", "Computer Science Student", "Statistics Student"],
    loop : true,
    typeSpeed : 100, 
    backSpeed : 80,
    backDelay : 2000
})


/* ----- ## -- SCROLL REVEAL ANIMATION -- ## ----- */
const sr = ScrollReveal({
      origin: 'top',
      distance: '80px',
      duration: 2000,
      reset: true     
})

/* -- HOME -- */
sr.reveal('.featured-text-card',{})
sr.reveal('.featured-name',{delay: 100})
sr.reveal('.featured-text-info',{delay: 200})
sr.reveal('.featured-text-btn',{delay: 200})
sr.reveal('.social_icons',{delay: 200})
sr.reveal('.featured-image',{delay: 300})


/* -- PROJECT BOX -- */
sr.reveal('.project-box',{interval: 200})

/* -- HEADINGS -- */
sr.reveal('.top-header',{})

/* ----- ## -- SCROLL REVEAL LEFT_RIGHT ANIMATION -- ## ----- */

/* -- ABOUT INFO & CONTACT INFO -- */
const srLeft = ScrollReveal({
origin: 'left',
distance: '80px',
duration: 2000,
reset: true
})

srLeft.reveal('.about-info',{delay: 100})
srLeft.reveal('.contact-info',{delay: 100})

/* -- ABOUT SKILLS & FORM BOX -- */
const srRight = ScrollReveal({
origin: 'right',
distance: '80px',
duration: 2000,
reset: true
})

srRight.reveal('.skills-box',{delay: 100})
srRight.reveal('.form-control',{delay: 100})



/* ----- CHANGE ACTIVE LINK ----- */
function navHighlighter() {
    const sections = document.querySelectorAll("section[id]");
    const scrollY = window.pageYOffset;
    
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute("id");
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add("active");
        } else {
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove("active");
        }
    });
}

window.addEventListener("scroll", navHighlighter);

/* ----- THEME CUSTOMIZATION ----- */
const themeButton = document.getElementById('theme-toggle');
const darkTheme = 'dark-theme';
const iconTheme = 'uil-sun';

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun';

// We validate if the user previously chose a topic
if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    themeButton.classList[selectedIcon === 'uil-moon' ? 'remove' : 'add'](iconTheme);
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
});

/* ----- PROJECT FILTERING ----- */
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectBoxes = document.querySelectorAll('.project-box');

    // ScrollReveal 초기화 해제 함수
    function resetScrollReveal() {
        projectBoxes.forEach(box => {
            sr.clean(box);  // ScrollReveal 효과 제거
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // ScrollReveal 효과 초기화
            resetScrollReveal();
            
            // 활성 버튼 표시 업데이트
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // 필터링 로직
            const filterValue = button.getAttribute('data-filter');
            
            projectBoxes.forEach(box => {
                if (filterValue === 'all' || box.getAttribute('data-category') === filterValue) {
                    box.style.display = 'block';  // display 직접 제어
                    box.style.opacity = '1';
                    box.style.transform = 'translateY(0)';
                } else {
                    box.style.display = 'none';  // display 직접 제어
                }
            });
        });
    });
});

// Image Slider functionality
const sliderImages = document.querySelectorAll('.slider-image');
const dots = document.querySelectorAll('.dot');
let currentImageIndex = 0;

function showImage(index) {
    // Remove active class from all images and dots
    sliderImages.forEach(img => img.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current image and dot
    sliderImages[index].classList.add('active');
    dots[index].classList.add('active');
}

// Auto slide
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % sliderImages.length;
    showImage(currentImageIndex);
}

// Start auto slide
let slideInterval = setInterval(nextImage, 3000); // Change image every 3 seconds

// Click on dots to change image
dots.forEach(dot => {
    dot.addEventListener('click', () => {
        clearInterval(slideInterval); // Clear auto slide interval
        currentImageIndex = parseInt(dot.getAttribute('data-index'));
        showImage(currentImageIndex);
        slideInterval = setInterval(nextImage, 3000); // Restart auto slide
    });
});

// Pause on hover
const imageSlider = document.querySelector('.image-slider');
imageSlider.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

imageSlider.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextImage, 3000);
});

// 스크롤 애니메이션
function checkScroll() {
    const elements = document.querySelectorAll('.experience-content');
    const triggerBottom = window.innerHeight * 0.8;

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < triggerBottom) {
            element.classList.add('show');
        }
    });
}

// 초기 로드와 스크롤 시 체크
window.addEventListener('load', checkScroll);
window.addEventListener('scroll', checkScroll);

// Experience cards animation
document.addEventListener('DOMContentLoaded', function() {
    const expCards = document.querySelectorAll('.exp-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.1
    });

    expCards.forEach(card => {
        observer.observe(card);
    });
});

// 프로젝트 데이터
const projects = [
    {
        id: 'neural',
        category: 'ai',
        title: 'Neural Style Transfer',
        description: 'Implementation of neural style transfer algorithm using PyTorch. Combines content and style images to create artistic transformations.',
        tags: ['PyTorch', 'Computer Vision', 'Deep Learning'],
        githubUrl: '#',
        demoUrl: 'YOUR_VIDEO_URL'
    },
    {
        id: 'webapp',
        category: 'web',
        title: 'Real-time Collaboration Platform',
        description: 'Built a real-time collaboration platform using React and WebSocket. Features include live document editing and version control.',
        tags: ['React', 'Node.js', 'WebSocket'],
        githubUrl: '#',
        demoUrl: 'YOUR_VIDEO_URL'
    },
    {
        id: 'trading',
        category: 'quant',
        title: 'Algorithmic Trading System',
        description: 'Developed a quantitative trading system using Python. Implements various trading strategies with real-time market data analysis.',
        tags: ['Python', 'Machine Learning', 'Finance'],
        githubUrl: '#',
        demoUrl: 'YOUR_VIDEO_URL'
    }
];

// 프로젝트 카드 HTML 생성 함수
function createProjectCard(project) {
    return `
        <div class="project-box" data-category="${project.category}" onclick="openProjectModal('${project.id}')">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tags">
                ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
            </div>
            <div class="project-links">
                <a href="${project.githubUrl}" class="project-link" onclick="event.stopPropagation();">
                    <i class="uil uil-github"></i> View Code
                </a>
                <button class="project-link demo-link" onclick="event.stopPropagation(); openProjectModal('${project.id}')">
                    <i class="uil uil-video"></i> Watch Demo
                </button>
            </div>
        </div>
    `;
}

// 프로젝트 모달 HTML 생성 함수
function createProjectModal(project) {
    return `
        <div id="${project.id}Modal" class="project-modal">
            <div class="modal-content">
                <span class="close-modal" onclick="closeProjectModal('${project.id}')">&times;</span>
                <h2>${project.title} Demo</h2>
                <div class="video-container">
                    <iframe src="" data-src="${project.demoUrl}" allowfullscreen></iframe>
                </div>
                <p>Detailed explanation of the ${project.title}...</p>
            </div>
        </div>
    `;
}

/* ----- PROJECT MODAL FUNCTIONS ----- */
function openProjectModal(projectId) {
    const modal = document.getElementById(projectId + 'Modal');
    if (modal) {
        modal.style.display = 'block';
        // Load video only when modal opens
        const iframe = modal.querySelector('iframe');
        if (iframe && !iframe.src) {
            iframe.src = iframe.dataset.src;
        }
    }
}

function closeProjectModal(projectId) {
    const modal = document.getElementById(projectId + 'Modal');
    if (modal) {
        modal.style.display = 'none';
        // Stop video when closing modal
        const iframe = modal.querySelector('iframe');
        if (iframe) {
            iframe.src = '';
        }
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('project-modal')) {
        event.target.style.display = 'none';
        const iframe = event.target.querySelector('iframe');
        if (iframe) {
            iframe.src = '';
        }
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modals = document.getElementsByClassName('project-modal');
        Array.from(modals).forEach(modal => {
            if (modal.style.display === 'block') {
                const iframe = modal.querySelector('iframe');
                if (iframe) {
                    iframe.src = '';
                }
                modal.style.display = 'none';
            }
        });
    }
});

/* ----- DEMO CONTROLS ----- */
function toggleDemoFullscreen(demoContainer) {
    if (!document.fullscreenElement) {
        demoContainer.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

function reloadDemo(demoFrame) {
    demoFrame.src = demoFrame.src;
}

// ScrollReveal animation for project boxes
sr.reveal('.project-box', { interval: 200 });

// Social Media Links
const socialLinks = {
    github: 'https://github.com/ji24077',
    linkedin: 'https://www.linkedin.com/in/ji-sung-han-200074304/',
    email: 'mailto:yhs24077@gmail.com'
};

// Social Icons Click Handler
document.querySelectorAll('.featured-box .social_icons .icon').forEach((icon, index) => {
    icon.addEventListener('click', () => {
        const links = Object.values(socialLinks);
        window.open(links[index], '_blank');
    });
});

// Smooth Scroll for "View Projects" button
document.querySelector('.featured-text-btn .blue-btn').addEventListener('click', () => {
    document.querySelector('#projects').scrollIntoView({
        behavior: 'smooth'
    });
});

// Smooth Scroll for Scroll Down button
document.querySelector('.scroll-btn').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('#about').scrollIntoView({
        behavior: 'smooth'
    });
});
