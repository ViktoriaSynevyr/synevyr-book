import fs from "node:fs";
import path from "node:path";

const chaptersDirectory = path.join(
  process.cwd(),
  "app",
  "[lang]",
  "reading",
  "chapters"
);

const chapterFolders = fs
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

const oldNavigationPattern =
  /\s*<div className="mt-8 flex justify-between text-lg">[\s\S]*?<\/div>/g;

let changedFiles = 0;

console.log(
  "\nRemoving duplicate old navigation...\n"
);

for (const folder of chapterFolders) {
  const filePath = path.join(
    chaptersDirectory,
    folder.name,
    "page.tsx"
  );

  if (!fs.existsSync(filePath)) {
    console.log(
      "Chapter " +
        folder.name +
        ": page.tsx not found"
    );
    continue;
  }

  const originalCode = fs.readFileSync(
    filePath,
    "utf8"
  );

  let updatedCode = originalCode.replace(
    oldNavigationPattern,
    ""
  );

  if (
    updatedCode !== originalCode &&
    !updatedCode.includes("<Link")
  ) {
    updatedCode = updatedCode.replace(
      /import Link from "next\/link";\r?\n/,
      ""
    );
  }

  if (updatedCode === originalCode) {
    console.log(
      "Chapter " +
        folder.name +
        ": no duplicate navigation found"
    );
    continue;
  }

  const backupPath =
    filePath + ".before-navigation-cleanup.bak";

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
      folder.name +
      ": duplicate navigation removed"
  );
}

console.log(
  "\nFinished. Changed files: " +
    changedFiles
);

console.log(
  "Backup copies were created before cleanup.\n"
);