"use client";

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const [user, setUser] = useState(null);

  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  useEffect(() => {
    listTodos();
  }, []);

  useEffect(() => {
    if (user) {
      // 사용자가 로그인할 때마다 Todo 목록을 새로 로드합니다.
      listTodos();
    }
  }, [user]);

  function createTodo() {
    client.models.Todo.create({
      content: window.prompt("Todo content"),
    });
  }
  
  function deleteTodo(id: string) {
    client.models.Todo.delete({ id });
  }

const getReservations = async () => {
  try {
    const response = await fetch('http://54.180.232.29:8080/reservations?bookstore=example_bookstore&date=2023-09-05');
    console.log(response)
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('Success:', data);
  } catch (error) {
    console.error('Error:', error);
  }
};
useEffect(() => {
  getReservations();

}, []);// Call this function where neededs

useEffect(()=>{
  postReservation();
},[])
const postReservation = async () => {
  try {
    const response2 = await fetch('http://54.180.232.29:8080/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bookstore: 'MyBookstore',
        date: '2024-09-01',
        time: '14:00',
        customer: 'John Doe',
      }),
    });
    console.log(response2)
    if (!response2.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response2.json();
    console.log('Success:', data);
    console.log(data)
  } catch (error) {
    console.error('Error:', error);
  }
};

// Call this function where needed

  return (
    <>
      <Authenticator>
        {({ signOut, user }) => {

          return (
            <main>

              {/* <h2 className='p-2 bg-red-500'>here</h2> */}
              <h1>{user?.signInDetails?.loginId}'s todos</h1>

              <button onClick={createTodo}>+ new</button>
              <ul>
                {todos.map((todo) => (
                  <li onClick={() => deleteTodo(todo.id)} key={todo.id}>{todo.content}</li>
                ))}
              </ul>
              <div>
                🥳 App successfully hosted. Try creating a new todo.
                <br />
                <a href="https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/">
                  Review next steps of this tutorial.
                </a>
              </div>
              <button onClick={() => { signOut()}}>Sign out</button>
            </main>
          );
        }}
      </Authenticator>
    </>
  );
}
