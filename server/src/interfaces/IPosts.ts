export interface IComment {
    commentId: string;
    username: string;
    userWtp: string;
    content: string;
    createdAt: Date;
    likes: number;
    liked: boolean;
    likedBy: string[];
    dislikedBy: string[];
    disliked: boolean;
    dislikes: number;
}

export interface IPost {
    postId: string;
    content: string;
    username: string;
    userWtp: string;
    createdAt: string;
    image?: string;
    video?: string;
    comments: IComment[];
    dislikes: number;
    disliked: boolean;
    dislikedBy: string[];
    shares: number;
    shared: boolean;
    sharedBy: string[];
    likes: number;
    liked: boolean;
    likedBy: string[];
}
