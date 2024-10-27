export type NodeType = "file" | "folder";
export interface DirectoryNode {
  type: NodeType;
  value: string;
  isOpen?: boolean;
  children?: DirectoryNode[];
  path: string;
}
export const directoryData: DirectoryNode = {
  type: "folder",
  value: "Root",
  path: "Root",
  isOpen: true,
  children: [
    {
      type: "folder",
      value: "Documents",
      path: "Root/Documents",
      children: [
        {
          type: "file",
          value: "Resume.pdf",
          path: "Root/Documents/Resume.pdf",
        },
        {
          type: "file",
          value: "CoverLetter.docx",
          path: "Root/Documents/CoverLetter.docx",
        },
      ],
    },
    {
      type: "folder",
      value: "Pictures",
      path: "Root/Pictures",
      children: [
        {
          type: "file",
          value: "Vacation.jpg",
          path: "Root/Pictures/Vacation.jpg",
        },
        {
          type: "file",
          value: "Family.png",
          path: "Root/Pictures/Family.png",
        },
        {
          type: "folder",
          value: "2023",
          path: "Root/Pictures/2023",
          children: [
            {
              type: "file",
              value: "NewYearParty.jpg",
              path: "Root/Pictures/2023/NewYearParty.jpg",
            },
          ],
        },
      ],
    },
    {
      type: "folder",
      value: "Music",
      path: "Root/Music",
      children: [
        {
          type: "file",
          value: "FavoriteSong.mp3",
          path: "Root/Music/FavoriteSong.mp3",
        },
        {
          type: "folder",
          value: "Playlists",
          path: "Root/Music/Playlists",
          children: [
            {
              type: "file",
              value: "ChillHits.m3u",
              path: "Root/Music/Playlists/ChillHits.m3u",
            },
          ],
        },
      ],
    },
    {
      type: "file",
      value: "README.txt",
      path: "Root/README.txt",
    },
  ],
};
