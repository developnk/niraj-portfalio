import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const DownloadCV = () => {
  const [isDownloaded, setIsDownloaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically trigger the download when the component is mounted
    const link = document.createElement('a');
    link.href = "https://drive.google.com/uc?export=download&id=1ryjg0r_HZen8U6RkA34ylwZQL84bRd8_";
    link.download = "Your_CV.pdf";
    link.click();

    // Simulate a download completion delay (e.g., 3 seconds)
    const downloadTimeout = setTimeout(() => {
      setIsDownloaded(true);

      // Redirect after showing the message for a short time (e.g., 2 more seconds)
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }, 3000);

    // Cleanup the timeout
    return () => clearTimeout(downloadTimeout);
  }, [navigate]);

  return (
    <div>
      <h2>Your download will start shortly...</h2>

      {/* Show popup message after download is completed */}
      {isDownloaded && (
        <div className="popup-message">
          <p>Download completed successfully! Redirecting...</p>
        </div>
      )}
    </div>
  );
};

export default DownloadCV;
