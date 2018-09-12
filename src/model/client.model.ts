export class Client {

    id: number;
    username: string = '';
    password: string = '';
    email: string = '';
    phone: string = '';
    organizationName: string = '';
    active: boolean = true;
    subProducts:
        {
            id: number,
            name: string,
            pathName: string,
            startTime: string,
            endTime: string,
            step: number,
            ext: string
        }[];
    constructor() {
    }

}
