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

const output: Record<string, string[]> = {};

interface File {
    contents: any[];
    fileName: string;
}

interface ToCEntry {
    content: string;
    lvl: number;
}

interface ToCCategory {
    name?: string;
    entries: ToCEntry[];
}

interface ToC {
    categories: ToCCategory[];
}

gulp.task("gitdown", async () => {
    const contents = fs.readdirSync(src);
    let pageOutputFilename: string;

    for (const categoryName of contents) {
        const categoryPath = join(src, categoryName);
        let pagePath = categoryPath;

        const categoryStats = fs.statSync(categoryPath);

        if (categoryStats.isDirectory()) {
            const categoryPages = fs.readdirSync(categoryPath);
            const categoryName = basename(categoryPath).substr(3);
            console.log(`${categoryName}:`);
            console.log(categoryPages);

            for (const pageName of categoryPages) {
                pagePath = join(categoryPath, pageName, "index.md");
                pageOutputFilename = basename(
                    pageName.replace(/ /g, "_")
                ).substr(3);

                await generateGitdownPage(
                    pagePath,
                    pageOutputFilename,
                    categoryName
                );
            }
        } else {
            pageOutputFilename = basename(
                categoryPath.replace(/ /g, "_"),
                ".md"
            );

            await generateGitdownPage(pagePath, pageOutputFilename, "default");
        }
    }

    const gitdownReadme = await Gitdown.readFile(
        join(process.cwd(), readmeSrc, readmeName)
    );
    await gitdownReadme.writeFile(join(process.cwd(), readmeName));
});

const generateGitdownPage = async (
    pagePath: string,
    pageOutputFilename: string,
    categoryName: string
) => {
    const gitdown = await Gitdown.readFile(pagePath);
    const outputFile = join(out, pageOutputFilename + ".md");

    console.log(`Generating ${basename(outputFile)}`);
    await gitdown.writeFile(outputFile);

    if (Object.keys(output).find((k) => k === categoryName)) {
        output[categoryName].push(outputFile);
    } else {
        output[categoryName] = [];
        output[categoryName].push(outputFile);
    }
};

gulp.task("toc", async () => {
    console.log(output);

    const masterToC: ToCCategory[] = [
        {
            name: "Home",
            entries: [
                {
                    content: `[Home](Home)`,
                    lvl: 1,
                },
            ],
        },
    ];

    for (const category in output) {
        console.log(category);

        let tocCategory = masterToC.find((c) => c.name === category);
        if (tocCategory === undefined) {
            masterToC.push({
                name: category,
                entries: [],
            });
        }

        for (const file of output[category]) {
            console.log(file);
            const fileName = basename(file, ".md");
            if (fileName !== basename(sidebarName, ".md")) {
                const contents = fs.readFileSync(file).toString();
                let contentsLines = contents.split(/\n\r?/g);

                for (let i = 0; i < contentsLines.length; i++) {
                    const line = contentsLines[i];

                    const lineSearch = /^<!-- toc(?:(.*))? -->$/.exec(
                        line.trim()
                    );

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

                        const title = fileName.replace(/_/g, " ");
                        const url = fileName.replace(/_/g, "-");

                        let idx = masterToC.findIndex(
                            (c) => c.name === category
                        );
                        masterToC[idx].entries.push({
                            content: `[${title}](${url})`,
                            lvl: 1,
                        });

                        for (let pageItem of contentsToC.json) {
                            if (pageItem.lvl == 2) {
                                //todo was <=2
                                pageItem = toc.linkify(pageItem);

                                const linkEndIdx =
                                    (pageItem.content as string).indexOf("](") +
                                    2;
                                pageItem.content =
                                    pageItem.content.substring(0, linkEndIdx) +
                                    url +
                                    pageItem.content.substring(linkEndIdx);
                                masterToC[idx].entries.push(pageItem);
                            }
                        }
                    }
                }

                fs.writeFileSync(file, contentsLines.join("\n"));
            }
        }
    }

    const sidebarExisting = fs.readFileSync(join(out, sidebarName));
    let sidebarContent = sidebarExisting + "\n";

    for (const category of masterToC) {
        const categoryHeader =
            category.name === "Home" || category.name === "default"
                ? ""
                : `#### **${category.name}**\n`;

        sidebarContent =
            sidebarContent +
            categoryHeader +
            toc.bullets(category.entries, { highest: 1 }) +
            "\n";
    }

    fs.writeFileSync(join(out, sidebarName), sidebarContent);
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
