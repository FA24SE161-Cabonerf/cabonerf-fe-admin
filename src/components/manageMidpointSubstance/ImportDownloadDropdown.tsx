import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ImportIcon, Download, ChevronDown } from "lucide-react";

interface ImportDownloadDropdownProps {
  onImport: () => void;
  onDownload: () => void;
  isDownloading: boolean;
}

const ImportDownloadDropdown: React.FC<ImportDownloadDropdownProps> = ({
  onImport,
  onDownload,
  isDownloading,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <Button onClick={toggleDropdown} aria-haspopup="true" aria-expanded={isOpen}>
        <ImportIcon className="mr-2 h-4 w-4" />
        Import / Download
        <ChevronDown className="ml-2 h-4 w-4" />
      </Button>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <button
              onClick={() => {
                onImport();
                setIsOpen(false);
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              <ImportIcon className="mr-2 h-4 w-4 flex-shrink-0" />
              <span className="flex-grow text-left">Import</span>
            </button>
            <button
              onClick={() => {
                onDownload();
                setIsOpen(false);
              }}
              className={`flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${
                isDownloading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              role="menuitem"
              disabled={isDownloading}
            >
              <Download className="mr-2 h-4 w-4 flex-shrink-0" />
              <span className="flex-grow text-left">
                {isDownloading ? "Downloading..." : "Download Template"}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImportDownloadDropdown;