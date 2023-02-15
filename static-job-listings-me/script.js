const main = document.querySelector("main");
let filters = [];

function listJobs(jobs) {

  for (let i = 0; i < jobs.length; i++) {
    let postings = jobs[i];

    const section = document.createElement("section");
    section.className = "card";

    const div1 = document.createElement("div");
    section.appendChild(div1);
    
    const div2 = document.createElement("div");
    div2.className = "flex";
    div1.appendChild(div2);

    const avatarImg = document.createElement("img");
    avatarImg.className = "avatar"
    avatarImg.src = `${postings.logo}`;
    avatarImg.alt = `${postings.company}`;
    div2.appendChild(avatarImg);
    

    const div3 = document.createElement("div"); 
    div2.appendChild(div3);

    const div4 = document.createElement("div");
    div4.className = "first-part";
    div3.appendChild(div4);
    
    const firstH5 = document.createElement("h5");
    firstH5.className = "dark-cyan";
    div3.appendChild(firstH5);

    const div5 = document.createElement("div");
    div5.className = "feature";
    div4.appendChild(div5);

    const firstP = document.createElement("p");
    div5.appendChild(firstP);
    firstP.innerHTML = `New!`

    const secondP = document.createElement("p");
    div5.appendChild(secondP);
    secondP.innerHTML = `Featured`

    const secondH5 = document.createElement("h5"); 
    div3.appendChild(secondH5);
    secondH5.innerHTML = postings.position;

    const div6 = document.createElement("div");
    div6.className = "description";
    div3.appendChild(div6);

    const thirdP = document.createElement("p");
    div6.appendChild(thirdP);
    thirdP.innerHTML = postings.postedAt;
    
    const forthP = document.createElement("p");
    div6.appendChild(forthP);
    forthP.innerHTML = postings.contract;
    
    const fifthP = document.createElement("p");
    div6.appendChild(fifthP);
    fifthP.innerHTML = postings.location;
    
    const hr = document.createElement("hr");
    div1.appendChild(hr);

    const div7 = document.createElement("div");      
    section.appendChild(div7);
    
    const div8 = document.createElement("div");
    div8.className = "skills";
    div7.appendChild(div8);

    const button1 = document.createElement("button");
    button1.className = "dark-cyan";
    button1.innerHTML = postings.role;
    div8.appendChild(button1);
    button1.onclick = function() {
      addFilter(button1.innerHTML, "role");
    }
    
    const button2 = document.createElement("button");
    button2.className = "dark-cyan";
    button2.innerHTML = postings.level;
    div8.appendChild(button2);
    button2.onclick = function() {
      addFilter(button2.innerHTML, "level");          
    };
    
    for (let j = 0; j < postings.languages.length; j++) {
          const element = postings.languages[j];
          const buttons = document.createElement("button");
          buttons.className = "dark-cyan";
          buttons.innerHTML = element;
          buttons.onclick = function() {
            addFilter(element, "language");
          };
          div8.appendChild(buttons);
          //  section += `<button class="dark-cyan"></button>`;
    }

    main.appendChild(section);
}

}

const filteredContainer = document.getElementById("filtered-container");
const filterContent = document.createElement("div");
filterContent.className = "filtered-content";

filteredContainer.appendChild(filterContent);


const filterClear = document.createElement("div");
filterClear.className = "filter-clear";
filteredContainer.appendChild(filterClear);

const clear = document.createElement("span");
clear.className = "clear";
clear.innerHTML = `clear`;
filterClear.appendChild(clear);



function removeFilter(val, type) {
  const filteredFilters = filters.filter(function (filterVal) {
    return filterVal.value !== val && filterVal.type !== type;
  })

  filters = filteredFilters;

  fetch("./data.json")
  .then(function(response) {
      return response.json();
  }).then (function (data){
    console.log(data);
    const filterData = data.filter(function(posting, index) {
      const thereIsRole = filters.some(function(val, index) { return val.type === "role" }) ? filters.find(function(filter) { return filter.type === "role"}).value === posting.role : true

      const thereIsLevel = filters.some(function(val, index) { return val.type === "level" }) ? filters.find(function(filter) { return filter.type === "level"}).value === posting.level : true

      const thereIsLanguage = filters.some(function(val, index) { return val.type === "language" }) ? filters.filter(function(filter) {return filter.type === "language"}).every(function(filter) { return posting.languages.indexOf(filter.value) > -1}) : true
      
      return thereIsRole && thereIsLevel && thereIsLanguage
    })
    main.innerHTML = "";
    listJobs(filterData);  
  })

}


function addFilter(val, type) {

  if(!filters.some(function(filter, index) { return filter.type === type && filter.value === val })) {
    filters.push({value: val, type: type});
    console.log(filters);

    fetch("./data.json")
        .then(function(response) {
            return response.json();
        }).then (function (data){
          console.log(data);
          const filterData = data.filter(function(posting, index) {
            const thereIsRole = filters.some(function(val, index) { return val.type === "role" }) ? filters.find(function(filter) { return filter.type === "role"}).value === posting.role : true

            const thereIsLevel = filters.some(function(val, index) { return val.type === "level" }) ? filters.find(function(filter) { return filter.type === "level"}).value === posting.level : true

            const thereIsLanguage = filters.some(function(val, index) { return val.type === "language" }) ? filters.filter(function(filter) {return filter.type === "language"}).every(function(filter) { return posting.languages.indexOf(filter.value) > -1}) : true
            
            return thereIsRole && thereIsLevel && thereIsLanguage
          })
          main.innerHTML = "";
          listJobs(filterData);  
        })

          
              filteredContainer.classList.add("active");
          
            const spann = document.createElement("span");
            // spann.className = "filter-span";
            filterContent.appendChild(spann);

            const spanChild = document.createElement("span");
            spann.appendChild(spanChild);
            
            const img = document.createElement("img");
            // img.className = "remove-filter";
            img.src ="./images/icon-remove.svg";
            spann.appendChild(img);
             
            spanChild.innerHTML = val;
            filterContent.appendChild(spann);
                        
            img.onclick = function() {
                spann.innerHTML = "";
                spann.style.display = "none";

                removeFilter(val, type);
                
            }


          
          
        }

}


clear.onclick = function() {
  filteredContainer.classList.remove("active");
  // spann.style.display = "none";
  filters = [];
  console.log("New filters", filters);
  main.innerHTML = "";
  filterContent.innerHTML = "";

  fetch("./data.json")
  .then(function(response) {
      return response.json();
  }).then (function (data){
    console.log(filters);
    listJobs(data);  
    console.log(filters);
  });
}

fetch("./data.json")
    .then(function(response) {
        return response.json();
    }).then (function (data){
      listJobs(data);  
    });