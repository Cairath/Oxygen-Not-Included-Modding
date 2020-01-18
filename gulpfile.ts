import gulp from "gulp";
import { promises as fsp, constants as fsc } from "fs";
import { join, basename } from "path";
import Gitdown from "gitdown";
import toc from "markdown-toc";

const src = join(process.cwd(), "doc");
const out = join(process.cwd(), "wiki");
const sidebarName = "_Sidebar.md";

const output: string[] = [];

interface IToC {
    contents: any[];
    fileName: string;
}

gulp.task("gitdown", async () => {
    const contents = await fsp.readdir(src);

    for (const entryName of contents) {
        const entry = join(src, entryName);
        const stats = await fsp.stat(entry);

        let target = entry;
        let targetName = basename(target, ".md");
        if (stats.isDirectory()) {
            target = join(target, "index.md");
        }

        const gitdown = await Gitdown.readFile(target);

        const outputFile = join(out, targetName + ".md");
        await gitdown.writeFile(outputFile);

        output.push(outputFile);
    }
});

gulp.task("toc", async () => {
    let ToCs: IToC[] = [];

    for (const file of output) {
        if (basename(file) !== sidebarName) {
            const fileHandle = await fsp.open(file, fsc.O_RDWR);
            const contents = (await fileHandle.readFile()).toString();
            let contentsLines = contents.split(/\n\r?/g);

            for (let i = 0; i < contentsLines.length; i++) {
                const line = contentsLines[i];

                const lineSearch = /^<!-- toc (?:(\d+) )?-->$/.exec(
                    line.trim()
                );
                if (lineSearch) {
                    const contentsBefore = contentsLines.slice(0, i);
                    const contentsAfter = contentsLines.slice(i + 1);

                    const contentsToC = toc(contentsAfter.join("\n"));

                    contentsLines = [
                        ...contentsBefore,
                        "#".repeat(
                            lineSearch[1]
                                ? Number.parseInt(lineSearch[1], 10)
                                : 1
                        ) + " Table of Contents",
                        contentsToC.content,
                        ...contentsAfter
                    ];
                    ToCs.push({
                        contents: contentsToC.json as any[],
                        fileName: basename(file, ".md")
                    });
                    break;
                }
            }

            await fileHandle.truncate();
            await fileHandle.write(contentsLines.join("\n"), 0);
            await fileHandle.close();
        }
    }

    const masterToC: any[] = [];

    for (const pageToC of ToCs) {
        masterToC.push({
            content: `[${pageToC.fileName}](${pageToC.fileName})`,
            lvl: 1
        });

        for (let pageItem of pageToC.contents) {
            pageItem = toc.linkify(pageItem);

            const linkEndIdx = (pageItem.content as string).indexOf("](") + 2;
            pageItem.content =
                pageItem.content.substring(0, linkEndIdx) +
                pageToC.fileName +
                pageItem.content.substring(linkEndIdx);
            masterToC.push(pageItem);
        }
    }

    await fsp.writeFile(
        join(out, sidebarName),
        toc.bullets(masterToC, { highest: 1 }) + "\n",
        {
            flag: fsc.O_APPEND
        }
    );

    output.length = 0;
});

gulp.task("doc", gulp.series("gitdown", "toc"));

gulp.task("watch", () => {
    gulp.watch(["doc/**/*.md"], gulp.task("doc"));
});
