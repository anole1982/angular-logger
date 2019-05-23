import { join } from 'path';
import { existsSync, createReadStream, createWriteStream } from 'fs';

import { name } from '../package.json';

function copyReadmeAfterSuccessfulBuild(): void {
    const path: string = join(__dirname, '../README.md');
    const readmeDoesNotExist: boolean = !existsSync(path);

    if (readmeDoesNotExist) {
        return console.warn(`README.md doesn't exist on the root level!`);
    }

    createReadStream(path)
        .pipe(createWriteStream(join(__dirname, `../dist/${name}/README.md`)))
        .on('finish', () => {
            // tslint:disable-next-line:no-console
            console.info(`Successfully copied README.md into dist/${name} folder!`);
        });
}

copyReadmeAfterSuccessfulBuild();
