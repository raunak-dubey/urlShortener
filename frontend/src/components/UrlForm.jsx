"use client";
import { useState } from "react";
import axios from "axios";

const UrlForm = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const isValidUrl = (value) => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setMsg("");
    setShortUrl("");
    if (!url.trim()) {
      setMsg("Please enter a URL.");
      return;
    }
    if (!isValidUrl(url.trim())) {
      setMsg("Please enter a valid URL (include http:// or https://).");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`http://localhost:3000/api/create`, { originalUrl: url.trim() });
      console.log("Hello");
      
      const data = res.data;
      console.log('response data', data);
      if (res.status >= 400) {
        setMsg(data?.message || "Failed to create short url");
      } else {
        const token = data?.data?.shortUrl || data?.shortUrl || data?.short;
        if (!token) {
          setMsg("Unexpected response from server.");
        } else {
          if (token.startsWith && token.startsWith('http')) {
            setShortUrl(token);
          } else {
            setShortUrl(`http://localhost:3000/${token}`);
          }
        }
      }
    } catch (err) {
      console.error('request error', err);
      if (err.response) {
        setMsg(err.response.data?.message || `Failed to create short url (${err.response.status})`);
      } else if (err.request) {
        // request made but no response
        setMsg('No response from backend. Is the backend running?');
      } else {
        setMsg('Network error. Check your backend or modify the endpoint.');
      }
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setMsg("Copied to clipboard!");
      setTimeout(() => setMsg(""), 1800);
    } catch {
      setMsg("Failed to copy.");
    }
  };

  return (
    <>
      <form className="mt-2" onSubmit={handleSubmit}>
        <label className="block text-sm text-slate-600 dark:text-slate-400 mb-2">
          Enter a URL to shorten
        </label>
        <div className="flex gap-3 flex-col sm:flex-row">
          <input
            className="flex-1 px-4 py-3 rounded-lg bg-white border border-slate-200 placeholder:text-slate-400 outline-none text-sm dark:bg-slate-700/30 dark:border-slate-600 dark:text-slate-100 transition-colors duration-200"
            placeholder="https://example.com/very/long/link"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            autoComplete="off"
            autoFocus
          />
          <button
            className="min-w-[120px] px-4 py-3 rounded-lg btn-brand text-white font-bold text-sm shadow-md transition-colors duration-200 brand-ring"
            type="submit"
            disabled={loading}
          >
            {loading ? "Shortening..." : "Shorten"}
          </button>
        </div>
      </form>
      {msg && (
        <div className="mt-4 font-semibold text-brand transition-colors duration-200">
          {msg}
        </div>
      )}

      {shortUrl && (
        <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white border border-slate-200 rounded-lg p-3 dark:bg-slate-700/30 dark:border-slate-600 transition-colors duration-200">
          <a
            className="text-brand font-semibold break-words transition-colors duration-200"
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {shortUrl}
          </a>
          <div className="flex gap-2">
            <button
              onClick={() => copyToClipboard(shortUrl)}
              className="px-3 py-2 rounded-md border border-slate-200 dark:border-slate-600 text-sm bg-white dark:bg-transparent transition-colors duration-200"
            >
              Copy
            </button>
            <button
              onClick={() => {
                setUrl("");
                setShortUrl("");
                setMsg("");
              }}
              className="px-3 py-2 rounded-md border border-slate-200 dark:border-slate-600 text-sm bg-white dark:bg-transparent transition-colors duration-200"
            >
              New
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UrlForm;
