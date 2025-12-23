# Adrielle website

## Description
Adrielle is an ecommerce website for a fictional shop of women`s shoes. 

This project is an example for my portofolio and it can do the following main tasks:

- CRUD actions expected in an ecommerce website: fetch products, add or remove from favorites and cart, write a review or make an order. 
- Show and edit user`s details such as delivery address, personal orders and reviews.
- Authenticate users with NextAuth via Google Provider.
- RLS policies in Supabase so that user can have access only to their personal details.
- Light/dark mode.


## Project Screen Shot(s)
<img width="1878" height="869" alt="image" src="https://github.com/user-attachments/assets/7d43adbc-2bac-4034-b6f4-27594ab320ee" />

<img width="1882" height="867" alt="image" src="https://github.com/user-attachments/assets/81f97d23-dcbf-4396-b5c2-e47ca71dab8c" />



## Getting Started
Before interactig with website please note that I have implemented required RLS policies so it is safe to insert your email address to test the login process.
  

## Deployed version - [click here!](https://adrielle.vercel.app)

### Dependencies

* React with Vite
* React query
* React Hook Form
* Date-fns
* Supabse Authenticator with Google Provider
* Styled Components

### Installing

* The deployed version of website - admin-panel-lemon-two.vercel.app.
*CHECK LATER HOT TO CLONE WITH GITHUB

### Executing program

* How to run the program
* Step-by-step bullets
```
code blocks for commands
```

## Help

Any advise for common problems or issues.
```
command to run if program contains helper info
```

## Reflection
The idea behind this project was to create an website with a lot of data created in Supabase project and implement type of UX that is widely popular such as adding to favorites, making an order, login etc. 

In order to show my knowledge I`ve gained so far I have decided to create this one with Next.js App router. For styling I used Taillwind and for authentication the Next.js Authenticator with Google Provider. 

As my first project created for portofolio it was an amazing way to practice all I`ve learned and to face challenges of a considerably complex website with many components, state and side affects. Some of mostly challenging parts of this experience was to manage globaly state with ContextApi used in many components and to control side affects and errors in different scenarios of interacting with website. Also, something that Next.js brought for me as a difficult task are errors which appeared as a consequence of hydration mismatch during developing stage.

## Author

Adriana Sprincean - atoma304@gmail.com

## License

This project is licensed under the [NAME HERE] License - see the LICENSE.md file for details





This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
