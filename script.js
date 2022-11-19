const userswrapper = document.querySelector(".users");
const usrlist = document.querySelector(".usersList");

function getUsers(){
    fetch("https://reqres.in/api/unknown", {method:"GET"},)
    .then(res=>{
       if(res.status !== 200){
        throw new Error();
       }
       return res.json();
    })
    .then(res=>{
        const fragment = document.createDocumentFragment();
        res.data.forEach(x=>{
            const li = document.createElement('li');
            li.innerText = `${x.name} Born in:  ${x.year}`;
            fragment.appendChild(li);
        });

        usrlist.appendChild(fragment);
    })
    .catch(err=>{
        const p = document.createElement('p');
        p.innerText = err.message;
        users-wrapper.appendChild(p);
    })
}

getUsers();



