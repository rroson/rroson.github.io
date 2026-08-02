// ===== i18n Translation System =====
const translations = {
    pt: {
        photoLabel: 'Foto',
        tagline: 'Em busca da primeira oportunidade profissional',
        objetivoTitle: 'Objetivo',
        objetivoText: 'Busco minha primeira oportunidade profissional, preferencialmente em trabalho remoto, para desenvolver minhas habilidades, adquirir experiência e contribuir com dedicação, responsabilidade e rápida aprendizagem.',
        perfilTitle: 'Perfil',
        perfilText: 'Organizado, disciplinado, excelente memória, raciocínio analítico, inglês avançado, facilidade com tecnologia e aprendizado rápido. Atualmente em preparação para vestibulares da USP e Unicamp.',
        formacaoTitle: 'Formação',
        formacaoName: 'Ensino Médio',
        formacaoStatus: 'Concluído',
        areasTitle: 'Áreas de Interesse',
        tag1: 'Assistente Administrativo',
        tag2: 'Backoffice',
        tag3: 'Customer Support',
        tag4: 'Customer Success',
        tag5: 'Assistente Virtual',
        tag6: 'Data Entry',
        tag7: 'E-commerce',
        competenciasTitle: 'Competências',
        skillIngles: 'Inglês avançado',
        skillAtendimento: 'Atendimento ao cliente',
        skillComunicacao: 'Comunicação',
        skillEquipe: 'Trabalho em equipe',
        skillSistemas: 'Facilidade com sistemas',
        skillOffice: 'Microsoft Office e Google Workspace',
        footer: '© 2025 Rafael Sabino Roson. Todos os direitos reservados.',
    },
    en: {
        photoLabel: 'Photo',
        tagline: 'Seeking my first professional opportunity',
        objetivoTitle: 'Objective',
        objetivoText: 'I am looking for my first professional opportunity, preferably remote, to develop my skills, gain experience, and contribute with dedication, responsibility, and fast learning.',
        perfilTitle: 'Profile',
        perfilText: 'Organized, disciplined, excellent memory, analytical thinking, advanced English, tech-savvy, and a fast learner. Currently preparing for USP and Unicamp entrance exams.',
        formacaoTitle: 'Education',
        formacaoName: 'High School',
        formacaoStatus: 'Completed',
        areasTitle: 'Areas of Interest',
        tag1: 'Administrative Assistant',
        tag2: 'Backoffice',
        tag3: 'Customer Support',
        tag4: 'Customer Success',
        tag5: 'Virtual Assistant',
        tag6: 'Data Entry',
        tag7: 'E-commerce',
        competenciasTitle: 'Skills',
        skillIngles: 'Advanced English',
        skillAtendimento: 'Customer Service',
        skillComunicacao: 'Communication',
        skillEquipe: 'Teamwork',
        skillSistemas: 'Tech Proficiency',
        skillOffice: 'Microsoft Office & Google Workspace',
        footer: '© 2025 Rafael Sabino Roson. All rights reserved.',
    },
};

let currentLang = 'pt';

function setLanguage(lang) {
    currentLang = lang;
    const dict = translations[lang];

    document.querySelectorAll('[data-i18n]').forEach((el) => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
            el.textContent = dict[key];
        }
    });

    // Update html lang attribute
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';

    // Update page title
    document.title =
        lang === 'pt'
            ? 'Rafael Sabino Roson – Currículo'
            : 'Rafael Sabino Roson – Resume';

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content =
            lang === 'pt'
                ? 'Currículo profissional de Rafael Sabino Roson – Assistente Administrativo, Customer Support, Data Entry e mais.'
                : 'Professional resume of Rafael Sabino Roson – Administrative Assistant, Customer Support, Data Entry and more.';
    }

    // Update toggle visual state
    const toggle = document.getElementById('lang-toggle');
    const ptOption = toggle.querySelector('[data-lang="pt"]');
    const enOption = toggle.querySelector('[data-lang="en"]');

    if (lang === 'en') {
        toggle.classList.add('active');
        ptOption.classList.remove('active');
        enOption.classList.add('active');
    } else {
        toggle.classList.remove('active');
        ptOption.classList.add('active');
        enOption.classList.remove('active');
    }
}

// ===== DOM Ready =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize language
    const ptOption = document.querySelector('.lang-option[data-lang="pt"]');
    if (ptOption) ptOption.classList.add('active');

    // Language toggle click
    const langToggle = document.getElementById('lang-toggle');
    langToggle.addEventListener('click', () => {
        const newLang = currentLang === 'pt' ? 'en' : 'pt';
        setLanguage(newLang);
    });

    // ===== Intersection Observer for card reveal animations =====
    const cards = document.querySelectorAll('.card');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    cards.forEach((card) => observer.observe(card));

    // ===== Skill ring animation on scroll =====
    const skillRings = document.querySelectorAll('.skill-ring');

    const ringObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    ringObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.3 }
    );

    skillRings.forEach((ring) => ringObserver.observe(ring));

    // ===== Smooth hover tilt on cards =====
    cards.forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -3;
            const rotateY = ((x - centerX) / centerX) * 3;

            card.style.transform = `translateY(-4px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
});
