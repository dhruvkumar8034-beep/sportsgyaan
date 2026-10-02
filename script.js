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

  // ==========================================================================
  // 8. Navbar Search Engine & Live Auto-Complete System
  // ==========================================================================

  const sportsSearchDatabase = [
    {
      title: "Football News & World Cup Updates",
      category: "Football News",
      badge: "Football",
      icon: "fa-futbol",
      url: "football.html",
      keywords: ["football news", "football newa", "football", "fifa", "world cup", "argentina", "algeria", "real madrid", "espanyol", "psg", "bayern", "soccer", "goals", "messi", "ronaldo", "transfers"],
      desc: "Breaking football news, Argentina 3-0 Algeria, Real Madrid, Transfer Rumors & World Cup."
    },
    {
      title: "The Father of Indian Football - Nagendra Prasad",
      category: "Top Stories",
      badge: "Football",
      icon: "fa-futbol",
      url: "football.html#indian-legends",
      keywords: ["father of indian football", "nagendra prasad", "sarbadhikari", "indian football", "gostha pal", "jarnail singh", "chuni goswami", "syed abdul rahim", "football", "football news"],
      desc: "How Nagendra Prasad introduced and popularized football in India during the British era."
    },
    {
      title: "Real Madrid Dominate RCD Espanyol (4-1)",
      category: "Football Highlights",
      badge: "La Liga",
      icon: "fa-futbol",
      url: "football.html#la-liga",
      keywords: ["real madrid", "espanyol", "la liga", "football", "madrid", "goals", "football news"],
      desc: "Real Madrid showcased attacking prowess and defensive resilience in a dominant win."
    },
    {
      title: "Paris vs Bayern Munich 9-Goal Thriller (5-4)",
      category: "Football Highlights",
      badge: "Champions League",
      icon: "fa-futbol",
      url: "football.html#champions-league",
      keywords: ["paris", "psg", "bayern munich", "bayern", "champions league", "football", "football news"],
      desc: "Paris Saint-Germain secured dramatic 5-4 victory over Bayern Munich in high-scoring clash."
    },
    {
      title: "Gujarat Titans vs Punjab Kings IPL Clash",
      category: "Cricket Highlights",
      badge: "Cricket",
      icon: "fa-baseball-bat-ball",
      url: "index.html#highlights",
      keywords: ["cricket", "cricket updates", "gt vs panjab", "gujarat titans", "punjab kings", "ipl", "t20"],
      desc: "Exciting match filled with big hits, thrilling overs and key game-turning moments."
    },
    {
      title: "Rajasthan Royals vs Sunrisers Hyderabad Thriller",
      category: "Cricket Highlights",
      badge: "Cricket",
      icon: "fa-baseball-bat-ball",
      url: "index.html#highlights",
      keywords: ["cricket", "rajasthan royals", "sunrisers hyderabad", "rr vs srh", "ipl", "t20", "cricket updates"],
      desc: "High-scoring nail-biting match with sensational sixes and dramatic final overs."
    },
    {
      title: "IND vs AFG 2nd ODI (Shubman Gill Century)",
      category: "Cricket News",
      badge: "Cricket",
      icon: "fa-baseball-bat-ball",
      url: "index.html#latest-news",
      keywords: ["ind vs afg", "india vs afghanistan", "shubman gill", "cricket news", "odi", "india cricket", "cricket updates", "cricket"],
      desc: "India outclassed Afghanistan in 2nd ODI with Shubman Gill's brilliant century."
    },
    {
      title: "Sport Gyaan / Coca-Cola World Rankings",
      category: "Rankings",
      badge: "Rankings",
      icon: "fa-trophy",
      url: "index.html#rankings",
      keywords: ["rankings", "world rankings", "fifa rankings", "coca cola", "points", "standings", "men ranking", "women ranking"],
      desc: "Official global team rankings, points and standings for Men's and Women's sports."
    },
    {
      title: "Winter Olympics 2026 Milano Cortina",
      category: "Olympics",
      badge: "Olympics",
      icon: "fa-person-skiing",
      url: "index.html#winter-olympics",
      keywords: ["winter olympics", "olympics", "milano cortina", "italy", "ice hockey", "ski mountaineering", "winter games"],
      desc: "Milano Cortina 2026 Winter Games with 2,800 athletes and Team USA hockey gold."
    },
    {
      title: "Knicks vs Spurs NBA Finals 2026 Title",
      category: "Basketball News",
      badge: "NBA",
      icon: "fa-basketball",
      url: "index.html#latest-news",
      keywords: ["basketball", "nba", "knicks", "spurs", "san antonio spurs", "new york knicks", "nba finals", "basketball wire"],
      desc: "New York Knicks ended a 53-year title drought defeating San Antonio Spurs 4-1."
    },
    {
      title: "Bahrain vs India - AVC Men's Cup Volleyball",
      category: "Volleyball News",
      badge: "Volleyball",
      icon: "fa-volleyball",
      url: "index.html#latest-news",
      keywords: ["volleyball", "avc", "avc cup", "india volleyball", "bahrain vs india"],
      desc: "India sweeps Bahrain 3-0 to book historic semi-final berth in international volleyball."
    },
    {
      title: "Jaron Ennis vs Xander Zayas Boxing Title Fight",
      category: "Boxing & Combat",
      badge: "Boxing",
      icon: "fa-hand-fist",
      url: "index.html#latest-news",
      keywords: ["boxing", "jaron ennis", "xander zayas", "wba", "wbo", "knockout", "combat sports", "fight"],
      desc: "Jaron Ennis stopped Xander Zayas in round 7 to capture WBA and WBO Super Welterweight world titles."
    },
    {
      title: "Beneil vs Quillan & Jack vs Carlos UFC Fights",
      category: "UFC & MMA",
      badge: "UFC",
      icon: "fa-hand-fist",
      url: "index.html#highlights",
      keywords: ["ufc", "mma", "beneil vs quillan", "jack vs carlos", "combat", "octagon"],
      desc: "High-intensity battles filled with powerful strikes, takedowns and octagon mastery."
    },
    {
      title: "iQOO SouL BGIS 2026 Champions",
      category: "Esports Arena",
      badge: "Esports",
      icon: "fa-gamepad",
      url: "index.html#latest-news",
      keywords: ["esports", "bgis", "bgmi", "iqoo soul", "gaming", "soul champions"],
      desc: "iQOO SouL crowned BGIS 2026 Champions after a dominant tournament run."
    },
    {
      title: "Hyderabad Heroes Crowned Rugby Champions",
      category: "Rugby",
      badge: "Rugby",
      icon: "fa-football",
      url: "index.html#rugby",
      keywords: ["rugby", "hyderabad heroes", "hsbc rugby", "mumbai dreamers", "premier league"],
      desc: "Hyderabad Heroes defeated Mumbai Dreamers 41-17 to win HSBC Rugby Premier League Season 2."
    },
    {
      title: "About Sport Gyaan - Our Mission & Vision",
      category: "About Us",
      badge: "About",
      icon: "fa-circle-info",
      url: "about.html",
      keywords: ["about", "about sport gyaan", "about us", "who we are", "mission", "vision", "our journey", "contact"],
      desc: "Discover Sport Gyaan's vision of celebrating world athletics beyond just one game."
    },
    {
      title: "What We Cover - 14+ Sports Categories",
      category: "Sports Coverage",
      badge: "Sports",
      icon: "fa-layer-group",
      url: "about.html#what-we-cover",
      keywords: ["categories", "all sports", "sports list", "tennis", "badminton", "hockey", "athletics", "gymnastics", "kabaddi"],
      desc: "Comprehensive coverage across Team Sports, Racquet, Combat, Athletics and Outdoor sports."
    },
    {
      title: "Why Choose Sport Gyaan? 4 Core Pillars",
      category: "About Us",
      badge: "Features",
      icon: "fa-star",
      url: "about.html#why-choose-us",
      keywords: ["why choose us", "why sport gyaan", "benefits", "beyond one game", "platform"],
      desc: "Beyond One Game, passionate coverage, instant verified action and player journeys."
    },
    {
      title: "Official Sports Products, Jerseys & Gear",
      category: "Products",
      badge: "Gear",
      icon: "fa-bag-shopping",
      url: "index.html#products",
      keywords: ["products", "gear", "jerseys", "equipment", "shoes", "cricket bats", "footballs", "sportswear"],
      desc: "Official team jerseys, cricket bats & kits, match footballs, running shoes & training gear."
    }
  ];

  const searchInput = document.getElementById("navSearchInput");
  const searchWrapper = document.getElementById("navSearchWrapper");
  const searchDropdown = document.getElementById("searchResultsDropdown");
  const searchResultsList = document.getElementById("searchResultsList");
  const searchCount = document.getElementById("searchCount");
  const searchClearBtn = document.getElementById("searchClearBtn");
  const mobileSearchTrigger = document.getElementById("mobileSearchTrigger");

  let currentResults = [];
  let selectedIndex = -1;

  // Perform search query filtering & ranking
  function performSearch(query) {
    const q = query.trim().toLowerCase();
    if (!q) {
      currentResults = [];
      hideSearchDropdown();
      return;
    }

    const scored = [];

    sportsSearchDatabase.forEach((item) => {
      let score = 0;
      const lowerTitle = item.title.toLowerCase();
      const lowerCategory = item.category.toLowerCase();
      const lowerDesc = item.desc.toLowerCase();

      // Exact title match
      if (lowerTitle === q) score += 100;
      else if (lowerTitle.startsWith(q)) score += 60;
      else if (lowerTitle.includes(q)) score += 40;

      // Keyword match
      item.keywords.forEach((kw) => {
        const lowerKw = kw.toLowerCase();
        if (lowerKw === q) score += 90;
        else if (lowerKw.startsWith(q)) score += 50;
        else if (lowerKw.includes(q)) score += 35;
      });

      // Category match
      if (lowerCategory.includes(q)) score += 30;

      // Description match
      if (lowerDesc.includes(q)) score += 15;

      if (score > 0) {
        scored.push({ item, score });
      }
    });

    // Sort by relevance score
    scored.sort((a, b) => b.score - a.score);
    currentResults = scored.map((s) => s.item);
    renderSearchResults(q);
  }

  // Highlight matched terms safely
  function highlightMatch(text, query) {
    if (!query) return text;
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${escaped})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  }

  // Render results into dropdown
  function renderSearchResults(query) {
    if (!searchResultsList) return;
    searchResultsList.innerHTML = "";
    selectedIndex = -1;

    if (currentResults.length === 0) {
      if (searchCount) searchCount.innerText = "No Results";
      searchResultsList.innerHTML = `
        <div class="search-empty-state">
          <i class="fa-solid fa-magnifying-glass"></i>
          <h6>No exact match found</h6>
          <p>We couldn't find "${escapeHtml(query)}" on Sport Gyaan. Try searching:</p>
          <div class="search-suggestion-pills">
            <span class="search-suggest-pill" data-query="Football News"><i class="fa-solid fa-futbol me-1"></i> Football News</span>
            <span class="search-suggest-pill" data-query="Cricket"><i class="fa-solid fa-baseball-bat-ball me-1"></i> Cricket</span>
            <span class="search-suggest-pill" data-query="Rankings"><i class="fa-solid fa-trophy me-1"></i> Rankings</span>
            <span class="search-suggest-pill" data-query="Olympics"><i class="fa-solid fa-person-skiing me-1"></i> Olympics</span>
            <span class="search-suggest-pill" data-query="About"><i class="fa-solid fa-circle-info me-1"></i> About</span>
          </div>
        </div>
      `;

      // Attach clicks to suggestion pills
      searchResultsList.querySelectorAll(".search-suggest-pill").forEach((pill) => {
        pill.addEventListener("click", function () {
          const newQ = this.getAttribute("data-query");
          if (searchInput) {
            searchInput.value = newQ;
            performSearch(newQ);
            searchInput.focus();
          }
        });
      });

      showSearchDropdown();
      return;
    }

    if (searchCount) {
      searchCount.innerText = `${currentResults.length} Result${currentResults.length > 1 ? "s" : ""} Found`;
    }

    currentResults.slice(0, 6).forEach((item, index) => {
      const itemEl = document.createElement("a");
      itemEl.className = "search-result-item";
      itemEl.href = item.url;
      itemEl.setAttribute("data-index", index);

      const highlightedTitle = highlightMatch(item.title, query);

      itemEl.innerHTML = `
        <div class="search-item-icon-box">
          <i class="fa-solid ${item.icon}"></i>
        </div>
        <div class="search-item-info">
          <div class="search-item-top">
            <span class="search-item-badge">${item.badge}</span>
            <i class="fa-solid fa-arrow-right search-item-arrow"></i>
          </div>
          <h5 class="search-item-title">${highlightedTitle}</h5>
          <p class="search-item-desc">${item.desc}</p>
        </div>
      `;

      itemEl.addEventListener("click", function (e) {
        e.preventDefault();
        navigateToResult(item.url);
      });

      searchResultsList.appendChild(itemEl);
    });

    showSearchDropdown();
  }

  // Safe string escaping for HTML
  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  function showSearchDropdown() {
    if (searchDropdown) {
      searchDropdown.style.display = "block";
    }
  }

  function hideSearchDropdown() {
    if (searchDropdown) {
      searchDropdown.style.display = "none";
    }
    selectedIndex = -1;
  }

  // Navigation Logic (Handles internal section scrolling & cross-page navigation)
  function navigateToResult(targetUrl) {
    hideSearchDropdown();

    // Close mobile navbar if open
    if (window.innerWidth <= 991.98 && menuCollapse && menuCollapse.classList.contains("show")) {
      const bsCollapse = bootstrap.Collapse.getInstance(menuCollapse);
      if (bsCollapse) bsCollapse.hide();
    }

    const currentPath = window.location.pathname;
    const isCurrentIndex = currentPath.endsWith("index.html") || currentPath.endsWith("/") || currentPath === "";
    const isCurrentAbout = currentPath.endsWith("about.html");
    const isCurrentFootball = currentPath.endsWith("football.html");

    // Check if target is on the same page with an anchor hash
    if (targetUrl.includes("#")) {
      const [targetPage, hash] = targetUrl.split("#");
      let isSamePage = false;

      if ((targetPage === "index.html" || targetPage === "") && isCurrentIndex) isSamePage = true;
      if (targetPage === "about.html" && isCurrentAbout) isSamePage = true;
      if (targetPage === "football.html" && isCurrentFootball) isSamePage = true;

      if (isSamePage) {
        const targetElement = document.getElementById(hash);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
          targetElement.classList.add("search-target-highlight");
          setTimeout(() => {
            targetElement.classList.remove("search-target-highlight");
          }, 2500);
          history.pushState(null, null, `#${hash}`);
          return;
        }
      }
    }

    // Otherwise navigate directly to the target URL
    window.location.href = targetUrl;
  }

  // Input event listeners
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const val = this.value;
      if (searchClearBtn) {
        searchClearBtn.style.display = val.length > 0 ? "flex" : "none";
      }
      performSearch(val);
    });

    searchInput.addEventListener("focus", function () {
      if (searchWrapper) searchWrapper.classList.add("is-focused");
      if (this.value.trim().length > 0) {
        performSearch(this.value);
      }
    });

    searchInput.addEventListener("blur", function () {
      if (searchWrapper) searchWrapper.classList.remove("is-focused");
    });

    // Keyboard navigation (Arrow keys & Enter)
    searchInput.addEventListener("keydown", function (e) {
      const items = searchResultsList ? searchResultsList.querySelectorAll(".search-result-item") : [];

      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (items.length > 0) {
          selectedIndex = (selectedIndex + 1) % items.length;
          updateSelectedResult(items);
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (items.length > 0) {
          selectedIndex = (selectedIndex - 1 + items.length) % items.length;
          updateSelectedResult(items);
        }
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < items.length) {
          const targetUrl = currentResults[selectedIndex].url;
          navigateToResult(targetUrl);
        } else if (currentResults.length > 0) {
          // Open first/best match
          navigateToResult(currentResults[0].url);
        } else if (this.value.trim().length > 0) {
          // Default fallbacks for common queries
          const q = this.value.trim().toLowerCase();
          if (q.includes("football")) {
            navigateToResult("football.html");
          } else if (q.includes("cricket")) {
            navigateToResult("index.html#highlights");
          } else if (q.includes("about")) {
            navigateToResult("about.html");
          } else {
            performSearch(this.value);
          }
        }
      } else if (e.key === "Escape") {
        hideSearchDropdown();
      }
    });
  }

  function updateSelectedResult(items) {
    items.forEach((item, idx) => {
      if (idx === selectedIndex) {
        item.classList.add("is-selected");
        item.scrollIntoView({ block: "nearest" });
      } else {
        item.classList.remove("is-selected");
      }
    });
  }

  // Clear button click
  if (searchClearBtn) {
    searchClearBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (searchInput) {
        searchInput.value = "";
        searchInput.focus();
      }
      this.style.display = "none";
      hideSearchDropdown();
    });
  }

  // Mobile quick search trigger button
  if (mobileSearchTrigger && menuCollapse) {
    mobileSearchTrigger.addEventListener("click", function () {
      const bsCollapse = bootstrap.Collapse.getOrCreateInstance(menuCollapse);
      bsCollapse.show();
      setTimeout(() => {
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
      }, 250);
    });
  }

  // Close dropdown on click outside
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".nav-search-item") && !e.target.closest("#mobileSearchTrigger")) {
      hideSearchDropdown();
    }
  });

  // Handle URL hash on initial page load (smooth highlight)
  if (window.location.hash) {
    const hash = window.location.hash.substring(1);
    setTimeout(() => {
      const targetElement = document.getElementById(hash);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        targetElement.classList.add("search-target-highlight");
        setTimeout(() => {
          targetElement.classList.remove("search-target-highlight");
        }, 2500);
      }
    }, 400);
  }
});
