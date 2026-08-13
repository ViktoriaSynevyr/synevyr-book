import fs from "node:fs";
import path from "node:path";

const chaptersDirectory = path.join(
  process.cwd(),
  "app",
  "[lang]",
  "reading",
  "chapters"
);

const folders = fs
  .readdirSync(chaptersDirectory, {
    withFileTypes: true,
  })
  .filter(
    (entry) =>
      entry.isDirectory() &&
      /^\d+$/.test(entry.name)
  )
  .sort(
    (first, second) =>
      Number(first.name) - Number(second.name)
  );

let changedFiles = 0;

console.log(
  "\nAdding progress, bookmarks and font controls...\n"
);

for (const folder of folders) {
  const chapterNumber = Number(folder.name);

  if (chapterNumber === 1) {
    console.log(
      "Chapter 1: already connected, skipped"
    );
    continue;
  }

  const filePath = path.join(
    chaptersDirectory,
    folder.name,
    "page.tsx"
  );

  if (!fs.existsSync(filePath)) {
    console.log(
      "Chapter " +
        chapterNumber +
        ": page.tsx not found"
    );
    continue;
  }

  const originalCode = fs.readFileSync(
    filePath,
    "utf8"
  );

  if (originalCode.includes("BookChapter")) {
    console.log(
      "Chapter " +
        chapterNumber +
        ": already connected, skipped"
    );
    continue;
  }

  const titleMatch = originalCode.match(
    /<BookPage\s+title=["']([^"']+)["']\s*>/
  );

  if (!titleMatch) {
    console.log(
      "Chapter " +
        chapterNumber +
        ": BookPage title not found"
    );
    continue;
  }

  const chapterTitle = titleMatch[1];

  let updatedCode = originalCode;

  updatedCode = updatedCode.replace(
    /import BookPage from ["'][^"']+BookPage["'];/,
    'import BookChapter from "../../../../components/BookChapter";'
  );

  updatedCode = updatedCode.replace(
    /<BookPage\s+title=["'][^"']+["']\s*>/,
    '<BookChapter\n' +
      "      chapterNumber={" +
      chapterNumber +
      "}\n" +
      '      title="' +
      chapterTitle +
      '"\n' +
      '      path="/uk/reading/chapters/' +
      chapterNumber +
      '"\n' +
      "    >"
  );

  const closingTagPosition =
    updatedCode.lastIndexOf("</BookPage>");

  if (closingTagPosition === -1) {
    console.log(
      "Chapter " +
        chapterNumber +
        ": closing BookPage tag not found"
    );
    continue;
  }

  updatedCode =
    updatedCode.slice(0, closingTagPosition) +
    "</BookChapter>" +
    updatedCode.slice(
      closingTagPosition + "</BookPage>".length
    );

  const backupPath = filePath + ".bak";

  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(filePath, backupPath);
  }

  fs.writeFileSync(
    filePath,
    updatedCode,
    "utf8"
  );

  changedFiles += 1;

  console.log(
    "Chapter " +
      chapterNumber +
      ": connected successfully"
  );
}

console.log(
  "\nFinished. Changed files: " +
    changedFiles
);

console.log(
  "Backup copies were saved as page.tsx.bak\n"
);