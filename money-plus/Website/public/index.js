window.onload = ()=>{
    console.log("at Frontend")
;}


document.querySelector('#login-form').
        addEventListener ('submit', async function(event){
    event.preventDefault();

    const form = event.target;

    const formObj = {
        username: form.username.value,
        password: form.password.value
    }
    console.log(formObj)

    const res = await fetch ('/login',{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formObj)
        });

    const result = await res.json ();
    if (res.status === 200){
        window.location = '/home/'
    }else{
        document.querySelector('#alert-container')
        .innerHTML = `<div class="alert alert-danger" role="alert">${result.msg}</div>`;
    }
});