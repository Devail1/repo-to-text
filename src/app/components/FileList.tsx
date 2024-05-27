"use client";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import FolderTree, { NodeData } from "react-folder-tree";
import "react-folder-tree/dist/style.css";

interface FileListProps {
  data: NodeData[];
}

const FileList: React.FC<FileListProps> = ({ data }) => {
  const searchParams = useSearchParams();
  const repoUrl = searchParams.get("url");

  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [fileContents, setFileContents] = useState<string>("");

  const getSelectedFiles = useCallback((node: NodeData): string[] => {
    let selected: string[] = [];
    if (node.checked === 1) {
      selected.push(node.path);
    }
    if (node.children) {
      node.children.forEach((child) => {
        selected = selected.concat(getSelectedFiles(child));
      });
    }
    return selected;
  }, []);

  const onTreeStateChange = useCallback(
    (state: NodeData) => {
      const selected = getSelectedFiles(state);
      setSelectedFiles((prevSelectedFiles) => {
        // Only update state if the selected files have changed
        if (JSON.stringify(prevSelectedFiles) !== JSON.stringify(selected)) {
          return selected;
        }
        return prevSelectedFiles;
      });
    },
    [getSelectedFiles]
  );

  const handleSubmit = async () => {
    if (!repoUrl) return;

    const contents = await Promise.all(
      selectedFiles.map(async (filePath) => {
        const url = `https://api.github.com/repos/${repoUrl}/contents/${filePath}`;
        const token = process.env.NEXT_PUBLIC_GITHUB_API_TOKEN;
        const { data } = await axios.get(url, {
          headers: {
            Authorization: `token ${token}`,
            Accept: "application/vnd.github.v3.raw",
          },
        });
        console.log("data", data);

        return data;
      })
    );
    setFileContents(contents.join("\n\n"));
  };

  return (
    <div>
      <FolderTree
        data={{ name: "root", children: data }}
        // onChange={onTreeStateChange}
        initOpenStatus="closed"
      />
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 mt-2 rounded">
        Download Selected Files
      </button>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <pre>{fileContents}</pre>
      </div>
    </div>
  );
};

export default FileList;
