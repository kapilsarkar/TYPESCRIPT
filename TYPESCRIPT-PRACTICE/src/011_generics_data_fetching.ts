// ---------------------------------------------------------------
// Fetching data with a generic function
// Beginner-friendly version using async/await and try/catch.
// Needs Node 18+ (fetch is built in) or a browser.
// ---------------------------------------------------------------

// 1. Describe the shape of the data we expect from each API.
interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

// 2. One reusable function for ANY list of data.
// <T> is the type of one item (Todo, Post, ...).
// Promise<T[]> means: "later, you will get an array of T".
async function fetchList<T>(url: string): Promise<T[]> {
    const response = await fetch(url);

    // response.ok is false for errors like 404 or 500.
    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    // .json() turns the response into JavaScript data.
    const data: T[] = await response.json();
    return data;
}

// 3. Use the function.
// `async` lets us use `await`, which pauses until the data arrives,
// so the code reads top to bottom like normal code.
async function main() {
    const todosUrl = "https://jsonplaceholder.typicode.com/todos";
    const postsUrl = "https://jsonplaceholder.typicode.com/posts";

    try {
        // <Todo> tells TypeScript each item is a Todo,
        // so todo.title is known and checked.
        const todos = await fetchList<Todo>(todosUrl);
        const todoTitles = todos.map(todo => todo.title);
        console.log("Todo titles (first 5):", todoTitles.slice(0, 5));

        const posts = await fetchList<Post>(postsUrl);
        const postBodies = posts.map(post => post.body);
        console.log("Post bodies (first 5):", postBodies.slice(0, 5));
    } catch (error) {
        // Runs if the request fails or throws an error.
        console.log("Something went wrong:", error);
    }
}

main();