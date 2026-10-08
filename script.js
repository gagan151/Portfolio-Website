(() => {
  "use strict";

  const account = "gagan151";
  const list = document.getElementById("repository-list");
  const status = document.getElementById("repository-status");
  if (!list || !status) return;

  // The initial HTML is the saved collection, including for visitors without JavaScript.
  // These descriptions also enrich live cards when GitHub has no description.
  const descriptions = {
    "fomo-reader":
      "Solana trader research, market validation, and evidence-based signal analysis.",
    "Trading-Dashboard":
      "Cross-platform futures dashboard with live charts and market event detection.",
    GreenShot:
      "On-device basketball detection and shot trajectory analysis for iPhone.",
    "gagan151.github.io": "GitHub Pages website repository.",
    "Portfolio-Website": "The source for this software developer portfolio.",
  };
  const featuredOrder = ["fomo-reader", "Trading-Dashboard", "GreenShot"];

  function safeWebsite(value) {
    if (typeof value !== "string" || !value.trim()) return null;
    try {
      const url = new URL(value);
      return ["https:", "http:"].includes(url.protocol) &&
        !url.username &&
        !url.password
        ? url.href
        : null;
    } catch {
      return null;
    }
  }

  function validateRepository(repo) {
    if (
      !repo ||
      typeof repo.name !== "string" ||
      !/^[a-zA-Z0-9_.-]+$/.test(repo.name)
    ) {
      throw new Error("Invalid repository record");
    }
    if (
      typeof repo.html_url !== "string" ||
      repo.html_url !== `https://github.com/${account}/${repo.name}`
    ) {
      throw new Error("Invalid repository URL");
    }
    return repo;
  }

  function element(tag, className, content) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (content !== undefined) node.textContent = content;
    return node;
  }

  function repositoryCard(repo) {
    const card = element("article", "repository");
    const copy = element("div");
    const heading = element("h4");
    const source = element("a", "", repo.name);
    source.href = repo.html_url;
    const arrow = element("span", "", "↗");
    arrow.setAttribute("aria-hidden", "true");
    source.append(" ", arrow);
    heading.append(source);
    if (repo.fork === true)
      heading.append(element("span", "repo-badge", "Fork"));
    if (repo.archived === true)
      heading.append(element("span", "repo-badge", "Archived"));
    const description =
      typeof repo.description === "string" && repo.description.trim()
        ? repo.description
        : descriptions[repo.name] ||
          "Explore the source code and project details on GitHub.";
    copy.append(heading, element("p", "", description));
    const homepage = safeWebsite(repo.homepage);
    if (homepage) {
      const demo = element("a", "demo-link", "Visit project website ↗");
      demo.href = homepage;
      copy.append(demo);
    }
    const language =
      typeof repo.language === "string" && repo.language.trim()
        ? repo.language
        : "Source code";
    card.append(copy, element("span", "language", language));
    return card;
  }

  async function refreshRepositories() {
    status.textContent =
      "Showing the saved collection. Checking GitHub for updates…";
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    try {
      const repositories = [];
      for (let page = 1; ; page += 1) {
        const response = await fetch(
          `https://api.github.com/users/${account}/repos?type=owner&per_page=100&sort=updated&page=${page}`,
          {
            signal: controller.signal,
            headers: { Accept: "application/vnd.github+json" },
          },
        );
        if (!response.ok) throw new Error("GitHub request failed");
        const records = await response.json();
        if (!Array.isArray(records)) throw new Error("Invalid GitHub response");
        repositories.push(...records.map(validateRepository));
        if (records.length < 100) break;
      }
      const unique = [
        ...new Map(repositories.map((repo) => [repo.name, repo])).values(),
      ];
      unique.sort((a, b) => {
        const aRank = featuredOrder.includes(a.name)
          ? featuredOrder.indexOf(a.name)
          : featuredOrder.length;
        const bRank = featuredOrder.includes(b.name)
          ? featuredOrder.indexOf(b.name)
          : featuredOrder.length;
        return aRank - bRank || a.name.localeCompare(b.name);
      });
      // Replace only after all pages validate, so partial failures preserve the saved collection.
      const fragment = document.createDocumentFragment();
      unique.forEach((repo) => fragment.append(repositoryCard(repo)));
      if (!unique.length)
        fragment.append(
          element(
            "p",
            "repository-status",
            "No public repositories are currently available on this GitHub account.",
          ),
        );
      list.replaceChildren(fragment);
      status.textContent = `Updated from GitHub · ${unique.length} public ${unique.length === 1 ? "repository" : "repositories"}`;
    } catch {
      status.textContent =
        "GitHub updates are unavailable right now. Showing the saved project collection.";
    } finally {
      clearTimeout(timeout);
    }
  }

  refreshRepositories();
})();
