declare const controller: () => Promise<{
    getUserByUsername: (username: string) => Promise<any>;
    createUser: (username: string, password: string) => Promise<void>;
    getAllpostsWitoutUser: any;
    checkIfPasswordIsMatch: (id: number, password: string) => Promise<boolean>;
}>;
export default controller;
//# sourceMappingURL=controllerdb.d.ts.map