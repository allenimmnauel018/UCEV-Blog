/* script.js - site-wide logic */
const toast = (() => {
  const el = document.getElementById("toast") || createToast();
  function createToast() {
    const d = document.createElement("div");
    d.id = "toast";
    d.className = "toast";
    document.body.appendChild(d);
    return d;
  }
  return {
    show(msg, t = 2400) {
      el.textContent = msg;
      el.classList.add("show");
      setTimeout(() => el.classList.remove("show"), t);
    },
  };
})();

// utilities
function navigate(path) {
  if (!path || path === "/") location.href = "index.html";
}
function toggleNav() {
  const navList = document.querySelector(".nav-list");
  const toggleBtn = document.querySelector(".nav-toggle");
  const isOpen = navList.style.display === "flex";
  navList.style.display = isOpen ? "none" : "flex";
  toggleBtn.setAttribute("aria-expanded", String(!isOpen));
  if (!isOpen) {
    // Close on Escape key
    document.addEventListener("keydown", closeOnEsc);
  } else {
    document.removeEventListener("keydown", closeOnEsc);
  }
}
function closeOnEsc(e) {
  if (e.key === "Escape") {
    toggleNav();
  }
}



// add year
document.addEventListener("DOMContentLoaded", () => {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
});

// Subscribe button demo (home)
function initHome() {
  document.getElementById("est-year")?.textContent &&
    (document.getElementById("est-year").textContent = "2008");
  document
    .getElementById("subscribeBtn")
    ?.addEventListener("click", () => toast.show("Subscribed — thanks! ✅"));

  // Get dept filter from URL
  const urlParams = new URLSearchParams(window.location.search);
  const filterDept = urlParams.get("dept") || "all";

  // load posts
  loadPosts().then((allPosts) => {
    window.ALL_POSTS = allPosts;
    setupHomeControls(allPosts);

    const filteredPosts =
      filterDept !== "all"
        ? allPosts.filter((p) => p.dept === filterDept)
        : allPosts;

    renderPosts(filteredPosts);

    if (filterDept !== "all") {
      const heading = document.querySelector("h2");
      if (heading) heading.textContent = `News — ${filterDept.toUpperCase()}`;
    }

    setupReveal();
  });
}

function initBasic() {
  // for simple pages
  document
    .getElementById("subscribeBtn")
    ?.addEventListener("click", () => toast.show("Subscribed — thanks! ✅"));
  setupReveal();
}

function initContact() {
  initBasic();
  const form = document.getElementById("contactForm");
  const msg = document.getElementById("formMessage");

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    toast.show("Message sent — we will contact you soon.");
    msg.textContent = "Your message has been sent successfully!";
    msg.className = "form-message success";
    msg.style.display = "block";
    setTimeout(() => {
      form.reset();
      msg.style.display = "none";
    }, 5000);
  });
}


