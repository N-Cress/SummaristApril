import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type Book = {
    id: string;
    author: string;
    title: string;
    subTitle: string;
    imageLink: string;
    audioLink: string;
    totalRating: number;
    averageRating: number;
    keyIdeas: number;
    type:string;
    status: string;
    subscriptionRequired: boolean;
    summary: string;
    tags: string[];
    bookDescription: string;
    authorDescription: string;
}

export const booksApi = createApi({
    reducerPath: "booksApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://us-central1-summaristt.cloudfunctions.net/",}),
    endpoints: (builder) => ({
        getSuggestedBooks : builder.query<Book[], void>({
            query : () => "getBooks?status=suggested",
        }),
        getSelectedBooks: builder.query<Book[], void>({
            query: () => "getBooks?status=selected",
        }),
        getRecommendedBooks: builder.query<Book[], void>({
            query: () => "getBooks?status=recommended",
        }),
        getBookById: builder.query<Book, string>({
            query: (id) => `/getBook?id=${id}`,
        }),
        getBookBySearch: builder.query<Book[], string>({
            query: (search) => `getBooksByAuthorOrTitle?search=${search}`
        })
    })
})

export const { useGetSuggestedBooksQuery, useGetSelectedBooksQuery, useGetRecommendedBooksQuery, useGetBookByIdQuery, useGetBookBySearchQuery } = booksApi