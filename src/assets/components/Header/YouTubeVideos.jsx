import React, { useState, useEffect } from 'react';

const YouTubeVideos = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCE_M8A5yxnLfW0KghEeajjw&maxResults=9&order=date&type=video&key=AIzaSyD6jULFU6bJLrN-BGVAtkKK7Lh7rFeW9Vk`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data)
                setVideos(data.items);
            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        };

        fetchVideos();
    }, []);

    return (
        <div className="youtube-videos">
            {videos.map(video => (
                <div key={video.id.videoId} className="video">
                    <iframe
                        src={`https://www.youtube.com/embed/${video.id.videoId}`}
                        frameBorder="0"
                        allowFullScreen
                        title={video.snippet.title}
                    />
                    <p>{video.snippet.title}</p>
                </div>
            ))}
        </div>
    );
};

export default YouTubeVideos;
