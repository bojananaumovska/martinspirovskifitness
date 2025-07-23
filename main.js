document.querySelectorAll('a[href="#pocetna"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const offset = 120; // пиксели колку да поместиш нагоре
        const target = document.querySelector('#pocetna');
        const topPos = target.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
            top: topPos - offset,
            behavior: 'smooth'
        });
    });
});

const weeksSelect = document.getElementById('weeks-select');
const priceDisplay = document.getElementById('price-display');
const purchaseBtn = document.getElementById('purchase-btn');

weeksSelect.addEventListener('change', () => {
    const selectedOption = weeksSelect.options[weeksSelect.selectedIndex];
    const price = selectedOption.getAttribute('data-price');
    const weeks = selectedOption.value;

    priceDisplay.innerHTML = `€${price} <span style="font-size: 16px;">/ ${weeks} недели</span>`;

});

document.querySelectorAll('.carousel__navigation-button').forEach((btn, index) => {
    btn.addEventListener('click', e => {
        e.preventDefault();
        showSlide(index + 1);
    });
});
function showSlide(index) {
    const slide = document.getElementById('carousel__slide' + index);
    if (slide) {
        slide.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
}
var right = document.getElementsByClassName("right");
var si = right.length;
var z = 1;
turnRight();
function turnRight() {
    if (si >= 1) {
        si--;
    } else {
        si = right.length - 1;
        function sttmot(i) {
            setTimeout(function () {
                right[i].style.zIndex = "auto";
            }, 300);
        }
        for (var i = 0; i < right.length; i++) {
            right[i].className = "right";
            sttmot(i);
            z = 1;
        }
    }
    right[si].classList.add("flip");
    z++;
    right[si].style.zIndex = z;
}
function turnLeft() {
    if (si < right.length) {
        si++;
    } else {
        si = 1;
        for (var i = right.length - 1; i > 0; i--) {
            right[i].classList.add("flip");
            right[i].style.zIndex = right.length + 1 - i;
        }
    }
    right[si - 1].className = "right";
    setTimeout(function () {
        right[si - 1].style.zIndex = "auto";
    }, 350);
}

const counter = document.getElementById("counter");
const end = 100;
const duration = 2000;
let startTime = null;

function animate(now) {
    if (!startTime) startTime = now;
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.floor(progress * end);
    counter.textContent = value;

    if (progress < 1) {
        requestAnimationFrame(animate);
    }
}

requestAnimationFrame(animate);

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
document.querySelectorAll('#nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});


hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});
document.getElementById("bmiForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const weight = parseFloat(document.getElementById("weight").value);
    const height = parseFloat(document.getElementById("height").value);
    const age = parseInt(document.getElementById("age").value);
    const sex = document.getElementById("sex").value;
    const activity = parseFloat(document.getElementById("activity").value);

    const TdeeAdvice = document.getElementById("TdeeAdvice");
    const contactBtn = document.getElementById("contactBtn");
    const errorMessage = document.getElementById("errorMessage");

    errorMessage.textContent = "";
    TdeeAdvice.textContent = "";
    contactBtn.style.display = "none";

    if (isNaN(weight) || weight < 30 || weight > 300) {
        errorMessage.textContent = "Внеси валидна тежина (30-300 кг).";
        return;
    }
    if (isNaN(height) || height < 100 || height > 250) {
        errorMessage.textContent = "Внеси валидна висина (100-250 см).";
        return;
    }
    if (isNaN(age) || age < 10 || age > 120) {
        errorMessage.textContent = "Внеси валидна возраст (10-120 години).";
        return;
    }
    if (sex !== "male" && sex !== "female") {
        errorMessage.textContent = "Избери пол.";
        return;
    }
    if (isNaN(activity) || activity <= 0) {
        errorMessage.textContent = "Избери фактор на активност.";
        return;
    }

    let bmr;
    if (sex === "male") {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    const tdee = Math.round(bmr * activity);

    TdeeAdvice.innerHTML = `
    <p><strong>Проценета дневна калориска потреба (TDEE): ${tdee} kcal</strong></p>
    <p style="margin-top: 12px; font-size: 16px">
        <strong>Ако сакаш да ослабеш</strong>, намали го дневниот калориски внес за приближно <strong>300–400 kcal</strong>,
        што значи внес од околу <strong>${tdee - 400} – ${tdee - 300} kcal</strong> дневно.<br><br>
        <strong>Ако целиш кон зголемување на мускулна маса</strong>, зголеми го внесот за приближно <strong>300–400 kcal</strong>,
        што значи внес од околу <strong>${tdee + 300} – ${tdee + 400} kcal</strong> дневно.
    </p>
`;


    contactBtn.style.display = "inline-block";
});