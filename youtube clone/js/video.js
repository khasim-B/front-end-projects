const loc = window.location
// const url = 
const search_params =  new URL(loc).searchParams
const video_id = search_params.get("vid_id")

window.onload =async function(){
    try {
        // const res = await fetch(`${main_domain}videos?part=statistics&part=topicDetails&part=player&part=snippet&id=${video_id}&key=${api_key}`).then(toJson)
        const res = await fetch(`${main_domain}videos?part=statistics,topicDetails,player,snippet&id=${video_id}&key=${api_key}`).then(toJson)
        build_page(res.items[0].statistics,res.items[0].player,res.items[0].snippet,res.items[0].topicDetails)
    } catch (error) {
        console.log(error)
    }
}

async function build_page(stat,player,data,topicData){
    const vid_container = document.querySelector('.container')

    const content = document.createElement('div')
        const cont_left = document.createElement('div')
            const video = document.createElement('div')
            const below_vid_cont = document.createElement('div')
                const vid_name = document.createElement('h1')
                const other_det = document.createElement('div')
                    const other_det_left = document.createElement('div')
                        const chan_name_icon = document.createElement('div')
                            const chan_icon = document.createElement('img')
                            const chan_name_subs = document.createElement('div')
                                const name = document.createElement('p')
                                const subCount = document.createElement('p')
                        const join_su_btn = document.createElement('div')
                            const sub = document.createElement('button')
                            const join = document.createElement('button')
                const other_det_right = document.createElement('div')
                    const likimg = document.createElement('img')
                    const moreimg = document.createElement('img')
                    const shareimg = document.createElement('img')
                    const dis_likimg = document.createElement('img')
            
                const desc_cont = document.createElement('div')
                    const desc = document.createElement('p')
                const cmnt_cont = document.createElement('div')
                    const cmt_count = document.createElement('h1')  
                const wt_cmnt_cont = document.createElement('div')
                    const chan_img = document.createElement('img')
                    const inp = document.createElement('input')
                const prev_cmnt_cont = document.createElement('div')
        const cont_right = document.createElement('div')
    // giving classes


    content.classList.add('content')
    cont_left.classList.add('content-left')
    video.classList.add('video')
    
    below_vid_cont.classList.add('below-video-container')
    
    other_det.classList.add('other-details')
    other_det_left.classList.add('other-details-left')
    
    chan_name_icon.classList.add('channelNameAndIcon')
    chan_icon.classList.add('channelIcon')

    chan_name_subs.classList.add('nameAndSubs')
    subCount.classList.add('subsCount')

    join_su_btn.classList.add('joinAndSubsButtonContainer')
    join.classList.add('joinButton')
    sub.classList.add('subsButton')
    
    other_det_right.classList.add('other-details-right')
    moreimg.src = './images/more.png'
    likimg.src = './images/like.png'
    dis_likimg.src = './images/dislike.png'
    shareimg.src = './images/share.png'
    
    desc_cont.classList.add('descriptionContainer')
    cmnt_cont.classList.add('commentContainer')
    
    wt_cmnt_cont.classList.add('writeCommentContainer')
    chan_img.classList.add('channelIcon')

    prev_cmnt_cont.classList.add('previousCommentsContainer')
    
    cont_right.classList.add('content-right')
    // async function generate_Cards(data) {
        const dat = topicData.topicCategories[0].split('/')
        cat = dat[dat.length - 1]
        // const container = document.querySelector('.content-right')
        const res = await fetch(`${main_domain}search${part}&maxResults=20&q=${cat}&key=${api_key}`).then(toJson)
        for(let i=0;i<res.items.length;i++){
            const da = res.items[i]
    
            const vid_list = document.createElement('div')
            const thumb = document.createElement('img')
            const info = document.createElement('div')
            const attr = document.createElement('a')
            const vid_name = document.createElement('p')
            const chan_name = document.createElement('p')
            const views = document.createElement('p')
    
            // giving classes
            vid_list.classList.add('video-list')
            info.classList.add('video-info')
    
            // assigning data
            chan_name.innerHTML = da.snippet.channelTitle
            get_views(views,da.id.videoId)
            thumb.src = da.snippet.thumbnails.medium.url
            vid_name.innerHTML = da.snippet.title
            attr.href = `./video.html?vid_id=${da.id.videoId}`
    
            // appending childs
            info.appendChild(vid_name)
            info.appendChild(views)
            info.appendChild(chan_name)
    
            vid_list.appendChild(thumb)
            vid_list.appendChild(info)
    
            attr.appendChild(vid_list)
            
            cont_right.appendChild(vid_list)
        }
    // }



    //  adding data
    join.innerHTML = "Join"
    sub.innerHTML = "Subscribe"
    name.innerText = data.channelTitle
    get_subs(subCount,data.channelId)

    get_chan_src(chan_icon,data.channelId)
    
    desc.innerHTML = data.description

    get_chan_src(chan_img,data.channelId)

    vid_name.innerHTML = data.title
    cmt_count.innerHTML = stat.commentCount

    video.innerHTML = player.embedHtml
    //  Appending cards]

    chan_name_subs.appendChild(name)
    chan_name_subs.appendChild(subCount)

    chan_name_icon.appendChild(chan_img)
    chan_name_icon.appendChild(chan_name_subs)

    join_su_btn.appendChild(join)
    join_su_btn.appendChild(sub)

    other_det_left.appendChild(chan_name_icon)
    other_det_left.appendChild(join_su_btn)

    other_det_right.appendChild(likimg)
    other_det_right.appendChild(moreimg)
    other_det_right.appendChild(shareimg)
    other_det_right.appendChild(dis_likimg)

    other_det.appendChild(other_det_left)
    other_det.appendChild(other_det_right)

    desc_cont.appendChild(desc)

    wt_cmnt_cont.appendChild(chan_icon)
    wt_cmnt_cont.appendChild(inp)

    cmnt_cont.appendChild(cmt_count)
    cmnt_cont.appendChild(wt_cmnt_cont)
    cmnt_cont.appendChild(prev_cmnt_cont)

    below_vid_cont.appendChild(vid_name)
    below_vid_cont.appendChild(other_det)
    below_vid_cont.appendChild(desc_cont)
    below_vid_cont.appendChild(cmnt_cont)

    cont_left.appendChild(video)
    cont_left.appendChild(below_vid_cont)

    content.appendChild(cont_left)
    content.appendChild(cont_right)

    vid_container.appendChild(content)

}



