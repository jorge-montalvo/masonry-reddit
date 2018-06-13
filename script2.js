function add(subredditName){
    var wrapper = document.getElementById("wrapper");
    
    httpget("https://www.reddit.com/" + subredditName + ".json", function (response){
        var json = JSON.parse(response);
        
        var subreddit = document.createElement("div");
        subreddit.className = "subreddit";
        wrapper.appendChild(subreddit);

        var header = document.createElement("h3");
        header.innerHTML = subredditName;
        subreddit.appendChild(header);

        for (var i = 0; i < 20; i++){
            var post = json.data.children[i].data;

            if(post.stickied){
                continue;
            }

            var img = document.createElement("div");
            img.className = "img";
            subreddit.appendChild(img);

            img.style.backgroundImage = "url(" + post.thumbnail + ")"; 
        }
    });
}

document.addEventListener("DOMContentLoaded", function(){
    add("r/battlestations/hot");
    add("r/unixporn/hot");
    add("r/earthporn/top");
    add("r/malelivingspace/hot");
});
