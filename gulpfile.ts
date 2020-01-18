import gulp from "gulp";
import { promises as fsp } from "fs";
import { join, basename } from "path";
import Gitdown from "gitdown";

const src = join(process.cwd(), "doc");
const out = join(process.cwd(), "wiki");

gulp.task("default", async () => {
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
        await gitdown.writeFile(join(out, targetName + ".md"));
    }
});

gulp.task("watch", () => {
    gulp.watch(["doc/*"], () => gulp.task("default"));
});
