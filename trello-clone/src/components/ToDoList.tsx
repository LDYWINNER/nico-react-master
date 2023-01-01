import { useForm } from "react-hook-form";
import { atom, useRecoilState } from "recoil";

interface IToDo {
    text: string;
    id: number;
    category: "To_DO" | "DOING" | "DONE";
};

const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
});

interface IForm {
    toDo: string;
};

function ToDoList() {
    const [toDos, setToDos] = useRecoilState(toDoState);
    const { register, handleSubmit, setValue } = useForm<IForm>();
    const handleValid = ({ toDo }: IForm) => {
        console.log("add to do", toDo);
        setToDos((oldToDos) => [{ text: toDo, id: Date.now(), category: "To_DO" }, ...oldToDos])
        setValue("toDo", "");
    };
    console.log(toDos);
    return (
        <div>
            <h1>To Dos</h1>
            <hr />
            <form onSubmit={handleSubmit(handleValid)}>
                <input {...register("toDo", {
                    required: "Please write a todo",
                })} placeholder="Write a to do" />
                <button>Add</button>
            </form>
            <ul>
                {toDos.map((toDo) => (
                    <li key={toDo.id}>{toDo.text}</li>
                ))}
            </ul>
        </div>
    );
};

export default ToDoList;