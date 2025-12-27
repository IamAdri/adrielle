"use client";

export default function Error({ error, reset }) {
  return (
    <main className="flex justify-center items-center flex-col gap-6">
      <h1 className="text-3xl font-semibold">Something went wrong💥</h1>
      <p className="text-lg">{error.message}</p>
      <a
        href="/"
        className="inline-block font-medium bg-accent-500 text-primary-800 px-6 py-3 text-lg border hover:font-bold"
      >
        Go back home
      </a>
    </main>
  );
}
