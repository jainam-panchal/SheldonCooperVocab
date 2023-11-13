import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Bottleneck from 'bottleneck';

const limiter = new Bottleneck({
    minTime: 200 // 200ms between requests
});

export default function Dictionary() {

    const searchBox = document.getElementById('searchbox');
    const [word, setWord] = useState();
    const [input, setInput] = useState();

    useEffect(() => {
        limiter.schedule(() => fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + input))
            .then(resp => resp.json())
            .then(data => {
                if (data && data[0] && data[0].meanings) {
                    setWord(data[0].meanings)
                } else {
                    console.error('Invalid data: ', data)
                    console.log("word, input", word, input)
                }
            })
    }, [input, word])

    return (
        <div className="flex justify-center items-center h-[70%] px-4">
            <div className="flex flex-col items-center justify-center bg-gray-200 py-2">
                <label htmlFor="searchbox" className="text-3xl font-bold mb-1">Explore Cooper's Brain</label>
                <p className="italic mb-4">btw penny says hiii :)</p>

                <div className="flex justify-around">
                    <input id="searchbox"
                        type="text"
                        //placeholder="hello"
                        className="shadow appearance-none border rounded mr-3 w-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onKeyDown={(e) => {
                            if (e.keyCode === 13) {
                                setInput(e.target.value)
                                if (e.target.value.trim() === '') {
                                    setWord([]);
                                }
                            }

                        }} />

                    <button className="bg-blue-500 inline hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={(e) => {
                        setInput(searchBox.value)
                    }}>
                        Enter
                    </button>
                </div>
                {word ?
                    word.map((meaning) => {
                        return (
                            <div className=" rounded mt-2" key={uuidv4()}>
                                <p className="text-black mt-4" >
                                    <span className="font-bold">{meaning.partOfSpeech + ': '}</span>
                                    {meaning.definitions[0].definition}
                                </p>
                            </div>
                        );
                    })
                    : null
                }
            </div>
        </div>
    )
}