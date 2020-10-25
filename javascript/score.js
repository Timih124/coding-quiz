// pulling scores from localstorage or setting it to an empty array 

function printScores() {
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
    
    
    //  sort highscores by score (best to worst)
    highscores.sort(function(a, b){
        return b.score - a.score;
    });
    
    
    // creating a list element for the scores
    highscores.forEach(function(score) {
        var liTag = document.createElement("li");
        liTag.textContent = score.initials + " - " + score.score;
    
    
        // display it on the page
        var olEl = document.getElementById("highscores");
        olEl.appendChild(liTag);
        });
    }
    
    // funcation to clear the scores
    
    function clearScores() {
        window.localStorage.removeItem("highscores");
        window.location.reload();
    }
    
    document.getElementById("clear").onclick = clearScores;
    
    //print he password score function
    
    
    printScores();