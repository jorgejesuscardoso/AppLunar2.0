export type TUsers = {
    id: string;
    name: string;
    user: string;
    age: number;
    password?: string;
    userWtp: string;
    phone: string;
    role: string;
    subRole: string;
    status: string;
    points: number;
    books: [
        {
            id: string;
            title: string;
            author: string;
            wUrl: string;
            cover: string;
            status: string;
            genre: string;
            subGenre: string;
        }
    ];
    subs: [
        {
            id: string;
            name: string;
        }
    ];
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
};

export type TUserToken = {
    userWtp: string;
    role: string;
    subRole: string;
};