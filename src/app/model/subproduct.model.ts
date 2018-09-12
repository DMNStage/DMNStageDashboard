export class Subproduct {

    id: number;
    name: string;
    pathName: string;
    startTime: string;
    endTime: string;
    step: number;
    ext: string;

    constructor(id: number, name: string, pathName: string, startTime: string, endTime: string, step: number, ext: string) {
        this.id = id;
        this.name = name;
        this.pathName = pathName;
        this.startTime = startTime;
        this.endTime = endTime;
        this.step = step;
        this.ext = ext;
    };
}
