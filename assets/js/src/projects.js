import { select, selectAll } from "../utils.js";
import { projects as data } from "../data/projects.js";

export function projects() {
  select("#projects .cards-wrapper").innerHTML = renderProjects(data);

  const targets = selectAll("[more-details-target]");

  targets.forEach((element) => {
    element.addEventListener("click", () => {
      const targetId = element.getAttribute("more-details-target");
      const project = data.find(
        (element) => element.moreDetailsTarget === targetId
      );
      select(".project-details .container").innerHTML = renderDetails(project);
      /**
       * Show details
       */
      const elementTarget = select(".project-details");
      elementTarget.classList.add("active");
      /**
       * Close Button
       */
      select(".project-details .content .close").addEventListener(
        "click",
        () => {
          elementTarget.classList.remove("active");
        }
      );
      /**
       * Next & Prev Buttons
       */
      const slider = select("#slider");
      select("#slider-prev").addEventListener("click", () => {
        const sliderWidth = slider.offsetWidth;
        slider.scrollLeft -= sliderWidth;
      });

      select("#slider-next").addEventListener("click", () => {
        const sliderWidth = slider.offsetWidth;
        slider.scrollLeft += sliderWidth;
      });
      /**
       * Expand & Minimize Buttons
       */
      select("#expand").addEventListener("click", () => {
        // this is important for fix a problem, when expand is activated
        slider.scrollLeft = 0;
        // Change close button to white
        select(".project-details .container .content .close").style.color =
          "white";
        select(
          ".project-details .container .content .details .images-wrapper"
        ).classList.add("expand");
        select("#expand").classList.toggle("active");
        select("#minimize").classList.toggle("active");
      });
      select("#minimize").addEventListener("click", () => {
        slider.scrollLeft = 0;
        select(".project-details .container .content .close").style.color = "";
        select(
          ".project-details .container .content .details .images-wrapper"
        ).classList.remove("expand");
        select("#expand").classList.toggle("active");
        select("#minimize").classList.toggle("active");
      });

      select("#slider-next").addEventListener("click", () => {
        const sliderWidth = slider.offsetWidth;
        slider.scrollLeft += sliderWidth;
      });
    });
  });
}

function renderProjects(projectsArray) {
  return projectsArray
    .map(
      (project) => `
    <div class="card">
      <div class="${project.moreDetailsTarget ? "more-details" : ""}" 
           ${
             project.moreDetailsTarget
               ? `more-details-target="${project.moreDetailsTarget}"`
               : ""
           }>
        <img src="${project.imgs[0]}" />
      </div>
      <div class="card-body">
        <h4 class="card-title">${project.title}</h4>
        <div class="card-description line line-clamp-2">
          ${project.description}
        </div>
        <div class="badges-wrapper">
          ${project.tags
            .map((tag) => `<div class="badge">${tag}</div>`)
            .join("")}
        </div>
      </div>
    </div>
  `
    )
    .join("");
}

function renderDetails(detail) {
  return `<div class="content">
      <div class="close">
        <i class="fa-solid fa-xmark fa-xl"></i>
      </div>
      <div class="details">
        <div class="images-wrapper">
          <ul id="slider" class="hide-scroll">
            ${detail.imgs
              .map(
                (img) => `
              <li>
                <img src="${img}" />
              </li>
            `
              )
              .join("")}
          </ul>
          <div id="expand">
            <i class="fa-solid fa-expand"></i>
          </div>
          <div id="minimize" class="active">
            <i class="fa-solid fa-minimize"></i>
          </div>
          <div id="slider-prev">
            <i class="fa-solid fa-chevron-left"></i>
          </div>
          <div id="slider-next">
            <i class="fa-solid fa-chevron-right"></i>
          </div>
        </div>
        <div class="info">
          <h3 class="title">${detail.shortTitle}</h3>
          <p class="date">${detail.date}</p>
          <div class="my-2"></div>
          <p class="description">${detail.description}</p>
          <div class="my-2"></div>
          <h4>Technologies and Features</h4>
          <div class="my-2"></div>
          <div class="technologies">
            ${detail.technologies
              .map(
                (tech) => `
              <div class="tech">
                <i class="${tech.icon}"></i> ${tech.text}
              </div>
            `
              )
              .join("")}
          </div>
          <div class="my-2"></div>
          <h4>Links</h4>
          <div class="my-2"></div>
          <div class="link">
            ${detail.links
              .map(
                (link) => `
              <a target="_blank" href="${link.link}">
                <i class="${link.icon}"></i> ${link.text}
              </a>
            `
              )
              .join("")}
          </div>
        </div>
      </div>
    </div>
  `;
}
