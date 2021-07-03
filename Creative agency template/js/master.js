//check if there is local storage color option
let mainColors = localStorage.getItem("color_option");

if (mainColors != null) {
  //console.log('Local Storage is Not Empty You can Set It On root Now');
  //console.log(localStorage.getItem("color_option"));

  document.documentElement.style.setProperty("--main-color", mainColors);

  //Remove active class From All List items
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");

    //Add Active class On Element With Data-color === Local Storage Item
    if (element.dataset.color === mainColors) {
      //Add active calss
      element.classList.add("active");
    }
  });
}

// Random Background option
let backgroundOption = true;

//variable To control background interval
let backgroundInterval;

//check if there's Local Storage Random Background Item
let backgroundLocalItem = localStorage.getItem("background_option");

//Check if Random Background Local storage is empty
if (backgroundLocalItem != null) {
  //Remove active class from all spans
  document.querySelectorAll(".random-backgrounds span").forEach((element) => {
    element.classList.remove("active");

    if (backgroundLocalItem == "true") {
      backgroundOption = true;
      document
        .querySelector(".random-backgrounds .yes")
        .classList.add("active");
    } else {
      backgroundOption = false;
      document.querySelector(".random-backgrounds .no").classList.add("active");
    }
  });
}

//---------------------------------------------------------------------------------------------//

//Toggle spin Class On Icon
document.querySelector(".toggle-setting .fa-cogs").onclick = function () {
  this.classList.toggle("fa-spin"); //Toggle Class Fa-spin For Rotation on self

  document.querySelector(".settings-box").classList.toggle("open"); //Toggle class open  On main settings Box
};

//---------------------------------------------------------------------------------------------//

//Switch Colors
const ColorsLi = document.querySelectorAll(".colors-list li");

//Loop On All list Items
ColorsLi.forEach((li) => {
  //Click On Every List Items
  li.addEventListener("click", (e) => {
    //Set Color on Root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    //Set color On local storage
    localStorage.setItem("color_option", e.target.dataset.color);

    handleActive(e);
  });
});

//Switch random backgrounds option
const randomBackEl = document.querySelectorAll(".random-backgrounds span");

//Loop On All spans
randomBackEl.forEach((span) => {
  //Click On Every span
  span.addEventListener("click", (e) => {
    handleActive(e);

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizedImgs();
      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background_option", false);
    }
  });
});

//---------------------------------------------------------------------------------------------//

// select Landing page element
let landingpage = document.querySelector(".Landing-page");

//Get Array Of images
let imagesArray = [
  "926492.jpg",
  "1014033.jpg ",
  "2029165.jpg",
  "2637581.jpg ",
  "q18vfzjgb5f21.jpg ",
];

//Function to Randomized Images
function randomizedImgs() {
  if (backgroundOption == true) {
    backgroundInterval = setInterval(function () {
      //Get random Number
      let randomNumber = Math.floor(Math.random() * imagesArray.length);

      //Change background image url
      landingpage.style.background =
        'url("images/' + imagesArray[randomNumber] + '") no-repeat';
      landingpage.style.backgroundSize = "100% 100%";
    }, 6000);
  }
}

//---------------------------------------------------------------------------------------------//

randomizedImgs();

//---------------------------------------------------------------------------------------------//

///Select skills selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  //Skills offset Top(بداية العنصر عند وين بتبلش)
  let skillsOffsetTop = ourSkills.offsetTop;

  // skills Outer Height(ارتفاع العنصر نفسه )
  let skillsOuterHeight = ourSkills.offsetHeight;

  //window Height(ارتفاع الويندو كامل)
  let WindowHeigth = this.innerHeight;

  //Window ScrollTop(قديش انا عملت سكرول من الارتفاع كامل للويندو)
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - WindowHeigth) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );

    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

//---------------------------------------------------------------------------------------------//

