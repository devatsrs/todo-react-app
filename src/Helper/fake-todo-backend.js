// array in local storage for registered todos
let todos = JSON.parse(localStorage.getItem('todos')) || [];


export function configureTodoFakeBackend() {
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {

        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {



                // get todos
                if (url.endsWith('/todos') && opts.method === 'GET') {

                    // check for fake auth token in header and return todos if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(todos)) });
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }
                    return;

                }

                // get todo by id
                if (url.match(/\/todos\/\d+$/) && opts.method === 'GET') {
                    // check for fake auth token in header and return todo if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        // find todo by id in todos array
                        let urlParts = url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        let matchedTodos = todos.filter(todo => { return todo.id === id; });
                        let todo = matchedTodos.length ? matchedTodos[0] : null;

                        // respond 200 OK with todo
                        resolve({ ok: true, text: () => JSON.stringify(todo) });
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                }

                // register todo
                if (url.endsWith('/todos/create') && opts.method === 'POST') {


                    // get new todo object from post body
                    let newTodo = JSON.parse(opts.body);


                    // validation
                    let duplicateTodo = todos.filter(todo => { return todo.text === newTodo.text; }).length;
                    if (duplicateTodo) {
                        reject('Task "' + newTodo.text + '" is already exists');
                        return;
                    }

                    // save new todo
                    newTodo.id = todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
                    todos.push(newTodo);
                    localStorage.setItem('todos', JSON.stringify(todos));

                    // respond 200 OK
                    resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(newTodo)) });

                    return;
                }
                //completed
                if (url.match(/\/todos\/completed\/\d+$/) && opts.method === 'POST') {
                    // check for fake auth token in header and return todo if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        // find todo by id in todos array
                        let urlParts = url.split('/');
                        let data = JSON.parse(opts.body);

                        let id = parseInt(urlParts[urlParts.length - 1]);

                        const updatedTodos = todos.filter((todo) => {
                            if (todo.id === id) {
                                todo.completed = data.completed
                                return todo;
                            }
                            return todo;
                        });
                        localStorage.setItem('todos', JSON.stringify(updatedTodos));

                        // respond 200 OK
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(updatedTodos)) });
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                }


                // update todo
                if (url.match(/\/todos\/update\/\d+$/) && opts.method === 'PUT') {
                    // check for fake auth token in header and return todo if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        // find todo by id in todos array
                        let urlParts = url.split('/');
                        let data = JSON.parse(opts.body);

                        let id = parseInt(urlParts[urlParts.length - 1]);
                        const updatedTodos = todos.filter((todo) => {
                            if (todo.id === id) {
                                todo.text = data.text
                                return todo;
                            }
                            return todo;
                        });
                        localStorage.setItem('todos', JSON.stringify(updatedTodos));

                        // respond 200 OK
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(updatedTodos)) });


                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                }

                // delete todo
                if (url.match(/\/todos\/\d+$/) && opts.method === 'DELETE') {
                    // check for fake auth token in header and return todo if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        // find todo by id in todos array
                        let urlParts = url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        for (let i = 0; i < todos.length; i++) {
                            let todo = todos[i];
                            if (todo.id === id) {
                                // delete todo
                                todos.splice(i, 1);
                                localStorage.setItem('todos', JSON.stringify(todos));
                                break;
                            }
                        }

                        // respond 200 OK
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(todos)) });
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                }





                // pass through any requests not handled above
                realFetch(url, opts).then(response => resolve(response));

            }, 500);
        });
    }
}