// POSTS: load from posts.json
async function loadPosts() {
  try {
    const res = await fetch("data/posts.json");
    if (!res.ok) throw new Error("posts not found");
    const json = await res.json();
    // Sort newest first
    json.sort((a, b) => new Date(b.date) - new Date(a.date));
    return json;
  } catch (err) {
    // Fallback sample posts
    return [
      {
        id: 1,
        title: "Graduation Day 2024 — Highlights",
        dept: "all",
        tags: ["event"],
        date: "2024-12-28",
        excerpt:
          "The campus celebrated Graduation Day with joy, featuring keynote speeches, cultural performances, and the awarding of degrees to over 500 graduates.",
        content:
          "Full article detailing the chief guest’s speech, cultural programs, award winners, and student testimonials.",
      },
      {
        id: 2,
        title: "CSE Workshop — Full Stack Development",
        dept: "cse",
        tags: ["workshop", "cse"],
        date: "2024-09-15",
        excerpt:
          "Hands-on workshop on modern web stacks including MERN and deployment practices.",
        content:
          "Session covered HTML, CSS, JavaScript, React, Node.js, MongoDB, and deploying projects to cloud platforms. Industry experts guided students through real projects.",
      },
      {
        id: 3,
        title: "Placement Drive — 2024 Recruiters Visit",
        dept: "placement",
        tags: ["placement"],
        date: "2024-11-10",
        excerpt:
          "Over 30 top companies visited our campus offering diverse roles.",
        content:
          "Recruiters included Infosys, TCS, Wipro, Amazon, and Tech Mahindra. 85% of final-year students secured offers.",
      },
      {
        id: 4,
        title: "IoT Demo Day — ECE Department",
        dept: "ece",
        tags: ["iot", "ece"],
        date: "2024-08-25",
        excerpt: "Innovative IoT projects showcased by ECE students.",
        content:
          "Projects ranged from smart farming solutions to AI-based traffic management. Judged by industry professionals.",
      },
      {
        id: 5,
        title: "Civil Engineering — Bridge Design Contest",
        dept: "civil",
        tags: ["civil", "competition"],
        date: "2024-07-10",
        excerpt:
          "Annual contest to design sustainable bridges using simulation tools.",
        content:
          "Teams competed using STAAD.Pro, judged on innovation, stability, and sustainability.",
      },
      {
        id: 6,
        title: "National Level Hackathon Winners — CSE",
        dept: "cse",
        tags: ["achievement", "hackathon"],
        date: "2024-06-05",
        excerpt:
          "Our CSE students bagged the first prize at a national hackathon.",
        content:
          "Developed an AI-powered waste segregation system. Mentored by faculty and industry experts.",
      },
      {
        id: 7,
        title: "ECE Alumni Talk — Career in VLSI",
        dept: "ece",
        tags: ["seminar", "vlsi"],
        date: "2024-05-22",
        excerpt: "Alumnus from Intel shared insights into VLSI design careers.",
        content:
          "Covered semiconductor industry trends, job roles, and skill sets needed.",
      },
      {
        id: 8,
        title: "Library — Digital Resource Expansion",
        dept: "all",
        tags: ["academics", "library"],
        date: "2024-04-15",
        excerpt:
          "Library now offers 500+ new e-books and subscriptions to international journals.",
        content:
          "Students can access IEEE, Springer, and Elsevier resources from anywhere using the library portal.",
      },
      {
        id: 9,
        title: "Mechanical Engineering — Robotics Club Inauguration",
        dept: "mech",
        tags: ["robotics", "club"],
        date: "2024-03-28",
        excerpt:
          "Robotics club launched to encourage innovation in automation.",
        content:
          "Plans to participate in national robotics competitions and host workshops.",
      },
      {
        id: 10,
        title: "Annual Sports Meet — 2024",
        dept: "all",
        tags: ["sports", "event"],
        date: "2024-02-18",
        excerpt: "Inter-departmental sports meet held with great enthusiasm.",
        content:
          "Events included athletics, cricket, football, and volleyball. Winners were honored at the closing ceremony.",
      },
      {
        id: 11,
        title: "Cultural Fest — AURA 2024",
        dept: "all",
        tags: ["cultural", "event"],
        date: "2024-01-25",
        excerpt:
          "Three-day fest with music, dance, drama, and art competitions.",
        content:
          "Celebrity performances, student talent shows, and food stalls drew large crowds.",
      },
      {
        id: 12,
        title: "Placement Training Program — Soft Skills",
        dept: "placement",
        tags: ["training", "placement"],
        date: "2023-12-15",
        excerpt:
          "A month-long program to boost communication, aptitude, and interview skills.",
        content:
          "Sessions conducted by professional trainers with mock interviews and group discussions.",
      },
    ];
  }
}

/* HOME: render posts with filtering */
let postsToShow = 6;
const postsEl = document.getElementById("posts") || null;

