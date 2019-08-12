


var blogList = new Vue({
    el: "#blog_list",
    data: {
        blogList: []
    },
    computed: {

    },
    created () {
        console.log("111111111111111111111111111111111111111")
        axios({
            method: "get",
            url: "/queryAllBlog"
        }).then(function (resp) {
            for(var i = 0; i < resp.data.data.length; i ++) {
                resp.data.data[i].link = "/blog_show.html?bid=" + resp.data.data[i].id;
            }
            blogList.blogList = resp.data.data;
        }).catch(function () {
            console.log("请求错误")
        })
    }
})