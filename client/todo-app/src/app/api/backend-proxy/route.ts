//Create next js api routes connected to backend services

const BASE_TASK = process.env.TASK_SERVICE_URL || "http://localhost:4001";
const BASE_USER = process.env.USER_SERVICE_URL || "http://localhost:4000";

// Proxy to Task Service
export async function GET_TASKS(request: Request) {
  const res = await fetch(`${BASE_TASK}/api/v1/tasks`);
  const data = await res.json();
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function GET_SINGLE_TASK(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const res = await fetch(`${BASE_TASK}/api/v1/tasks/${id}`);
  const data = await res.json();
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function GET_TASKLIST_TASKS(
  request: Request,
  { params }: { params: { taskListId: string } }
) {
  const { taskListId } = params;
  const res = await fetch(`${BASE_TASK}/api/v1/tasks/${taskListId}/tasks`);
  const data = await res.json();
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST_TASKS(request: Request) {
  const reqBody = await request.json();
  // verify request body has required fields
  if (
    !reqBody.task ||
    !reqBody.userId ||
    !reqBody.taskListId ||
    !reqBody.completed
  ) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  const res = await fetch(`${BASE_TASK}/api/v1/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reqBody),
  });
  const data = await res.json();
  if (!res.ok) {
    return new Response(
      JSON.stringify({ error: data.error || "Error creating task" }),
      {
        status: res.status,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  return new Response(JSON.stringify(data), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}

export async function PUT_TASK(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const reqBody = await request.json();
  const res = await fetch(`${BASE_TASK}/api/v1/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reqBody),
  });
  const data = await res.json();
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function DELETE_TASK(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const res = await fetch(`${BASE_TASK}/api/v1/tasks/${id}`, {
    method: "DELETE",
  });
  if (res.status === 204) {
    return new Response(null, { status: 204 });
  } else {
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// Proxy to Task Service for Task Lists
export async function GET_TASKLISTS(request: Request) {
  const res = await fetch(`${BASE_TASK}/api/v1/taskLists`);
  const data = await res.json();
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST_TASKLISTS(request: Request) {
  const reqBody = await request.json();
  // verify request body has required fields
  if (
    !reqBody.title ||
    !reqBody.userId ||
    !reqBody.completed ||
    !reqBody.state ||
    !reqBody.tags
  ) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  const res = await fetch(`${BASE_TASK}/api/v1/taskLists`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reqBody),
  });
  const data = await res.json();
  return new Response(JSON.stringify(data), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}

export async function GET_TASKLIST_SINGLE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const res = await fetch(`${BASE_TASK}/api/v1/taskLists/${id}`);
  const data = await res.json();
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function GET_USER_TASKLISTS(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  const res = await fetch(`${BASE_TASK}/api/v1/taskLists/${userId}`);
  const data = await res.json();
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function PUT_TASKLIST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const reqBody = await request.json();
  const res = await fetch(`${BASE_TASK}/api/v1/taskLists/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reqBody),
  });
  const data = await res.json();
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function DELETE_TASKLIST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const res = await fetch(`${BASE_TASK}/api/v1/taskLists/${id}`, {
    method: "DELETE",
  });
  if (res.status === 204) {
    return new Response(null, { status: 204 });
  } else {
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: { "Content-Type": "application/json" },
    });
  }
}
