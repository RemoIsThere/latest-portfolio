document.addEventListener("DOMContentLoaded", () => {
  // Basic Form Elements
  const form = document.getElementById("resume-form");
  const resetBtn = document.getElementById("reset-btn");
  const downloadBtn = document.getElementById("download-btn");

  // Character Counter
  const summaryInput = document.getElementById("summary");
  const summaryCount = document.getElementById("summary-count");

  // Dynamic Containers
  const expContainer = document.getElementById("experience-container");
  const projContainer = document.getElementById("projects-container");
  const eduContainer = document.getElementById("education-container");
  const certContainer = document.getElementById("certifications-container");

  // Add Buttons
  const addExpBtn = document.getElementById("add-experience-btn");
  const addProjBtn = document.getElementById("add-project-btn");
  const addEduBtn = document.getElementById("add-education-btn");
  const addCertBtn = document.getElementById("add-cert-btn");

  // Templates
  const tplExp = document.getElementById("tpl-experience-form");
  const tplProj = document.getElementById("tpl-project-form");
  const tplEdu = document.getElementById("tpl-education-form");
  const tplCert = document.getElementById("tpl-cert-form");

  // -- Init Event Listeners --

  // Live update on input change
  form.addEventListener("input", () => {
    updatePreview();
  });

  // Summary character counter limit
  summaryInput.addEventListener("input", (e) => {
    const value = e.target.value;
    if (value.length > 500) {
      e.target.value = value.substring(0, 500);
    }
    summaryCount.textContent = e.target.value.length;
  });

  // Reset Form
  resetBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to reset all data?")) {
      form.reset();
      expContainer.innerHTML = "";
      projContainer.innerHTML = "";
      eduContainer.innerHTML = "";
      certContainer.innerHTML = "";
      // Add a default block for each
      addDynamicItem(expContainer, tplExp);
      addDynamicItem(eduContainer, tplEdu);
      summaryCount.textContent = "0";
      updatePreview();
    }
  });

  // Add dynamic items
  addExpBtn.addEventListener("click", () =>
    addDynamicItem(expContainer, tplExp),
  );
  addProjBtn.addEventListener("click", () =>
    addDynamicItem(projContainer, tplProj),
  );
  addEduBtn.addEventListener("click", () =>
    addDynamicItem(eduContainer, tplEdu),
  );
  addCertBtn.addEventListener("click", () =>
    addDynamicItem(certContainer, tplCert),
  );

  // Handle Remove buttons via event delegation
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
      e.target.closest(".dynamic-group").remove();
      updatePreview();
    }
  });

  // PDF Download
  downloadBtn.addEventListener("click", generatePDF);

  // -- Functions --

  function addDynamicItem(container, template) {
    const clone = template.content.cloneNode(true);
    container.appendChild(clone);
    updatePreview();
  }

  // Helper to format multiline text to bullet points
  function textToBullets(text) {
    if (!text || text.trim() === "") return "";
    const lines = text.split("\n").filter((line) => line.trim() !== "");
    if (lines.length === 0) return "";

    let html = "<ul>";
    lines.forEach((line) => {
      // Remove leading dash if user added it manually
      let cleanLine = line.trim().replace(/^[-•]\s*/, "");
      html += `<li>${escapeHTML(cleanLine)}</li>`;
    });
    html += "</ul>";
    return html;
  }

  // Basic HTML escaping
  function escapeHTML(str) {
    const p = document.createElement("p");
    p.textContent = str;
    return p.innerHTML;
  }

  function toggleSection(elementId, hasContent) {
    const el = document.getElementById(elementId);
    if (el) {
      if (hasContent) {
        el.classList.remove("d-none");
      } else {
        el.classList.add("d-none");
      }
    }
  }

  function updatePreview() {
    // Basic Info
    const state = {
      fullName: document.getElementById("fullName").value.trim() || "John Doe",
      jobTitle:
        document.getElementById("jobTitle").value.trim() ||
        "Professional Title",
      email: document.getElementById("email").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      location: document.getElementById("location").value.trim(),
      linkedin: document.getElementById("linkedin").value.trim(),
      summary: document.getElementById("summary").value.trim(),
      techSkills: document.getElementById("techSkills").value.trim(),
      softSkills: document.getElementById("softSkills").value.trim(),
    };

    // Update Text
    document.getElementById("preview-name").textContent = state.fullName;
    document.getElementById("preview-title").textContent = state.jobTitle;

    // Contact Items
    const toggleContact = (id, val) => {
      const el = document.getElementById(id);
      if (val) {
        el.textContent = val;
        el.style.display = "inline";
      } else {
        el.style.display = "none";
      }
    };
    toggleContact("preview-email", state.email);
    toggleContact("preview-phone", state.phone);
    toggleContact("preview-location", state.location);
    toggleContact("preview-linkedin", state.linkedin);

    // Summary
    document.getElementById("preview-summary").textContent = state.summary;
    toggleSection("preview-summary-section", state.summary.length > 0);

    // Skills
    const techBox = document.getElementById("preview-tech-skills-box");
    const softBox = document.getElementById("preview-soft-skills-box");

    if (state.techSkills) {
      techBox.style.display = "block";
      document.getElementById("preview-tech-skills").textContent =
        state.techSkills;
    } else {
      techBox.style.display = "none";
    }

    if (state.softSkills) {
      softBox.style.display = "block";
      document.getElementById("preview-soft-skills").textContent =
        state.softSkills;
    } else {
      softBox.style.display = "none";
    }

    toggleSection(
      "preview-skills-section",
      state.techSkills.length > 0 || state.softSkills.length > 0,
    );

    // Update Dynamic Sections
    updateDynamicSection(
      "experience-container",
      "preview-experience-list",
      "preview-experience-section",
      (item) => {
        const title = item.querySelector(".exp-title").value.trim();
        const company = item.querySelector(".exp-company").value.trim();
        const duration = item.querySelector(".exp-duration").value.trim();
        const desc = item.querySelector(".exp-desc").value.trim();
        if (!title && !company) return "";

        return `
                    <div class="item-block">
                        <div class="item-header">
                            <div>
                                <span class="item-title">${escapeHTML(title)}</span>
                                ${company ? `<span class="item-subtitle"> | ${escapeHTML(company)}</span>` : ""}
                            </div>
                            <div class="item-date">${escapeHTML(duration)}</div>
                        </div>
                        <div class="item-desc">${textToBullets(desc)}</div>
                    </div>
                `;
      },
    );

    updateDynamicSection(
      "projects-container",
      "preview-projects-list",
      "preview-projects-section",
      (item) => {
        const title = item.querySelector(".proj-title").value.trim();
        const tech = item.querySelector(".proj-tech").value.trim();
        const desc = item.querySelector(".proj-desc").value.trim();
        if (!title) return "";

        return `
                    <div class="item-block">
                        <div class="item-header">
                            <span class="item-title">${escapeHTML(title)}</span>
                            ${tech ? `<div class="item-meta">Technologies: ${escapeHTML(tech)}</div>` : ""}
                        </div>
                        <div class="item-desc">${textToBullets(desc)}</div>
                    </div>
                `;
      },
    );

    updateDynamicSection(
      "education-container",
      "preview-education-list",
      "preview-education-section",
      (item) => {
        const degree = item.querySelector(".edu-degree").value.trim();
        const school = item.querySelector(".edu-school").value.trim();
        const year = item.querySelector(".edu-year").value.trim();
        const score = item.querySelector(".edu-score").value.trim();
        if (!degree && !school) return "";

        return `
                    <div class="item-block">
                        <div class="item-header">
                            <div>
                                <span class="item-title">${escapeHTML(degree)}</span>
                                ${school ? `<span class="item-subtitle"> | ${escapeHTML(school)}</span>` : ""}
                            </div>
                            <div class="item-date">${escapeHTML(year)}</div>
                        </div>
                        ${score ? `<div class="item-desc" style="font-size: 9pt;">Score: ${escapeHTML(score)}</div>` : ""}
                    </div>
                `;
      },
    );

    updateDynamicSection(
      "certifications-container",
      "preview-certifications-list",
      "preview-certifications-section",
      (item) => {
        const name = item.querySelector(".cert-name").value.trim();
        const issuer = item.querySelector(".cert-issuer").value.trim();
        if (!name) return "";

        return `
                    <div class="item-block" style="margin-bottom: 0.3rem;">
                        <span class="item-title">${escapeHTML(name)}</span>
                        ${issuer ? ` - <span>${escapeHTML(issuer)}</span>` : ""}
                    </div>
                `;
      },
    );
  }

  function updateDynamicSection(
    containerId,
    previewListId,
    previewSectionId,
    htmlGenerator,
  ) {
    const container = document.getElementById(containerId);
    const previewList = document.getElementById(previewListId);
    const items = container.querySelectorAll(".dynamic-group");

    let html = "";
    let hasContent = false;

    items.forEach((item) => {
      const itemHtml = htmlGenerator(item);
      if (itemHtml) {
        html += itemHtml;
        hasContent = true;
      }
    });

    previewList.innerHTML = html;
    toggleSection(previewSectionId, hasContent);
  }

  // Initialize Application
  function init() {
    // Add one default experience and education block
    addDynamicItem(expContainer, tplExp);
    addDynamicItem(eduContainer, tplEdu);
    // Run initial update to clear placeholder texts from UI
    updatePreview();
  }

  function generatePDF() {
    // Trigger generic form validation mapping visually
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const element = document.getElementById("resume-preview");
    // Temporary adjustments for PDF generation to ensure pure white background and correct dimensions
    element.style.padding = "30px";
    element.style.background = "#ffffff";

    const name = document.getElementById("fullName").value.trim() || "Resume";
    const filename = `${name.replace(/\s+/g, "_")}_Resume.pdf`;

    const opt = {
      margin: 0,
      filename: filename,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    // Add a loading state to button
    const oldText = downloadBtn.textContent;
    downloadBtn.textContent = "Generating PDF...";
    downloadBtn.disabled = true;

    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .then(() => {
        // Restore button
        downloadBtn.textContent = oldText;
        downloadBtn.disabled = false;
      })
      .catch((err) => {
        console.error("PDF generation error: ", err);
        downloadBtn.textContent = oldText;
        downloadBtn.disabled = false;
        alert("An error occurred while generating the PDF.");
      });
  }

  // Start
  init();
});
