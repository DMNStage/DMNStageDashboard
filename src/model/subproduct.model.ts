export class Subproduct {

    id: number;
    name: string = '';
    pathName: string = '';
    startTime: string = '';
    endTime: string = '';
    step: number = 0;
    ext: string = '';

    constructor(id: number) {
        this.id = id;
    }
}
