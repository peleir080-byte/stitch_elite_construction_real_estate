/**
 * AUGIC BTP & IMMOBILIER - Client-side Interactive Scripting (Tailwind Edition)
 */

const media = window.AUGIC_MEDIA || { photos: [], videos: [] };
const REAL_SITE_PHOTOS = media.photos;
const REAL_SITE_VIDEOS = media.videos;
const encodeMediaUrl = (path) => {
    if (!path) return '';
    return path.split('/').map((part) => encodeURIComponent(part)).join('/');
};

const escAttr = (str) => String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;');

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // Vidéos en boucle — lecture continue (hero, réalisations, footer…)
    // ==========================================================================
    const initLoopVideos = () => {
        const videos = document.querySelectorAll('video[data-loop-video], video[autoplay][loop]');
        videos.forEach((video) => {
            video.muted = true;
            video.setAttribute('playsinline', '');
            video.setAttribute('webkit-playsinline', '');

            const tryPlay = () => {
                const promise = video.play();
                if (promise && typeof promise.catch === 'function') {
                    promise.catch(() => {});
                }
            };

            tryPlay();
            video.addEventListener('loadeddata', tryPlay, { once: true });
            video.addEventListener('canplay', tryPlay, { once: true });
            video.addEventListener('ended', () => {
                video.currentTime = 0;
                tryPlay();
            });

            document.addEventListener('visibilitychange', () => {
                if (!document.hidden && video.paused) tryPlay();
            });

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && video.paused) tryPlay();
                });
            }, { threshold: 0.15 });
            observer.observe(video);
        });
    };
    initLoopVideos();

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
            image: 'photo/14.jpeg',
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
            image: 'photo/43.jpeg',
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
            image: 'photo/23.jpeg',
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
            image: 'photo/20.jpeg',
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
            image: 'photo/42.jpeg',
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

    // ==========================================================================
    // 9. Carrousels premium (accueil, à propos, galerie)
    // ==========================================================================
    const initAugicCarousel = (root) => {
        const stage = root.querySelector('.augic-carousel__stage');
        if (!stage) return;

        const slides = [...stage.querySelectorAll('.augic-carousel__slide')];
        if (slides.length === 0) return;

        const tagEl = root.querySelector('.augic-carousel__tag');
        const labelEl = root.querySelector('.augic-carousel__label');
        const progressBar = root.querySelector('.augic-carousel__progress span');
        const dotsWrap = root.querySelector('.augic-carousel__dots');
        const prevBtn = root.querySelector('.augic-carousel__arrow--prev');
        const nextBtn = root.querySelector('.augic-carousel__arrow--next');
        const autoplay = root.getAttribute('data-autoplay') !== 'false';

        let currentIdx = 0;
        let slideTimeout = null;
        let progressInterval = null;
        let slideStart = 0;
        let slideDuration = 6000;

        if (dotsWrap) {
            dotsWrap.innerHTML = slides.map((_, i) =>
                `<button type="button" class="augic-carousel__dot${i === 0 ? ' is-active' : ''}" data-index="${i}" aria-label="Slide ${i + 1}" role="tab"></button>`
            ).join('');
        }

        slides.forEach((slide) => {
            const video = slide.querySelector('video');
            if (!video) return;
            video.muted = true;
            video.loop = true;
            video.setAttribute('playsinline', '');
            video.setAttribute('webkit-playsinline', '');
            video.preload = 'auto';
        });

        const playCarouselVideo = (video) => {
            if (!video) return;
            video.muted = true;
            video.loop = true;
            const promise = video.play();
            if (promise && typeof promise.catch === 'function') {
                promise.catch(() => {});
            }
        };

        const clearTimers = () => {
            clearTimeout(slideTimeout);
            clearInterval(progressInterval);
            slideTimeout = null;
            progressInterval = null;
        };

        const updateProgress = () => {
            if (!progressBar) return;
            const elapsed = Date.now() - slideStart;
            const pct = Math.min(100, (elapsed / slideDuration) * 100);
            progressBar.style.width = `${pct}%`;
        };

        const scheduleNext = (duration) => {
            slideDuration = duration;
            slideStart = Date.now();
            if (progressBar) progressBar.style.width = '0%';
            clearInterval(progressInterval);
            progressInterval = setInterval(updateProgress, 80);
            clearTimeout(slideTimeout);
            slideTimeout = setTimeout(() => goTo((currentIdx + 1) % slides.length), duration);
        };

        const goTo = (index) => {
            clearTimers();

            const prevSlide = slides[currentIdx];
            if (prevSlide) {
                const prevVideo = prevSlide.querySelector('video');
                if (prevVideo) {
                    prevVideo.pause();
                    prevVideo.currentTime = 0;
                }
                prevSlide.classList.remove('is-active');
            }

            currentIdx = index;
            const activeSlide = slides[currentIdx];
            slides.forEach((s) => s.classList.remove('is-active'));
            activeSlide.classList.add('is-active');

            if (tagEl) tagEl.textContent = activeSlide.getAttribute('data-tag') || '';
            if (labelEl) labelEl.textContent = activeSlide.getAttribute('data-label') || '';

            dotsWrap?.querySelectorAll('.augic-carousel__dot').forEach((dot, i) => {
                dot.classList.toggle('is-active', i === currentIdx);
            });

            const slideType = activeSlide.getAttribute('data-type');
            const customDuration = parseInt(activeSlide.getAttribute('data-duration'), 10) || 6000;

            if (slideType === 'video') {
                const video = activeSlide.querySelector('video');
                if (video) {
                    playCarouselVideo(video);
                    if (autoplay) scheduleNext(customDuration || 14000);
                } else if (autoplay) {
                    scheduleNext(5000);
                }
            } else if (autoplay) {
                scheduleNext(customDuration);
            }

            const nextIdx = (currentIdx + 1) % slides.length;
            const nextVideo = slides[nextIdx]?.querySelector('video');
            if (nextVideo && nextVideo.readyState < 2) nextVideo.load();
        };

        prevBtn?.addEventListener('click', () => {
            goTo((currentIdx - 1 + slides.length) % slides.length);
        });
        nextBtn?.addEventListener('click', () => {
            goTo((currentIdx + 1) % slides.length);
        });
        dotsWrap?.addEventListener('click', (e) => {
            const dot = e.target.closest('.augic-carousel__dot');
            if (!dot) return;
            goTo(parseInt(dot.getAttribute('data-index'), 10));
        });

        goTo(0);
    };

    document.querySelectorAll('.augic-carousel').forEach((carousel) => {
        if (carousel.id !== 'aboutGalleryPreview') {
            initAugicCarousel(carousel);
        }
    });

    // ==========================================================================
    // 10. Compteur médiathèque (À Propos / galerie)
    // ==========================================================================
    const mediaCountEl = document.getElementById('mediaCountSummary');
    if (mediaCountEl) {
        mediaCountEl.textContent = `${REAL_SITE_PHOTOS.length} photos · ${REAL_SITE_VIDEOS.length} vidéos`;
    }

    // ==========================================================================
    // 12. Médiathèque style Photos (galerie.html) — visionneuse + filmstrip
    // ==========================================================================
    const initWinGallery = () => {
        const viewer = document.getElementById('winGalleryViewer');
        const filmstrip = document.getElementById('winGalleryFilmstrip');
        const counterEl = document.getElementById('winGalleryCounter');
        const titleEl = document.getElementById('winGalleryTitle');
        const prevBtn = document.getElementById('winGalleryPrev');
        const nextBtn = document.getElementById('winGalleryNext');
        if (!viewer || !filmstrip) return;

        const photoItems = REAL_SITE_PHOTOS.map((p) => ({ ...p, type: 'image', label: p.alt }));
        const videoItems = REAL_SITE_VIDEOS.map((v) => ({ ...v, type: 'video', label: v.title }));
        let allItems = [...videoItems, ...photoItems];
        let items = [...allItems];
        let current = 0;

        const pauseViewerMedia = () => {
            const vid = viewer.querySelector('video');
            if (vid) { vid.pause(); }
        };

        const renderViewer = (index) => {
            if (!items.length) {
                viewer.innerHTML = '<p class="win-gallery-placeholder">Aucun média dans cette collection.</p>';
                return;
            }
            current = (index + items.length) % items.length;
            const item = items[current];
            const src = encodeMediaUrl(item.src);
            const label = escAttr(item.label || item.alt || item.title);

            pauseViewerMedia();
            if (item.type === 'video') {
                viewer.innerHTML = `<video class="gallery-media-sharp win-gallery-viewer__media" controls playsinline preload="metadata" autoplay><source src="${src}" type="video/mp4"></video>`;
            } else {
                viewer.innerHTML = `<img src="${src}" alt="${label}" class="gallery-media-sharp win-gallery-viewer__media">`;
            }

            if (titleEl) titleEl.textContent = item.label || item.alt || item.title || '';
            if (counterEl) counterEl.textContent = `${current + 1} / ${items.length}`;

            filmstrip.querySelectorAll('.win-gallery-thumb').forEach((thumb, i) => {
                thumb.classList.toggle('is-active', i === current);
                if (i === current) thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            });
        };

        const renderFilmstrip = () => {
            filmstrip.innerHTML = items.map((item, i) => {
                const src = encodeMediaUrl(item.src);
                const isVideo = item.type === 'video';
                const inner = isVideo
                    ? `<video muted playsinline preload="metadata" class="win-gallery-thumb__media"><source src="${src}" type="video/mp4"></video><span class="win-gallery-thumb__badge material-symbols-outlined">play_circle</span>`
                    : `<img src="${src}" alt="" loading="lazy" class="win-gallery-thumb__media">`;
                return `<button type="button" class="win-gallery-thumb${i === current ? ' is-active' : ''}" data-index="${i}" aria-label="Média ${i + 1}">${inner}</button>`;
            }).join('');

            filmstrip.querySelectorAll('.win-gallery-thumb').forEach((thumb) => {
                thumb.addEventListener('click', () => renderViewer(parseInt(thumb.dataset.index, 10)));
            });
        };

        const applyFilter = (filter) => {
            pauseViewerMedia();
            if (filter === 'photos') items = [...photoItems];
            else if (filter === 'videos') items = [...videoItems];
            else items = [...allItems];
            current = 0;
            renderFilmstrip();
            renderViewer(0);
        };

        if (prevBtn) prevBtn.addEventListener('click', () => renderViewer(current - 1));
        if (nextBtn) nextBtn.addEventListener('click', () => renderViewer(current + 1));

        document.addEventListener('keydown', (e) => {
            if (!document.getElementById('winGalleryViewer')) return;
            if (e.key === 'ArrowLeft') renderViewer(current - 1);
            if (e.key === 'ArrowRight') renderViewer(current + 1);
        });

        document.querySelectorAll('.win-gallery-filters [data-gallery-filter]').forEach((btn) => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.win-gallery-filters [data-gallery-filter]').forEach((b) => b.classList.remove('is-active'));
                btn.classList.add('is-active');
                applyFilter(btn.getAttribute('data-gallery-filter'));
            });
        });

        renderFilmstrip();
        renderViewer(0);
    };

    initWinGallery();

    // ==========================================================================
    // 13. Sous-navigation Services (scroll spy)
    // ==========================================================================
    const svcSubnav = document.getElementById('svcSubnav');
    if (svcSubnav) {
        const links = [...svcSubnav.querySelectorAll('a[href^="#"]')];
        const sections = links
            .map((a) => document.querySelector(a.getAttribute('href')))
            .filter(Boolean);

        const setActive = (id) => {
            links.forEach((link) => {
                link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
            });
        };

        const spy = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) setActive(entry.target.id);
            });
        }, { rootMargin: '-40% 0px -45% 0px', threshold: 0 });

        sections.forEach((section) => spy.observe(section));
    }

    // ==========================================================================
    // 14. Aperçu médiathèque (a-propos.html)
    // ==========================================================================
    const aboutPreview = document.getElementById('aboutGalleryPreview');
    if (aboutPreview) {
        const previewPhotos = [
            { src: 'photo/43.jpeg', tag: 'Voiries', label: 'Compactage de plateformes routières' },
            { src: 'photo/13.jpeg', tag: 'Industriel', label: 'Dallage de halls — coulage de nuit' },
            { src: 'photo/23.jpeg', tag: 'Structures', label: 'Ouvrages béton armé complexes' },
            { src: 'photo/42.jpeg', tag: 'Logistique', label: 'Flotte d\'engins et camions AUGIC' },
            { src: 'photo/20.jpeg', tag: 'Préfabrication', label: 'Anneaux et éléments béton' },
            { src: 'photo/40.jpeg', tag: 'Transport', label: 'Semi-remorques et levage lourd' },
        ];
        aboutPreview.innerHTML = `
            <div class="augic-carousel__stage">
                ${previewPhotos.map((p) => `
                    <div class="augic-carousel__slide" data-type="image" data-duration="4500" data-tag="${escAttr(p.tag)}" data-label="${escAttr(p.label)}">
                        <div class="augic-carousel__media">
                            <img src="${encodeMediaUrl(p.src)}" alt="${escAttr(p.label)}" loading="lazy"/>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="augic-carousel__chrome">
                <div class="augic-carousel__caption">
                    <span class="augic-carousel__tag"></span>
                    <span class="augic-carousel__label"></span>
                </div>
                <div class="augic-carousel__progress" aria-hidden="true"><span></span></div>
                <div class="augic-carousel__controls">
                    <button type="button" class="augic-carousel__arrow augic-carousel__arrow--prev" aria-label="Photo précédente">
                        <span class="material-symbols-outlined">chevron_left</span>
                    </button>
                    <div class="augic-carousel__dots" role="tablist"></div>
                    <button type="button" class="augic-carousel__arrow augic-carousel__arrow--next" aria-label="Photo suivante">
                        <span class="material-symbols-outlined">chevron_right</span>
                    </button>
                </div>
            </div>
            <a href="galerie.html" class="absolute top-3 right-3 z-20 inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-secondary text-primary hover:brightness-110 transition-all shadow-lg">
                Tout voir <span class="material-symbols-outlined !text-sm">arrow_forward</span>
            </a>
        `;
        initAugicCarousel(aboutPreview);
    }
});

