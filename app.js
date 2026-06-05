/**
 * AUGIC BTP & IMMOBILIER - Client-side Interactive Scripting (Tailwind Edition)
 */

document.addEventListener('DOMContentLoaded', () => {

    const siteHeader = document.getElementById('siteHeader');
    if (siteHeader) {
        const onScroll = () => siteHeader.classList.toggle('is-scrolled', window.scrollY > 20);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    // ==========================================================================
    // 1. Mobile Menu Drawer Navigation
    // ==========================================================================
    const menuToggle = document.getElementById('menuToggle');
    const menuClose = document.getElementById('menuClose');
    const mobileNav = document.getElementById('mobileNav');
    const mobileNavContent = mobileNav ? mobileNav.querySelector('.transform') : null;

    const openMenu = () => {
        if (!mobileNav || !mobileNavContent) return;
        mobileNav.classList.remove('pointer-events-none', 'opacity-0');
        mobileNav.classList.add('opacity-100');
        mobileNavContent.classList.remove('translate-x-full');
        mobileNavContent.classList.add('translate-x-0');
        document.body.classList.add('overflow-hidden');
    };

    const closeMenu = () => {
        if (!mobileNav || !mobileNavContent) return;
        mobileNavContent.classList.remove('translate-x-0');
        mobileNavContent.classList.add('translate-x-full');
        mobileNav.classList.remove('opacity-100');
        mobileNav.classList.add('opacity-0', 'pointer-events-none');
        document.body.classList.remove('overflow-hidden');
    };

    if (menuToggle) menuToggle.addEventListener('click', openMenu);
    if (menuClose) menuClose.addEventListener('click', closeMenu);
    if (mobileNav) {
        mobileNav.addEventListener('click', (e) => {
            if (e.target === mobileNav) closeMenu();
        });
    }

    // ==========================================================================
    // 2. Scroll Reveal Animations (Intersection Observer)
    // ==========================================================================
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // ==========================================================================
    // 3. FAQ Accordion (services.html)
    // ==========================================================================
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        const transitionContainer = item.querySelector('.faq-grid-transition');
        const arrowIcon = item.querySelector('.faq-arrow');
        
        if (header && transitionContainer) {
            header.addEventListener('click', () => {
                const isOpen = transitionContainer.classList.contains('open');
                
                // Close other items
                faqItems.forEach(otherItem => {
                    const otherContainer = otherItem.querySelector('.faq-grid-transition');
                    const otherArrow = otherItem.querySelector('.faq-arrow');
                    const otherHeader = otherItem.querySelector('.faq-header');
                    if (otherContainer && otherContainer !== transitionContainer) {
                        otherContainer.classList.remove('open');
                        if (otherArrow) otherArrow.style.transform = 'rotate(0deg)';
                        if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
                    }
                });

                // Toggle this item
                if (isOpen) {
                    transitionContainer.classList.remove('open');
                    if (arrowIcon) arrowIcon.style.transform = 'rotate(0deg)';
                    header.setAttribute('aria-expanded', 'false');
                } else {
                    transitionContainer.classList.add('open');
                    if (arrowIcon) arrowIcon.style.transform = 'rotate(180deg)';
                    header.setAttribute('aria-expanded', 'true');
                }
            });
        }
    });

    // ==========================================================================
    // 4. Project Database & Modal Details (projets.html)
    // ==========================================================================
    const projectsData = {
        'villa-horizon': {
            title: 'Hall Industriel — Dallage béton',
            category: 'Bâtiment / Industriel',
            image: 'assets/images/real/chantier-industriel.jpg',
            desc1: 'Réalisation du dallage béton armé d\'un hall industriel sous structure métallique. Coulage, nivellement et finition de plus de 1 200 m² de plateforme en conditions de chantier actif.',
            desc2: 'Coordination des équipes de coffrage, ferraillage et pompage béton avec respect des délais et contrôle qualité à chaque phase de cure.',
            client: 'Industriel privé',
            location: 'Togo',
            duration: '8 mois (Livré en 2025)',
            status: 'Livré'
        },
        'autoroute-est': {
            title: 'Compactage plateforme voirie',
            category: 'Routes & Voiries',
            image: 'assets/images/real/compactage-voirie.jpg',
            desc1: 'Terrassement et compactage de plateforme routière avec rouleau compresseur. Préparation du sol de fondation pour voirie et ouvrages de drainage en zone tropicale.',
            desc2: 'Suivi des taux de compactage, contrôle des couches de remblai et coordination des engins de terrassement sur l\'ensemble du linéaire.',
            client: 'Collectivité / État',
            location: 'Togo',
            duration: '12 mois (Livré en 2024)',
            status: 'Livré'
        },
        'onyx-tower': {
            title: 'Ouvrage béton armé — Structure courbe',
            category: 'Génie civil / Ouvrage',
            image: 'assets/images/real/structure-beton.jpg',
            desc1: 'Construction d\'un ouvrage en béton armé avec structure courbe : ferraillage dense, coffrage bois et coulage progressif sous supervision d\'ingénieurs sur site.',
            desc2: 'Maîtrise des phases de mise en place du ferraillage, du bétonnage et du décoffrage dans un environnement de chantier exigeant.',
            client: 'Maître d\'ouvrage public',
            location: 'Togo',
            duration: '14 mois (En cours)',
            status: 'En cours'
        },
        'pont-lagune': {
            title: 'Préfabrication — Anneaux béton',
            category: 'Génie Civil / Infrastructure',
            image: 'assets/images/real/genie-civil.jpg',
            desc1: 'Fabrication sur site d\'anneaux en béton préfabriqué pour ouvrages d\'assainissement et infrastructures hydrauliques. Mise en œuvre des moules, ferraillage et coulage en série.',
            desc2: 'Organisation de la zone de préfabrication, gestion des matériaux (ciment, granulats) et contrôle dimensionnel des pièces avant pose.',
            client: 'Projet infrastructure',
            location: 'Togo',
            duration: '10 mois (Livré en 2024)',
            status: 'Livré'
        },
        'prestige-marina': {
            title: 'Parc engins & logistique lourde',
            category: 'Équipements / Logistique',
            image: 'assets/images/real/engins-btp.jpg',
            desc1: 'Mobilisation de notre parc d\'engins de terrassement (bulldozers Liugong, niveleuses, camions bennes) pour grands travaux de plateforme et déblaiement.',
            desc2: 'Gestion logistique des flux matériaux, maintenance des engins et sécurité des opérateurs sur site industriel.',
            client: 'AUGIC — Parc interne',
            location: 'Togo',
            duration: 'Permanent',
            status: 'En cours'
        }
    };

    const modal = document.getElementById('projectModal');
    const modalContentCard = modal ? modal.querySelector('.transform') : null;
    
    const openProjectModal = (projectId) => {
        const data = projectsData[projectId];
        if (!data || !modal || !modalContentCard) return;
        
        document.getElementById('modalImg').src = data.image;
        document.getElementById('modalImg').alt = data.title;
        document.getElementById('modalCat').innerText = data.category;
        document.getElementById('modalTitle').innerText = data.title;
        document.getElementById('modalDesc1').innerText = data.desc1;
        document.getElementById('modalDesc2').innerText = data.desc2;
        document.getElementById('modalClient').innerText = data.client;
        document.getElementById('modalLoc').innerText = data.location;
        document.getElementById('modalDuration').innerText = data.duration;
        document.getElementById('modalStatus').innerText = data.status;

        modal.classList.remove('hidden');
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modalContentCard.classList.remove('scale-95');
            modalContentCard.classList.add('scale-100');
        }, 10);
        document.body.classList.add('overflow-hidden');
    };

    const closeProjectModal = () => {
        if (!modal || !modalContentCard) return;
        modalContentCard.classList.remove('scale-100');
        modalContentCard.classList.add('scale-95');
        modal.classList.add('opacity-0');
        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }, 300);
    };

    // Attach project card click events
    const projectCards = document.querySelectorAll('[data-project-trigger]');
    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = card.getAttribute('data-project-trigger');
            openProjectModal(projectId);
        });
    });

    const modalCloseBtn = document.getElementById('modalClose');
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
    const modalBackdrop = document.getElementById('modalBackdrop');
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeProjectModal);

    // Deep link directly to modal if query param is set
    const urlParams = new URLSearchParams(window.location.search);
    const projectParam = urlParams.get('project');
    if (projectParam && projectsData[projectParam]) {
        openProjectModal(projectParam);
    }

    // ==========================================================================
    // 5. Category Filtering (projets.html)
    // ==========================================================================
    const filterButtons = document.querySelectorAll('[data-filter]');
    const projectItems = document.querySelectorAll('[data-category]');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.getAttribute('data-filter');
            
            // Toggle active state
            filterButtons.forEach(b => {
                b.classList.remove('bg-primary', 'text-white');
                b.classList.add('border', 'border-outline-variant', 'text-on-surface-variant', 'hover:bg-surface-container-low');
            });
            btn.classList.add('bg-primary', 'text-white');
            btn.classList.remove('border', 'border-outline-variant', 'text-on-surface-variant', 'hover:bg-surface-container-low');

            // Filter items
            projectItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // ==========================================================================
    // 6. Real Estate Filtering & Inquiry prefilling (immobilier.html)
    // ==========================================================================
    const filterCity = document.getElementById('filterCity');
    const filterPrice = document.getElementById('filterPrice');
    const filterRooms = document.getElementById('filterRooms');
    const resetFilters = document.getElementById('resetFilters');
    const estateCards = document.querySelectorAll('.estate-card');
    const noResults = document.getElementById('noResults');

    const applyEstateFilters = () => {
        const cityVal = filterCity ? filterCity.value : 'all';
        const priceVal = filterPrice ? filterPrice.value : 'all';
        const roomsVal = filterRooms ? filterRooms.value : 'all';
        let count = 0;

        estateCards.forEach(card => {
            const city = card.getAttribute('data-city');
            const price = parseInt(card.getAttribute('data-price'));
            const rooms = parseInt(card.getAttribute('data-rooms'));

            let cityMatch = (cityVal === 'all' || city === cityVal);
            
            let priceMatch = true;
            if (priceVal === '400') priceMatch = (price < 400);
            else if (priceVal === '600') priceMatch = (price >= 400 && price <= 600);
            else if (priceVal === '900') priceMatch = (price > 600);

            let roomsMatch = true;
            if (roomsVal === '3') roomsMatch = (rooms === 3);
            else if (roomsVal === '4') roomsMatch = (rooms === 4);
            else if (roomsVal === '5') roomsMatch = (rooms >= 5);

            if (cityMatch && priceMatch && roomsMatch) {
                card.classList.remove('hidden');
                count++;
            } else {
                card.classList.add('hidden');
            }
        });

        if (noResults) {
            if (count === 0) noResults.style.display = 'block';
            else noResults.style.display = 'none';
        }
    };

    if (filterCity) filterCity.addEventListener('change', applyEstateFilters);
    if (filterPrice) filterPrice.addEventListener('change', applyEstateFilters);
    if (filterRooms) filterRooms.addEventListener('change', applyEstateFilters);

    if (resetFilters) {
        resetFilters.addEventListener('click', () => {
            if (filterCity) filterCity.value = 'all';
            if (filterPrice) filterPrice.value = 'all';
            if (filterRooms) filterRooms.value = 'all';
            applyEstateFilters();
        });
    }

    // Pre-fill visit inquiry from villa card
    const inquiryBtns = document.querySelectorAll('[data-inquiry-trigger]');
    const inquiryFormInput = document.getElementById('inquiryProperty');
    const visiteSection = document.getElementById('visiteSection');

    inquiryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const villaName = btn.getAttribute('data-inquiry-trigger');
            if (inquiryFormInput) {
                inquiryFormInput.value = villaName;
            }
            if (visiteSection) {
                visiteSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Deep link for real estate ID pre-selection
    const estateIdParam = urlParams.get('id');
    if (estateIdParam) {
        const matchingCard = document.querySelector(`[data-id="${estateIdParam}"]`);
        if (matchingCard) {
            const villaName = matchingCard.querySelector('h3').innerText;
            if (inquiryFormInput) inquiryFormInput.value = villaName;
            
            // Also focus filters if requested or scroll to form
            setTimeout(() => {
                matchingCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        }
    }

    // ==========================================================================
    // 7. Form Submissions Alerts
    // ==========================================================================
    const forms = ['contactForm', 'inquiryForm', 'footerContactForm'];
    forms.forEach(formId => {
        const formEl = document.getElementById(formId);
        if (formEl) {
            formEl.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Votre demande a bien été reçue. Un conseiller AUGIC prendra contact avec vous dans les plus brefs délais.');
                formEl.reset();
            });
        }
    });

    // ==========================================================================
    // 8. Statistics Counter Animation
    // ==========================================================================
    const counters = document.querySelectorAll('.counter-value');
    if (counters.length > 0) {
        const runCounter = (counter) => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // 2 seconds
            const stepTime = 15;
            const steps = duration / stepTime;
            const increment = target / steps;
            let current = 0;
            
            const step = () => {
                current += increment;
                if (current >= target) {
                    counter.innerText = target;
                } else {
                    counter.innerText = Math.floor(current);
                    setTimeout(step, stepTime);
                }
            };
            step();
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    runCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
});

