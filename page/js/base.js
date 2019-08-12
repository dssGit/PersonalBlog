var randomTags = new Vue({
    el:'#random_tags',
    data: {
        tags: []
        // tags: ["javascript","css","html","ES6","html5","css3","webpack","sakdjasldjlksdkja","javascript","css","html","ES6","html5","css3","webpack","sakdjasldjlksdkja"]
    },
    computed: {
        randomColor () {
            return function () {
                var red = Math.random() * 255 + 50;
                var green = Math.random() * 255 + 50;
                var blue = Math.random() * 255 + 50;
                return "rgb(" + red + "," + green + "," + blue + ")"
            }
        },

        randomSize () {
            return function () {
                var size = Math.random() * 18 + 12 + 'px';
                return size;
            }

        },


    },
    created () {
        axios({
            method: "get",
            url: "/queryAllTags"
        }).then(function (resp) {
            console.log(resp.data.data);

            var result = [];
            for(var i = 0 ; i < resp.data.data.length ; i ++) {
                var temp = {};
                temp.text = resp.data.data[i].tag;
                temp.link = "/?tag=" + resp.data.data[i].tag;
                result.push(temp);
            }
            randomTags.tags = result;
        }).catch(function () {
            console.log("请求失败")
        })

    }
})

var newHot = new Vue({
    el: '#new_hot',
    data: {
        titleList: []
    },
    created () {
        axios({
            method: "get",
            url: "/queryHotBlog"
        }).then(function (resp) {
            var result = [];
            for(var i = 0 ; i < resp.data.data.length ; i ++) {
                var temp = {};
                temp.title = resp.data.data[i].title;
                temp.link = "/blog_show.html?bid=" + resp.data.data[i].id;
                result.push(temp);
            }
            newHot.titleList = result;
        }).catch(function () {
            console.log("请求失败")
        })
    },
    computed: {

    }
})

var newComments = new Vue({
    el: '#new_comments',
    data: {
        commentList: []
    },
    created () {
        axios({
            method: "get",
            url: "/queryNewComments"
        }).then(function (resp) {
            var result = [];
            for(var i = 0 ; i < resp.data.data.length ; i ++) {
                var temp = {};
                temp.name = resp.data.data[i].user_name;
                temp.date = resp.data.data[i].ctime;
                temp.comment = resp.data.data[i].comments;
                result.push(temp);
            }
            newComments.commentList = result;
        }).catch(function () {
            console.log("请求失败")
        })
    },
    computed: {

    }
})

var searchBar = new Vue({
    el: "#search_bar",
    data: {
    },
    computed: {
        search () {
            return function () {
                var tag = document.getElementById("search_inp").value;
                window.location.href="/?tag=" + tag;
            }


            // return function (page, pageSize) {
            //     var inp = document.getElementById("search_inp").value;
            //     axios({
            //         url: "/queryBlogByTag?page=" + (page-1) + "&pageSize=" + pageSize + "&tag=" + inp,
            //         method: "get"
            //     }).then(function (resp) {
            //         console.log(resp)
            //
            //         articleList.page = page;
            //         var list = resp.data.data;
            //         var aList = [];
            //         for(var i = 0; i < list.length; i++) {
            //             if(list[i] == 1) {
            //                 continue;
            //             }
            //             var temp = {};
            //             temp.title = list[i].title;
            //             temp.content = list[i].content;
            //             temp.id = list[i].id;
            //             temp.tags = list[i].tags;
            //             temp.views = list[i].views;
            //             temp.ctime = list[i].ctime;
            //             temp.link = "/blog_show.html?bid=" + list[i].id;
            //             aList.push(temp)
            //         }
            //         articleList.articleList = aList;
            //         articleList.count = aList.length;
            //         articleList.getPageTool;
            //     }).catch(function (resp) {
            //
            //     })
            // }

        }
    },
    created () {

    }

})