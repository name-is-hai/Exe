
export const userData = [
    {
        uid: 'K46iAaLqPsYkAjTXW80RItov4Hq2',
        avatar: 'https://shadcn-chat.vercel.app/User1.png',
        messages: [
            {
                avatar: 'https://shadcn-chat.vercel.app/User1.png',
                name: 'Jane Doe',
                message: 'Hey, Jakob',
            },
            {
                avatar: 'https://shadcn-chat.vercel.app/LoggedInUser.jpg',
                name: 'Jakob Hoeg',
                message: 'Hey!',
            },
            {
                avatar: 'https://shadcn-chat.vercel.app/User1.png',
                name: 'Jane Doe',
                message: 'How are you?',
            },
            {
                avatar: 'https://shadcn-chat.vercel.app/LoggedInUser.jpg',
                name: 'Jakob Hoeg',
                message: 'I am good, you?',
            },
            {
                avatar: 'https://shadcn-chat.vercel.app/User1.png',
                name: 'Jane Doe',
                message: 'I am good too!',
            },
            {
                avatar: 'https://shadcn-chat.vercel.app/LoggedInUser.jpg',
                name: 'Jakob Hoeg',
                message: 'That is good to hear!'
            },
            {
                avatar: 'https://shadcn-chat.vercel.app/User1.png',
                name: 'Jane Doe',
                message: 'How has your day been so far?',
            },
            {
                avatar: 'https://shadcn-chat.vercel.app/LoggedInUser.jpg',
                name: 'Jakob Hoeg',
                message: 'It has been good. I went for a run this morning and then had a nice breakfast. How about you?',
            },
            {
                avatar: 'https://shadcn-chat.vercel.app/User1.png',
                name: 'Jane Doe',
                message: 'I had a relaxing day. Just catching up on some reading.',
            }
        ],
        name: 'Trọ Nga Hoàng',
    },
];

export type UserData = (typeof userData)[number];

