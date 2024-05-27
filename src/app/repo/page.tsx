"use client";
import { useSearchParams } from "next/navigation";
import { useQuery } from "react-query";
import axios from "axios";
import FileList from "../components/FileList";
import { NodeData } from "react-folder-tree";
import { IFile } from "../types";

const fetchRepoFiles = async (repoUrl: string) => {
  const token = process.env.NEXT_PUBLIC_GITHUB_API_TOKEN; // Replace this with your personal access token

  const fetchFiles = async (url: string): Promise<NodeData[]> => {
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `token ${token}`,
      },
    });

    // Sort the files so that folders appear first
    data.sort((a: any, b: any) => {
      if (a.type === b.type) {
        return a.name.localeCompare(b.name);
      }
      return a.type === "dir" ? -1 : 1;
    });

    const children = await Promise.all(
      data.map(async ({ type, url, name, ...rest }: IFile) => {
        if (type === "dir") {
          const children = await fetchFiles(url);
          return { name: name, children, props: rest };
        }
        return { name: name, props: rest };
      })
    );

    return children;
  };

  return await fetchFiles(`https://api.github.com/repos/${repoUrl}/contents`);
};

const RepoPage = () => {
  const searchParams = useSearchParams();
  const url = searchParams.get("url");

  const { data, error, isLoading } = useQuery(
    ["repoFiles", url],
    () => fetchRepoFiles(url as string),
    {
      enabled: !!url,
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading repository files.</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Repo Files</h1>
      {data && <FileList data={data} />}
    </div>
  );
};

export default RepoPage;
