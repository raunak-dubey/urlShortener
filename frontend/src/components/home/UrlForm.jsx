"use client";
import { useState } from "react";
import { createShortUrl } from "@/api/shortUrl.api";
import { useQueryClient } from "@tanstack/react-query";
import styles from "@/styles/components/urlform.module.scss";
import { motion } from "motion/react";

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
      <motion.div
        className={styles.urlForm}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="https://example.com/very/long/link"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              autoComplete="off"
              autoFocus
            />
            <button type="submit" disabled={loading}>
              {loading ? "Shortening..." : "Shorten"}
            </button>
          </div>
        </form>

        {msg && <p className={styles.message}>{msg}</p>}

        {shortUrl && (
          <motion.div
            className={styles.resultBox}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </a>
            <div className={styles.btnGroup}>
              <button onClick={() => copyToClipboard(shortUrl)}>Copy</button>
              <button
                onClick={() => {
                  setUrl("");
                  setShortUrl("");
                  setMsg("");
                }}
              >
                New
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

export default UrlForm;
