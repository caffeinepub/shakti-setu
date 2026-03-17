import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface Course {
    id: string;
    title: string;
    duration: bigint;
    description: string;
    category: string;
}
export interface Badge {
    id: string;
    name: string;
    description: string;
}
export type Time = bigint;
export interface Comment {
    content: string;
    createdAt: Time;
    author: Principal;
    postId: string;
}
export interface Post {
    id: string;
    content: string;
    createdAt: Time;
    author: Principal;
    likes: bigint;
    image?: ExternalBlob;
}
export interface Profile {
    bio: string;
    name: string;
    profileCompletion: bigint;
    earnings: bigint;
    profilePicture?: ExternalBlob;
    skills: Array<string>;
    location: string;
}
export interface DashboardStats {
    completedCourses: bigint;
    productsListed: bigint;
    totalEarnings: bigint;
    communityPosts: bigint;
    enrolledCourses: bigint;
}
export interface Product {
    id: string;
    title: string;
    description: string;
    seller: Principal;
    category: string;
    image?: ExternalBlob;
    price: bigint;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addComment(postId: string, content: string): Promise<void>;
    addCourse(id: string, course: Course): Promise<void>;
    addProduct(id: string, product: Product): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createPost(id: string, content: string, image: ExternalBlob | null): Promise<void>;
    createProfile(profile: Profile): Promise<void>;
    enrollInCourse(courseId: string): Promise<void>;
    getBadges(): Promise<Array<Badge>>;
    getCallerUserProfile(): Promise<Profile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getComments(postId: string): Promise<Array<Comment>>;
    getCourses(): Promise<Array<Course>>;
    getCoursesByTitle(): Promise<Array<Course>>;
    getDashboardStats(): Promise<DashboardStats>;
    getPosts(): Promise<Array<Post>>;
    getPostsByAuthor(): Promise<Array<Post>>;
    getProducts(): Promise<Array<Product>>;
    getProductsByPrice(): Promise<Array<Product>>;
    getProductsBySeller(): Promise<Array<Product>>;
    getProfile(user: Principal): Promise<Profile>;
    getUserProfile(user: Principal): Promise<Profile | null>;
    isCallerAdmin(): Promise<boolean>;
    likePost(postId: string): Promise<void>;
    saveCallerUserProfile(profile: Profile): Promise<void>;
    updateCourseProgress(courseId: string, progress: bigint): Promise<void>;
    updateProfile(profile: Profile): Promise<void>;
}
