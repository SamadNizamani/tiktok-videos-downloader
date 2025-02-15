import Link from 'next/link'; 
import { useState } from 'react';
import axios from 'axios';
import { FiDownload, FiMenu, FiX, FiGithub } from 'react-icons/fi';

export default function Home() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleDownload = async () => {
    setError('');
    setResult(null);

    try {
      if (!url || !url.includes('tiktok.com')) {
        throw new Error('Please enter a valid TikTok URL');
      }

      setLoading(true);
      const response = await axios.post('/api/download', { url });
      
      if (!response.data?.url) {
        throw new Error('Video download failed');
      }

      setResult(response.data);
      
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">TTDownloader</div>
          
          <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <button className="menu-close" onClick={() => setMenuOpen(false)}>
              <FiX />
            </button>
          </div>
          
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            <FiMenu />
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <h1 className="title">Download TikTok Videos Without Watermark</h1>
        <p className="subtitle">Paste your TikTok link below</p>

        <div className="download-section">
          <div className="input-container">
            <input
              type="text"
              placeholder="https://www.tiktok.com/@username/video/123456..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button 
              onClick={handleDownload}
              className="download-button"
              disabled={loading}
            >
              {loading ? (
                <div className="spinner"></div>
              ) : (
                <>
                  <FiDownload /> Download
                </>
              )}
            </button>
          </div>

          {error && <div className="error-message">{error}</div>}

          {result && (
            <div className="result-box">
              <div className="video-wrapper">
                <video controls src={result.url} />
              </div>
              <div className="video-info">
                <h3>{result.title}</h3>
                <div className="meta">
                  <span>👤 {result.author}</span>
                  <span>⏱️ {result.duration}s</span>
                </div>
                <a
                  href={result.url}
                  download="tiktok-video.mp4"
                  className="download-link"
                >
                  <FiDownload /> Download HD Video
                </a>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Improved Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>TTDownloader</h4>
            <p>High quality TikTok video downloads</p>
          </div>
          
          <div className="footer-section">
            <h4>Legal</h4>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
          
          <div className="footer-section">
            <h4>Support</h4>
            <Link href="/contact">Contact Us</Link>
            <Link href="/faq">FAQ</Link>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="copyright">
            © 2024 TTDownloader. All rights reserved.
          </div>
          <div className="github-link">
            <a href="https://github.com/SamadNizamani" target="_blank" rel="noopener noreferrer">
              <FiGithub /> Source Code
            </a>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        :root {
          --primary: #6366f1;
          --dark: #1e293b;
          --light: #ffffff;
          --gray: #f8fafc;
          --error: #ef4444;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Inter', -apple-system, sans-serif;
        }

        body {
          background: var(--gray);
          min-height: 100vh;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .navbar {
          background: var(--light);
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          padding: 1rem 0;
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary);
        }

        .nav-links {
          display: flex;
          gap: 2rem;
          align-items: center;
          
          a {
            color: var(--dark);
            text-decoration: none;
            transition: color 0.2s;
            
            &:hover {
              color: var(--primary);
            }
          }
        }

        .menu-toggle {
          display: none;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: var(--dark);
        }

        .main-content {
          flex: 1;
          max-width: 800px;
          margin: 2rem auto;
          padding: 0 1rem;
          text-align: center;
        }

        .title {
          font-size: 2.5rem;
          color: var(--dark);
          margin-bottom: 1rem;
        }

        .subtitle {
          color: #64748b;
          margin-bottom: 2rem;
        }

        .input-container {
          background: var(--light);
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }

        input {
          width: 100%;
          padding: 1rem;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 1rem;
          margin-bottom: 1rem;
          transition: border-color 0.2s;
          
          &:focus {
            outline: none;
            border-color: var(--primary);
          }
        }

        .download-button {
          background: var(--primary);
          color: var(--light);
          border: none;
          padding: 1rem 2rem;
          border-radius: 8px;
          font-size: 1rem;
          cursor: pointer;
          transition: transform 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin: 0 auto;
          
          &:hover {
            transform: translateY(-2px);
          }
          
          &:disabled {
            opacity: 0.7;
            cursor: not-allowed;
          }
        }

        .spinner {
          width: 24px;
          height: 24px;
          border: 3px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s linear infinite;
        }

        .error-message {
          color: var(--error);
          background: #fee2e2;
          padding: 1rem;
          border-radius: 8px;
          margin: 1rem 0;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .result-box {
          background: var(--light);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
          margin-top: 2rem;
        }

        .video-wrapper {
          background: #000;
          line-height: 0;
          
          video {
            width: 100%;
            max-width: 400px;
            height: auto;
            aspect-ratio: 9/16;
          }
        }

        .video-info {
          padding: 1.5rem;
          
          h3 {
            margin-bottom: 1rem;
            color: var(--dark);
          }
        }

        .meta {
          display: flex;
          gap: 1rem;
          color: #64748b;
          margin-bottom: 1.5rem;
          justify-content: center;
        }

        .download-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--primary);
          color: var(--light);
          padding: 0.8rem 1.5rem;
          border-radius: 8px;
          text-decoration: none;
          transition: opacity 0.2s;
          
          &:hover {
            opacity: 0.9;
          }
        }

        .footer {
          background: var(--dark);
          color: var(--light);
          margin-top: auto;
          padding: 3rem 0 1rem;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          padding: 0 1rem;
        }

        .footer-section {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          
          h4 {
            margin-bottom: 0.5rem;
            color: var(--light);
          }
          
          a {
            color: #94a3b8;
            text-decoration: none;
            transition: color 0.2s;
            
            &:hover {
              color: var(--light);
            }
          }
        }

        .footer-bottom {
          max-width: 1200px;
          margin: 2rem auto 0;
          padding: 1rem;
          border-top: 1px solid #334155;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .copyright {
          color: #94a3b8;
        }

        .github-link a {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--light);
          text-decoration: none;
          
          &:hover {
            text-decoration: underline;
          }
        }

        @media (max-width: 768px) {
          .nav-links {
            position: fixed;
            top: 0;
            right: -100%;
            width: 70%;
            height: 100vh;
            background: var(--light);
            flex-direction: column;
            padding: 2rem;
            transition: 0.3s;
            box-shadow: -2px 0 10px rgba(0,0,0,0.1);
            
            &.active {
              right: 0;
            }
          }

          .menu-toggle {
            display: block;
          }

          .title {
            font-size: 2rem;
          }

          .input-container {
            padding: 1.5rem;
          }

          .footer-content {
            grid-template-columns: 1fr;
          }

          .footer-bottom {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}