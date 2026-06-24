//! ROUTE HANDLERS + SERVER ACTIONS

//! Route Handlers — API endpoints в app/
// app/api/users/route.ts
// export async function GET(request: Request) { return Response.json(users) }
// export async function POST(request: Request) { ... }

//! Server Actions — 'use server' functions, вызываются из Client Components
// app/actions.ts
// 'use server'
// export async function createPost(formData: FormData) {
//   await db.post.create({ data: { title: formData.get('title') } });
//   revalidatePath('/posts');
// }

//! Client:
// <form action={createPost}>...</form>
// или startTransition(() => createPost(data))

//! revalidatePath / revalidateTag — инвалидация кэша после mutation

export {};
