(function () {
  "use strict";

  /* ---------- header: shrink-on-scroll + mobile menu ---------- */
  var header = document.querySelector(".site-header");
  var menuToggle = document.querySelector(".menu-toggle");
  var mainNav = document.querySelector(".main-nav");

  if (header) {
    var onScroll = function () {
      if (window.scrollY > 40) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", function () {
      var open = mainNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    mainNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- doctors: department filter ---------- */
  var DOCTORS = [
    {
      id: "dr-1", name: "Dr. Anika Sharma", dept: "Cardiology",
      title: "Senior Consultant, Interventional Cardiology",
      hospitals: "Hospital A, Delhi", experience: "18+ years",
      expertise: "Complex angioplasty, TAVI, coronary bypass planning",
      expertiseList: ["Angioplasty", "TAVI", "Bypass Surgery"],
      education: "MD (Cardiology) — placeholder institution",
      awards: "Placeholder award / recognition",
      memberships: "Placeholder professional body",
      research: "Placeholder publications",
      opd: "Hospital A, Delhi — Mon/Wed/Fri, 10am–1pm",
      contact: "Via IndiaCure coordination team"
    },
    {
      id: "dr-2", name: "Dr. Rohan Mehta", dept: "Orthopedics",
      title: "Director, Joint Replacement Surgery",
      hospitals: "Hospital C, Bengaluru", experience: "22+ years",
      expertise: "Robotic knee & hip replacement, sports injury repair",
      expertiseList: ["Knee Replacement", "Hip Replacement", "Robotic Surgery"],
      education: "MS Ortho — placeholder institution",
      awards: "Placeholder award / recognition",
      memberships: "Placeholder professional body",
      research: "Placeholder publications",
      opd: "Hospital C, Bengaluru — Tue/Thu, 11am–2pm",
      contact: "Via IndiaCure coordination team"
    },
    {
      id: "dr-3", name: "Dr. Priya Nair", dept: "Oncology",
      title: "Consultant, Surgical Oncology",
      hospitals: "Hospital B, Mumbai", experience: "15+ years",
      expertise: "Breast, GI and gynaecologic oncology surgery",
      expertiseList: ["Surgical Oncology", "Breast Cancer", "GI Cancer"],
      education: "MCh (Surgical Oncology) — placeholder institution",
      awards: "Placeholder award / recognition",
      memberships: "Placeholder professional body",
      research: "Placeholder publications",
      opd: "Hospital B, Mumbai — Mon–Fri, 9am–12pm",
      contact: "Via IndiaCure coordination team"
    },
    {
      id: "dr-4", name: "Dr. Arjun Kapoor", dept: "Neurosurgery",
      title: "Senior Consultant, Neurosurgery",
      hospitals: "Hospital B, Mumbai", experience: "20+ years",
      expertise: "Minimally invasive spine and brain tumour surgery",
      expertiseList: ["Brain Tumour", "Spine Surgery", "Minimally Invasive"],
      education: "MCh (Neurosurgery) — placeholder institution",
      awards: "Placeholder award / recognition",
      memberships: "Placeholder professional body",
      research: "Placeholder publications",
      opd: "Hospital B, Mumbai — Wed/Fri, 3pm–6pm",
      contact: "Via IndiaCure coordination team"
    },
    {
      id: "dr-5", name: "Dr. Meera Iyer", dept: "Bariatric Surgery",
      title: "Consultant, Bariatric & Metabolic Surgery",
      hospitals: "Hospital A, Delhi", experience: "13+ years",
      expertise: "Gastric sleeve, gastric bypass, revision surgery",
      expertiseList: ["Gastric Sleeve", "Gastric Bypass", "Metabolic Surgery"],
      education: "MS General Surgery — placeholder institution",
      awards: "Placeholder award / recognition",
      memberships: "Placeholder professional body",
      research: "Placeholder publications",
      opd: "Hospital A, Delhi — Tue/Thu, 10am–1pm",
      contact: "Via IndiaCure coordination team"
    },
    {
      id: "dr-6", name: "Dr. Vikram Rao", dept: "Urology",
      title: "Director, Urology & Renal Transplant",
      hospitals: "Hospital C, Bengaluru", experience: "19+ years",
      expertise: "Kidney transplant, robotic prostatectomy, stone management",
      expertiseList: ["Kidney Transplant", "Robotic Surgery", "Stone Management"],
      education: "MCh (Urology) — placeholder institution",
      awards: "Placeholder award / recognition",
      memberships: "Placeholder professional body",
      research: "Placeholder publications",
      opd: "Hospital C, Bengaluru — Mon/Wed, 2pm–5pm",
      contact: "Via IndiaCure coordination team"
    }
  ];
  window.DOCTORS = DOCTORS;

  var deptFilterEl = document.querySelector(".dept-filter");
  var doctorGridEl = document.querySelector(".doctor-grid");
  var docCountEl = document.querySelector(".doc-count");
  var activeDept = "All";

  function rowHtml(label, value) {
    if (!value) return "";
    return '<div><dt>' + label + '</dt><dd>' + value + '</dd></div>';
  }

  function renderDoctors() {
    if (!doctorGridEl) return;
    var list = activeDept === "All" ? DOCTORS : DOCTORS.filter(function (d) { return d.dept === activeDept; });

    if (docCountEl) {
      docCountEl.textContent = list.length + (list.length === 1 ? " specialist" : " specialists");
    }

    doctorGridEl.innerHTML = list.map(function (d) {
      var chips = (d.expertiseList || []).slice(0, 3).map(function (c) {
        return '<span class="doctor-chip">' + c + '</span>';
      }).join("");
      var rows = [
        rowHtml("Areas of expertise", d.expertise),
        rowHtml("Experience", d.experience),
        rowHtml("Education &amp; training", d.education),
        rowHtml("Awards &amp; accomplishments", d.awards),
        rowHtml("Memberships", d.memberships),
        rowHtml("Research &amp; publications", d.research),
        rowHtml("OPD location &amp; timings", d.opd),
        rowHtml("Contact", d.contact)
      ].join("");

      return (
        '<article class="doctor-card">' +
          '<div class="doctor-head">' +
            '<div class="doctor-photo">Photo</div>' +
            '<div>' +
              '<h3>' + d.name + '</h3>' +
              '<div class="doctor-dept">' + d.dept + '</div>' +
            '</div>' +
          '</div>' +
          '<p class="doctor-title">' + d.title + '</p>' +
          '<p class="doctor-hospitals">' + d.hospitals + '</p>' +
          '<div class="doctor-chips">' + chips + '</div>' +
          '<details class="doctor-details">' +
            '<summary>Full profile ' +
              '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"></path></svg>' +
            '</summary>' +
            '<dl class="doctor-rows">' + rows + '</dl>' +
          '</details>' +
          '<a class="section-link" href="#consult">Request an appointment ' +
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"></path></svg>' +
          '</a>' +
        '</article>'
      );
    }).join("");
  }

  if (deptFilterEl) {
    var depts = ["All"].concat(DOCTORS.map(function (d) { return d.dept; }).filter(function (v, i, a) { return a.indexOf(v) === i; }));
    deptFilterEl.innerHTML = depts.map(function (name) {
      return '<button type="button" class="dept-btn' + (name === "All" ? " active" : "") + '" data-dept="' + name + '">' + name + '</button>';
    }).join("");

    deptFilterEl.addEventListener("click", function (e) {
      var btn = e.target.closest(".dept-btn");
      if (!btn) return;
      activeDept = btn.getAttribute("data-dept");
      deptFilterEl.querySelectorAll(".dept-btn").forEach(function (b) {
        b.classList.toggle("active", b === btn);
      });
      renderDoctors();
    });
  }
  renderDoctors();

  /* ---------- patient stories carousel ---------- */
  var track = document.querySelector(".story-track");
  var dotsWrap = document.querySelector(".story-dots");
  var slideCount = track ? track.children.length : 0;
  var slideIndex = 0;
  var autoplayTimer = null;

  function goToSlide(i) {
    slideIndex = (i + slideCount) % slideCount;
    if (track) track.style.transform = "translateX(-" + (slideIndex * 100) + "%)";
    if (dotsWrap) {
      dotsWrap.querySelectorAll(".story-dot").forEach(function (d, idx) {
        d.classList.toggle("active", idx === slideIndex);
      });
    }
  }

  function restartAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
    if (slideCount > 1) {
      autoplayTimer = setInterval(function () { goToSlide(slideIndex + 1); }, 7000);
    }
  }

  if (track && slideCount > 0) {
    if (dotsWrap) {
      dotsWrap.innerHTML = "";
      for (var i = 0; i < slideCount; i++) {
        var dot = document.createElement("button");
        dot.type = "button";
        dot.className = "story-dot" + (i === 0 ? " active" : "");
        dot.setAttribute("aria-label", "Story " + (i + 1));
        (function (idx) {
          dot.addEventListener("click", function () { goToSlide(idx); restartAutoplay(); });
        })(i);
        dotsWrap.appendChild(dot);
      }
    }
    var prevBtn = document.querySelector(".story-prev");
    var nextBtn = document.querySelector(".story-next");
    if (prevBtn) prevBtn.addEventListener("click", function () { goToSlide(slideIndex - 1); restartAutoplay(); });
    if (nextBtn) nextBtn.addEventListener("click", function () { goToSlide(slideIndex + 1); restartAutoplay(); });
    goToSlide(0);
    restartAutoplay();
  }

  /* ---------- consultation form ---------- */
  var form = document.querySelector(".consult-form");
  if (form) {
    var fileInput = form.querySelector('input[type="file"]');
    var uploadLabel = form.querySelector(".upload-title");
    if (fileInput && uploadLabel) {
      fileInput.addEventListener("change", function () {
        var n = fileInput.files.length;
        uploadLabel.textContent = n
          ? n + " file" + (n > 1 ? "s" : "") + " attached"
          : "Choose files or drag them here";
      });
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = form.querySelector(".form-status");
      var submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.textContent = "Request received — we will be in touch";
      if (status) status.classList.add("visible");
      form.reset();
      if (uploadLabel) uploadLabel.textContent = "Choose files or drag them here";
    });
  }

  /* ---------- footer year ---------- */
  document.querySelectorAll(".footer-year").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
