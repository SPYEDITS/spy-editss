// Function to fetch project data from external JSON file
async function fetchProjects() {
    try {
      const response = await fetch('Projects/projects.json');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      return data.projects;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }
  
  // Function to create carousel items dynamically
  async function createCarouselItems() {
    const projects = await fetchProjects();
    const carouselIndicators = document.getElementById('carouselIndicators');
    const carouselInner = document.getElementById('carouselInner');
  
    projects.forEach((project, index) => {
      // Create carousel indicator
      const indicator = document.createElement('li');
      indicator.setAttribute('data-target', '#customCarouselIndicators');
      indicator.setAttribute('data-slide-to', index.toString());
      if (index === 0) {
        indicator.classList.add('active');
      }
      carouselIndicators.appendChild(indicator);
  
      // Create carousel item
      const carouselItem = document.createElement('div');
      carouselItem.classList.add('carousel-item');
      if (index === 0) {
        carouselItem.classList.add('active');
      }
      const projectItem = document.createElement('div');
      projectItem.classList.add('custom-project-item');
  
      const projectInfo = document.createElement('div');
      projectInfo.classList.add('custom-project-info');
  
      const projectImg = document.createElement('div');
      projectImg.classList.add('custom-project-img');
  
      const video = document.createElement('video');
      video.setAttribute('controls', '');
      video.setAttribute('src', project.src);
  
      // Add poster image if available
      if (project.poster) {
        video.setAttribute('poster', project.poster);
      }
  
      projectImg.appendChild(video);
      projectItem.appendChild(projectInfo);
      projectItem.appendChild(projectImg);
      carouselItem.appendChild(projectItem);
      carouselInner.appendChild(carouselItem);
    });
  }
  
  // Call the function to create carousel items
  createCarouselItems();

  /* ================= Clients ============ */

    // Function to create logo elements from JSON data
    function createLogoElementsFromJson(logosData) {
      return logosData.map(logo => {
        const logoContainer = document.createElement("div");
        logoContainer.classList.add("logo-container");
  
        const anchor = document.createElement("a");
        anchor.href = logo.href || "#"; // If href is not provided, fallback to #
  
        const image = document.createElement("img");
        image.src = logo.url;
        image.alt = logo.name; // Optionally set alt text
  
        anchor.appendChild(image);
        logoContainer.appendChild(anchor);
  
        return logoContainer;
      });
    }
  
    // Fetch data from external JSON file
    fetch('Projects/projects.json')
      .then(response => response.json())
      .then(data => {
        const logosSlides = document.querySelectorAll(".logos-slide");
        logosSlides.forEach((slide, index) => {
          const logosData = data.logos
          const logos = createLogoElementsFromJson(logosData);
          slide.append(...logos);
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  