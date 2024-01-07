import { useState } from "react"
export function Birthday() {
    const [date, setDate] = useState('');
    const [arr, setArr] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [liked, setLiked] = useState([]);
    async function save() {
        const d = date.split('-');
        const month = d[1];
        const day = d[2];
        const response = await fetch(`https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/births/${month}/${day}`);
        const jsonifiedResponse = await response.json();
        const newArr = [];
        for (let i = 0; i < jsonifiedResponse.births.length; i++) {
            newArr.push(jsonifiedResponse.births[i].text);
        }
        setArr(newArr);
    }
    function like(person) {
        const newLiked = [...liked];
        if (!newLiked.includes(person)) {
            newLiked.push(person);
        }
        setLiked(newLiked);
    }
    function unlike(person) {
        const newLiked = [...liked];
        const index = newLiked.indexOf(person);
        newLiked.splice(index, 1);
        setLiked(newLiked);
    }
    return (
        <div>
            <input type="date" onChange={e => setDate(e.target.value)} />
            <button onClick={save}>Save</button>
            <br />
            <br />
            <br />
            <br />
            <br />
            <div>
                <h1><u>Chosen date:</u> {date}</h1>
            </div>
            <div>
                <br />
                <div><h2><u>Search:</u> <input type="text" onChange={e => setSearchTerm(e.target.value)} /></h2></div>
                {arr.filter((a) => {
                    return a.toLowerCase().includes(searchTerm);
                }).map((person) => {
                    return (
                        <div key={person} className="person">
                            {liked.includes(person) ? (
                                <button
                                    onClick={() => {
                                        unlike(person)
                                    }}
                                >
                                    Unlike
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        like(person)
                                    }}
                                >
                                    Like
                                </button>
                            )}
                            {' '}
                            {person}
                        </div>
                    )
                })}
            </div>
            <div>
                <h2><u>Liked:</u></h2>
                {liked.map((per) => {
                    return <div>
                        {per}
                    </div>
                })}
            </div>
        </div>
    )
}