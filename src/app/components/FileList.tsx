'use client';

import FolderTree, { NodeData } from 'react-folder-tree';
import 'react-folder-tree/dist/style.css';

interface FileListProps {
  data: NodeData[];
}

const FileList: React.FC<FileListProps> = ({ data }) => {
  const handleSubmit = async () => {
    // Generate and download text file with selected files
    // ...
  };

  return (
    <div>
      <FolderTree
        data={{ name: 'root', children: data }}
        onChange={(treeState) => console.log('treeState', treeState)}
        initOpenStatus="closed"
      />
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 mt-2 rounded">
        Download Selected Files
      </button>
    </div>
  );
};

export default FileList;