// Select the necessary elements
var commentInput = document.querySelector('.writeCommentContainer input');
var previousCommentsContainer = document.querySelector('.previoudCommentsContainer');
var commentCountElement = document.querySelector('.commentContainer h1'); // Element to display comment count
var defaultChannelIconSrc = './images/myImg.jpeg'; // Default icon for comments

// Function to update the comment count
function updateCommentCount() {
    var comments = previousCommentsContainer.getElementsByClassName('previousComments');
    var commentCount = comments.length;
    commentCountElement.textContent = `${commentCount} Comments`;
}

// Function to handle adding a new comment
function addComment() {
    // Get the comment text
    var commentText = commentInput.value.trim();

    // Check if the comment text is not empty
    if (commentText) {
        // Create a new comment element
        var newComment = document.createElement('div');
        newComment.classList.add('previousComments', 'd-flex');

        // Create the comment content
        newComment.innerHTML = `
            <img class="channelIcon" src="${defaultChannelIconSrc}" alt="" />
            <div class="nameAndComment">
                <p class="channelName">@LetsUpgrade</p>
                <p class="comment">${commentText}</p>
            </div>
        `;

        // Append the new comment to the container
        previousCommentsContainer.appendChild(newComment);

        // Clear the comment input field
        commentInput.value = '';

        // Update the comment count
        updateCommentCount();
    }
}

// Add an event listener to the comment input field
commentInput.addEventListener('keydown',event =>{
    // Check if the Enter key is pressed
    event.preventDefault();
    if (event.key === 'Enter') {
        // Prevent the default action (e.g., form submission)
        // Call the function to add a new comment
        addComment();
    }
});

// Initial comment count setup
document.addEventListener('DOMContentLoaded', function() {
    updateCommentCount();
});

