window.onload = async function(){
    try{
        const data = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&key=${api_key}`).then(toJson)
        console.log(data)
        generate_Cards(data.items)
    }catch(e){
        console.log(e)
    }
}

var menuIcon = document.querySelector(".menu-icon")
var sidebar = document.querySelector(".sidebar")
var mainContainer = document.querySelector(".mainContainer")

menuIcon.onclick = function(){
    sidebar.classList.toggle("smaller-sidebar")
    mainContainer.classList.toggle("larger-mainContainer")
}

function generate_Cards(data){
    const img_cont = document.querySelector('.mainContainer')
    for(let i=0;i<data.length;i++){
        
        const orig = data[i].snippet
        
        const card = document.createElement('div')    

        const attr = document.createElement('a')    
        const thumbcont = document.createElement('div')    
        const thumbimg = document.createElement('img')    

        const detdiv = document.createElement('div')    
        const logodiv = document.createElement('div')    
        const chan_attr = document.createElement('a')    
        const logoimg = document.createElement('img')    
        const details = document.createElement('div')    
        const name = document.createElement('h3')    
        const views = document.createElement('p')    
        const streamdate = document.createElement('p')    

        card.classList.add('card')
        thumbcont.classList.add('thumbnailContainer')
        thumbimg.classList.add('thumbnailImg')
        detdiv.classList.add('detailsContainer')
        detdiv.classList.add('d-flex')
        logodiv.classList.add('logoContainer')
        logoimg.classList.add('userImg')
        details.classList.add('details')


        name.innerText = orig.localized.title;
        thumbimg.src = `${orig.thumbnails.medium.url}`
        get_chan_src(logoimg,orig.channelId)
        attr.href = `./video.html?vid_id=${data[i].id}`
        get_views(views,data[i].id)
        streamdate.innerHTML = "Uploaded &nbsp;"+calcdate(orig.publishedAt)
        chan_attr.href = `./channel.html?${orig.channelId}`

        details.appendChild(name)
        details.appendChild(views)
        details.appendChild(streamdate)

        chan_attr.appendChild(logoimg)
        logodiv.appendChild(chan_attr)

        detdiv.appendChild(logodiv)
        detdiv.appendChild(details)

        thumbcont.appendChild(thumbimg)
        attr.appendChild(thumbcont)
        attr.appendChild(detdiv)

        card.appendChild(attr)

        img_cont.appendChild(card)
    }
}
