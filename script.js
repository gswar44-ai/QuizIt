// ==========================================
// QUIZ IT — MAIN JAVASCRIPT
// ==========================================

function startQuiz() {

    alert(
        "🚀 Quiz It is ready!\n\n" +
        "The quiz engine will be connected next."
    );

}


function scrollToQuizzes() {

    const section =
        document.getElementById("quizzes");

    if (section) {

        section.scrollIntoView({
            behavior: "smooth"
        });

    }

}


function openCategory(category) {

    alert(
        "🧠 " +
        category.charAt(0).toUpperCase() +
        category.slice(1) +
        " quizzes will open here."
    );

}


function showLoginMessage() {

    alert(
        "👤 Login system will be connected soon."
    );

}
