"use client";
import { use, useState } from "react";
import { createShortUrl } from "@/api/shortUrl.api";
import { useQueryClient } from "@tanstack/react-query";

const UrlForm = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const queryClient = useQueryClient();

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
      const shortUrl = await createShortUrl(url.trim());
      if (!shortUrl) throw new Error(res?.message || "Invalid response");
      const baseUrl = "http://localhost:3000";
      setShortUrl(
        shortUrl.startsWith("http") ? shortUrl : `${baseUrl}/${shortUrl}`
      );
      queryClient.invalidateQueries({ queryKey: ["userUrls"] });
      setMsg("");
    } catch (err) {
      console.error("request error", err);
      setMsg(err.message || "Failed to create short url");
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
