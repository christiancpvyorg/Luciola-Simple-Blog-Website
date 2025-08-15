let currentPost = null;
let isMenuOpen = false;
let scrollObserver;
let animationObserver;
document.addEventListener("DOMContentLoaded", function () {
  initializeBlog();
  setupEventListeners();
  setupSmoothScrolling();
  setupHeaderScroll();
  setupScrollAnimations();
  setupIntersectionObservers();
  setupSearch();
  setupLazyLoading();
  setupThemeToggle();
  setupStaggeredAnimations();
});
function initializeBlog() {
  renderFeaturedPosts();
  renderLatestPosts();
  setupMobileMenu();
  setTimeout(() => {
    document.body.classList.add("loaded");
  }, 0x64);
}
function setupEventListeners() {
  const _0x3c5fa3 = document.querySelector(".menu-toggle");
  const _0x48d615 = document.getElementById('mobile-menu-overlay');
  if (_0x3c5fa3) {
    _0x3c5fa3.addEventListener("click", toggleMobileMenu);
  }
  const _0x501285 = document.querySelectorAll('.mobile-nav-link');
  _0x501285.forEach(_0x4b6621 => {
    _0x4b6621.addEventListener('click', _0xa3e22a => {
      _0xa3e22a.preventDefault();
      const _0x2941bc = _0x4b6621.getAttribute("href");
      closeMobileMenu();
      setTimeout(() => {
        scrollToSection(_0x2941bc.substring(0x1));
      }, 0x12c);
    });
  });
  if (_0x48d615) {
    _0x48d615.addEventListener("click", _0x1a6830 => {
      if (_0x1a6830.target === _0x48d615) {
        closeMobileMenu();
      }
    });
  }
  document.addEventListener("click", _0x340530 => {
    if (_0x340530.target.classList.contains("modal-backdrop")) {
      closePostModal();
    }
  });
  document.addEventListener("keydown", _0x89cccc => {
    if (_0x89cccc.key === 'Escape') {
      if (isMenuOpen) {
        closeMobileMenu();
      } else if (document.getElementById("post-modal").classList.contains("active")) {
        closePostModal();
      }
    }
  });
  const _0x181c5d = document.querySelectorAll(".btn");
  _0x181c5d.forEach(_0x5993f4 => {
    _0x5993f4.addEventListener('mouseenter', () => {
      _0x5993f4.style.transform = "translateY(-3px) scale(1.02)";
    });
    _0x5993f4.addEventListener("mouseleave", () => {
      _0x5993f4.style.transform = "translateY(0) scale(1)";
    });
  });
}
function setupSmoothScrolling() {
  const _0x479e80 = document.querySelectorAll("a[href^=\"#\"]");
  _0x479e80.forEach(_0xcfce98 => {
    _0xcfce98.addEventListener("click", _0x739da8 => {
      _0x739da8.preventDefault();
      const _0x320910 = _0xcfce98.getAttribute("href").substring(0x1);
      scrollToSection(_0x320910);
      updateActiveNavLink('#' + _0x320910);
    });
  });
}
function setupHeaderScroll() {
  const _0x1c54c2 = document.querySelector(".header");
  let _0xe07cd4 = window.scrollY;
  let _0x3a20d8 = false;
  function _0x921b32() {
    const _0x40f071 = window.scrollY;
    if (_0x40f071 > 0x32) {
      _0x1c54c2.classList.add("scrolled");
    } else {
      _0x1c54c2.classList.remove("scrolled");
    }
    if (_0x40f071 > 0x64) {
      if (_0x40f071 > _0xe07cd4 && !isMenuOpen) {
        _0x1c54c2.style.transform = 'translateY(-100%)';
      } else {
        _0x1c54c2.style.transform = 'translateY(0)';
      }
    } else {
      _0x1c54c2.style.transform = "translateY(0)";
    }
    _0xe07cd4 = _0x40f071;
    updateActiveNavOnScroll();
    _0x3a20d8 = false;
  }
  window.addEventListener('scroll', () => {
    if (!_0x3a20d8) {
      requestAnimationFrame(_0x921b32);
      _0x3a20d8 = true;
    }
  });
}
function setupIntersectionObservers() {
  animationObserver = new IntersectionObserver(_0x344f6b => {
    _0x344f6b.forEach(_0x4d1899 => {
      if (_0x4d1899.isIntersecting) {
        _0x4d1899.target.classList.add("animate-in");
        if (_0x4d1899.target.classList.contains("post-card") || _0x4d1899.target.classList.contains("latest-card")) {
          const _0x3b3671 = _0x4d1899.target.parentNode.children;
          Array.from(_0x3b3671).forEach((_0x1082e0, _0x1cbe1a) => {
            if (_0x1082e0.classList.contains("post-card") || _0x1082e0.classList.contains("latest-card")) {
              setTimeout(() => {
                _0x1082e0.classList.add("animate-in");
              }, _0x1cbe1a * 0x64);
            }
          });
        }
      }
    });
  }, {
    'threshold': 0.1,
    'rootMargin': "0px 0px -100px 0px"
  });
  const _0x5725f9 = document.querySelectorAll(".animate-on-scroll");
  _0x5725f9.forEach(_0xc3f0e2 => {
    animationObserver.observe(_0xc3f0e2);
  });
}
function toggleMobileMenu() {
  if (isMenuOpen) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
}
function openMobileMenu() {
  const _0x1ed755 = document.querySelector(".menu-toggle");
  const _0x1863c0 = document.getElementById("mobile-menu-overlay");
  const _0x5d60c1 = document.querySelector(".header");
  isMenuOpen = true;
  _0x1ed755.classList.add("active");
  _0x1863c0.classList.add("active");
  document.body.style.overflow = "hidden";
  _0x5d60c1.style.transform = 'translateY(0)';
  const _0x194eb9 = document.querySelectorAll(".mobile-nav-link");
  _0x194eb9.forEach((_0x2f29d4, _0x179fe3) => {
    _0x2f29d4.style.setProperty('--stagger', _0x179fe3 + 0x1);
  });
}
function closeMobileMenu() {
  const _0x235ae3 = document.querySelector(".menu-toggle");
  const _0x176f6f = document.getElementById("mobile-menu-overlay");
  isMenuOpen = false;
  _0x235ae3.classList.remove('active');
  _0x176f6f.classList.remove("active");
  document.body.style.overflow = "auto";
}
function setupMobileMenu() {
  window.addEventListener("resize", () => {
    if (window.innerWidth > 0x300 && isMenuOpen) {
      closeMobileMenu();
    }
  });
}
function renderFeaturedPosts() {
  const _0x2a3f9b = document.getElementById('featured-posts');
  const _0x4a1116 = getFeaturedPosts();
  if (!_0x2a3f9b) {
    return;
  }
  _0x2a3f9b.innerHTML = _0x4a1116.map((_0x545f1c, _0x16bd67) => "\n        <div class=\"post-card animate-on-scroll\" onclick=\"openPostModal('" + _0x545f1c.id + "')\" style=\"--stagger-delay: " + _0x16bd67 * 0.1 + "s\">\n            <div class=\"post-image\" style=\"background-image: url('" + _0x545f1c.image + "');\"></div>\n            <div class=\"post-card-content\">\n                <div class=\"post-meta\">\n                    <span class=\"post-category\">" + _0x545f1c.category + "</span>\n                    <span class=\"post-date\">" + formatDate(_0x545f1c.date) + "</span>\n                    <span class=\"post-read-time\">" + _0x545f1c.readTime + "</span>\n                </div>\n                <h3 class=\"post-card-title\">" + _0x545f1c.title + "</h3>\n                <p class=\"post-card-excerpt\">" + _0x545f1c.excerpt + "</p>\n            </div>\n        </div>\n    ").join('');
  const _0x46980b = _0x2a3f9b.querySelectorAll(".post-card");
  _0x46980b.forEach(_0x14b2ed => {
    if (animationObserver) {
      animationObserver.observe(_0x14b2ed);
    }
  });
}
function renderLatestPosts() {
  const _0x2fb09a = document.getElementById("latest-posts");
  const _0x1ee0a2 = getLatestPosts().filter(_0x20b29 => !_0x20b29.featured);
  if (!_0x2fb09a) {
    return;
  }
  _0x2fb09a.innerHTML = _0x1ee0a2.map((_0x41d6b8, _0x1924b5) => "\n        <div class=\"latest-card animate-on-scroll\" onclick=\"openPostModal('" + _0x41d6b8.id + "')\" style=\"--stagger-delay: " + _0x1924b5 * 0.1 + "s\">\n            <div class=\"post-meta\">\n                <span class=\"post-category\">" + _0x41d6b8.category + "</span>\n                <span class=\"post-date\">" + formatDate(_0x41d6b8.date) + "</span>\n                <span class=\"post-read-time\">" + _0x41d6b8.readTime + "</span>\n            </div>\n            <h3 class=\"post-card-title\">" + _0x41d6b8.title + "</h3>\n            <p class=\"post-card-excerpt\">" + _0x41d6b8.excerpt + "</p>\n        </div>\n    ").join('');
  const _0x5007e1 = _0x2fb09a.querySelectorAll('.latest-card');
  _0x5007e1.forEach(_0x1bff88 => {
    if (animationObserver) {
      animationObserver.observe(_0x1bff88);
    }
  });
}
async function openPostModal(_0x5a50b4) {
  try {
    const _0x30e764 = getPostById(_0x5a50b4);
    if (!_0x30e764) {
      return;
    }
    currentPost = _0x30e764;
    const _0x44f4db = document.getElementById("post-modal");
    updateModalContent(_0x30e764);
    _0x44f4db.classList.add("active");
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      _0x44f4db.querySelector(".modal-close").focus();
    }, 0x12c);
    const _0x385093 = document.getElementById("modal-content");
    _0x385093.innerHTML = "<div class=\"loading-spinner\">Loading content...</div>";
    try {
      const _0x18757e = await loadMarkdownContent(_0x30e764.contentFile);
      if (typeof marked !== "undefined") {
        _0x385093.innerHTML = marked.parse(_0x18757e);
      } else {
        _0x385093.innerHTML = _0x18757e.replace(/\n/g, '<br>');
      }
    } catch (_0x83b390) {
      _0x385093.innerHTML = "<div class=\"error-message\">Failed to load content</div>";
    }
  } catch (_0x5c5a5b) {
    console.error("Failed to open modal:", _0x5c5a5b);
  }
}
function updateModalContent(_0x467ee1) {
  const _0x56d7d7 = {
    'modal-category': _0x467ee1.category,
    'modal-date': formatDate(_0x467ee1.date),
    'modal-read-time': _0x467ee1.readTime,
    'modal-title': _0x467ee1.title,
    'modal-author': _0x467ee1.author
  };
  Object.entries(_0x56d7d7).forEach(([_0x25fe7c, _0x54bd70]) => {
    const _0x2cb07b = document.getElementById(_0x25fe7c);
    if (_0x2cb07b) {
      _0x2cb07b.textContent = _0x54bd70;
    }
  });
}
function closePostModal() {
  const _0x4fa19c = document.getElementById("post-modal");
  _0x4fa19c.classList.remove("active");
  document.body.style.overflow = "auto";
  currentPost = null;
}
function setupScrollAnimations() {
  const _0x40e046 = document.querySelectorAll(".shape");
  function _0x14ae56() {
    const _0x11d17a = window.pageYOffset;
    const _0x548ea7 = _0x11d17a * -0.5;
    _0x40e046.forEach((_0x11beb3, _0x112202) => {
      const _0x3b5965 = 0.3 + _0x112202 * 0.1;
      _0x11beb3.style.transform = "translateY(" + _0x548ea7 * _0x3b5965 + 'px)';
    });
  }
  let _0xd9dbe0 = false;
  function _0x9e812c() {
    if (!_0xd9dbe0) {
      requestAnimationFrame(_0x14ae56);
      _0xd9dbe0 = true;
      setTimeout(() => {
        _0xd9dbe0 = false;
      }, 0x10);
    }
  }
  window.addEventListener("scroll", _0x9e812c);
}
function setupStaggeredAnimations() {
  const _0x642458 = document.querySelectorAll(".featured-grid, .latest-grid");
  _0x642458.forEach(_0x178627 => {
    const _0x3e45af = _0x178627.children;
    Array.from(_0x3e45af).forEach((_0x21db69, _0x1c663c) => {
      _0x21db69.style.setProperty("--stagger-delay", _0x1c663c * 0.1 + 's');
    });
  });
}
function updateActiveNavOnScroll() {
  const _0x496cb1 = document.querySelectorAll("section[id]");
  const _0x5eff52 = document.querySelector(".header").offsetHeight;
  let _0x388700 = '';
  _0x496cb1.forEach(_0x34a3ea => {
    const _0x449b02 = _0x34a3ea.offsetTop - _0x5eff52 - 0x64;
    const _0x252fd7 = _0x34a3ea.offsetHeight;
    const _0x297ad0 = window.scrollY;
    if (_0x297ad0 >= _0x449b02 && _0x297ad0 < _0x449b02 + _0x252fd7) {
      _0x388700 = '#' + _0x34a3ea.id;
    }
  });
  if (_0x388700) {
    updateActiveNavLink(_0x388700);
  }
}
function updateActiveNavLink(_0x554e85) {
  const _0x5b4e17 = document.querySelectorAll(".nav-link");
  const _0x1ce886 = document.querySelectorAll('.mobile-nav-link');
  _0x5b4e17.forEach(_0x58ecf2 => {
    _0x58ecf2.classList.remove("active");
    if (_0x58ecf2.getAttribute('href') === _0x554e85) {
      _0x58ecf2.classList.add('active');
    }
  });
  _0x1ce886.forEach(_0x26a34a => {
    _0x26a34a.classList.remove("active");
    if (_0x26a34a.getAttribute("href") === _0x554e85) {
      _0x26a34a.classList.add('active');
    }
  });
}
function scrollToSection(_0x3e65ef) {
  const _0x4adbd2 = document.getElementById(_0x3e65ef);
  if (_0x4adbd2) {
    const _0x21705b = document.querySelector(".header").offsetHeight;
    const _0x5e3a1b = _0x4adbd2.offsetTop - _0x21705b - 0x14;
    const _0x26d9d3 = window.scrollY;
    const _0x7d31df = _0x5e3a1b - _0x26d9d3;
    const _0x559572 = Math.min(Math.abs(_0x7d31df) * 0.5, 0x3e8);
    let _0xd2edee = null;
    function _0x3cafcc(_0x218bd3) {
      if (!_0xd2edee) {
        _0xd2edee = _0x218bd3;
      }
      const _0x7d3725 = Math.min((_0x218bd3 - _0xd2edee) / _0x559572, 0x1);
      const _0x263f60 = _0x7d3725 < 0.5 ? 0x4 * _0x7d3725 * _0x7d3725 * _0x7d3725 : (_0x7d3725 - 0x1) * (0x2 * _0x7d3725 - 0x2) * (0x2 * _0x7d3725 - 0x2) + 0x1;
      window.scrollTo(0x0, _0x26d9d3 + _0x7d31df * _0x263f60);
      if (_0x7d3725 < 0x1) {
        requestAnimationFrame(_0x3cafcc);
      }
    }
    requestAnimationFrame(_0x3cafcc);
    updateActiveNavLink('#' + _0x3e65ef);
  }
}
function easeInOutCubic(_0x214b2) {
  return _0x214b2 < 0.5 ? 0x4 * _0x214b2 * _0x214b2 * _0x214b2 : (_0x214b2 - 0x1) * (0x2 * _0x214b2 - 0x2) * (0x2 * _0x214b2 - 0x2) + 0x1;
}
function setupSearch() {
  const _0x4cfc6d = document.getElementById("search-input");
  if (!_0x4cfc6d) {
    return;
  }
  let _0x348a94;
  _0x4cfc6d.addEventListener('input', _0x3609a3 => {
    clearTimeout(_0x348a94);
    _0x348a94 = setTimeout(() => {
      const _0x11d902 = _0x3609a3.target.value.toLowerCase();
      performSearch(_0x11d902);
    }, 0x12c);
  });
}
function performSearch(_0x3d5d66) {
  if (!_0x3d5d66) {
    renderFeaturedPosts();
    renderLatestPosts();
    return;
  }
  const _0x4d9760 = blogPosts.filter(_0x2b5a84 => _0x2b5a84.title.toLowerCase().includes(_0x3d5d66) || _0x2b5a84.excerpt.toLowerCase().includes(_0x3d5d66) || _0x2b5a84.category.toLowerCase().includes(_0x3d5d66));
  console.log("Search results:", _0x4d9760);
}
function setupLazyLoading() {
  if ("IntersectionObserver" in window) {
    const _0x4cbc07 = new IntersectionObserver((_0x1e03e5, _0x56dd7e) => {
      _0x1e03e5.forEach(_0x50a4f4 => {
        if (_0x50a4f4.isIntersecting) {
          const _0x50a528 = _0x50a4f4.target;
          _0x50a528.src = _0x50a528.dataset.src;
          _0x50a528.classList.remove("lazy");
          _0x50a528.addEventListener('load', () => {
            _0x50a528.style.opacity = '1';
          });
          _0x56dd7e.unobserve(_0x50a528);
        }
      });
    }, {
      'rootMargin': '50px'
    });
    const _0x2531c1 = document.querySelectorAll("img[data-src]");
    _0x2531c1.forEach(_0x53c06b => {
      _0x53c06b.style.opacity = '0';
      _0x53c06b.style.transition = "opacity 0.3s ease";
      _0x4cbc07.observe(_0x53c06b);
    });
  }
}
function setupThemeToggle() {
  const _0x19cad2 = document.getElementById("theme-toggle");
  if (!_0x19cad2) {
    return;
  }
  const _0x216a60 = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute('data-theme', _0x216a60);
  _0x19cad2.addEventListener("click", () => {
    const _0x387145 = document.documentElement.getAttribute('data-theme') === 'light' ? "dark" : 'light';
    document.documentElement.setAttribute('data-theme', _0x387145);
    localStorage.setItem("theme", _0x387145);
    document.documentElement.style.transition = "all 0.3s ease";
    setTimeout(() => {
      document.documentElement.style.transition = '';
    }, 0x12c);
  });
}
function debounce(_0x5c632a, _0x1429ec) {
  let _0x14e05f;
  return function _0x5a431d(..._0x4853e0) {
    const _0x7408e4 = () => {
      clearTimeout(_0x14e05f);
      _0x5c632a(..._0x4853e0);
    };
    clearTimeout(_0x14e05f);
    _0x14e05f = setTimeout(_0x7408e4, _0x1429ec);
  };
}
window.addEventListener("error", _0x2be7fb => {
  console.error("Blog error:", _0x2be7fb.error);
});
window.addEventListener('unhandledrejection', _0x22772a => {
  console.error("Unhandled promise rejection:", _0x22772a.reason);
});
window.addEventListener("beforeunload", () => {
  if (animationObserver) {
    animationObserver.disconnect();
  }
  if (scrollObserver) {
    scrollObserver.disconnect();
  }
});
window.scrollToSection = scrollToSection;
window.openPostModal = openPostModal;
window.closePostModal = closePostModal;