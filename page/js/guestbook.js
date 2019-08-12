var sendComment = new Vue({
    el: "#send_comment",
    data: {
        vCode: '',
        trueCode: ''
    },
    computed: {
        changeCode () {
            return function () {
                axios({
                    method: "get",
                    url: "/queryRandomCode"
                }).then(function (resp) {
                    sendComment.vCode = resp.data.data.data;
                    sendComment.trueCode = resp.data.data.text;
                }).catch(function () {
                    console.log("请求失败")
                })
            }
        },
        sendComment () {
            return function () {
                var code = document.getElementById("comment_code").value
                console.log(sendComment.trueCode,code)
                if(sendComment.trueCode.toLowerCase() != code.toLowerCase()) {
                    alert("验证码错误");
                    document.getElementById("comment_code").value = "";
                    return;
                }

                var bid = -2;
                var reply = document.getElementById("comment_reply").value;
                var replyName = document.getElementById("comment_reply_name").value;
                var name = document.getElementById("comment_name").value;
                var email = document.getElementById("comment_email").value;
                var content = document.getElementById("comment_content").value;
                if(name == "") {
                    alert("昵称不能为空")
                    return;
                }
                if(email == "") {
                    alert("邮箱不能为空")
                    return;
                }
                if(content == "") {
                    alert("内容不能为空")
                    return;
                }
                axios({
                    method: "post",
                    url: "/addComment",
                    data: {
                        "bid": bid,
                        "reply": reply,
                        "replyName": replyName,
                        "name": name,
                        "email": email,
                        "content": content
                    }
                }).then(function (resp) {
                    alert("留言成功")
                }).catch(function () {
                    console.log("请求错误")
                })


            }
        }
    },
    created () {
        this.changeCode();
    }
})

var blogoCmments = new Vue({
    el: "#blog_comments",
    data: {
        total: 0,
        comments: []
    },
    computed: {
        reply () {
            return function (commentId, userName) {
                console.log(commentId, userName)
                document.getElementById("comment_reply").value = commentId;
                document.getElementById("comment_reply_name").value = userName;
                location.href = "#send_comment";
            }
        }

    },
    created () {
        var bid = -2;
        axios({
            method: "get",
            url: "/queryCommentsByBlogId?bid=" + bid
        }).then(function (resp) {
            console.log(resp.data.data)
            blogoCmments.comments = resp.data.data;
            for(var i = 0 ; i < blogoCmments.comments.length ; i ++ ) {
                if(blogoCmments.comments[i].parent > -1) {
                    blogoCmments.comments[i].options = "@" + blogoCmments.comments[i].parent_name
                }
            }
        }).catch(function () {
            console.log("请求失败")
        })

        axios({
            method: "get",
            url: "/queryCommentCountByBlogId?bid=" + bid
        }).then(function (resp) {
            blogoCmments.total = resp.data.data[0].count
        }).catch(function () {
            console.log("请求错误")
        })
    }
})