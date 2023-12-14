import React, { useState, useRef } from 'react';

const VideoContainer = () => {
    const videos = [
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    ];

    const [selectedVideoIndex, setSelectedVideoIndex] = useState(null);
    const [currentTime, setCurrentTime] = useState({});

    const videoRefs = useRef(Array.from({ length: videos.length }, () => React.createRef()));

    const changeVideo = (index) => {
        const currentVideoIndex = selectedVideoIndex;

        if (currentVideoIndex !== null) {
            const currentVideo = videoRefs.current[currentVideoIndex].current;
            setCurrentTime({ ...currentTime, [currentVideoIndex]: currentVideo.currentTime });
        }

        setSelectedVideoIndex(index);
    };

    const updateTime = () => {
        setCurrentTime({ ...currentTime, [selectedVideoIndex]: videoRefs.current[selectedVideoIndex]?.current.currentTime });
    };

    const preventContextMenu = (event) => {
        event.preventDefault();
    };

    const handlePlay = (index) => {
        console.log(index)
        Object.keys(videoRefs.current).forEach((key) => {
            console.log('key', key)
            const videoRef = videoRefs.current[key].current;
            console.log('videoRef', videoRef)
            console.log(parseInt(key, 10))
            if (parseInt(key, 10) !== index && !videoRef.paused) {
                videoRef.pause();
            }
        });
    };

    return (
        <div>
            {videos.map((video, index) => (
                <div key={index} className="video-wrapper">
                    <video
                        ref={videoRefs.current[index]}
                        width="320"
                        height="240"
                        controls
                        controlsList='nodownload'
                        onPlay={() => handlePlay(index)}
                        onPause={() => setIsPlaying(false)}
                        onTimeUpdate={updateTime}
                        onContextMenu={preventContextMenu}
                    >
                        <source src={video} type="video/mp4" />
                    </video>
                </div>
            ))}
        </div>
    );
};

export default VideoContainer;
