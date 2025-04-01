import { TUsers } from '../types/TUser';

export const formatedReturn = (body: TUsers): TUsers => {
   const format: TUsers = {
        name: body.name,
        user: body.user,
        age: body.age,
        userWtp: body.userWtp,
        phone: body.phone,
        role: body.role,
        subRole: body.subRole,
        status: body.status,
        points: body.points,
        subs: body.subs,
        books: body.books,
        isDeleted: body.isDeleted,
   };

   return format;
};

export const formatedReturnToAll = (body: TUsers[]): TUsers[] => {
   const format = body.map(formatedReturn);

   return format.sort((a, b) => a.name.localeCompare(b.name));
};
