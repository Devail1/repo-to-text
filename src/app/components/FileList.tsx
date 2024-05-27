"use client";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useCallback, useState, useMemo } from "react";
import FolderTree, { NodeData } from "react-folder-tree";
import "react-folder-tree/dist/style.css";
import { IFile } from "../types";

interface FileListProps {
  data: NodeData[];
}

const FileList: React.FC<FileListProps> = ({ data }) => {
  const searchParams = useSearchParams();
  const repoUrl = searchParams.get("url");

  const [selectedFiles, setSelectedFiles] = useState<NodeData[]>([]);
  const [fileContents, setFileContents] = useState<string>("");

  const memoizedData = useMemo(() => ({ name: "root", children: data }), [data]);

  const getSelectedFiles = useCallback((node: NodeData): NodeData[] => {
    let selected: NodeData[] = [];

    if (node.children) {
      node.children.forEach((child) => {
        selected = selected.concat(getSelectedFiles(child));
      });
    } else if (node.checked === 1) {
      selected.push(node);
    }
    return selected;
  }, []);

  const onTreeStateChange = useCallback(
    (state: NodeData) => {
      const selected = getSelectedFiles(state);

      setSelectedFiles((prevSelectedFiles) => {
        return JSON.stringify(prevSelectedFiles) !== JSON.stringify(selected)
          ? selected
          : prevSelectedFiles;
      });
    },
    [getSelectedFiles]
  );

  const handleSubmit = useCallback(async () => {
    if (!repoUrl) return;

    const stringDivider =
      "------------------------------------------------------------------------------------------------";

    try {
      const contents = await Promise.all(
        selectedFiles.map(async (file) => {
          const url = file.props.download_url;
          const response = await axios.get(url);
          const data =
            typeof response.data === "object"
              ? JSON.stringify(response.data, null, 2)
              : response.data;
          return `File: ${file.props.path}\n${stringDivider}\n\n${data}`;
        })
      );
      setFileContents(contents.join("\n\n"));
    } catch (error) {
      console.error("Error fetching file contents", error);
    }
  }, [repoUrl, selectedFiles]);

  return (
    <div>
      <FolderTree data={memoizedData} onChange={onTreeStateChange} initOpenStatus="closed" />
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 mt-2 rounded">
        Download Selected Files
      </button>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <pre className="text-gray-900">{fileContents}</pre>
      </div>
    </div>
  );
};

export default FileList;
