'use strict'

class ScreenManager {
    constructor() {
        this.firstScreen = document.querySelector("#firstscreen");
        this.secondScreen = document.querySelector("#secondscreen");
        this.aboutScreen = document.querySelector("#about");
        this.circle = document.querySelector(".cirkel");
        this.sidenav = document.querySelector("#sidenav");
        this.mainElement = document.querySelector("main");

        this.init();
    }

    init() {
        window.addEventListener("load", () => {
            this.windowResize(); // Kald windowResize ved indlæsning
            if (window.innerWidth > 700) {
                this.firstScreenDisplay(); 
                // Vis firstscreen, hvis bredden er over 700px
            }
        });
        window.addEventListener("resize", () => this.windowResize());
        console.log("dit javaScript virker");
    }

    windowResize() {
        let widthScreen = document.querySelector("main").clientWidth;

        // Tjekker om firstScreen og secondScreen skal skjules
        if (widthScreen < 700) {
            // Skjul firstScreen og secondScreen
            this.firstScreen.classList.add("hide");
            this.secondScreen.classList.add("hide");

            // Vis sidenavigationen straks
            this.sidenav.classList.remove("hide");
        } else {
            // Vis firstScreen igen, hvis den er skjult og vinduet er stort nok
            if (this.firstScreen.classList.contains("hide")) {
                this.firstScreen.classList.remove("hide"); // Vis firstScreen som standard
                this.firstScreenDisplay(); // Vis førsteskærmen
            }
        }
    }

    firstScreenDisplay() {
        this.windowResize();
        this.hideAllScreens();
        this.firstScreen.classList.remove("hide");
        this.circle.classList.remove("zoom");

        setTimeout(() => this.getSecondScreen(), 1000);
    }

    getSecondScreen() {
        this.circle.classList.add("zoom");

        setTimeout(() => {
            this.hideAllScreens();
            this.secondScreen.classList.remove("hide");
            setTimeout(() => this.fadeOutSecondScreen(), 500);
        }, 500);
    }

    fadeOutSecondScreen() {
        this.secondScreen.classList.add("fade-up");

        const striber = this.secondScreen.querySelector(".striber");
        if (striber) {
            striber.classList.add("fade-up-slow");
        }

        setTimeout(() => {
            this.hideAllScreens();
            this.sidenav.classList.remove("hide");
            this.aboutScreen.classList.remove("hide");
            this.updateMainMargin(); // Opdater margin-left for main
        }, 1000);
    }

    hideAllScreens() {
        this.firstScreen.classList.add("hide");
        this.secondScreen.classList.add("hide");
        this.aboutScreen.classList.add("hide");
        this.sidenav.classList.add("hide");
        this.updateMainMargin(); // Opdater margin-left til 0px
    }

    updateMainMargin() {
        const main = document.querySelector('main');
        if (!this.sidenav.classList.contains('hide')) {
            main.style.marginLeft = '500px';
        } else {
            main.style.marginLeft = '0px';
        }
    }

}

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

// Opretter en variable af MultimediaDesigner hvis jeg beslutter at ændre i mit portfolio på et senere tidspunkt og derved får brug for den
const multimediadesigner = new MultimediaDesigner(
    "Victoria Vevest",
    "img/portrait.png", 
    "Kreativ og nysgerrig webudvikler med ambition og appetit for viden.",
    [ "HTML", "CSS", "JavaScript", "SCSS"]
);

// Opretter projekter og tilføjer dem til portfolio ved hjælp af Project-klassen
multimediadesigner.addPortfolioProject(
    new Project(
        "Beyond Branding",
        "En website for et made-up multimediedesign bureau som kreerer BOLD, brave and innovative webløsninger.", ["HTML", "CSS", "GitHub", "InDesign", "After Effects", "SASS", "SCSS", "Figma"], "img/beyond.png", "https://www.rannvagn.com/Branding/")
);

multimediadesigner.addPortfolioProject(
    new Project(
        "Mortens Kyllinger",
        "Et whack-a-mole spil kodet med JavaScript med formålet at lære spilleren om Bird in hand princippet, og om IBA Erhvervsakademi.", ["HTML", "CSS", "JavaScript", "Illustrator", "Figma", "GitHub"], "img/spil-start.png",
        "https://victoriavevest.com/mortenskyllinger/")
);

multimediadesigner.addPortfolioProject(
    new Project(
        "Real Relief",
        "En webside konstrueret med Wordpress, omhandlende et produkt, hvor virksomheden ville have det promoveret på en ny måde", [ "InDesign", "Figma", "Wordpress", "After Effects"], "img/realrelief.png",
        "https://rannvagn.com/wordpress/")
);

multimediadesigner.addPortfolioProject(
    new Project(
        "Digital Sikkerhed",
        "En website med fokus på at begå sig sikkert på nettet. Der er vha. JavaScript konstrueret en quizz med branching scenarios. ", ["HTML", "CSS", "JavaScript", "Illustrator", "Figma", "GitHub"], "img/digitaltryghed.png",
        "https://victoriavevest.com/datasikkerhed/")
);

multimediadesigner.addPortfolioProject(
    new Project(
        "Bedstemors Bordel",
        "Et whack-a-mole spil kodet i JavaScript. Animations stilen er inspireret af den japanske stil Kawaii. ", ["HTML", "CSS", "JavaScript", "Illustrator", "Figma", "GitHub"], "img/bedstemor.svg",
        "https://victoriavevest.com/spil/")
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
        //Tilføjer strukturen for hvordan projekterne skal vises
        projectDiv.innerHTML = `
            <h4>${project.name}</h4>
            <img src="${project.img}" alt="${project.name} Image" style="width: 100%; max-width: 300px;"> <!-- Tilføjet billede her -->
            <p>${project.description}</p>
            <div class="btn">
                <a href="${project.link}" target="_blank">Vis website</a>
            </div>
            <div class="skills">
                ${project.skills.map(skill => `<span>${skill}</span>`).join(" ")}
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
    skillButtonsContainer.innerHTML = ""; // Tømmer knaplisten så jeg kan putte noget i den

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

    // Opretter og tilføjer "Nulstil"-knappen EFTER færdighedsknapperne
    const resetButton = document.createElement('button');  
    resetButton.id = "resetButton";
    resetButton.textContent = "Nulstil";

    // Event listener der viser alle projekterne igen, når "Nulstil"-knappen klikkes
    resetButton.addEventListener("click", () => {
        displayProjects(multimediadesigner.portfolioProjects); 
    });

    skillButtonsContainer.appendChild(resetButton); // Tilføjer "Nulstil"-knappen til DOM'en
}

// Viser alle færdigheder som klikbare knapper
displaySkillButtons(multimediadesigner.skills);


