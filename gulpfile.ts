import gulp from "gulp";
import fs from "fs";
import { join, basename } from "path";
import Gitdown from "gitdown";
import toc from "markdown-toc";
import gulpCopy from "gulp-copy";
import gulpClean from "gulp-clean";

const src = join(process.cwd(), "doc");
const out = join(process.cwd(), "wiki");
const sidebarName = "_Sidebar.md";
const readmeName = "README.md";
const readmeSrc = ".README";

const output: string[] = [];

interface IToC {
    contents: any[];
    fileName: string;
}

gulp.task("gitdown", async () => {
    const contents = fs.readdirSync(src);

    for (const entryName of contents) {
        const entry = join(src, entryName);
        const stats = fs.statSync(entry);

        let target = entry;
        let targetNoSpaces = target.replace(/ /g, "_");
        let targetName = basename(targetNoSpaces, ".md");
        if (stats.isDirectory()) {
            target = join(target, "index.md");
        }

        const gitdown = await Gitdown.readFile(target);

        const outputFile = join(out, targetName + ".md");
        await gitdown.writeFile(outputFile);

        output.push(outputFile);
    }

    const gitdownReadme = await Gitdown.readFile(
        join(process.cwd(), readmeSrc, readmeName)
    );
    await gitdownReadme.writeFile(join(process.cwd(), readmeName));
});

gulp.task("toc", async () => {
    let ToCs: IToC[] = [];

    for (const file of output) {
        if (basename(file) !== sidebarName) {
            const contents = fs.readFileSync(file).toString();
            let contentsLines = contents.split(/\n\r?/g);

            for (let i = 0; i < contentsLines.length; i++) {
                const line = contentsLines[i];

                const lineSearch = /^<!-- toc(?:(.*))? -->$/.exec(line.trim());
                if (lineSearch) {
                    const contentsBefore = contentsLines.slice(0, i);
                    const contentsAfter = contentsLines.slice(i + 1);

                    const tocOptions = {
                        maxDepth: 6,
                        headerSize: 2,
                        ...(lineSearch[1] ? JSON.parse(lineSearch[1]) : {}),
                    };

                    const contentsToC = toc(contentsAfter.join("\n"), {
                        maxdepth: tocOptions.maxDepth,
                    });

                    contentsLines = contentsToC.content.length
                        ? [
                              ...contentsBefore,
                              "#".repeat(tocOptions.headerSize) +
                                  " Table of Contents",
                              contentsToC.content,
                              ...contentsAfter,
                          ]
                        : [...contentsBefore, ...contentsAfter];
                    ToCs.push({
                        contents: contentsToC.json as any[],
                        fileName: basename(file, ".md"),
                    });
                    break;
                }
            }

            fs.writeFileSync(file, contentsLines.join("\n"));
        }
    }

    const masterToC: any[] = [
        {
            content: `[Home](Home)`,
            lvl: 1,
        },
    ];

    for (const pageToC of ToCs) {
        const title = pageToC.fileName.replace(/_/g, " ");
        const url = pageToC.fileName.replace(/_/g, "-");

        masterToC.push({
            content: `[${title}](${url})`,
            lvl: 1,
        });

        for (let pageItem of pageToC.contents) {
            if (pageItem.lvl <= 2) {
                pageItem = toc.linkify(pageItem);

                const linkEndIdx =
                    (pageItem.content as string).indexOf("](") + 2;
                pageItem.content =
                    pageItem.content.substring(0, linkEndIdx) +
                    url +
                    pageItem.content.substring(linkEndIdx);
                masterToC.push(pageItem);
            }
        }
    }

    const sidebarExisting = fs.readFileSync(join(out, sidebarName));
    fs.writeFileSync(
        join(out, sidebarName),
        sidebarExisting + "\n" + toc.bullets(masterToC, { highest: 1 }) + "\n"
    );

    output.length = 0;
});

gulp.task("clean", () => gulp.src("wiki/*").pipe(gulpClean()));

gulp.task("copy-resources", () =>
    gulp.src("doc/*/sections/*/**").pipe(gulpCopy("wiki", { prefix: 3 }))
);

gulp.task("doc", gulp.series("clean", "gitdown", "toc", "copy-resources"));
gulp.task("watcher", () => {
    gulp.watch(["doc/**"], gulp.task("doc"));
});

gulp.task("watch", gulp.series("doc", "watcher"));
