function httpget(url, callback) {
    var get = new XMLHttpRequest();
    
    get.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            callback(get.responseText);
        }
    }

    get.open("GET", url, true);
    get.send();
}

function addSubreddit(subreddit) {
    var reddit = document.getElementById("reddit");
    
    httpget("https://www.reddit.com/" + subreddit + ".json", function(response){
        var json = JSON.parse(response);

        var all = document.createElement("div");
        all.className = "subreddit";
        reddit.appendChild(all);

        var header = document.createElement("h3");
        header.innerHTML = subreddit;
        all.appendChild(header);

        var num = 5;
        for(var i = 0; i < num; i++){
            var post = json.data.children[i].data;
            var icons = [];

            var postTitle = document.createElement("a");
            postTitle.href = "https://www.reddit.com" + post.permalink;
            postTitle.innerHTML = post.title;

            if (post.stickied){
                num++; 
                
                var link = document.createElement("a");
                link.href = post.permalink;

                var icon = document.createElement("i");
                icon.className = "fas fa-thumbtack";

                link.appendChild(icon);
                link.innerHTML += " ";
                icons.push(link);
            }
            if (!post.is_self) {
                var link = document.createElement("a");
                link.href = post.url;

                var icon = document.createElement("i");

                if (post.post_hint == "image") {
                    icon.className = "fas fa-image";
                }
                else if (/video/.exec(post.post_hint)) {
                    icon.className = "fas fa-video";
                }
                else if (/imgur.com\/(a|gallery)\//.exec(post.url)) {
                    icon.className = "fas fa-images";
                }
                else {
                    icon.className = "fas fa-link";
                }

                link.appendChild(icon);
                link.innerHTML += " ";
                icons.push(link);
            }
            else {
                var link = document.createElement("a");
                link.href = post.url;

                var icon = document.createElement("i");
                icon.className = "fas fa-comment";

                link.appendChild(icon);
                link.innerHTML += " ";
                icons.push(link);
            }

            for (let icon of icons) {
                all.appendChild(icon);
            }

            all.appendChild(postTitle);
            all.innerHTML += "<br /><br />";   
        }
    });
}
