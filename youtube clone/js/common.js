
const api_key = 'AIzaSyB4koaf7GznYDpEfdpIQMjpLj8E13o8Y-M'
const api_key2 = 'AIzaSyAFCqYMANoFLp98YTTBWYrFhNOLclHs9xg'
const main_domain = 'https://www.googleapis.com/youtube/v3/'
const part = '?part=snippet' 

function toJson(data){
    return data.json()
}

async function get_subs(sub,chan_id) {
    try {
        const res = await fetch(`${main_domain}channels?part=snippet,statistics&id=${chan_id}&key=${api_key}`).then(toJson)
        let r =  res.items[0].statistics.subscriberCount
        sub.innerHTML = count(r," subscribers")
    } catch (error) {
        console.log(error)
    }
}

async function get_views(view,vid_id){
    try {
        const res = await fetch(`${main_domain}videos?part=statistics&id=${vid_id}&key=${api_key}`).then(toJson)
        // console.log(res.items[0].statistics.viewCount)
        const vc = res.items[0].statistics.viewCount
        view.innerHTML = count(vc," views")
    } catch (error) {
        // console.log(error)
    }
}

async function get_cmt(cmt,vid_id){
    try {
        const res = await fetch(`${main_domain}videos?part=statistics&id=${vid_id}&key=${api_key}`).then(toJson)
        const vc = res.items[0].statistics.commentCount
        cmt.innerHTML = count(vc," comments")
    } catch (error) {
        console.log(error)
    }
}

//4-0's  1-k
//6-0's  1-m
//9-0's  1-b
function count(vie,str){
    let v = vie.toString()
    if(v.length < 4){
        return v+str
    }else if(v.length == 4){
        return v[0]+"."+v[1]+"K"+str
    }else if(v.length == 5 ){
        return v.slice(0,2)+"K"+str
    }else if(v.length == 6){
        return v.slice(0,3)+"K"+str
    }else if(v.length == 7){
        return v[0]+"."+v[1]+"M"+str
    }else if(v.length == 8){
        return v.slice(0,2)+"M"+str
    }else if(v.length == 9){
        return v.slice(0,3)+"M"+str
    }else if(v.length == 10){
        return v[0]+"."+v[1]+"B"+str
    }else if(v.length == 11){
        return v.slice(0,2)+"B"+str
    }else{
        return v.slice(0,3)+"B"+str
    }
}

function calcdate(date){
    const da = new Date(date);
    const now = new Date()
    let msg = ''
    let res;
    if(da.getFullYear() === now.getFullYear()){
        if(da.getMonth() === now.getMonth()){
            if(da.getDate() === now.getDate()-1){
                if(da.getHours() === now.getHours()-1){
                    if(da.getMinutes() === now.getMinutes()){
                        msg = " just now"
                    }
                    else{
                        res = calc(da.getMinutes(),now.getMinutes())
                        msg = res + (res>1?" minutes ago":" minute ago")
                    }
                }else{
                    res = calc(da.getHours() , now.getHours())
                    msg = res + (res>1?" hours ago":" hour ago")
                }
            }else{
                res = calc(da.getDate(),now.getDate())
                
                msg = res + (res>1?" days ago":" day ago")
            }
        }else{
            res = calc(da.getMonth(),now.getMonth())
            msg = res + (res>1?" months ago":" month ago")
        }
    }else{
        res = calc(da.getFullYear(),now.getFullYear())
        msg = res + (res>1?" years ago":" year ago")
    }

    return msg
}

function calc(a,b){
    return a>b?a-b:b-a
} 

async function get_chan_src(img,ch_id){
    try{
        const res = await fetch(`${main_domain}channels${part}&id=${ch_id}&key=${api_key}`).then(toJson)
        img.src = res.items[0].snippet.thumbnails.medium.url
        // console.log(res)
    }catch(e){
        console.log(e)
    }
}