//Create Popup with the Image
let ourGallery = document.querySelectorAll(".gallery .img-box img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    //Create Overlay Element
    let Overlay = document.createElement("div");

    //Add class to overlay
    Overlay.className = "popup-overlay";

    //Append overlay to body
    document.body.appendChild(Overlay);

    //Create The popup Box
    let popupBox = document.createElement("div");

    //Add class to the popup Box
    popupBox.className = "popup-box";

    //Adding Heaing
    if (img.alt !== null) {
      //create Heading for image
      let imageHeading = document.createElement("h3");

      //Create Text for heading
      let imageText = document.createTextNode(img.alt);

      //Appent The Text to the heading
      imageHeading.appendChild(imageText);

      //Appent the heading to the popup Box
      popupBox.appendChild(imageHeading);
    }

    //Create the image
    let popupImage = document.createElement("img");

    //Set image Source
    popupImage.src = img.src;

    //Add Image To popUp Box
    popupBox.appendChild(popupImage);

    //Add Image To popUp Box To Body
    document.body.appendChild(popupBox);

    //create close Span (X)
    let closeBtn = document.createElement("span");

    //create The Close button Text
    let closeBtnText = document.createTextNode("X");

    //Append Text to close buuton
    closeBtn.appendChild(closeBtnText);

    //ADD clas to class button
    closeBtn.className = "close-btn";

    //Appent Closr button to the popup box
    popupBox.appendChild(closeBtn);
  });
});

//---------------------------------------------------------------------------------------------//

//Close PopUp Box (طبعا لانه العنصر مش موجود اصلا بالصفحه , قاعد بنعمل اثناء رندر الصفحه بعمل هاي الطريقه من الدكيومينت كامل بجيب بعمل أيفت ليسنر)
document.addEventListener("click", function (e) {
  if (e.target.className == "close-btn") {
    //Remove The current popup
    e.target.parentNode.remove(); //طريقه لحذف عنصر معين من الصفحه

    //Remoce Overlay
    document.querySelector(".popup-overlay").remove(); //طريقة ثانيه لجذف عنصر معين من الصفحه
  }
});

//---------------------------------------------------------------------------------------------//

//Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

//Select All Links
const allLinks = document.querySelectorAll(".header-area .links a");

//---------------------------------------------------------------------------------------------//
//هذا الفنكشن عملته عشان اختصر كود البوليتس + كود كبسات النافيجيشن اللي بتنزلنا على السيكشنز المختلفات

function scrollIntoSection(elements) {
  elements.forEach((elmnt) => {
    elmnt.addEventListener("click", (e) => {
      e.preventDefault(); /*بلغي خاصية اللنك الطبيعيه */

      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      }); /*السكرول هي جديده وبتسمحلي اعمل سكرول سموذلي بسهوله وهي بيور جافاسكربت مش محتاجه اي مكتبه */
    });
  });
}

scrollIntoSection(allBullets);
scrollIntoSection(allLinks);
//---------------------------------------------------------------------------------------------//

//function to handle Active class
function handleActive(ev) {
  //Remove active class From All Children
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });

  //Add active class on item i clicked on
  ev.target.classList.add("active");
}

//-----------------Bullets option------------------/
let bulletsSpan = document.querySelectorAll(".option-box .bullets-option span"); //bring spans

let bulletsContainer = document.querySelector(".nav-bullets"); //bring div of all bullets

let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });

  if (bulletLocalItem == "show") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (e.target.dataset.display === "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets_option", "show");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets_option", "hide");
    }

    handleActive(e);
  });
});

//---------------------button to Reset all Options and refresh the page ----------------------//

//طبعا ما في داعي اعمل متغير هون لانه مش حستخدمه بمكان ثاني يعني بس هون
document.querySelector(".reset-option").onclick = function () {
  // localStorage.clear();  بسخدمها حال كانت فش شغلات مهمه بالموقع يعني عادي لو حذفت كل اشي

  //اما هاي الطريقه بحذف كل عنصر لحاله وبستخدمها في حال كانت عندي عناصر مهمه محفوظه باللوكال ستوريج لكل يوزر
  localStorage.removeItem("color_option");
  localStorage.removeItem("background_option");
  localStorage.removeItem("bullets_option");

  //Reload Window
  window.location.reload();
};

//---------------------Toggle menu on small screens----------------------//

let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
  //Stop Propagation((عدم تكاثر)هاي الميثود بسمحلي الغي انه الكليك على العنصر تدخلني جوا ابناءه يعني بقدر اعمل كليك عليه لحاله بس)
  e.stopPropagation();

  //Toggle class "menu active" on Buttton
  this.classList.toggle("menu-active");

  //Toggle class "open" on Links
  tLinks.classList.toggle("open");
};

//click anywhere outside menu and Togle button
window.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== tLinks) {
    //Check if Menu is Open(have class Open)
    if (tLinks.classList.contains("open")) {
      //Toggle class "menu active" on Buttton
      toggleBtn.classList.remove("menu-active");

      //Toggle class "open" on Links
      tLinks.classList.remove("open");
    }
  }
});

//Stop Propagation On menu
tLinks.onclick = function (e) {
  e.stopPropagation();
};
