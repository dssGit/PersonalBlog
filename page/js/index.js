var everyDay = new Vue({
    el: '#every_day',
    data: {
        content: 'this is a good day!!!'
    },
    method: {
        getContent () {
            return this.content;
        }
    },
    created () {
        axios({
            method: "get",
            url: "/queryEveryDay"
        }).then(function (rel) {
            everyDay.content = rel.data.data[0].content;
        }).catch(function () {
            console.log("请求失败")
        })
    }
})

var articleList = new Vue({
    el: '#article_list',
    data: {
        page: 1,
        pageSize: 5,
        count: 100,
        pageNumList: [],
        articleList: []
    },
    computed: {



        getPage () {
            return function (page, pageSize) {
                axios({
                    url: "/queryBlogByPage?page=" + (page-1) + "&pageSize=" + pageSize,
                    method: "get"
                }).then(function (resp) {
                    articleList.page = page;
                    var list = resp.data.data;
                    var aList = [];
                    for(var i = 0; i < list.length; i++) {
                        var temp = {};
                        temp.title = list[i].title;
                        temp.content = list[i].content;
                        temp.id = list[i].id;
                        temp.tags = list[i].tags;
                        temp.views = list[i].views;
                        temp.ctime = list[i].ctime;
                        temp.link = "/blog_show.html?bid=" + list[i].id;
                        aList.push(temp)
                    }
                    articleList.articleList = aList;

                }).catch(function (err) {
                    console.log("请求错误");
                })

                axios({
                    method: "get",
                    url: "/queryBlogCount"
                }).then(function (resp) {
                    articleList.count = resp.data.data[0].count
                    articleList.getPageTool;
                }).catch(function () {
                    console.log("blog num get lose")
                })

            }
        },

        getPageByTag () {
            return function (tag, page, pageSize) {
                axios({
                    url: "/queryBlogByTag?page=" + (page-1) + "&pageSize=" + pageSize + "&tag=" + tag,
                    method: "get"
                }).then(function (resp) {
                    if(resp.data == "result") {
                        articleList.articleList = [];
                        articleList.count = 0;
                        articleList.getPageTool;
                        alert("暂无该内容")
                        return;
                    }
                    articleList.page = page;
                    var list = resp.data.data;
                    var aList = [];
                    for(var i = 0; i < list.length; i++) {
                        if(list[i] == 1) {
                            continue;
                        }
                        var temp = {};
                        temp.title = list[i].title;
                        temp.content = list[i].content;
                        temp.id = list[i].id;
                        temp.tags = list[i].tags;
                        temp.views = list[i].views;
                        temp.ctime = list[i].ctime;
                        temp.link = "/blog_show.html?bid=" + list[i].id;
                        aList.push(temp)
                    }
                    articleList.articleList = aList;
                    articleList.count = aList.length;
                    articleList.getPageTool;
                }).catch(function (err) {
                    console.log("请求错误");
                })


                // axios({
                //     method: "get",
                //     url: "/queryBlogCountByTag?tag=" + tag
                // }).then(function (resp) {
                //     articleList.count = resp.data.data[0].count
                //     console.log(resp.data.data[0])
                //     articleList.getPageTool;
                // }).catch(function () {
                //     console.log("blog num get lose")
                // })

            }
        },

        getPageTool () {
            var nowPage = this.page;
            var pageSize = this.pageSize;
            var totalCount = this.count;
            var result = [];
            result.push({text: "<<", page: 1});
            if(this.count == 0) {
                this.pageNumList = [];
                return;
            }
            if(nowPage > 2) {
                result.push({text: nowPage - 2, page: nowPage - 2});
            }
            if(nowPage > 1) {
                result.push({text: nowPage - 1, page: nowPage - 1});
            }
            result.push({text: nowPage, page: nowPage});
            if(nowPage + 1 <= (totalCount + pageSize - 1) / pageSize) {
                result.push({text: nowPage + 1, page: nowPage + 1});
            }
            if(nowPage + 2 <= (totalCount + pageSize - 1) / pageSize) {
                result.push({text: nowPage + 2, page: nowPage + 2});
            }
            result.push({text: ">>", page: parseInt((totalCount + pageSize - 1) / pageSize)});
            this.pageNumList = result;
            return result;
        },

        jumpTo () {
            return function (page) {
                this.getPage(page, this.pageSize)
            }
        }
    },
    created () {

        var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
        var tag = "";
        for(var i = 0 ; i < searchUrlParams.length; i ++) {
            if( searchUrlParams[i].split("=")[0] == "tag" ) {
                try {
                    tag = searchUrlParams[i].split("=")[1];
                }catch (e) {
                    console.log(e);
                }
            }
        }
        if(tag == "") {
            this.getPage(this.page, this.pageSize);
        } else {
            this.getPageByTag(tag, this.page, this.pageSize)
        }



    }
})