// Opretter en class med en constructor til mine objekter
class ScreenManager {
    constructor() {
        this.firstScreen = document.querySelector("#firstscreen");
        this.secondScreen = document.querySelector("#secondscreen");
        this.aboutScreen = document.querySelector("#about");
        this.circle = document.querySelector(".cirkel");

        this.init();
    }

    init() {
        window.addEventListener("load", () => this.firstScreenDisplay());
        window.addEventListener("resize", () => this.windowResize());
        console.log("dit javaScript virker");
    }

    firstScreenDisplay() {
        console.log("vis titel skærm");
        this.windowResize();
        this.hideAllScreens();

        this.firstScreen.classList.remove("hide");
        this.circle.classList.add("pulse");

        // Fjerner zoom-klassen, så den kan aktiveres igen
        this.circle.classList.remove("zoom");

        this.circle.addEventListener("mouseover", () => this.getSecondScreen());
    }

    getSecondScreen() {
        console.log("getSecondscreen");
        // Adder zoom-klassen igen
        this.circle.classList.add("zoom");

        setTimeout(() => {
            this.hideAllScreens();
            this.secondScreen.classList.remove("hide");

            // Sætter tiden til fade-up
            setTimeout(() => this.fadeOutSecondScreen(), 500);
        }, 500);
    }

    fadeOutSecondScreen() {
        console.log("Fade out secondscreen");
        this.secondScreen.classList.add("fade-up");

        setTimeout(() => {
            this.hideAllScreens();
            this.aboutScreen.classList.remove("hide");
        }, 1000);
    }

    hideAllScreens() {
        console.log("hideAllScreens");
        this.firstScreen.classList.add("hide");
        this.secondScreen.classList.add("hide");
        this.aboutScreen.classList.add("hide");
    }

    windowResize() {
        let widthScreen = document.querySelector("main").clientWidth;
        // Sørger for and skærmen altid resizer 
    }
}

// Initialiserer min screenmanager
const screenManager = new ScreenManager();



// laver en klasse med en række metoder
class MultiMedieDesigner {
    #name
    #img
    #biography
    #skills
    #portfolioProject

    constructor(name, img, biography, skills, portfolioProject = [projectName, projectDesc, projectLink, projectSkills, projectImg]) {
        this.#name = name;
        this.#img = img;
        this.#biography = biography;
        this.#skills = skills;
        this.#portfolioProject = portfolioProject;
    }

    getName() {
        return this.#name;
    }

    setName(name) {
        this.#name = name;
    }

    getImg() {
        return this.#img;
    }

    setImg() {
        this.#img = img;
    }


    getBiography() {
        return this.#biography
    }

    setBiography(biography) {
        this.#biography = biography;
    }

    getSkills() {
        return this.#skills
    }

    setSkills(skills) {
        this.#skills = skills;
    }

    getPortfolioProject() {
        return this.#portfolioProject;
    }

    setPortfolioProject(portfolioProject) {
        this.#portfolioProject = portfolioProject;

    }

    addPortfolioProject(project) {
        this.#portfolioProject.push(project)
    }

    filterProjectsBySkill(skill) {
        if (skill === 'all') {
            return this.#portfolioProject;
        }
        return this.#portfolioProject.filter(project =>
            project.projectSkills && project.projectSkills.includes(skill)
        );
    }

}

// definere alle metoderne

const project = new MultiMedieDesigner("Marc Møller",
    "https://images.pexels.com/photos/69932/tabby-cat-close-up-portrait-69932.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "Web Developer",
    ["HTML", "CSS", "SASS", "SCSS", "JS", "Wordpress", "After Effects", "Illustrator", "Figma", "InDesign", "Adobe Xd"],
    [
        { projectName: "Quizcoon", projectDesc: "Quiz Game about Entrepreneurship", projectLink: "https://game.marcm.dk", projectSkills: ["JS"], projectImg: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
        { projectName: "The Movie Zone", projectDesc: "Science Fiction hjemmeside lavet i Bootstrap", projectLink: "https://tmz.marcm.dk", projectSkills: ["HTML", "CSS"], projectImg: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" }
    ])


console.log(project.getPortfolioProject());


//smider det over til HTML 

const displayProjects = (projectsToDisplay = project.getPortfolioProject()) => {
    const projectCards = document.getElementById('projectCards')

    projectCards.innerHTML = '';

    projectsToDisplay.forEach((project) => {
        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card')

        projectCard.innerHTML = `
            <div class="project-details" id="projectDetails">
            <h3>${project.projectName}</h3>
              <div class="skill-tags">${project.projectSkills.map(skill => `<span>${skill}</span>`).join(' ')} </div>
            <p>${project.projectDesc}</p>
            <a href="${project.projectLink}" target="_blank">View Project</a>
    
            </div>
            <div class="project-img" id="projectImg">
                <img src=${project.projectImg} alt="" >
            </div>
        `

        projectCards.appendChild(projectCard)
    });
}

const displayDetails = () => {
    const myDetails = document.getElementById('myDetails');

    const name = project.getName();
    const img = project.getImg();
    const biography = project.getBiography();
    const mySkills = project.getSkills();

    myDetails.innerHTML = `
      <div>
           <img src=${img} alt="">
        </div>
        <div>
            <h2>${name}</h2>
            <span>${biography}</span>
            <div></div>
        </div>
        `;
}


window.onload = () => {

    displayDetails();
    displayProjects();

}

// laver nyt project

project.addPortfolioProject({
    projectName: "Colossal Cave Adventure",
    projectDesc: "A game where players use written commands to interact with the game.",
    projectLink: "https://cc.marcm.dk",
    projectSkills: ["HTML", "CSS", "JS"],
    projectImg: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"

})


//Filtere projekterne

document.getElementById('filterHTML').addEventListener('click', () => {
    const filteredProjects = project.filterProjectsBySkill("HTML");
    displayProjects(filteredProjects);
});

document.getElementById('filterCSS').addEventListener('click', () => {
    const filteredProjects = project.filterProjectsBySkill("CSS");
    displayProjects(filteredProjects);
});

document.getElementById('filterJS').addEventListener('click', () => {
    const filteredProjects = project.filterProjectsBySkill("JS");
    displayProjects(filteredProjects);
});



