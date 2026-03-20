document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation Toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener("click", () => {
      const isVisible = navLinks.style.display === "flex";

      if (isVisible) {
        navLinks.style.display = "none";
        mobileMenuBtn.innerHTML = '<i data-lucide="menu"></i>';
      } else {
        navLinks.style.display = "flex";
        navLinks.style.flexDirection = "column";
        navLinks.style.position = "absolute";
        navLinks.style.top = "72px";
        navLinks.style.left = "0";
        navLinks.style.right = "0";
        navLinks.style.backgroundColor = "var(--bg-primary)";
        navLinks.style.padding = "24px";
        navLinks.style.borderBottom = "1px solid var(--border)";
        navLinks.style.gap = "24px";
        mobileMenuBtn.innerHTML = '<i data-lucide="x"></i>';
      }
      lucide.createIcons();
    });
  }

  // Smooth Scrolling for Navigation Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Adjust for fixed header
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // Close mobile menu if open
        if (window.innerWidth <= 768 && navLinks) {
          navLinks.style.display = "none";
          if (mobileMenuBtn) {
            mobileMenuBtn.innerHTML = '<i data-lucide="menu"></i>';
            lucide.createIcons();
          }
        }
      }
    });
  });

  // Dynamic OS & Architecture Detection for Download Buttons
  const updateDownloadButtons = async () => {
    const primaryBtn1 = document.getElementById("primary-download-btn");
    const primaryText1 = document.getElementById("primary-download-text");
    const primaryBtn2 = document.getElementById("secondary-download-btn");
    const primaryText2 = document.getElementById("secondary-download-text");

    if (!primaryBtn1 || !primaryText1 || !primaryBtn2 || !primaryText2) return;

    let detectedOS = "Unknown";
    let detectedArch = "";

    const userAgent = window.navigator.userAgent.toLowerCase();

    // Robust OS detection
    if (userAgent.includes("mac os") || userAgent.includes("macintosh")) {
      detectedOS = "macOS";
    } else if (userAgent.includes("win")) {
      detectedOS = "Windows";
    } else if (userAgent.includes("linux") || userAgent.includes("x11")) {
      detectedOS = "Linux";
    }

    // Try modern Client Hints API first
    if (
      navigator.userAgentData &&
      navigator.userAgentData.getHighEntropyValues
    ) {
      try {
        const ua = await navigator.userAgentData.getHighEntropyValues([
          "architecture",
          "bitness",
        ]);

        if (ua.architecture === "arm") {
          detectedArch = "arm64";
        } else if (ua.architecture === "x86") {
          detectedArch = ua.bitness === "64" ? "x64" : "x86";
        }
      } catch (e) {
        console.log("Could not get high entropy user agent data");
      }
    }

    // Fallbacks
    if (!detectedArch) {
      if (detectedOS === "macOS") {
        // Check if it's explicitly an Intel Mac
        if (navigator.platform === "MacIntel" && !userAgent.includes("arm")) {
          detectedArch = "Intel";
        } else {
          detectedArch = ""; // Will default to just "Download for Mac" below
        }
      } else if (
        userAgent.includes("x64") ||
        userAgent.includes("x86_64") ||
        userAgent.includes("win64")
      ) {
        detectedArch = "x64";
      } else if (userAgent.includes("arm64") || userAgent.includes("aarch64")) {
        detectedArch = "arm64";
      } else if (
        userAgent.includes("x86") ||
        userAgent.includes("win32") ||
        userAgent.includes("i686")
      ) {
        detectedArch = "x86";
      }
    }

    // Build the download text based on requested specs
    let downloadText = "Download";
    let downloadUrl = "https://github.com/ecc521/Space-Saver/releases/latest";
    let iconHtml = '<i data-lucide="download"></i>';

    if (detectedOS === "Windows") {
      const archStr = detectedArch ? ` (${detectedArch})` : "";
      downloadText = `Download for Windows${archStr}`;
      downloadUrl =
        "https://github.com/ecc521/Space-Saver/releases/latest/download/ShrinkWizard-Setup.exe";
      iconHtml = '<i data-lucide="monitor"></i>';
    } else if (detectedOS === "macOS") {
      // "Download for Mac" by default, or "Download for Mac (Intel)"
      const isIntel = detectedArch === "Intel" || detectedArch === "x64";
      downloadText = isIntel ? "Download for Mac (Intel)" : "Download for Mac";
      downloadUrl =
        "https://github.com/ecc521/Space-Saver/releases/latest/download/ShrinkWizard-macOS.dmg";
      iconHtml = '<i data-lucide="apple"></i>';
    } else if (detectedOS === "Linux") {
      const archStr = detectedArch ? ` (${detectedArch})` : "";
      downloadText = `Download for Linux${archStr}`;
      downloadUrl =
        "https://github.com/ecc521/Space-Saver/releases/latest/download/ShrinkWizard-Linux.deb";
      iconHtml = '<i data-lucide="monitor"></i>';
    }

    // Apply
    primaryBtn1.href = downloadUrl;
    primaryBtn1.innerHTML = `${iconHtml} <span>${downloadText}</span>`;

    primaryBtn2.href = downloadUrl;
    primaryBtn2.innerHTML = `${iconHtml} <span>${downloadText}</span>`;

    lucide.createIcons();
  };

  updateDownloadButtons();

  // FAQ Accordion
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    if (question) {
      question.addEventListener("click", () => {
        const isActive = item.classList.contains("active");

        // Close all others
        faqItems.forEach((faq) => faq.classList.remove("active"));

        // Toggle current
        if (!isActive) {
          item.classList.add("active");
        }
      });
    }
  });

  // Trigger mock app animations on scroll
  const appMockup = document.querySelector(".app-mockup");
  let hasAnimatedMockup = false;

  if (appMockup) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedMockup) {
            hasAnimatedMockup = true;
            // Trigger some small JS animation on the progress bar inside the mockup
            const progressBar = appMockup.querySelector(".progress-fill");
            if (progressBar) {
              setTimeout(() => {
                progressBar.style.transition =
                  "width 2s cubic-bezier(0.4, 0, 0.2, 1)";
                progressBar.style.width = "100%";

                // Transform the active state to done state
                setTimeout(() => {
                  const activeItem = appMockup.querySelector(
                    ".mockup-queue-item.active",
                  );
                  if (activeItem) {
                    activeItem.classList.remove("active");
                    activeItem.classList.add("done");
                    const badge = activeItem.querySelector(".badge");
                    if (badge) {
                      badge.className = "badge success";
                      badge.textContent = "DONE";
                    }
                  }
                }, 2000);
              }, 500);
            }
          }
        });
      },
      { threshold: 0.5 },
    );

    observer.observe(appMockup);
  }
});
