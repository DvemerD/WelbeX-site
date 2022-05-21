const videoPlayer = () => {
    const videoOverflow = document.querySelector('.knowing__video-overlow'),
        videoKnowing = document.querySelector('.knowing__video > video'),
        buttonVideo = document.querySelector('.knowing__play > .button__play');

    buttonVideo.addEventListener('mouseover', () => {
        videoOverflow.style.display = 'none';
    });

    buttonVideo.addEventListener('mouseout', () => {
        videoOverflow.style.display = 'block';
        videoKnowing.removeAttribute('controls');
    });

    buttonVideo.addEventListener('click', () => {
        videoKnowing.play();
        videoKnowing.setAttribute('controls', true);
       
        buttonVideo.removeEventListener('mouseout', () => {
            videoOverflow.style.display = 'block';
            videoKnowing.removeAttribute('controls');
        })

    });
}

export default videoPlayer; 