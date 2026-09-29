/* ==========================================================================
   Sport Gyaan - Interactive Navigation & Responsive Scripts
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navbar");
  const menuCollapse = document.getElementById("menu");
  const toggler = document.querySelector(".custom-toggler");

  // 1. Scroll-aware navbar styling
  function handleScroll() {
    if (!navbar) return;
    if (window.scrollY > 40) {
      navbar.classList.add("navbar-scroll");
    } else {
      navbar.classList.remove("navbar-scroll");
    }
  }

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  // 2. Custom Hamburger Toggler Animation Sync
  if (toggler && menuCollapse) {
    // When Bootstrap collapse events fire, keep toggler icon state synced
    menuCollapse.addEventListener("show.bs.collapse", function () {
      toggler.classList.add("is-active");
      toggler.setAttribute("aria-expanded", "true");
    });

    menuCollapse.addEventListener("hide.bs.collapse", function () {
      toggler.classList.remove("is-active");
      toggler.setAttribute("aria-expanded", "false");
    });
  }

  // 3. Mobile Dropdown Toggle (Main Categories: Sports, News, Highlights, Products)
  const dropdownToggles = document.querySelectorAll(".custom-dropdown-toggle");

  dropdownToggles.forEach(function (toggle) {
    toggle.addEventListener("click", function (e) {
      // Only execute custom behavior on screens <= 991px (mobile & tablet)
      if (window.innerWidth <= 991.98) {
        e.preventDefault();
        e.stopPropagation();

        const parentDropdown = this.closest(".custom-dropdown");
        const isOpen = parentDropdown.classList.contains("show");

        // Close any other open dropdowns in the mobile menu for a clean accordion effect
        document.querySelectorAll(".custom-dropdown.show").forEach(function (otherDropdown) {
          if (otherDropdown !== parentDropdown) {
            otherDropdown.classList.remove("show");
          }
        });

        // Toggle current dropdown
        if (isOpen) {
          parentDropdown.classList.remove("show");
        } else {
          parentDropdown.classList.add("show");
        }
      }
    });
  });

  // 4. Mobile Sub-Category Accordion Toggle (Sub-Categories inside dropdowns)
  const subCatToggles = document.querySelectorAll(".sub-cat-toggle");

  subCatToggles.forEach(function (subToggle) {
    subToggle.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const card = this.closest(".sub-category-card");
      const content = card.querySelector(".sub-cat-content");
      const isSubOpen = this.classList.contains("active");

      // Optional: Close sibling sub-categories in same card-box for neatness
      const parentContainer = this.closest(".mobile-sub-accordion") || this.closest(".mega-menu");
      if (parentContainer) {
        parentContainer.querySelectorAll(".sub-cat-toggle.active").forEach(function (otherToggle) {
          if (otherToggle !== subToggle) {
            otherToggle.classList.remove("active");
            const otherContent = otherToggle.closest(".sub-category-card").querySelector(".sub-cat-content");
            if (otherContent) otherContent.classList.remove("show");
          }
        });
      }

      // Toggle this sub-category
      if (isSubOpen) {
        this.classList.remove("active");
        if (content) content.classList.remove("show");
      } else {
        this.classList.add("active");
        if (content) content.classList.add("show");
      }
    });
  });

  // 5. Close Mobile Menu when clicking normal nav links or sub-links
  const actionableLinks = document.querySelectorAll(
    ".navbar-nav .nav-link:not(.custom-dropdown-toggle), .sub-cat-list a, .mobile-login-box a"
  );

  actionableLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (window.innerWidth <= 991.98 && menuCollapse.classList.contains("show")) {
        const bsCollapse = bootstrap.Collapse.getInstance(menuCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    });
  });

  // 6. Close Mobile Menu when clicking outside of the navbar
  document.addEventListener("click", function (event) {
    if (window.innerWidth <= 991.98 && menuCollapse.classList.contains("show")) {
      const isClickInsideNavbar = navbar.contains(event.target);
      if (!isClickInsideNavbar) {
        const bsCollapse = bootstrap.Collapse.getInstance(menuCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    }
  });

  // 7. Handle window resize gracefully
  window.addEventListener("resize", function () {
    if (window.innerWidth > 991.98) {
      // Remove mobile open states on desktop
      document.querySelectorAll(".custom-dropdown.show").forEach(function (el) {
        el.classList.remove("show");
      });
      // Show all sub-cat contents on desktop
      document.querySelectorAll(".sub-cat-content").forEach(function (el) {
        el.classList.remove("show");
      });
      document.querySelectorAll(".sub-cat-toggle").forEach(function (el) {
        el.classList.remove("active");
      });
    }
  });
});