function setupHomeControls(allPosts) {
  const search = document.getElementById("searchInput");
  const filter = document.getElementById("filterDept");
  document.getElementById("loadMore")?.addEventListener("click", () => {
    postsToShow += 6;
    renderPosts(window.ALL_POSTS);
  });
  search?.addEventListener("input", () => {
    postsToShow = 6;
    renderPosts(window.ALL_POSTS);
  });
  filter?.addEventListener("change", () => {
    postsToShow = 6;
    renderPosts(window.ALL_POSTS);
  });
}

function renderPosts(list) {
  const container = document.getElementById("posts");
  if (!container) return;
  const q = (document.getElementById("searchInput")?.value || "").toLowerCase();
  const dept = document.getElementById("filterDept")?.value || "all";
  const filtered = list.filter((p) => {
    const matchesDept =
      dept === "all" ||
      p.dept === dept ||
      (dept === "placement" && p.dept === "placement");
    const matchesQ =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      (p.tags && p.tags.join(" ").includes(q));
    return matchesDept && matchesQ;
  });
  container.innerHTML = "";
  filtered.slice(0, postsToShow).forEach((p, idx) => {
    const card = document.createElement("article");
    card.className = "post";
    card.innerHTML = `
      <div class="post-thumb"><strong style="color:var(--accent)">${p.dept.toUpperCase()}</strong></div>
      <h4>${p.title}</h4>
      <p>${p.excerpt}</p>
      <div class="meta"><span>${
        p.date
      }</span><a href="post.html?id=${encodeURIComponent(
      p.id
    )}">Read more</a></div>
    `;
    container.appendChild(card);
    setTimeout(() => card.classList.add("show"), idx * 120);
  });
  setupReveal();
}

/* SINGLE POST VIEW (post.html) */
async function initPost() {
  setupReveal();
  const id = new URLSearchParams(location.search).get("id");
  const container = document.getElementById("postContent");
  if (!container) return;
  const posts = window.ALL_POSTS || (await loadPosts());
  const p = posts.find((x) => String(x.id) === String(id)) || posts[0];
  if (!p) {
    container.innerHTML = "<p>Post not found.</p>";
    return;
  }
  container.innerHTML = `
    <article class="info-card">
      <h1>${p.title}</h1>
      <div class="meta" style="margin:8px 0;color:var(--muted)">${
        p.date
      } • ${p.dept.toUpperCase()}</div>
      <div class="post-body">${p.content || p.excerpt}</div>
      <div style="margin-top:14px"><a class="btn" href="index.html">Back to posts</a></div>
    </article>
  `;
}

/* Filters triggered by departments page */
function filterToDept(d) {
  location.href = `index.html?dept=${encodeURIComponent(d)}`;
}

/* Global reveal on scroll */
function setupReveal() {
  const els = document.querySelectorAll(".reveal, .fade-in, .post, .info-card");
  const trigger = () => {
    const t = window.innerHeight * 0.92;
    els.forEach((el) => {
      const top = el.getBoundingClientRect().top;
      if (top < t) el.classList.add("visible");
    });
  };
  window.removeEventListener("scroll", trigger);
  window.addEventListener("scroll", trigger);
  window.addEventListener("load", trigger);
  trigger();
}

// call this on pages where needed
document.addEventListener("DOMContentLoaded", () => {
  openDeptPageFromQuery();
});
document.addEventListener("DOMContentLoaded", async () => {
  initBasic();

  const urlParams = new URLSearchParams(window.location.search);
  const filterDept = urlParams.get("dept");

  const posts = await loadPosts();
  const filteredPosts =
    filterDept && filterDept !== "all"
      ? posts.filter((p) => p.dept === filterDept)
      : posts;

  renderPosts(filteredPosts);

  if (filterDept) {
    document.querySelector(
      "h2"
    ).textContent = `News — ${filterDept.toUpperCase()}`;
  }
});
function setActiveNav() {
  const currentPage = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-list a").forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    } else {
      link.classList.remove("active");
      link.removeAttribute("aria-current");
    }
  });
}

document.addEventListener("DOMContentLoaded", setActiveNav);

