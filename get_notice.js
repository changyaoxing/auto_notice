const request = require('request');
const fs = require("fs");
const nodemailer = require("nodemailer");
const dayjs = require('dayjs')



function sendMail(from, aliasName, tos, subject, msg) {
    const smtpTransport = nodemailer.createTransport({
        service: "163",
        secure: true,
        auth: {
            user: from,
            pass: 'TIKYPTTBWTBFWGZL',
        }
    });

    smtpTransport.sendMail({
        //from    : '标题别名 <foobar@latelee.org>',
        from: aliasName + ' ' + '<' + from + '>',
        //'li@latelee.org, latelee@163.com',//收件人邮箱，多个邮箱地址间用英文逗号隔开
        to: tos,
        subject: subject,//邮件主题
        //text    : msg,
        html: msg
    }, function (err, res) {
        if (err) {
            console.log('error: ', err);
        }
    });
}

function nl2br(str, isXhtml) {
    var breakTag = (isXhtml || typeof isXhtml === 'undefined') ? '<br />' : '<br>';
    var str = (str + '').replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
};




async function main() {
    var options = {
        'method': 'GET',
        'url': 'https://cse.csu.edu.cn/index/xsxx.htm',
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    };
    request(options, (error, response) => {
        if (error) throw new Error(error);
        let notice_new = response.body.match("<li><a href=.*</span></li>")[0]
        console.log(notice_new)
        fs.readFile("notice_pre.txt", 'utf8', (error, notice_pre) => {
            console.log(notice_pre)
            let url = "https://cse.csu.edu.cn/" + notice_new.match('info.*htm')[0]
            let t = notice_new.match('htm">.*</a')[0]
            console.log(url)
            console.log(t)
            let f="不发邮件"
            if (notice_pre != notice_new) {
                console.log("notice_pre!=notice_new")
                sendMail('cyx_tiny@163.com', '学术消息提醒机器人', "1242004222@qq.com,578912140@qq.com,2605349524@qq.com",
                    '新的学术通知',
                    '<h2>新学术通知</h2>新活动为<a href=' + url + '>' + t + '</a></br><a href=https://cse.csu.edu.cn/index/xsxx.htm>学院官网https://cse.csu.edu.cn/index/xsxx.htm</a></br>');
                fs.writeFile("notice_pre.txt", notice_new, function (err, files) { })
                f="发送邮件"
            }
            fs.appendFile("log.txt", f+","+dayjs().format('YYYY-MM-DD HH:mm:ss')+","+notice_new+","+notice_pre+"\n", function (err, files) { })
        })

    })
}


main().then(() => {
    console.log('done')
    // process.exit(0)
}).catch(err => {
    console.log(err)
    // process.exit(-1)
})