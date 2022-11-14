function create_header(element){
    const div = document.createElement("div")
    div.classList.add("header")
    const text = document.createElement("div")
    text.textContent = "ToDo"
    div.appendChild(text)
    element.appendChild(div)
}
class Project{
    constructor(name, project_elemet, task_element){
        this.project_elemet = project_elemet
        this.task_element = task_element
        this.name = name
        this.CanTouch = true
        this.div = document.createElement("div")
        this.div.classList.add("project_title")
        this.text = document.createElement("div")
        this.text.textContent = this.name
        this.list = []
    }
    Add_task(task){
        this.list.push(task)
    }
    Display_project(){
        this.div.appendChild(this.text)
        this.project_elemet.appendChild(this.div)
        this.div.addEventListener("click", this.Display_todo.bind(this))
    }
    Display_todo(){
        this.task_element.innerHTML = ''
        const title = document.createElement("div")
        title.classList.add("title")
        title.textContent = this.name
        const header_bar = document.createElement("div")
        header_bar.classList.add("bar")
        const text = document.createElement("div")
        text.textContent = `Tasks (${this.list.length})`
        const add = document.createElement("div") 
        add.textContent = "[+]"
        header_bar.appendChild(text)
        header_bar.appendChild(add)
        const tasks = document.createElement("div")
        tasks.classList.add("tasks")
        for(let x=0; x<this.list.length;x++){
            this.list[x].display(tasks)
        }
        this.task_element.appendChild(title)
        this.task_element.appendChild(header_bar)
        this.task_element.appendChild(tasks)
    }
}
class task{
    constructor(name, description, date, priorety){
        this.title = name
        this.description = description
        this.date = date
        this.priorety = priorety
    }
    display(element){
        const div = document.createElement("div")
        div.classList.add("task")
        div.classList.add(this.priorety)
        const name = document.createElement("div")
        name.textContent = this.title
        const descript = document.createElement("div")
        descript.textContent = this.description
        const date = document.createElement("div")
        date.textContent = this.date
        div.appendChild(name)
        div.appendChild(descript)
        div.appendChild(date)
        element.appendChild(div)
    }
}


const body = (element) =>{
    const body = document.createElement("div")
    body.classList.add("body")
    const side_bar = document.createElement("div")
    side_bar.classList.add("side_bar")
    const content = document.createElement("div")
    content.classList.add("content")
    let bar = new side_bar_handler(projects)
    bar.side_bar_display(side_bar)
    body.appendChild(side_bar)
    body.appendChild(content)
    element.appendChild(body)
    
}

class side_bar_handler{
    constructor(list){
        this.list = list
    }
    side_bar_display(element){
        this.element = element
        const header = document.createElement("div")
        const header_text = document.createElement("div")
        header.classList.add("side_bar_header")
        header_text.textContent = `Projects (${projects.length})`
        header_text.classList.add("header_text")
        const header_add_project = document.createElement("div")
        header_add_project.classList.add("add")
        header_add_project.textContent = "+"
        header.appendChild(header_text)
        header.appendChild(header_add_project)
        this.element.appendChild(header)
        this.div_form = document.createElement("div")
        this.div_form.classList.add("proeject_form")
        this.element.appendChild(this.div_form)
        header_add_project.addEventListener("click", this.create_form)
        this.projects = document.createElement("div")
        this.projects.classList.add("Projects")
        this.element.appendChild(this.projects)
    }
    add_form(element){
        
    }
    create_form(){
        let form = document.querySelector(".proeject_form")
        if(form.innerHTML != ''){
            return
        }
        let form2 = document.createElement("form")
        form2.setAttribute("id","project")
        let input = document.createElement("input")
        input.setAttribute("type", "text")
        input.setAttribute("id", "project")
        input.setAttribute("name", "project")
        input.setAttribute("value", "project")
        let button = document.createElement("input")
        button.setAttribute("type", "submit")
        button.setAttribute("value", "submit")
        form2.appendChild(input)
        form2.appendChild(button)
        form.appendChild(form2)
        let x = document.querySelector("form#project")
        x.addEventListener("submit",submit.bind(window))
    }
    
    
    
    
}
function render_projects(element){
    element.innerHTML = ''
    for(let x=0; x<projects.length;x++){
        projects[x].Display_project(element)
    }
}


function submit(e){
    if(e.target["project"].value != ""){
        projects.push(new Project(e.target["project"].value, document.querySelector("div.Projects"),document.querySelector("div.content")))
        console.log(projects)
    }
    e.preventDefault();
    let form = document.querySelector(".proeject_form")
    form.innerHTML = ''
    render_projects(document.querySelector("div.Projects"))
}

projects = []
const div = document.getElementById("container")
create_header(div)
body(div)