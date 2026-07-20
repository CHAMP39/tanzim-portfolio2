// ---- Mobile nav toggle ----
const menuBtn = document.querySelector('.menu-toggle');
const body = document.body;
if (menuBtn){
  menuBtn.addEventListener('click', () => {
    body.classList.toggle('nav-open');
  });
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => body.classList.remove('nav-open'));
  });
}

// ---- Scroll-spy: highlight active nav link ----
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const setActive = () => {
  let current = '';
  const scrollPos = window.scrollY + 120;
  sections.forEach(sec => {
    if (scrollPos >= sec.offsetTop) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
};
window.addEventListener('scroll', setActive);
setActive();

// ---- Back to top button ----
const backToTop = document.querySelector('.back-to-top');
if (backToTop){
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('show', window.scrollY > 600);
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ---- Footer year ----
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---- Lightbox for project figures ----
const lightbox = document.querySelector('.lightbox');
if (lightbox){
  const lbImg = lightbox.querySelector('img');
  const lbCap = lightbox.querySelector('.lb-cap');
  document.querySelectorAll('[data-lightbox]').forEach(el => {
    el.addEventListener('click', () => {
      lbImg.src = el.getAttribute('data-lightbox');
      lbCap.textContent = el.getAttribute('data-caption') || '';
      lightbox.classList.add('open');
    });
  });
  lightbox.addEventListener('click', () => lightbox.classList.remove('open'));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') lightbox.classList.remove('open');
  });
}

// ---- Animate AHP weight bars on scroll into view ----
const weightBars = document.querySelectorAll('.weight-bar-fill');
if (weightBars.length){
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.style.width = entry.target.dataset.width;
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  weightBars.forEach(bar => {
    bar.dataset.width = bar.style.width;
    bar.style.width = '0%';
    obs.observe(bar);
  });
}
/* =========================================================
   LALMAI MASTER PLAN — CASE STUDY INTERACTIONS
   APPEND-ONLY JAVASCRIPT
   ========================================================= */

(() => {
  'use strict';

  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  /* -------------------------------------------------------
     Smooth section reveals
     ------------------------------------------------------- */

  const revealElements = document.querySelectorAll('.lm-reveal');

  if (revealElements.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealElements.forEach((element) => {
        element.classList.add('is-visible');
      });
    } else {
      const revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          });
        },
        {
          threshold: 0.08,
          rootMargin: '0px 0px -8% 0px'
        }
      );

      revealElements.forEach((element) => {
        revealObserver.observe(element);
      });
    }
  }

  /* -------------------------------------------------------
     Animated stat counters
     ------------------------------------------------------- */

  const counters = document.querySelectorAll('[data-counter]');

  const formatCounterValue = (value, decimals) => {
    return Number(value).toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  };

  const animateCounter = (element) => {
    const target = Number(element.dataset.counter);
    const decimals = Number(element.dataset.decimals || 0);
    const prefix = element.dataset.prefix || '';
    const suffix = element.dataset.suffix || '';

    if (!Number.isFinite(target)) return;

    if (reduceMotion) {
      element.textContent =
        prefix + formatCounterValue(target, decimals) + suffix;
      return;
    }

    const duration = 1500;
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentValue = target * eased;

      element.textContent =
        prefix + formatCounterValue(currentValue, decimals) + suffix;

      if (progress < 1) {
        window.requestAnimationFrame(update);
      }
    };

    window.requestAnimationFrame(update);
  };

  if (counters.length) {
    if (!('IntersectionObserver' in window)) {
      counters.forEach(animateCounter);
    } else {
      const counterObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            animateCounter(entry.target);
            observer.unobserve(entry.target);
          });
        },
        {
          threshold: 0.45
        }
      );

      counters.forEach((counter) => {
        counterObserver.observe(counter);
      });
    }
  }

  /* -------------------------------------------------------
     Urban / rural interactive comparison
     ------------------------------------------------------- */

  const urbanRuralChart = document.getElementById('urbanRuralBars');
  const urbanRuralButtons = document.querySelectorAll(
    '[data-urban-rural-metric]'
  );

  const urbanRuralData = {
    area: {
      label: 'Area',
      unit: 'km²',
      values: [
        { name: 'Urban area', value: 7.166457 },
        { name: 'Rural area', value: 112.505178 }
      ]
    },
    population: {
      label: 'Population',
      unit: 'people',
      values: [
        { name: 'Urban area', value: 24516 },
        { name: 'Rural area', value: 194890 }
      ]
    },
    density: {
      label: 'Density',
      unit: 'people / km²',
      values: [
        { name: 'Urban area', value: 3421 },
        { name: 'Rural area', value: 1732 }
      ]
    },
    ppa: {
      label: 'Density',
      unit: 'people / acre',
      values: [
        { name: 'Urban area', value: 6 },
        { name: 'Rural area', value: 3 }
      ]
    }
  };

  const formatCompact = (value, unit) => {
    const formatted = Number(value).toLocaleString('en-US', {
      maximumFractionDigits: value < 10 ? 2 : 0
    });

    return `${formatted} ${unit}`;
  };

  const renderUrbanRuralChart = (metricKey) => {
    if (!urbanRuralChart) return;

    const metric = urbanRuralData[metricKey];
    const maximum = Math.max(...metric.values.map((item) => item.value));

    urbanRuralChart.innerHTML = metric.values.map((item) => {
      const width = maximum ? (item.value / maximum) * 100 : 0;

      return `
        <div class="lm-comparison-item">
          <div class="lm-comparison-meta">
            <span>${item.name}</span>
            <strong>${formatCompact(item.value, metric.unit)}</strong>
          </div>

          <div class="lm-comparison-track">
            <div
              class="lm-comparison-fill"
              style="width:${reduceMotion ? width : 0}%"
              data-width="${width}"
            ></div>
          </div>
        </div>
      `;
    }).join('');

    if (!reduceMotion) {
      window.requestAnimationFrame(() => {
        urbanRuralChart
          .querySelectorAll('.lm-comparison-fill')
          .forEach((bar) => {
            bar.style.width = `${bar.dataset.width}%`;
          });
      });
    }
  };

  if (urbanRuralChart && urbanRuralButtons.length) {
    urbanRuralButtons.forEach((button) => {
      button.addEventListener('click', () => {
        urbanRuralButtons.forEach((otherButton) => {
          otherButton.setAttribute('aria-pressed', 'false');
        });

        button.setAttribute('aria-pressed', 'true');
        renderUrbanRuralChart(button.dataset.urbanRuralMetric);
      });
    });

    renderUrbanRuralChart('area');
  }

  /* -------------------------------------------------------
     Land-use comparison chart
     ------------------------------------------------------- */

  const landuseChart = document.getElementById('landuseChart');
  const landuseButtons = document.querySelectorAll('[data-landuse-mode]');

  const landuseData = [
    { name: 'Administrative', urban: 0.66, rural: 0.05 },
    { name: 'Agriculture', urban: 25.89, rural: 57.88 },
    { name: 'Commercial', urban: 4.09, rural: 0.46 },
    { name: 'Education', urban: 1.34, rural: 0.28 },
    { name: 'Graveyard', urban: 0.18, rural: 0.16 },
    { name: 'Health', urban: 0.12, rural: 0.01 },
    { name: 'Industrial', urban: 1.93, rural: 0.43 },
    { name: 'Miscellaneous', urban: 0.00, rural: 0.01 },
    { name: 'Mixed use', urban: 0.18, rural: 0.01 },
    { name: 'Open space', urban: 0.00, rural: 0.03 },
    { name: 'Place of worship', urban: 0.63, rural: 0.30 },
    { name: 'Recreational', urban: 0.01, rural: 0.01 },
    { name: 'Residential', urban: 45.78, rural: 28.41 },
    { name: 'Transport', urban: 3.14, rural: 1.60 },
    { name: 'Waterbody', urban: 16.04, rural: 10.37 }
  ];

  const renderLanduseChart = (mode = 'compare') => {
    if (!landuseChart) return;

    const maximum = Math.max(
      ...landuseData.flatMap((item) => [item.urban, item.rural])
    );

    landuseChart.innerHTML = landuseData.map((item) => {
      const urbanWidth = (item.urban / maximum) * 100;
      const ruralWidth = (item.rural / maximum) * 100;

      const showUrban = mode === 'compare' || mode === 'urban';
      const showRural = mode === 'compare' || mode === 'rural';

      let valueLabel = '';

      if (mode === 'urban') {
        valueLabel = `${item.urban.toFixed(2)}%`;
      } else if (mode === 'rural') {
        valueLabel = `${item.rural.toFixed(2)}%`;
      } else {
        valueLabel = `${item.urban.toFixed(2)} / ${item.rural.toFixed(2)}`;
      }

      return `
        <div class="lm-landuse-row">
          <span class="lm-landuse-label">${item.name}</span>

          <div class="lm-landuse-bars">
            ${
              showUrban
                ? `
                  <div class="lm-landuse-track" title="Urban: ${item.urban}%">
                    <div
                      class="lm-landuse-fill lm-landuse-fill--urban"
                      data-width="${urbanWidth}"
                      style="width:${reduceMotion ? urbanWidth : 0}%"
                    ></div>
                  </div>
                `
                : ''
            }

            ${
              showRural
                ? `
                  <div class="lm-landuse-track" title="Rural: ${item.rural}%">
                    <div
                      class="lm-landuse-fill lm-landuse-fill--rural"
                      data-width="${ruralWidth}"
                      style="width:${reduceMotion ? ruralWidth : 0}%"
                    ></div>
                  </div>
                `
                : ''
            }
          </div>

          <span class="lm-landuse-value">${valueLabel}</span>
        </div>
      `;
    }).join('');

    if (!reduceMotion) {
      window.requestAnimationFrame(() => {
        landuseChart
          .querySelectorAll('.lm-landuse-fill')
          .forEach((bar) => {
            bar.style.width = `${bar.dataset.width}%`;
          });
      });
    }
  };

  if (landuseChart && landuseButtons.length) {
    landuseButtons.forEach((button) => {
      button.addEventListener('click', () => {
        landuseButtons.forEach((otherButton) => {
          otherButton.setAttribute('aria-pressed', 'false');
        });

        button.setAttribute('aria-pressed', 'true');
        renderLanduseChart(button.dataset.landuseMode);
      });
    });

    renderLanduseChart('compare');
  }

  /* -------------------------------------------------------
     Agriculture dynamics infographic
     ------------------------------------------------------- */

  const agricultureSelect = document.getElementById('agricultureUnion');
  const agricultureSummary = document.getElementById('agricultureSummary');

  const agricultureData = [
    {
      union: '1 No. Bagmara North',
      acres: 2238.71,
      triple: 68.22,
      double: 29.68
    },
    {
      union: '2 No. Bagmara South',
      acres: 1676.75,
      triple: 82.62,
      double: 13.25
    },
    {
      union: '3 No. Bhuloin North',
      acres: 1674.21,
      triple: 72.75,
      double: 25.14
    },
    {
      union: '4 No. Bhuloin South',
      acres: 2118.79,
      triple: 95.44,
      double: 2.75
    },
    {
      union: '5 No. Perul North',
      acres: 1966.28,
      triple: 75.58,
      double: 19.38
    },
    {
      union: '6 No. Perul South',
      acres: 1546.84,
      triple: 88.00,
      double: 6.29
    },
    {
      union: '7 No. Belghar North',
      acres: 1846.12,
      triple: 89.344,
      double: 7.758
    },
    {
      union: '8 No. Belghar South',
      acres: 1691.33,
      triple: 89.430,
      double: 7.074
    },
    {
      union: '9 No. Bakoi North',
      acres: 1788.60,
      triple: 89.034,
      double: 6.017
    }
  ];

  const renderAgriculture = (index) => {
    if (!agricultureSummary) return;

    const item = agricultureData[index] || agricultureData[0];
    const other = Math.max(0, 100 - item.triple - item.double);

    agricultureSummary.innerHTML = `
      <div class="lm-agri-summary">
        <div class="lm-agri-total">
          <span>Total agricultural area</span>
          <strong>${item.acres.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })} acres</strong>
        </div>

        <div
          class="lm-agri-stack"
          role="img"
          aria-label="${item.union}: ${item.triple}% triple crop, ${item.double}% double crop and ${other.toFixed(2)}% other agricultural uses"
        >
          <span
            class="lm-agri-triple"
            style="width:${item.triple}%"
            title="Triple crop: ${item.triple}%"
          ></span>

          <span
            class="lm-agri-double"
            style="width:${item.double}%"
            title="Double crop: ${item.double}%"
          ></span>

          <span
            class="lm-agri-other"
            style="width:${other}%"
            title="Other agricultural uses: ${other.toFixed(2)}%"
          ></span>
        </div>

        <div class="lm-agri-legend">
          <div>
            <span>Triple-crop land</span>
            <strong>${item.triple.toFixed(2)}%</strong>
          </div>

          <div>
            <span>Double-crop land</span>
            <strong>${item.double.toFixed(2)}%</strong>
          </div>

          <div>
            <span>Gardens, orchards and other uses</span>
            <strong>${other.toFixed(2)}%</strong>
          </div>
        </div>
      </div>
    `;
  };

  if (agricultureSelect && agricultureSummary) {
    agricultureSelect.addEventListener('change', () => {
      renderAgriculture(Number(agricultureSelect.value));
    });

    renderAgriculture(0);
  }

  /* -------------------------------------------------------
     Recreation land infographic
     ------------------------------------------------------- */

  const recreationBars = document.getElementById('recreationBars');

  const recreationData = [
    {
      union: 'Bagmara South',
      acres: 0.12,
      feature: 'Indoor badminton playground'
    },
    {
      union: 'Bhuloin North',
      acres: 0.45,
      feature: 'General playground'
    },
    {
      union: 'Bhuloin South',
      acres: 0.42,
      feature: 'Recorded recreational land'
    },
    {
      union: 'Perul South',
      acres: 0.37,
      feature: 'Recorded recreational land'
    },
    {
      union: 'Bakoi North',
      acres: 0.39,
      feature: 'Hatilota Playground'
    }
  ];

  const renderRecreation = () => {
    if (!recreationBars) return;

    const maximum = Math.max(...recreationData.map((item) => item.acres));

    recreationBars.classList.add('lm-recreation-bars');

    recreationBars.innerHTML = recreationData.map((item) => {
      const width = (item.acres / maximum) * 100;

      return `
        <div
          class="lm-recreation-row"
          title="${item.feature}"
        >
          <span>${item.union}</span>

          <div class="lm-recreation-track">
            <div
              class="lm-recreation-fill"
              data-width="${width}"
              style="width:${reduceMotion ? width : 0}%"
            ></div>
          </div>

          <strong>${item.acres.toFixed(2)}</strong>
        </div>
      `;
    }).join('');

    if (!reduceMotion) {
      window.requestAnimationFrame(() => {
        recreationBars
          .querySelectorAll('.lm-recreation-fill')
          .forEach((bar) => {
            bar.style.width = `${bar.dataset.width}%`;
          });
      });
    }
  };

  renderRecreation();

  /* -------------------------------------------------------
     Scenario strip controls
     ------------------------------------------------------- */

  const scenarioTrack = document.getElementById('scenarioTrack');
  const scenarioButtons = document.querySelectorAll('[data-scenario-index]');

  const setActiveScenarioButton = (activeIndex) => {
    scenarioButtons.forEach((button) => {
      const buttonIndex = Number(button.dataset.scenarioIndex);
      button.setAttribute(
        'aria-pressed',
        buttonIndex === activeIndex ? 'true' : 'false'
      );
    });
  };

  if (scenarioTrack && scenarioButtons.length) {
    const scenarioCards = scenarioTrack.querySelectorAll('.lm-scenario-card');

    scenarioButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const index = Number(button.dataset.scenarioIndex);
        const card = scenarioCards[index];

        if (!card) return;

        setActiveScenarioButton(index);

        card.scrollIntoView({
          behavior: reduceMotion ? 'auto' : 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      });
    });

    let scenarioScrollTimer;

    scenarioTrack.addEventListener(
      'scroll',
      () => {
        window.clearTimeout(scenarioScrollTimer);

        scenarioScrollTimer = window.setTimeout(() => {
          const trackRect = scenarioTrack.getBoundingClientRect();
          const trackCenter = trackRect.left + trackRect.width / 2;

          let closestIndex = 0;
          let closestDistance = Infinity;

          scenarioCards.forEach((card, index) => {
            const cardRect = card.getBoundingClientRect();
            const cardCenter = cardRect.left + cardRect.width / 2;
            const distance = Math.abs(trackCenter - cardCenter);

            if (distance < closestDistance) {
              closestDistance = distance;
              closestIndex = index;
            }
          });

          setActiveScenarioButton(closestIndex);
        }, 80);
      },
      { passive: true }
    );
  }

  /* -------------------------------------------------------
     Lightbox improvements
     The original lightbox functionality remains in place.
     ------------------------------------------------------- */

  const lightbox = document.querySelector('.lightbox');

  if (lightbox) {
    const lightboxImage = lightbox.querySelector('img');
    const lightboxClose = lightbox.querySelector('.lb-close');

    if (lightboxImage) {
      lightboxImage.addEventListener('click', (event) => {
        event.stopPropagation();
      });
    }

    if (lightboxClose) {
      lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('open');
      });
    }
  }
})();