import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

function Videos() {
  const [videos, setVideos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Fetch videos from API on component mount
  useEffect(() => {
    async function fetchApi() {
      await fetchVideos();
    }
    fetchApi();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch(
        "http://97.74.94.225:8282/besstMainApi/df/videoSection",
        {
          method: "POST",
          headers: {
            Client_ID: "any value",
          },
        }
      );
      const data = await response.json();
      console.log(data.Data);
      setVideos(data.Data);
    } catch (error) {
      console.log(error);
    }
  };

  // Show/hide modal and set selected video
  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    console.log(video);
    setShowModal(true);
  };
  const handleFullScreenClick = () => {
    const iframe = document.querySelector('iframe');
  if (isFullScreen) {
    document.exitFullscreen();
  } else {
    iframe.requestFullscreen();
  }
  setIsFullScreen(!isFullScreen);
  };

  return (
    <div className="">
     <div className="container-fluid bg-light py-3">
  <h2 className="text-center text-primary">Videos Section</h2>
</div>
      <div className="d-flex gap-4 flex-wrap m-2">
        {videos?.length > 0 ? (
          videos.map((video) => (
            <div
              key={video.id}
              className="card"
              
            >
              <div className=" p-2">
                <h4>{video.name}</h4>
                <p>{video.textContent}</p>
                <button className="btn btn-primary" onClick={() => handleVideoClick(video)}>Open Video</button>
              </div>
            </div>
          ))
        ) : (
          <p>Loading videos...</p>
        )}
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedVideo?.Title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {console.log(selectedVideo?.videoUrl)}
          <iframe
            width="100%"
            height="500"
            src={selectedVideo?.videoUrl}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen 
          ></iframe>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleFullScreenClick()}>
            Full Screen
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Videos;
