import { string, func } from "prop-types";
import { useState } from "react";
import CheckIcon from "../assets/check.svg";
import CopyIcon from "../assets/copy.svg";

const copyToClipboard = async (text) => {
  try {
    if (!navigator.clipboard) {
      throw new Error("Clipboard API not supported");
    }

    if (navigator.permissions) {
      const permission = await navigator.permissions.query({
        name: "clipboard-write",
      });
      if (permission.state === "denied") {
        throw new Error("Clipboard permission denied");
      }
    }

    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error("Failed to copy to clipboard:", error.message);
    return false;
  }
};

const Copy = ({ label, value, onCopy, className }) => {
  const [copied, setCopied] = useState(false);
  const iconClass =
    "absolute top-0 left-0 transition-opacity duration-150 w-4 h-4 min-w-4 min-h-4";

  const handleCopy = async () => {
    if (copied) return;
    setCopied(true);

    const success = await copyToClipboard(value);
    if (success) {
      console.info(`Copied ${label} to clipboard: ${value}`);
      setTimeout(() => setCopied(false), 1500);
    }
    if (onCopy) {
      onCopy();
    }
  };

  return (
    <button
      title="Click to copy"
      onClick={handleCopy}
      className={`${
        className || ""
      } font-mono text-gray-600 bg-white pl-3 pr-2 py-1 text-sm rounded shadow text-center align-middle flex items-center gap-2 hover:bg-gray-50 active:scale-95 transition-all duration-150
            hover:cursor-copy`}
    >
      <span>{value}</span>
      <div className="relative w-4 h-4">
        <img
          alt="Copy"
          src={CopyIcon}
          className={`${iconClass} ${copied ? "opacity-0" : "opacity-100"}`}
        />
        <img
          alt="Copied"
          src={CheckIcon}
          className={`${iconClass} ${copied ? "opacity-100" : "opacity-0"}`}
        />
      </div>
    </button>
  );
};

Copy.propTypes = {
  label: string.isRequired,
  value: string.isRequired,
  onCopy: func,
  className: string,
};

export default Copy;
