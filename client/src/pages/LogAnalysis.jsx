import React, { useState } from 'react';

export default function LogAnalysis() {
  // Insight section state
  const [insightLog, setInsightLog] = useState('');
  const [parsedLog, setParsedLog] = useState(null);
  const [insightText, setInsightText] = useState('');
  const [showInsightOutput, setShowInsightOutput] = useState(false);

  const generateInsight = () => {
    fetch('http://127.0.0.1:5000/parse_insight', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `log=${encodeURIComponent(insightLog)}`,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          setParsedLog(data.parsed_log);
          setInsightText(data.insights);
          setShowInsightOutput(true);
        }
      })
      .catch((err) => {
        console.error(err);
        alert('An unexpected error occurred while generating insight.');
      });
  };

  return (
    <>
      <style>
        {`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body, html, #root {
          height: 100%;
        }

        body {
          font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          background-color: #f8f9fa;
          background-image: url('../static/bg1.jpg');
          background-size: cover;
          background-attachment: fixed;
          background-position: center center;
          background-repeat: no-repeat;
          color: #333;
          line-height: 1.6;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .container {
          max-width: 900px;
          width: 100%;
          margin: 20px auto;
          background-color: rgba(255, 255, 255, 0.95);
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          backdrop-filter: blur(5px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          min-height: 300px;
        }

        h2 {
          text-align: center;
          color: #2c3e50;
          margin-bottom: 25px;
          font-size: 2.2rem;
          font-weight: 600;
        }

        h3 {
          color: #3498db;
          margin-bottom: 20px;
          font-size: 1.5rem;
          border-bottom: 2px solid #eee;
          padding-bottom: 10px;
        }

        h4 {
          color: #2c3e50;
          margin: 15px 0 10px;
          font-size: 1.2rem;
        }

        textarea {
          width: 100%;
          margin: 12px 0;
          padding: 12px 15px;
          font-size: 1em;
          border-radius: 8px;
          border: 1px solid #ddd;
          transition: all 0.3s ease;
          background-color: #f9f9f9;
          min-height: 150px;
          resize: vertical;
        }

        textarea:focus {
          outline: none;
          border-color: #3498db;
          box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
          background-color: #fff;
        }

        button {
          width: 100%;
          margin: 15px 0;
          padding: 12px;
          font-size: 1.1em;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          background-color: #2ecc71;
          color: white;
        }

        button:hover {
          background-color: #27ae60;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        button:active {
          transform: translateY(0);
        }

        .card {
          margin-top: 25px;
          padding: 20px;
          background-color: #f8f9fa;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          border-left: 4px solid #3498db;
          overflow-x: auto;
        }

        .card pre {
          background-color: #2c3e50;
          color: #ecf0f1;
          padding: 15px;
          border-radius: 6px;
          font-family: 'Courier New', monospace;
          line-height: 1.5;
          overflow-x: auto;
        }

        @media (max-width: 768px) {
          .container {
            padding: 20px;
            margin: 10px;
          }

          h2 {
            font-size: 1.8rem;
          }
        }

        @media (max-width: 480px) {
          body {
            padding: 10px;
          }

          .container {
            padding: 15px;
          }

          textarea {
            padding: 10px;
          }
        }
        `}
      </style>

      <div className="container">
        <h2>Log Parsing &amp; Insight Generation</h2>

        <label htmlFor="insight-log">Enter Raw Log:</label>
        <textarea
          id="insight-log"
          placeholder="Paste full raw log here..."
          value={insightLog}
          onChange={(e) => setInsightLog(e.target.value)}
        />
        <button onClick={generateInsight}>Generate Insight</button>

        {showInsightOutput && (
          <div className="card">
            <h4>Parsed Log</h4>
            <pre>{JSON.stringify(parsedLog, null, 2)}</pre>

            <h4>Insight</h4>
            <pre>{insightText}</pre>
          </div>
        )}
      </div>
    </>
  );
}
