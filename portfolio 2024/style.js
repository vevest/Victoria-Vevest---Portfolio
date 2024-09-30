
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

        // Fjerner zoom-klassen, så den kan aktiveres igen
        this.circle.classList.remove("zoom");

        // Starter zoom-animationen igen
        setTimeout(() => {
            this.getSecondScreen();
        }, 1000); 
    }

    getSecondScreen() {
        console.log("getSecondscreen");
        // Adder zoom-klassen
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

        // Finder .striber classen og tilføjer fade-up-slow animation
        const striber = this.secondScreen.querySelector(".striber");
        if (striber) {
            console.log("Striber elementet blev fundet", striber);
            striber.classList.add("fade-up-slow");  
        }

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
        // Sørger for at skærmen altid resizer 
    }
}

// Initialiserer min screenmanager
const screenManager = new ScreenManager();






// Opretter en separat klasse til projektet i mit portfolio for bedre struktur af hvad der indgår
class Project {
    constructor(name, description, skills = [], img, link,) {
        this.name = name;
        this.description = description;
        this.skills = skills;
        this.img = img;
        this.link = link;
    }
}

class MultimediaDesigner {
    #name;
    #img;
    #biography;
    #skills;
    #portfolioProjects;

    constructor(name, img, biography, skills = []) {
        this.#name = name;
        this.#img = img;
        this.#biography = biography;
        this.#skills = skills;
        this.#portfolioProjects = [];
    }

    // Getters for at få værdier (ingen brug af separate metoder som `getName`, `getBiography` osv.)
    get name() {
        return this.#name;
    }

    get biography() {
        return this.#biography;
    }

    get skills() {
        return this.#skills;
    }

    get portfolioProjects() {
        return this.#portfolioProjects;
    }
  

    // Metode til at tilføje et projekt
    addPortfolioProject(project) {
      //tjekker at argumentet er en instance af projektklassen, hvis den er bliver den føjet til portfolioprojects
        if (project instanceof Project) {
            this.#portfolioProjects.push(project);
          //hvis den ikke er bliver der logget fejlmeddelse
        } else {
            console.error("Invalid project format");
        }
    }

    // Metode til at filtrere projekter baseret på en færdighed
    filterProjectsBySkill(skill) {
        return this.#portfolioProjects.filter(project =>
            project.skills.includes(skill)
        );
    }
}

// Opretter en variable af MultimediaDesigner 
const multimediadesigner = new MultimediaDesigner(
    "Victoria Vevest",
    "img/placeholder.jpg", // Mangler billede
    "Creative and curious designer, with ambition and appetite for knowledge",
    ["HTML", "CSS", "JavaScript", "React", "Typescript", "Illustrator", "Figma", "After Effects", "InDesign", "WordPress", "GitHub", "SASS", "SCSS"]
);

// Opretter projekter og tilføjer dem til portfolio ved hjælp af Project-klassen
multimediadesigner.addPortfolioProject(
    new Project(
        "Beyond Branding",
        "A Multimedia design bureau that creates bold, brave and innovative web-solutions", ["HTML", "CSS", "GitHub", "InDesign", "After Effects", "SASS", "SCSS", "Figma"], "img/placeholder.jpg", "https://www.rannvagn.com/Branding/")
);

multimediadesigner.addPortfolioProject(
    new Project(
        "GAME: Mortens Kyllinger",
        "A whack-a-mole game made to inform players about the 'bird in hand' concept, and about IBA-Erhvervsakademi in general", ["HTML", "CSS", "JavaScript", "Illustrator", "Figma", "GitHub"], "img/placeholder.jpg",
        "https://victoriavevest.com/mortenskyllinger/")
);

console.log(multimediadesigner.portfolioProjects);

//Nu vil jeg gerne vise det på min website og jeg bruger nu min html

// Funktion til at vise projekter på siden
function displayProjects(projects) {
    const projectList = document.getElementById("projectList");
    projectList.innerHTML = ""; // Tømmer projektlisten

    projects.forEach(project => {
        // Opret HTML for hvert projekt
        const projectDiv = document.createElement("div");
        projectDiv.classList.add("project");

        projectDiv.innerHTML = `
            <h2>${project.name}</h2>
            <img src="${project.img}" alt="${project.name} Image" style="width: 100%; max-width: 300px;"> <!-- Tilføjet billede her -->
            <p>${project.description}</p>
            <a href="${project.link}" target="_blank">View Project</a>
            <div class="skills">
                <strong>Skills:</strong> ${project.skills.map(skill => `<span>${skill}</span>`).join(" ")}
            </div>
        `;

        projectList.appendChild(projectDiv); // Tilføj projektet til DOM'en
    });
}

// Viser alle projekter ved første indlæsning
displayProjects(multimediadesigner.portfolioProjects);

// Funktion til at vise knapper for færdigheder
function displaySkillButtons(skills) {
    const skillButtonsContainer = document.getElementById("skillButtons");
    skillButtonsContainer.innerHTML = ""; // Tømmer knaplisten

    skills.forEach(skill => {
        const button = document.createElement("button");
        button.textContent = skill;

        // Event listener for klik på færdigheds-knap
        button.addEventListener("click", () => {
            const filteredProjects = multimediadesigner.filterProjectsBySkill(skill);
            displayProjects(filteredProjects);
        });

        skillButtonsContainer.appendChild(button); // Tilføj knappen til DOM'en
    });
}

// Viser alle færdigheder som klikbare knapper
displaySkillButtons(multimediadesigner.skills);


