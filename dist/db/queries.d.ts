declare function queries(): Promise<{
    getUserByUsername: (username: string) => Promise<any>;
    createUser: (username: string, password: string) => Promise<any>;
    getAllpostsWithoutUser: () => Promise<any[]>;
}>;
export default queries;
//# sourceMappingURL=queries.d.ts.map