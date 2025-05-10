// Mobile menu toggle
document.getElementById('mobile-menu-button').addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.toggle('hidden');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollTop = 0;
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        // Close mobile menu if open
        document.getElementById('mobile-menu').classList.add('hidden');
        
        // Update active state
        document.querySelectorAll('nav a').forEach(link => {
            link.classList.remove('active');
        });
        this.classList.add('active');
    });
});

// Update active menu item on scroll
window.addEventListener('scroll', function() {
    let scrollPosition = window.scrollY;
    
    // Get all sections
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('nav a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Sample pool stats data (replace with real API calls in production)
const updatePoolStats = () => {
    document.getElementById('blockCount').textContent = '1,234';
    document.getElementById('delegatedAda').textContent = '5.2M ADA';
    document.getElementById('delegators').textContent = '742';
};

// FAQ data
const faqData = [
    {
        question: "What makes YAM different from other stake pools?",
        answer: "We're the only pool that measures success by both ADA rewards AND the number of marbles you retain in the process. Plus, we speak human, not crypto-genius."
    },
    {
        question: "Do you really offer therapy?",
        answer: "No, we're terrible at therapy. But watching your ADA grow while we handle the technical stuff might be therapeutic. For actual therapy, please see a professional."
    },
    {
        question: "Will I get rich staking with YAM?",
        answer: "If we could guarantee that, we'd be on a yacht instead of running a stake pool. We promise realistic returns and plenty of dad jokes."
    },
    {
        question: "What's your technical expertise?",
        answer: "We're smart enough to run a reliable stake pool but humble enough to explain it without making your brain hurt. Think of us as your crypto-competent friends who don't show off."
    }
];

// Populate FAQ section
const faqContainer = document.getElementById('faq-container');
faqData.forEach((item, index) => {
    const faqItem = document.createElement('div');
    faqItem.className = 'bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-4';
    faqItem.innerHTML = `
        <button class="w-full px-6 py-4 text-left font-bold flex justify-between items-center text-gray-900 dark:text-gray-500 hover:text-yam-primary dark:hover:text-yam-secondary group">
            <span>${item.question}</span>
            <i class="fas fa-chevron-down transform transition-transform duration-200 text-yam-primary dark:text-yam-secondary"></i>
        </button>
        <div class="px-6 py-4 bg-gray-50 dark:bg-gray-700 hidden text-gray-900 dark:text-white">
            ${item.answer}
        </div>
    `;
    
    const button = faqItem.querySelector('button');
    const answer = faqItem.querySelector('div:last-child');
    const icon = button.querySelector('i');
    
    button.addEventListener('click', () => {
        answer.classList.toggle('hidden');
        icon.classList.toggle('rotate-180');
    });
    
    faqContainer.appendChild(faqItem);
});

// Initialize pool stats on page load
updatePoolStats();

// Add scroll-based animations for sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
    });
}, observerOptions);

// Observe all sections for scroll animations
document.querySelectorAll('section').forEach(section => {
    section.classList.add('transform', 'transition-all', 'duration-700', 'opacity-0', 'translate-y-10');
    observer.observe(section);
});
